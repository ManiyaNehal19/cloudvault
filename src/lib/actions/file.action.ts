"use server"
const handleError = (error:unknown, message:string)=>{
    console.log(error, message);
    throw error;
    
}
import { InputFile } from "node-appwrite/file";
import { createAdminClient, createSessionClient } from "../appwrite"
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";
import { getcurrUser } from "./user.actions";
import { UploadFileProps, RenameFileProps, DeleteFileProps, UpdateFileUsersProps, GetFilesProps, FileType, StoredFile } from "@/index";
type UserType = {
fullName: string,
  email: string,
  avatar: string,
  accID: string,
  '$id': string,
  '$sequence': number,
  '$createdAt': Date,
  '$updatedAt': Date,
  '$permissions': [],
  files: [],
  '$databaseId': string,
  '$collectionId': string
}
const createQueries =  (currUser:UserType, types:string[], searchText:string, sort:string, limit?:number)=>{
    
    const queries = [
        Query.or([
            Query.equal("owner", [currUser.$id]),
            Query.contains("users", [currUser.email])
        ])
    ];
    if(types.length>0){
      queries.push(Query.equal('type', types))
    }
    if(searchText){
      queries.push(Query.contains('name', searchText))
    }
    if(limit){
      queries.push(Query.limit(limit))
    }
    if(sort){

      const [sortBy, orderBy] = sort.split('-');
      queries.push(orderBy==='asc'?Query.orderAsc(sortBy):Query.orderDesc(sortBy));
    }
    return queries;
}
export const UploadFile = async ({ file,
  ownerId,
  accountId,
  path}:UploadFileProps)=>{
// console.log("Upload FIle function: ",ownerId, accountId);


const {storage, database}= await createAdminClient()
try {
    const inputFile = InputFile.fromBuffer(file, file.name);
    const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile);
    const fileDocument = {
  type: getFileType(bucketFile.name).type,
  name: bucketFile.name,
  url: constructFileUrl(bucketFile.$id),
  extension: getFileType(bucketFile.name).extension,
  size: bucketFile.sizeOriginal,
  owner: ownerId,
  accID: accountId, 
  users: [],
  bucketFileId: bucketFile.$id
}
    const newFile = await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument,
    )
    .catch(async(error)=>{
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to create file document");
    })
    revalidatePath(path);
    return parseStringify({value:{newFile}})
} catch (error) {
    handleError(error, "Failed to upload fie")
}
}
export const GetFile = async ({types = [], searchText='', sort = '$createdAt-desc', limit}:GetFilesProps)=>{
    const {database} = await createAdminClient()
    try {
        const currUser = await getcurrUser();
        if(!currUser) throw new Error("No user found")
        const queries = createQueries(currUser.value, types, searchText, sort,limit);
        // console.log("type of user", typeof(currUser.value),"User Data", currUser.value);
        const files = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            queries,
        )
        return parseStringify({value:{files}})
    } catch (error) {
        handleError(error, "failed to get file")
    }
}
export const renameFile = async ({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) => {
  const { database } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        name: newName,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};
export const deleteFile = async ({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) => {
  const { database, storage } = await createAdminClient();

  try {
    const deletedFile = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
    );

    if (deletedFile) {
      await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);
    }

    revalidatePath(path);
    return parseStringify({ status: "success" });
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};
export const updateFileUsers = async ({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) => {
  const { database } = await createAdminClient();

  try {
    const updatedFile = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        users: emails,
      },
    );

    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};
export const GetTotalSpace = async () => {
  try {
    const sessionClient = await createSessionClient();
    if (!sessionClient) {
      return null; // No session available
    }
    
    const { database } = sessionClient;
    const CurrUser = await getcurrUser();
    
    if (!CurrUser) {
      return null; // No current user
    }
    
    const files = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("owner", [CurrUser.value.$id])] // Note: added .value here
    );
    
    const TotalSpace = {
      image: { size: 0, date: "" },
      document: { size: 0, date: "" },
      video: { size: 0, date: "" },
      audio: { size: 0, date: "" },
      other: { size: 0, date: "" },
      used: 0,
      all: 2 * 1024 * 1024 * 1024
    };
    
    files.documents.forEach((file) => {
      const fileType = file.type as FileType;
      TotalSpace[fileType].size += file.size;
      TotalSpace.used += file.size;

      if (
        !TotalSpace[fileType].date ||
        new Date(file.$updatedAt) > new Date(TotalSpace[fileType].date)
      ) {
        TotalSpace[fileType].date = file.$updatedAt;
      }
    });
    
    return parseStringify({ value: { TotalSpace } });
    
  } catch (error) {
    handleError(error, "Error calculating Total space");
    return null; // Return null on error
  }
};