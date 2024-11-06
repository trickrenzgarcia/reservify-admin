'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { storage } from '@/lib/firebase'
import { _deleteDoc, _editDoc } from '@/lib/firebase/service'
import { Inventory, Venue } from '@/lib/firebase/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { ArrowLeft, Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import AddVenueForm from './add-venue'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ToastAction } from '@/components/ui/toast'
import { dateToday } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

type ViewVenueProps = {
  inventory: Inventory[],
  venues: Venue[]
}

const VenueFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Venue title is required.'),
  description: z.string().min(10, 'Must be 12 characters above.'),
  thumbnail: z.string(),
  images: z.string().array().optional(),
  videos: z.string().array().optional()
})

export default function ViewVenue({ inventory, venues }: ViewVenueProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState<boolean>(false)
  const [isAddVenue, setIsAddVenue] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [selectedVenue, setSelectedVenue] = React.useState<Venue | undefined>(undefined)
  const [thumbnail, setThumbnail] = React.useState<string | undefined>(undefined)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof VenueFormSchema>>({
    resolver: zodResolver(VenueFormSchema),
    defaultValues: {
      id: '',
      title: '',
      description: '',
      thumbnail: '',
      images: [],
      videos: []
    }
  })

  React.useEffect(() => {
    if(!open) {
      setSelectedVenue(undefined)
      setThumbnail(undefined)
    }
  }, [open])

  React.useEffect(() => {
    if(selectedVenue) {
      form.setValue('id', selectedVenue.id)
      form.setValue('title', selectedVenue.title)
      form.setValue('description', selectedVenue.description)
      form.setValue('thumbnail', selectedVenue.thumbnail)
      form.setValue('images', selectedVenue.images)
      form.setValue('videos', selectedVenue.videos)
    } else {
      form.reset()
    }
  }, [selectedVenue, form])

  function handleThumbnailOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if(file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result as string
        setThumbnail(base64Data) // Set the base64 data URL as the thumbnail
      }
      reader.readAsDataURL(file) // Read the file as a data URL (base64)
    }
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if(file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result as string
        setSelectedVenue((previousVenue) => {
          if(!previousVenue) return previousVenue;
          return {
            ...previousVenue,
            images: [...previousVenue.images, base64Data]
          }
        }) // Set the base64 data URL as the thumbnail
      }
      reader.readAsDataURL(file) // Read the file as a data URL (base64)
    }
  }

  function handleCancelSelectedVenue() {
    setSelectedVenue(undefined)
    setThumbnail(undefined)
    setIsAddVenue(false)
  }

  function handleDeleteSingleImage(index: number) {
    setSelectedVenue((previousVenue) => {
      if (!previousVenue) return previousVenue;
      return {
        ...previousVenue,
        images: previousVenue.images.filter((_, i) => i !== index),
      };
    });
  }

  async function handleDeleteVenue() {
    setIsLoading(true)
    if(!selectedVenue) {
      setIsLoading(false)
      return;
    };
    await _deleteDoc("venues", selectedVenue.id)
    toast({
      title: "Venue has been removed!",
      description: "timestamp: " + dateToday(new Date()),
      variant: 'destructive',
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
    setIsLoading(false)
    router.refresh()
  }

  async function onSubmit(values: z.infer<typeof VenueFormSchema>) {
    setIsLoading(true)
    let tempThumbnail = values.thumbnail;
    if(thumbnail) {
      const thumbnailRef = await ref(storage, `venues/thumbnail_${crypto.randomUUID()}`)
      await uploadString(thumbnailRef, thumbnail, 'data_url')
      tempThumbnail = await getDownloadURL(thumbnailRef)
    }
  
    // Upload images if they are in base64 format and get their URLs
    const uploadedImages = values.images && values.images.some(img => img.startsWith('data:image/'))
      ? await Promise.all(
          values.images.map(async (base64Image) => {
            if (base64Image.startsWith('data:image/')) {
              const imageRef = ref(storage, `venues/${crypto.randomUUID()}`)
              await uploadString(imageRef, base64Image, 'data_url')
              return await getDownloadURL(imageRef)
            }
            return base64Image // Keep the existing URL if it's already a URL
          })
        )
      : values.images || []
  
    // Now that we have only the URLs, update the document
    if (selectedVenue) {
      await _editDoc("venues", selectedVenue.id, {
        ...values,
        thumbnail: tempThumbnail,
        images: uploadedImages // Array of Firebase Storage URLs only
      })
    }
  
    setIsLoading(false)
    router.refresh()
    form.reset()
    setSelectedVenue(undefined)
    setThumbnail(undefined)
    toast({
      title: "Venue has been edited!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
  }

  return (
    <div className='bg-[#E1E1E1] w-full p-6 rounded-3xl mt-4 mb-6'>
      <div className='flex justify-between items-center max-w-screen-md mx-auto'>
        <span className='font-semibold'>ABOUT THE VENUE</span>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className='lg:text-lg h-8 rounded-3xl py-5 px-10'>EDIT</Button>
          </DialogTrigger>
          <DialogContent className='max-w-full'>
            <div className='w-full h-full flex flex-col'>
              <div className='flex justify-between truncate my-6'>
                <div className='flex gap-2'>
                  {(selectedVenue || isAddVenue) && (
                    <Button className='rounded-full p-2' variant='outline'
                      onClick={handleCancelSelectedVenue}
                    >
                      <ArrowLeft size={20} />
                    </Button>
                  )}
                  <h1 className='text-3xl font-bold '>{isAddVenue ? 'Add Venue' : 'Edit Venue Details'}</h1>
                </div>
                <Button className='rounded-full font-bold' disabled={isLoading} onClick={() => {
                  setIsAddVenue(true)
                }}>
                  <Plus size={18}/> Add Venue
                </Button>
              </div>
              <ScrollArea className='h-[600px] pr-4'>
                {!selectedVenue && !isAddVenue ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {venues.map((venue) => (
                      <Card 
                        key={venue.id}
                        className='cursor-pointer hover:border-2 hover:border-orange-500 hover:bg-primary hover:text-primary-foreground'
                        onClick={() => {
                          setSelectedVenue(venue)
                          setIsAddVenue(false)
                        }}
                      >
                        <CardContent className='p-0'>
                          <div className='flex items-center justify-center aspect-video p-0'>
                            <Image
                              className='h-full w-full rounded-t-xl'
                              src={venue.thumbnail} 
                              alt={venue.title} 
                              width={350} 
                              height={350}
                              loading='lazy'
                              style={{
                                objectFit: 'cover',
                                objectPosition: 'center'
                              }}
                            />
                          </div>
                          <div className='my-4 mx-6'>
                            <h2 className='text-xl font-semibold'>{venue.title}</h2>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  ) : selectedVenue ? (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='grid grid-cols-1 lg:grid-cols-2 gap-8'
                      >
                        <div className='space-y-6'>
                          <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                  className='text-xl font-bold'
                                  htmlFor='description'
                                >
                                  Venue Title:
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    id='title'
                                    disabled={isLoading}
                                    placeholder='Venue Title'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel
                                  className='text-xl font-bold'
                                  htmlFor='description'
                                >
                                  Venue Description:
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    id='description'
                                    placeholder='Venue Description'
                                    disabled={isLoading}
                                    rows={6}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className='lg:flex w-full hidden justify-between'>
                            <div className="flex gap-3">
                              <Button className='px-10 rounded-full font-semibold' type='submit' variant='default' disabled={isLoading}>Save</Button>
                              <Button 
                                className='px-8 rounded-full font-semibold hover:bg-red-500 hover:text-primary-foreground'
                                type='button' variant='ghost'
                                onClick={handleCancelSelectedVenue}
                                disabled={isLoading}
                              >
                                  Cancel
                              </Button>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button type='button' className='rounded-full font-semibold' variant='destructive' disabled={isLoading}
                                >REMOVE THIS VENUE</Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the venue to the server.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className='bg-red-500' onClick={handleDeleteVenue}>Yes</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name='thumbnail'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel
                                  className='text-xl font-bold'
                                  htmlFor='thumbnail'
                                >
                                  Thumbnail:
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className='hidden'
                                    {...field}
                                    id='thumbnail'
                                    placeholder=''
                                    accept='image/*'
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className='flex items-center gap-4 mt-2'>
                            <div className='w-1/2 aspect-video p-0'>
                              <Image
                                className='h-full w-full rounded-xl'
                                src={thumbnail || selectedVenue.thumbnail}
                                loading='lazy'
                                alt=''
                                width={200}
                                height={200}
                                style={{
                                  objectFit: 'cover',
                                }}
                              />
                            </div>
                            <div className='flex flex-col items-start gap-2'>
                              <Label className='font-bold'>
                                Change Thumbnail, <span className='font-medium'>Recommended: 1280x720 pixels</span>
                              </Label>
                              <Input
                                className='cursor-pointer'
                                onChange={handleThumbnailOnChange}
                                type='file'
                                accept='image/*'
                                disabled={isLoading}
                              />
                            </div>
                          </div>
                          <div className='my-6'>
                            <div className='flex items-center gap-2'>
                              <Label className='text-xl font-bold'>Additional Images:</Label>
                              <Button
                                className='rounded-full text-sm bg-teal-500'
                                type='button'
                                disabled={isLoading}
                                onClick={() => {
                                fileRef.current?.click()
                              }}>Add Photo</Button>
                              <Input
                                className='hidden'
                                ref={fileRef}
                                type='file'
                                accept='image/*'
                                onChange={handleImageUpload}
                              />
                            </div>
                            
                            <div className='grid grid-cols-2 lg:grid-cols-3 gap-2 mt-2'>
                              {selectedVenue.images && selectedVenue.images.map((image, index) => (
                                <div
                                  key={image + index}
                                  className='relative group flex flex-col items-center justify-center bg-primary w-full rounded-lg overflow-hidden'
                                >
                                  {/* Image */}
                                  <Image
                                    src={image}
                                    alt=''
                                    width={250}
                                    height={250}
                                    className='w-full rounded-lg'
                                  />
                                  
                                  {/* Overlay with Edit and Delete buttons */}
                                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <button
                                      className='bg-white p-2 rounded-lg font-semibold hover:bg-red-500'
                                      onClick={() => handleDeleteSingleImage(index)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )) || (
                                <p className='italic'>No Image Uploaded.</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className='lg:hidden w-full gap-3 flex'>
                          <Button
                            className='px-10 rounded-full font-semibold'
                            type='submit' variant='default'
                            disabled={isLoading}
                          >
                            {isLoading ? <>.</> && 'Saving...' : 'Save'}
                          </Button>
                          <Button 
                            className='px-8 rounded-full font-semibold hover:bg-red-500 hover:text-primary-foreground'
                            type='button' variant='ghost'
                            onClick={handleCancelSelectedVenue}
                            disabled={isLoading}
                          >
                              Cancel
                          </Button>
                          
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <AddVenueForm
                      isAddVenue={isAddVenue}
                      setIsAddVenue={setIsAddVenue}
                    />
                  )
                }
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
        
      </div>
    </div>
  )
}
