import React from "react";
import Image from "next/image";
import "../globals.css"; // Ensure global styles are imported
import Logo from "../assests/logo3.png"; // Adjust the import path as necessary
import Loginpage from "../assests/Loginpage.png";
export default function Layout({children}:{children:React.ReactNode}){

    return <div className="flex min-h-screen  ">
        <section className="bg-[rgb(18,95,250)] w-1/3 flex p-7 justify-around items-center flex-col ">
            <div className="flex ">
                <Image 
                src={Logo}
                width={100}
                height={100}
                alt="Logo"
                />
                <h1 className="text-white text-5xl">CloudVault</h1>
            </div>
            <div>
                <h2 className="h1 text-white">Manage your files in secure and efficient way.</h2>
                <p className="subtitle1 text-white">CloudVault is a secure and efficient cloud storage solution.</p>
            </div>
            <div>
                <Image
                src={Loginpage}
                width={300}
                height={300}
                alt="Login Page Illustration"
                
                
                />

            </div>
        </section>
        </div>
}