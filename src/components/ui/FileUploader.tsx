"use client"
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'
import UploadBtn from '@/app/assests/upload-arrow-svgrepo-com.svg'
import FileLoader from '@/app/assests/icons/file-loader.gif'
import Thumbnail from '../Thumbnail'
import RemoveSVg from '@/app/assests/icons/remove.svg'
import { MAX_FILE_SIZE } from '@/constants'
import { toast } from "sonner"
import { usePathname } from 'next/navigation'
 import { UploadFile } from '@/lib/actions/file.action'

interface Props{
  ownerID:string,
  accID:string,
  className?:string
}

function FileUploader({ownerID,accID, className }:Props) {
  console.log("ownerid and accID",ownerID, accID);
  
  const [files, setFiles] = useState<File[]>([])
  const path = usePathname();
  
  const handleRemove = (
    e: React.MouseEvent<HTMLImageElement>, 
    filename: string
  ) => {
    e.stopPropagation();
    setFiles(prevFile => prevFile.filter(file => file.name !== filename))
  }
  
const onDrop = useCallback(async (acceptedFiles: File[]) => {
  setFiles(acceptedFiles)

  const uploadPromises = acceptedFiles.map(async (file) => {
    if (file.size > MAX_FILE_SIZE) {
      setFiles((prevFile) => (
        prevFile.filter((f) => (f.name !== file.name))
      ))

      toast(
        <div className="w-full h-full flex items-center justify-between bg-red-700 p-4 rounded">
          <p className="text-[14px] leading-[20px] font-normal text-white">
            <span className="font-semibold">{file.name}</span> is too large. Max file size is 50MB
          </p>
        </div>,
        {
          style: {
            padding: 0,
            background: "transparent",
          },
        }
      );
    }

    return UploadFile({ file: file, ownerId: ownerID, accountId: accID, path: path })
      .then((uploadedFile) => {
        if (uploadedFile) {
          setFiles((prevFile) => prevFile.filter(f => f.name !== file.name));
        }
      });
  }); // ← this .map(...) call was missing its closing parenthesis!
    await Promise.all(uploadPromises)
}, [ownerID, accID, path]);

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div className="relative">
      <div {...getRootProps()} className='cursor-pointer'>
        <input {...getInputProps()} />
        <button
  type="button"
  className={cn(
    "flex items-center cursor-pointer justify-center gap-2 h-[52px] px-6 rounded-full bg-[#125ffa]/80 text-white font-medium shadow-md hover:bg-[#0f4bcc] transition-colors",
    className
  )}
>
  <Image className='filter invert' src={UploadBtn} alt="Upload" height={20} width={20} />
  <span>Upload</span>
</button>

      </div>
      
      {files.length > 0 && (
        <div className='fixed bottom-10 right-10 z-50 w-full max-w-[480px] rounded-[20px] bg-[#125ffa]/10 p-7 shadow-drop-3'>
          <h4 className='text-light-100 text-[18px] leading-[20px] font-medium mb-4'>Uploading</h4>
          
          <ul className='flex flex-col gap-3'>
            {files.map((file, index) => {
              const {type, extension} = getFileType(file.name);
              return (
                <li key={`${file.name}-${index}`} className='flex items-center justify-between gap-3 rounded-xl p-3 shadow-drop-3 bg-gray-50'>
                  <div className='flex items-center gap-3 flex-1'>
                    <Thumbnail 
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file)}
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='subtitle-2 line-clamp-1 max-w-[200px] truncate'>{file.name}</p>
                    </div>
                  </div>
                  
                  {/* Right side container for loader and remove button */}
                  <div className='flex items-center gap-2 flex-shrink-0'>
                    <Image 
                      src={FileLoader} 
                      alt='file loader gif' 
                      width={40} 
                      height={30}
                      className='object-contain'
                    />
                    <Image 
                      src={RemoveSVg}
                      height={24}
                      width={24}
                      alt='Remove'
                      className='cursor-pointer hover:opacity-70 transition-opacity'
                      onClick={(e) => handleRemove(e, file.name)}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FileUploader