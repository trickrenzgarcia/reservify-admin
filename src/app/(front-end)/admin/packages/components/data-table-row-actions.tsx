"use client";

import * as React from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { packageSchema } from "../data/schema";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { _deleteDoc, _editDoc } from "@/lib/firebase/service";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { dateToday } from "@/lib/utils";
import { Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const pack = packageSchema.parse(row.original);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [inclusions, setInclusions] = React.useState<string[]>(pack.inclusions)
  const { toast } = useToast();

  // Set up form with no initial limit on inclusions
  const form = useForm<z.infer<typeof packageSchema>>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      id: pack.id,
      name: pack.name,
      price: pack.price,
      inclusions: pack.inclusions || [], // ensures inclusions starts as an empty array,
      startTime: pack.startTime,
      startCycle: pack.startCycle,
      endTime: pack.endTime,
      endCycle: pack.endCycle,
      cycle: pack.cycle
    },
  });

  function appendInclusion() {
    setInclusions((prev) => [...prev, ""])
  }

  function removeInclusion(index: number) {
    setInclusions((prev) => prev.filter((_, i) => i !== index))
  }
  
  async function handleCancelEdit() {
    form.reset();
    setInclusions(pack.inclusions)
  }

  async function handleDeleteInventory() {
    setIsLoading(true);
    await _deleteDoc("package", pack.id);
    router.refresh();
    setIsLoading(false);
  }

  async function handleEdit(values: z.infer<typeof packageSchema>) {
    setIsLoading(true);
    
    await _editDoc("package", values.id, {
      id: values.id,
      name: values.name,
      price: values.price,
      inclusions: inclusions,
      startTime: values.startTime,
      startCycle: values.startCycle,
      endTime: values.endTime,
      endCycle: values.endCycle,
      cycle: values.cycle
    });
    toast({
      title: "Item Updated!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
    setOpen(false);
    setIsLoading(false);
    router.refresh();
  }

  return (
    <div className="flex gap-4 max-h-screen">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className="lg:text-lg h-8 rounded-2xl py-5 hover:bg-blue-600"
            disabled={isLoading}
            size="responsive"
          >
            Edit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent >
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Package</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEdit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel htmlFor="name">Name of the Package:</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Dynamic inclusions fields */}
                <FormLabel htmlFor="inclusions">Package Inclusion:</FormLabel>
                {inclusions && (
                  <ScrollArea id='inclusions' className='h-32 max-h-48 bg-gray-50'>
                    <div className='p-4'>
                      {inclusions.map((field, index) => (
                        <FormItem key={index} className="flex items-center">
                          <FormControl className="">
                            <Input
                              value={inclusions[index]} // Controlled input value
                              onChange={(e) => {
                                const newInclusions = [...inclusions];
                                newInclusions[index] = e.target.value; // Update specific inclusion
                                setInclusions(newInclusions);
                              }}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeInclusion(index)}
                            className=""
                          >
                            <Trash2 size={18} />
                          </Button>
                        </FormItem>
                      ))}
                    </div>  
                  </ScrollArea>
                )}

                {/* Button to add a new inclusion */}
                <Button className='rounded-xl mt-2 mb-4' size='sm' type="button" onClick={() => appendInclusion()}>
                  Add Inclusion
                </Button>
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel htmlFor="price">Price:</FormLabel>
                      <FormControl>
                        <Input type='number' id="price" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className='flex justify-between'>
                  <section className='flex'>
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem className='mb-4'>
                          <FormLabel htmlFor="startTime">Start Time</FormLabel>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue id='startTime' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value='1:00'>1:00</SelectItem>
                                  <SelectItem value='2:00'>2:00</SelectItem>
                                  <SelectItem value='3:00'>3:00</SelectItem>
                                  <SelectItem value='4:00'>4:00</SelectItem>
                                  <SelectItem value='5:00'>5:00</SelectItem>
                                  <SelectItem value='6:00'>6:00</SelectItem>
                                  <SelectItem value='7:00'>7:00</SelectItem>
                                  <SelectItem value='8:00'>8:00</SelectItem>
                                  <SelectItem value='9:00'>9:00</SelectItem>
                                  <SelectItem value='10:00'>10:00</SelectItem>
                                  <SelectItem value='11:00'>11:00</SelectItem>
                                  <SelectItem value='12:00'>12:00</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startCycle"
                      render={({ field }) => (
                        <FormItem className='mb-4'>
                          <FormLabel htmlFor="startCycle">Start Cycle</FormLabel>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue id='startCycle' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value='AM'>AM</SelectItem>
                                  <SelectItem value='PM'>PM</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                        </FormItem>
                      )}
                    />
                  </section>
                  <section className='flex'>
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem className='mb-4'>
                          <FormLabel htmlFor="endTime">End Time</FormLabel>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue id='endTime' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value='1:00'>1:00</SelectItem>
                                  <SelectItem value='2:00'>2:00</SelectItem>
                                  <SelectItem value='3:00'>3:00</SelectItem>
                                  <SelectItem value='4:00'>4:00</SelectItem>
                                  <SelectItem value='5:00'>5:00</SelectItem>
                                  <SelectItem value='6:00'>6:00</SelectItem>
                                  <SelectItem value='7:00'>7:00</SelectItem>
                                  <SelectItem value='8:00'>8:00</SelectItem>
                                  <SelectItem value='9:00'>9:00</SelectItem>
                                  <SelectItem value='10:00'>10:00</SelectItem>
                                  <SelectItem value='11:00'>11:00</SelectItem>
                                  <SelectItem value='12:00'>12:00</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endCycle"
                      render={({ field }) => (
                        <FormItem className='mb-4'>
                          <FormLabel htmlFor="endCycle">End Cycle</FormLabel>
                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue id='endCycle' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value='AM'>AM</SelectItem>
                                  <SelectItem value='PM'>PM</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          
                        </FormItem>
                      )}
                    />
                  </section>
                </div>

                <AlertDialogFooter>
                  <Button className='rounded-xl' type="submit">Save</Button>
                  <AlertDialogCancel className='rounded-xl' onClick={handleCancelEdit}>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="lg:text-lg h-8 rounded-2xl py-5 hover:bg-red-600"
            disabled={isLoading}
            size="responsive"
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteInventory}
              disabled={isLoading}
              className="bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
