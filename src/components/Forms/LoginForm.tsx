'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    setLoading(true)
    console.log(values)

    // Simulate a 2 second delay
    const user = await signIn('credentials', {
      email: values.email,
      password: values.password
    })

    if(user?.error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive'
      })
    }

    setLoading(false)
  }

  return (
    <main className="flex justify-center items-center p-4 min-h-[calc(100vh-94px)] sm:min-h-[calc(100vh-90px)]">
      <Card className="rounded-none border-none">
        <CardContent className="px-0 py-0">
          <div className="flex flex-col sm:flex-row bg-white overflow-hidden shadow-xl max-w-4xl w-full">
            <div className="w-full sm:w-96 bg-[#373b40] border-r-4 border-orange-500 p-8 flex flex-col justify-center items-center">
              <Image src="/Logo.png" alt="Logo" width={250} height={100} />
            </div>
            <div className="w-full sm:w-96 px-14 py-16">
              <h1 className="text-xl sm:text-2xl font-bold hidden sm:block text-center">WELCOME</h1>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 text-center">
                LOGIN TO ADMIN DASHBOARD
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <FormControl>
                          <Input
                            id='email'
                            type="email"
                            className="w-full"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormControl>
                          <Input
                            id='password'
                            type="password"
                            className="w-full"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button 
                    type='submit' 
                    className="text-sm px-6 self-center rounded-full w-fit bg-zinc-900 text-white hover:bg-gray-700"
                    disabled={loading}
                  >
                    LOGIN
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
