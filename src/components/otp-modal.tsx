"use client"
import React, { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from 'next/image'
import { Button } from './ui/button'
import CancelButton from '@/app/assests/closeButton.svg'
import { verfiySecret, sendEmailOTP } from '@/lib/actions/user.actions'

import { useRouter } from 'next/navigation'
function OtpModal({ email, accountID }: { email: string, accountID: string | null }) {
    const router = useRouter();
  const [isOpen, setopen] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [otp, setOtp] = React.useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
       const sessionId = await verfiySecret({
      accID: accountID as string, // rename to match expected param
      password: otp,              // otp acts as password here
    });
    if(sessionId) router.push("/");
    else{
      
        toast(
        <div className="w-full h-full flex items-center justify-between bg-red-700 p-4 rounded">
          <p className="text-[14px] leading-[20px] font-normal text-white">
            Incorrect OTP
          </p>
        </div>,
        {
          style: {
            padding: 0,
            background: "transparent",
          },
        }
      )
    
      
    }

    } catch (error) {
      toast(
        <div className="w-full h-full flex items-center justify-between bg-red-700 p-4 rounded">
          <p className="text-[14px] leading-[20px] font-normal text-white">
           Error submitting OTP</p>
        </div>,
        {
          style: {
            padding: 0,
            background: "transparent",
          },
        }
   
      )
        // handleError(error, "failed to verify OTP")
      // console.error("Error submitting OTP:", error);
    }
    setLoading(false);
  }

  const resendOtp = async () => {
    await sendEmailOTP({email});
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setopen}>
      <AlertDialogContent className="sad-alert-dialog flex flex-col items-center justify-center gap-6">
        <AlertDialogCancel 
  className="absolute top-4 right-4 p-0 m-0 border-none shadow-none outline-none focus:outline-none focus:ring-0"
>
  <Image
    src={CancelButton}
    height={20}
    width={20}
    alt="close button"
    className="pointer-events-none select-none"
  />
</AlertDialogCancel>

        <AlertDialogHeader className="text-center">
          <AlertDialogTitle className="text-[24px] leading-[36px] font-bold">Enter OTP</AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] leading-[20px] font-semibold text-gray-800">
            We&apos;ve sent a code to <span className="pl-1">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* OTP Centered */}
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="flex ">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="ring-[#125ffa] "
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Buttons stacked */}
        <AlertDialogFooter className='w-full flex flex-col  ' >
          
            <AlertDialogAction
            className="bg-[#125ffa] hover:bg-[#1454d4] cursor-pointer text-white font-normal rounded-lg w-full "
            onClick={handleSubmit}
          >
            Continue
          </AlertDialogAction>
            
             
          
          
    
        </AlertDialogFooter>
        <div className='w-full text-center'>
                Didn&apos;t get a code?
                <Button type="button" variant="link" className= "pl-1 text-[#125ffa]" onClick={resendOtp} >Click to Resend</Button>
            </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default OtpModal
