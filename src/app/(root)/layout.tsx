import React from 'react'
import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'
import SideBar from '@/components/SideBar'
import "@/app/globals.css"
import { getcurrUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Toaster } from "@/components/ui/sonner"

async function Layout({ children }: { children: React.ReactNode }) {
 const currentUser = await getcurrUser();
  if (!currentUser) {
    redirect("/login");
  }

  return (
    <main className="flex h-screen">
      <SideBar 
        {...currentUser.value}
      />
      <section className="flex h-full flex-1 flex-col">
        <MobileNav {...currentUser.value} />
        <Header ownerID={currentUser.value.$id} accID={currentUser.value.accID}/>
        <div className="remove-scrollbar h-full flex-1 overflow-auto bg-light-400 px-5 py-7 sm:mr-7 sm:rounded-[30px] md:mb-7 md:px-9 md:py-10">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  )
}

export default Layout
