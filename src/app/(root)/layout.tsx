import React from 'react'
import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'
import SideBar from '@/components/SideBar'
import "@/app/globals.css"
import { getcurrUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Toaster } from "@/components/ui/sonner"
export const dynamic = "force-dynamic";
async function Layout({ children }: { children: React.ReactNode }) {
 const currentUser = await getcurrUser();
  if (!currentUser) {
    redirect("/login");
  }
  // console.log("Current User i the layout",currentUser);
  
  return (
    <main className="flex h-screen">
      <SideBar 
        {...currentUser}
      />
      <section className="flex h-full flex-1 flex-col">
        <MobileNav {...currentUser} />
        <Header ownerID={currentUser.$id} accID={currentUser.accID}/>
        <div className="remove-scrollbar h-full flex-1 overflow-auto bg-light-400 px-5 py-7 sm:mr-7 sm:rounded-[30px] md:mb-7 md:px-9 md:py-10">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  )
}

export default Layout
