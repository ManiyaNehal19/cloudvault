// import { email } from "zod";
"use server";

import { Query, ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
const handleError = (error:unknown, message:string)=>{
    console.log(error, message);
    throw error;
    
}
export const sendEmailOTP =  async({email}:{email:string})=>{
    const {account} = await createAdminClient();

    try{
        console.log("email sent to sendemail otp is this:",email);
        
        const session = await account.createEmailToken(ID.unique(), email);
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
                "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
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
        handleError(error, "failed to verify OTP")
    }

}
