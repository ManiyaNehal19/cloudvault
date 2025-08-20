"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Logo1 from "@/app/assests/logo5.png";
import LoginPage from  "@/app/assests/Loginpage.png"
import { avatarUSer, navItems } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
interface Props {
  fullName: string,
  avatar:string,
  email: string
}
function SideBar({fullName, avatar, email}:Props) {
    console.log("Side BAr Info",fullName, avatar, email);
    
    const pathname = usePathname();
  return (
    <aside className=" bg-white remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px]">
       <Link  href={"/"} >
       <div className='hidden  h-auto lg:block'>

       <div className=" flex items-center">
                 
                <Image 
                src={Logo1}
                width={50}
                height={50}
                alt="Logo"
                />
                <h1 className="text-[#125ffa] text-3xl ml-2 font-semibold">CloudVault</h1>
                

            </div>
       </div>

       </Link> 
       <Link  href={"/"}>
       <div className=' h-auto lg:hidden'>

      
                 
                <Image 
                src={Logo1}
                width={50}
                height={50}
                alt="Logo"
                />
                
       </div></Link>
       <nav className='h5 mt-9 flex-1 gap-1 text-[#125ffa]'>
        <ul className='flex flex-1 flex-col gap-6'>
            {navItems.map(({href, name, icon})=>
              (
                <Link key={name} href={href} className='lg:w-full'>
                    <li className={cn('flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full text-gray-600 ',(pathname===href )&&' bg-[#125ffa] text-white shadow-drop-2')}>
                        <Image className={cn(' invert-0 opacity-100   ',(pathname===href )&&'w-6 filter invert ')} src={icon} alt={name} height={24} width={24}/>
                        <p  className={cn('text-black hidden lg:block ',(pathname===href )&&' text-white hidden lg:block')}>{name}</p>

                    </li>
                </Link>

            ))}

        </ul>
       </nav>
       {/* <Image alt='Login Page file' height={170} width={170} src={LoginPage}></Image> */}
      <div className='mt-4 flex items-center justify-center gap-2 rounded-full bg-[#125ffa]/10 p-1 text-light-100 lg:justify-start lg:p-3'>
      
      <Image src={avatar} alt='Avatar' width={30} height={30} />
      <div className='hidden lg:block'>
        <p className='text-[14px] leading-[20px] font-semibold'>{fullName}</p>
        <p className='text-[12px] leading-[16px] font-normal'>{email}</p>
      </div>
      </div>
    </aside>
  )
}

export default SideBar