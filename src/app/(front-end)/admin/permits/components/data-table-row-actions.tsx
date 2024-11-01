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
import { Permit, permitSchema } from "../data/schema";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { _deleteDoc, _editDoc } from "@/lib/firebase/service";
import { useForm } from "react-hook-form";
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
import { cn, dateToday } from "@/lib/utils";
import { CalendarIcon, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const permit = permitSchema.parse(row.original);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const { toast } = useToast();

  // Set up form with no initial limit on inclusions
  const form = useForm<Permit>({
    resolver: zodResolver(permitSchema),
    defaultValues: {
      id: permit.id,
      name: permit.name,
      amount: permit.amount,
      expiredAt: permit.expiredAt,
      updatedAt: permit.updatedAt
    },
  });

  async function handleCancelEdit() {
    form.reset();
  }

  async function handleDeletePermit() {
    setIsLoading(true);
    await _deleteDoc("permits", permit.id);
    router.refresh();
    setIsLoading(false);
  }

  async function handleEdit(values: z.infer<typeof permitSchema>) {
    setIsLoading(true);
    setOpen(false);
    await _editDoc("permits", values.id, {
      id: values.id,
      name: values.name,
      amount: values.amount,
      expiredAt: values.expiredAt,
      updatedAt: new Date().toString()
    });
    toast({
      title: "Permit Updated!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
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
            <AlertDialogTitle>Edit Permit</AlertDialogTitle>
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
                      <FormLabel htmlFor="name">Name of the permit:</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className='mb-4'>
                      <FormLabel htmlFor="amount">Amount:</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          id="amount"
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          placeholder='Enter the amount'
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiredAt"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel htmlFor=''>Expiration Date:</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                            disabled={(date) =>
                              date < new Date()
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              onClick={handleDeletePermit}
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
