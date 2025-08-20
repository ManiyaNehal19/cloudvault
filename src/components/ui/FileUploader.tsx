"use client"
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'
import UploadBtn from '@/app/assests/upload-arrow-svgrepo-com.svg'
import FileLoader from '@/app/assests/icons/file-loader.gif'
import Thumbnail from '../Thumbnail'
import RemoveSVg from '@/app/assests/icons/remove.svg'

interface Props{
  ownerID:string,
  accID:string,
  className?:string
}

function FileUploader({ownerID,accID, className }:Props) {
  const [files, setFiles] = useState<File[]>([])
  
  const handleRemove = (
    e: React.MouseEvent<HTMLImageElement>, 
    filename: string
  ) => {
    e.stopPropagation();
    setFiles(prevFile => prevFile.filter(file => file.name !== filename))
  }
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    setFiles(acceptedFiles)
  }, [])
  
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="relative">
      <div {...getRootProps()} className='cursor-pointer'>
        <input {...getInputProps()} />
        <button type="button" className={cn("primary-btn h-[52px] gap-2 px-10 shadow-drop-1", className)}>
          <Image src={UploadBtn} alt="Upload" height={24} width={24}/>{" "}
          <p>Upload</p>
        </button>
      </div>
      
      {files.length > 0 && (
        <div className='fixed bottom-10 right-10 z-50 w-full max-w-[480px] rounded-[20px] bg-white p-7 shadow-drop-3'>
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