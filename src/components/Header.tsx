import Image from 'next/image'
import React from 'react'
import logout from "@/app/assests/logout.svg"
import Search from './ui/Search'
import FileUploader from './ui/FileUploader'
function Header() {
  return (
   
    <header className='hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10'>
        <Search/>
        <div className='flex-center min-w-fit gap-4 '>
            <FileUploader/>
            <form action="">
                <button 
                type='submit'
                className='flex-center h-[52px] min-w-[54px] items-center rounded-full bg-[#125ffa]/10 p-0 text-[#125ffa] shadow-none transition-all hover:bg-[#125ffa]/20'>
                    <Image
                    src={logout}
                    width={24}
                    height={24}
                    className='w-6'
                    alt='Logout'/>
                  
                </button>
            </form>
        </div>
   
    </header>
  )
}

export default Header