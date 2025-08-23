// import { email } from "zod";
"use server";

import { Query, ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";
const handleError = (error:unknown, message:string)=>{
    console.log(error, message);
    throw error;
    
}
export const sendEmailOTP =  async({email}:{email:string})=>{
    const {account} = await createAdminClient();
    try{
        const session = await account.createEmailToken(ID.unique(), email);
        // console.log("email sent to sendemail otp is this:",email, session, session.userId);
        return session.userId;
    }catch(error){
        handleError(error, "Failed to send email OTP");
    }
}
const getUserbyEmail = async (email:string)=>{
    const {database} = await createAdminClient();
    const result = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", email)]
        
    )
    if(result.total>0){
        return result.documents[0];
    }else{
        return null;
    }
}
export const createAccount = async ({
    email,
    fullName,
}:{
    email: string;
    fullName: string;
}) =>{
    const existingUser = await getUserbyEmail(email);

    const accID = await sendEmailOTP({email})
    if(!accID){
        throw new Error("Failed to send OTP");
    }
    if(!existingUser){
        const {database} = await createAdminClient();
        await database.createDocument(
            //database id
            appwriteConfig.databaseId,
            //which database
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                email,
                fullName,
                avatar: 
                "https://www.svgrepo.com/show/213788/avatar-user.svg",
                accID,
            
            }
        )
    }
    console.log("accId in createAcc:", accID);
    
    return  parseStringify({ value: { accID } });
}
export const verfiySecret = async({accID, password}:{accID:string, password:string})=>{
    try{
    const {account} = await createAdminClient();
   
    const session = await account.createSession(accID, password);
    
    (await cookies()).set('appwrite-session', session.secret,{
        path:"/",
        httpOnly:true,
        sameSite:"strict",
        secure:true
    });
    return parseStringify({ value: { sessionId: session.$id } });


    }catch(error){
        console.log(error);
        return null;
    //     return (toast(
    //     <div className="w-full h-full flex items-center justify-between bg-red-700 p-4 rounded">
    //       <p className="text-[14px] leading-[20px] font-normal text-white">
    //         {error}
    //       </p>
    //     </div>,
    //     {
    //       style: {
    //         padding: 0,
    //         background: "transparent",
    //       },
    //     }
    //   );
    // )
        // handleError(error, "failed to verify OTP")
    }

}
export const getcurrUser = async () => {
      try {
    const { database, account } = await createSessionClient();

    const result = await account.get();

    const user = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("accID", result.$id)]
    );

    if (user.total <= 0) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};


export async function logoutUser() {
    const {account} = await createSessionClient();
    try {
        await account.deleteSession('current');
        (await cookies()).delete("appwrite-session")
    }catch(error){
        handleError(error, "Failed to signout user")
    }finally{
        redirect("/login")
    } 
}



export const LoginUser = async ({email}:{email:string})=>{
    try {
        const existingUser = await getUserbyEmail(email);
        if(existingUser){
            await sendEmailOTP({email});  
            console.log("Login User Id in function:",existingUser.accID);
              
            return parseStringify({ value: {accID: existingUser.accID } })
        }
        
    return parseStringify({ accountId: null, error: "User not found" });
    } catch (error) {
        console.log(error)

    }
}

// export const LoginUser = async ({ email }: { email: string }) => {
//   try {
//     const existingUser = await getUserbyEmail(email);
    
//     if (existingUser) {
//       // ADD AWAIT HERE - this was missing!
//       const accID = await sendEmailOTP({ email });
      
//       if (!accID) {
//         throw new Error("Failed to send login OTP");
//       }
      
//       console.log("Login User Id in function:", existingUser.accID);
//       console.log("New session accID:", accID);
      
//       return parseStringify({ 
//         value: { accID } // Use the NEW accID from sendEmailOTP
//       });
//     } else {
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     console.log("LoginUser error:", error);
//     handleError(error, "Failed to login user");
//   }
// };