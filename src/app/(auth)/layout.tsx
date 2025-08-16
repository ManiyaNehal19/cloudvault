import React from "react";
import Image from "next/image";
import "../globals.css"; // Ensure global styles are imported
import Logo from "../assests/logo3.png"; // Adjust the import path as necessary
import Logo1 from "../assests/logo5.png"; // Adjust the import path as necessary
import Loginpage from "../assests/Loginpage.png";
export default function Layout({children}:{children:React.ReactNode}){
   
    return <div className="flex min-h-screen  ">
        <section className="p-10 bg-[#125ffa] hidden w-1/3 justify-center items-center lg:flex xl:w-2/5 ">
            <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12" >
                <div className="flex items-center ">
                    <Image 
                src={Logo}
                width={80}
                height={80}
                alt="Logo"
                />
                <h1 className="text-white text-4xl">CloudVault</h1>
                </div>
                
            <div className="text-white">
                <h2 className="h1 mb-1">Manage your files in efficient way.</h2>
                <p className="body-1">CloudVault is a secure and efficient cloud storage solution.</p>
            </div>
            <div>
                <Image
                src={Loginpage}
                width={300}
                height={300}
                alt="Login Page Illustration"
                className="transform transition-transform duration-500 hover:scale-105 hover:rotate-3 "
                
                
                />

            </div>
            </div>
        </section>
        <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0 ">
            <div className="mb-16 lg:hidden flex items-center justify-center ">
                 
                    <Image 
                src={Logo1}
                width={80}
                height={80}
                alt="Logo"
                />
                <h1 className=" text-[#125ffa]  text-4xl text-extrabold">CloudVault</h1>
                

            </div>
            <div className="w-2/4">{children}</div>
            
        </section>
        </div>
}