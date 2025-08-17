import React from 'react'

function Layout({children}:{children:React.ReactNode}) {
  return (
    <main className='flex h-screen'>
        SideBar
        <section className='flex h-full flex-1 flex-col'>
            Mobile Navigation 
            Header
            <div className='main-content'>{children}</div>
        </section>
    </main>
  )
}

export default Layout