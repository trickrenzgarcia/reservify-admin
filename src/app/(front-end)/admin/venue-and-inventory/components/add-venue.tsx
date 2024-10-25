"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation';
import React from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Venue } from '@/lib/firebase/types';

const VenueFormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Venue title is required.'),
  description: z.string().min(10, 'Must be 12 characters above.'),
  thumbnail: z.string().min(1, 'Thumbnail is required.'),
  images: z.string().array().optional(),
  videos: z.string().array().optional()
})

type Props = {
  isAddVenue: boolean;
  setIsAddVenue: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddVenueForm({ isAddVenue, setIsAddVenue }: Props) {
  const router = useRouter()
  const [open, setOpen] = React.useState<boolean>(false)
  const [thumbnail, setThumbnail] = React.useState<string | undefined>(undefined)
  const fileRef = React.useRef<HTMLInputElement | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [entry, setEntry] = React.useState<Venue | undefined>({
    id: '',
    title: '',
    description: '',
    thumbnail: '',
    images: [],
    videos: []
  })

  const form = useForm<z.infer<typeof VenueFormSchema>>({
    resolver: zodResolver(VenueFormSchema),
    defaultValues: entry
  })

  React.useEffect(() => {
    if(entry) {
      form.setValue('id', entry.id)
      form.setValue('title', entry.title)
      form.setValue('description', entry.description)
      form.setValue('thumbnail', entry.thumbnail)
      form.setValue('images', entry.images)
      form.setValue('videos', entry.videos)
    }
    console.log(entry)
  }, [entry, form])

  function handleThumbnailOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if(file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Data = reader.result as string
        setThumbnail(base64Data) // Set the base64 data URL as the thumbnail
        setEntry((previousVenue) => {
          if (!previousVenue) return previousVenue;
          return {
            ...previousVenue,
            thumbnail: base64Data
          }
        })
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
        setEntry((previousVenue) => {
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

  function handleDeleteSingleImage(index: number) {
    setEntry((previousVenue) => {
      if (!previousVenue) return previousVenue;
      return {
        ...previousVenue,
        images: previousVenue.images.filter((_, i) => i !== index),
      };
    });
  }

  function handleCancelSelectedVenue() {
    setEntry(undefined)
    setThumbnail(undefined)
    setIsAddVenue(false)
    form.reset()

  }

  const onSubmit = async (values: z.infer<typeof VenueFormSchema>) => {

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold" htmlFor="description">
                  Venue Title:
                </FormLabel>
                <FormControl>
                  <Input {...field} id="title" placeholder="Venue Title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold" htmlFor="description">
                  Venue Description:
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Venue Description"
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="lg:flex w-full gap-3 hidden">
            <Button
              className="px-10 rounded-full font-semibold"
              type="submit"
              variant="default"
            >
              Save
            </Button>
            <Button
              className="px-8 rounded-full font-semibold hover:bg-red-500 hover:text-primary-foreground"
              type="button"
              variant="ghost"
              onClick={handleCancelSelectedVenue}
            >
              Cancel
            </Button>
          </div>
        </div>
        <div>
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-bold" htmlFor="thumbnail">
                  Thumbnail:
                </FormLabel>
                <FormControl>
                  <Input
                    className="hidden"
                    {...field}
                    id="thumbnail"
                    placeholder=""
                    accept="image/*"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4 mt-2">
            <div className="w-1/2 aspect-video p-0">
              <Image
                className="h-full w-full rounded-xl"
                src={thumbnail || entry?.thumbnail}
                loading="lazy"
                alt="Thumbnail"
                width={200}
                height={200}
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Label className="font-bold">
                Change Thumbnail,{" "}
                <span className="font-medium">
                  Recommended: 1280x720 pixels
                </span>
              </Label>
              <Input
                className="cursor-pointer"
                onChange={handleThumbnailOnChange}
                type="file"
                accept="image/*"
              />
            </div>
          </div>
          <div className="my-6">
            <div className="flex items-center gap-2">
              <Label className="text-xl font-bold">Additional Images:</Label>
              <Button
                className="rounded-full text-sm bg-teal-500"
                type="button"
                onClick={() => {
                  fileRef.current?.click();
                }}
              >
                Add Photo
              </Button>
              <Input
                className="hidden"
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              {entry && entry.images.length > 0 ? (
                entry.images.map((image, index) => (
                  <div
                    key={image + index}
                    className="relative group flex flex-col items-center justify-center bg-primary w-full rounded-lg overflow-hidden"
                  >
                    {/* Image */}
                    <Image
                      src={image}
                      alt=""
                      width={250}
                      height={250}
                      className="w-full rounded-lg"
                    />

                    {/* Overlay with Edit and Delete buttons */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        className="bg-white p-2 rounded-lg font-semibold hover:bg-red-500"
                        onClick={() => handleDeleteSingleImage(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="italic">No Image Uploaded.</p>
              )}
            </div>
          </div>
        </div>
        <div className="lg:hidden w-full gap-3 flex">
          <Button
            className="px-10 rounded-full font-semibold"
            type="submit"
            variant="default"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
          <Button
            className="px-8 rounded-full font-semibold hover:bg-red-500 hover:text-primary-foreground"
            type="button"
            variant="ghost"
            onClick={handleCancelSelectedVenue}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
