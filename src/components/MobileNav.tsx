"use client"
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Logo1 from "@/app/assests/logo5.png";
import { usePathname } from 'next/navigation';
import logout from "@/app/assests/logout.svg";
import MobileNavIcon from '@/app/assests/hamburger-menu-mobile-svgrepo-com.svg'
import { avatarUSer, navItems } from '@/constants';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import FileUploader from './ui/FileUploader';
import { logoutUser } from '@/lib/actions/user.actions';
interface Props{
  userID:string,
  fullName:string,
  avatar:string,
  email:string,
  accID:string
}
function MobileNav({userID, fullName, avatar, email, accID}:Props) {
  const [open, setopen] = useState(false);
  const pathname = usePathname();
  return (
    <header className='flex bg-white h-[60px] justify-between px-5 sm:hidden'>
    <Image 
    src={Logo1}
    width={50}
    height={50}
    alt="Logo"
    />
    <Sheet open={open} onOpenChange={setopen}>
  <SheetTrigger><Image src={MobileNavIcon} alt='Mobile Nav Icon' height={30} width={30}></Image></SheetTrigger>
  <SheetContent className='pt-0 h-screen px-3'>
    <SheetHeader>
      <SheetTitle><div className='my-3 flex items-center gap-2 rounded-full p-1 text-light-100 sm:justify-center sm:bg-[#125ffa]/10 lg:justify-start lg:p-3'>
      <Image src={avatar} alt='Avatar' height={30} width={30} className='aspect-square w-10 rounded-full object-cover'></Image>
      <div className='sm:hidden lg:block'>
        <p className='capitalize text-[14px] leading-[20px] font-semibold'>{fullName}</p>
        <p className=' text-[12px] leading-[16px] font-normal'>{email}</p>
      </div>

      </div>
      
      </SheetTitle>
      <nav className='h5 flex-1 gap-1 text-[#125ffa] '>
        <ul className='flex flex-1 flex-col gap-4'>
          {navItems.map(({href, name, icon})=>
              (
                <Link key={name} href={href} className='lg:w-full'>
                    <li className={cn('flex text-light-100 gap-4 w-full justify-start items-center h5 px-6 h-[52px] rounded-full',(pathname===href )&&' bg-[#125ffa] text-white shadow-drop-2')}>
                        <Image className={cn(' invert-0 opacity-100   ',(pathname===href )&&'w-6 filter invert ')} src={icon} alt={name} height={24} width={24}/>
                        <p  className={cn('text-black lg:block ',(pathname===href )&&' text-white  lg:block')}>{name}</p>

                    </li>
                </Link>

            ))}

        </ul>

      </nav>
      <Separator className="mb-4 bg-light-200/20"/>
      <div className='flex flex-col justify-between gap-5 pb-5'>
        <button 
  type="submit"
  className="flex items-center justify-around gap-2 px-4 h-[52px] rounded-full bg-[#125ffa]/10 text-[#125ffa] transition-all hover:bg-[#125ffa]/20"
>
 <FileUploader/>
  <Image
    src={logout}
    width={50}
    height={50}
    alt="Logout"
    className="cursor-pointer mt-2 "
    
    onClick={async () => {await logoutUser()}}
  />
</button>
      </div>
       
    </SheetHeader>
  </SheetContent>
</Sheet>
    </header>
  )
}

export default MobileNav