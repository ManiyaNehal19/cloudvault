"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { createAccount, LoginUser } from "@/lib/actions/user.actions"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import OtpModal from "./otp-modal"

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
  const [accID, setaccID] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let user;
      if(type==="Register"){
        user = await createAccount({
        
        email: values.email,
        fullName: values.fullName || "",
        })
        // console.log("User acc id register:",user.accID);
        setaccID(user.value.accID)
        // console.log(typeof(user.value.accID), "Id type in register");

      }else{
        user = await LoginUser({email:values.email})
        console.log("User in login User", user);
        
        // console.log("User acc id login:",user.value.accID);
        
        // console.log("User acc id login2:",user.accID);
        // console.log(typeof(user.value.accID));
        setaccID(user.value.accID)
      }
      
    } catch (error) {
      console.error("Error creating account:", error)
    }
  }

  // 👇 Now the JSX return is at the component level, not inside onSubmit
  return (
    <>
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
                <FormMessage className="text-red-500" />
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

        <Button className="bg-[#125ffa] hover:bg-[#1454d4] cursor-pointer text-white w-full" type="submit">
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
    {console.log("accID before modal open", accID)}
    
    {accID && (<OtpModal email={form.getValues("email")} accountID={accID}/>)}
   
    
    </>
  )
}

export default AuthForm
