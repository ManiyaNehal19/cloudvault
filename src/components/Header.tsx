import Image from 'next/image'
import React from 'react'
import logout from "@/app/assests/logout.svg"
import Search from './ui/Search'
import FileUploader from './ui/FileUploader'
import { logoutUser } from '@/lib/actions/user.actions'
function Header() {
  return (
   
    <header className='hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10 bg-white'>
        <Search/>
        <div className='flex items-center  flex-center min-w-fit gap-4 '>
            <FileUploader/>
            <form action={async ()=>{
              "use server";
              await logoutUser();
            }}>
                 <button 
  type="submit"
  className="flex items-center justify-around gap-2 px-4 h-[52px] rounded-full bg-[#125ffa]/10 text-[#125ffa] transition-all hover:bg-[#125ffa]/20"
>
 
  <Image
    src={logout}
    width={50}
    height={50}
    alt="Logout"
    className="cursor-pointer mt-2 "
   
  />
</button>
            </form>
        </div>
   
    </header>
  )
}

export default Header