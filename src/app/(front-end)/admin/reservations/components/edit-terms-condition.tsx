"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { TermsConditions } from "@/lib/firebase/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  termsConditionSchema,
  TermsConditions as TermsConditonSchema,
} from "../data/schema";
import { ToastAction } from "@/components/ui/toast";
import { dateToday } from "@/lib/utils";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { _editDoc } from '@/lib/firebase/service';

type Props = {
  data: TermsConditions | undefined;
};

export default function EditTermsAndConditions({ data }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [policy, setPolicy] = React.useState<TermsConditions | undefined>(data);
  const router = useRouter();
  const { toast } = useToast();

  const lastItemRef = useRef<HTMLDivElement | null>(null); // Ref for the last item

  const form = useForm<TermsConditonSchema>({
    resolver: zodResolver(termsConditionSchema),
    defaultValues: {
      id: data?.id ?? "", // Ensure id has a default empty string if undefined
      items: data?.items ?? [], // Ensure items is an empty array if undefined
    },
  });

  React.useEffect(() => {
    if (!open) {
      setPolicy(data);
    }
  }, [open, data]);

  const append = () => {
    if (policy) {
      const newItem = { title: "", body: "" }; // Create a new item with default values
      setPolicy((prev) => ({
        ...prev,
        items: [...(prev?.items || []), newItem],
      } as TermsConditions));

      // Scroll to the new item after state updates
      setTimeout(() => lastItemRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
    }
  };

  const remove = (index: number) => {
    if (policy) {
      setPolicy((prev) => ({
        ...prev,
        items: prev?.items.filter((_, i) => i !== index),
      } as TermsConditions));
    }
  };

  const onSubmit = async (values: TermsConditonSchema) => {
    setIsLoading(true);

    // Handle your submission logic here
    await _editDoc("terms_and_conditions", values.id, {
      id: values.id,
      items: policy?.items
    })
    toast({
      title: "Updated!",
      description: "timestamp: " + dateToday(new Date()),
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
    setOpen(false);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-[#558134]" disabled={isLoading}>
          Edit Terms & Condition
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Terms and Conditions</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <ScrollArea className="h-auto max-h-[448px] pr-4">
              {policy &&
                policy.items.map((item, index) => (
                  <Card
                    key={index}
                    ref={index === policy.items.length - 1 ? lastItemRef : null} // Set ref on the last item
                    className="mb-3"
                  >
                    <CardContent className="p-2 flex flex-col gap-2">
                      <FormItem>
                        <FormControl>
                          <Input
                            value={item.title}
                            onChange={(e) => {
                              const temp = policy?.items;
                              if (temp) {
                                temp[index].title = e.target.value;
                                setPolicy({ ...policy, items: temp });
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <Textarea
                            value={item.body}
                            rows={4}
                            onChange={(e) => {
                              const temp = policy?.items;
                              if (temp) {
                                temp[index].body = e.target.value;
                                setPolicy({ ...policy, items: temp });
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                      <p
                        className="text-sm cursor-pointer w-fit hover:underline"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </ScrollArea>
            <Button type="button" onClick={append}>
              Add New
            </Button>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}