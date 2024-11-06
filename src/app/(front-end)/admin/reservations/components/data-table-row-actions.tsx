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
import { reservationSchema, Reservation } from "../data/schema";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { _cancelReservation, _deleteDoc, _editDoc } from "@/lib/firebase/service";
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
  const reserve = reservationSchema.parse(row.original);
  const isPaid = reserve.paymentStatus.toLowerCase().startsWith('paid');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const { toast } = useToast();

  // Set up form with no initial limit on inclusions
  const form = useForm<Reservation>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      
    },
  });


  async function handleEdit(values: z.infer<typeof reservationSchema>) {
    setIsLoading(true);
    setOpen(false);
    
    toast({
      title: "Item Updated!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
    setIsLoading(false);
    router.refresh();
  }

  async function cancelResevation() {
    setIsLoading(true);
    setOpen(false);
    await _cancelReservation("reservations", reserve.bookingData.bookingId)
    .catch(() => {
      toast({
        title: "Internal Server Error!",
        description: "An error occurred, please refresh the page.",
        action: <ToastAction altText="Okay">Okay</ToastAction>,
        variant: 'destructive'
      });
    }).finally(() => {
      setIsLoading(false);
      router.refresh();
      location.reload()
    })
    toast({
      title: "Cancelled!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
      variant: 'destructive'
    });
    
  }

  return (
    <div className="flex gap-4 max-h-screen">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          {/* <Button
            className="lg:text-lg h-8 rounded-2xl py-5 hover:bg-blue-600"
            disabled={isLoading}
            size="responsive"
          >
            Edit
          </Button> */}
        </AlertDialogTrigger>
        <AlertDialogContent >
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Reservation</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription></AlertDialogDescription>
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleEdit)}>
                <AlertDialogFooter>
                  <Button className='rounded-xl' type="submit">Save</Button>
                  <AlertDialogCancel className='rounded-xl'>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          {!isPaid && (
            <Button
              className="lg:text-lg h-8 rounded-2xl py-5 hover:bg-red-600"
              disabled={isLoading}
              size="responsive"
            >
              Cancel
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{!isPaid ? 'Are you absolutely sure?' : 'Do you want to refund this reserve pack?'}</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Canceling this reservation from this email {"<"}<span className='text-red-500'>{reserve.bookingData.email}</span>{">"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoading}
              className="bg-red-600"
              onClick={cancelResevation}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
