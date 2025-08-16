"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type AuthFormProps = "Login" | "Register"


const authFormSchema = (type: AuthFormProps) =>
  z.object({
    email: z.string().email("Please enter a valid email"),
    fullName:
      type === "Register"
        ? z.string().min(2, "Full name must be at least 2 characters")
        : z.string().optional(),
  })

function AuthForm({ type }: { type: AuthFormProps }) {
  const formSchema = authFormSchema(type)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          {type === "Login" ? "Login" : "Register"}
        </h1>

    
        {type === "Register" && (
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    className="shad-form-input focus:ring-1 focus:ring-[#125ffa]"
                  />
                </FormControl>
                <FormMessage className="text-red-500"/> 
              </FormItem>
            )}
          />
        )}

        {/* Email field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  className="shad-form-input focus:ring-1 focus:ring-[#125ffa]"
                />
              </FormControl>
              <FormMessage className="text-red-500" /> 
            </FormItem>
          )}
        />

        <Button
          className="bg-[#125ffa] text-white w-full"
          type="submit"
        >
          {type === "Login" ? "Login" : "Register"}
        </Button>

        <div className="text-sm flex justify-center">
          <p className="text-gray-500">
            {type === "Login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <Link
            href={type === "Login" ? "/register" : "/login"}
            className="ml-1 font-medium text-[#125ffa]"
          >
            {type === "Login" ? "Register" : "Login"}
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default AuthForm
