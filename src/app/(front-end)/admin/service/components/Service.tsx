"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { type CustomerService } from "@/lib/firebase/types";
import { cn, dateToday } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SendHorizonal } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateMessage } from "@/lib/firebase/service"

type Props = {
  services: CustomerService[];
};

const TextMsg = z.object({
  text: z.string().min(1, "Message required."),
});

export default function CustomerServiceClient({ services }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [selectedCustomer, setSelectedCustomer] = useState<
    CustomerService | undefined
  >(services[0]);
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof TextMsg>>({
    resolver: zodResolver(TextMsg),
    defaultValues: {
      text: "",
    },
  });

  useEffect(() => {
    const updatedService = services.find((serve) => serve.userData.userId === selectedCustomer?.userData.userId)
    setSelectedCustomer(updatedService)
  }, [services])


  const onSubmit = async (values: z.infer<typeof TextMsg>) => {
    setLoading(true);
    try {
      if(!selectedCustomer) return;
      await updateMessage(selectedCustomer.userData.userId, values.text)
      toast({
        title: 'Message Sent!',
        description: "timestamp: " + dateToday(new Date()),
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      })
    } catch (error) {
      toast({
        title: 'Failed to sent a message!',
        description: "Something went wrong to the server.",
        variant: 'destructive',
        action: <ToastAction altText="Okay">Okay</ToastAction>,
      })
    } finally {
      form.reset()
      router.refresh()
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-94px)]">
      {/* Sidebar for selecting customers */}
      <div className="w-full lg:w-[300px] p-4 border-r">
        <ScrollArea className="h-full lg:h-auto">
          <h2 className="font-bold text-lg mb-4 hidden lg:block">Customers</h2>
          <div className="flex space-x-4 lg:flex-col lg:space-x-0 lg:space-y-4 overflow-x-auto lg:overflow-y-auto">
            {services.length === 0 ? (
              <p className="text-gray-500 hidden lg:block">
                No customers available.
              </p>
            ) : (
              services.map((service) => (
                <div
                  key={service.userData.userId}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    selectedCustomer?.userData.userId ===
                    service.userData.userId
                      ? "bg-[#66993E]"
                      : "bg-gray-200"
                  } ${!selectedCustomer && "hidden lg:block"}`}
                  onClick={() => setSelectedCustomer(service)}
                >
                  <Avatar>
                    <AvatarImage
                      src={service.userData.img}
                      alt={`${service.userData.firstname} ${service.userData.lastname}`}
                    />
                    <AvatarFallback>
                      {service.userData.firstname[0]}{service.userData.lastname[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 hidden lg:block">
                    <p
                      className={cn(
                        "font-semibold",
                        selectedCustomer?.userData.userId ===
                          service.userData.userId && "text-white"
                      )}
                    >
                      {service.userData.firstname} {service.userData.lastname}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        selectedCustomer?.userData.userId ===
                          service.userData.userId && "text-white"
                      )}
                    >
                      {service.userData.email}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Message Box */}
      <div className="flex flex-col flex-grow bg-white p-6">
        {selectedCustomer ? (
          <>
            <h2 className="text-lg font-bold mb-4">
              Conversation with {selectedCustomer.userData.firstname}
            </h2>
            <ScrollArea className="flex-grow mb-4">
              <div className="space-y-4">
                {selectedCustomer.conversations.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 lg:max-w-[70%] rounded-lg ${
                      message.sender === "admin"
                        ? "bg-blue-100 self-end text-right"
                        : "bg-gray-100 self-start text-left"
                    }`}
                    style={{
                      alignSelf:
                        message.sender === "admin" ? "flex-end" : "flex-start",
                    }}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-start w-full space-x-2"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Type a message..."
                          className="p-2 border w-full"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg p-2"
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className='animate-spin' /> : <SendHorizonal />}
                </Button>
              </form>
            </Form>
          </>
        ) : (
          <p className="text-center text-gray-500">
            Select a customer to start a conversation.
          </p>
        )}
      </div>
    </div>
  );
}
