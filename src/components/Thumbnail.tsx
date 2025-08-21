import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { FileType } from '..';
import pdf from "@/app/assests/icons/file-pdf.svg"
import doc from "@/app/assests/icons/file-doc.svg"
import docx from "@/app/assests/icons/file-docx.svg"
import csv from "@/app/assests/icons/file-csv.svg"
import txt from "@/app/assests/icons/file-txt.svg"
import document from "@/app/assests/icons/file-document.svg"
import image from "@/app/assests/icons/file-image.svg"
import video from "@/app/assests/icons/file-video.svg"
import audio from "@/app/assests/icons/file-audio.svg"
import other  from "@/app/assests/icons/file-other.svg"

export const getFileIcon = (
  extension: string | undefined,
  type: FileType | string,
) => {
  switch (extension) {
    // Document
    case "pdf":
      return pdf;
    case "doc":
      return doc;
    case "docx":
      return docx;
    case "csv":
      return csv;
    case "txt":
      return txt;
    case "xls":
    case "xlsx":
      return document;
    // Image
    case "svg":
      return image;
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return video;
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return audio;

    default:
      switch (type) {
        case "image":
          return image;
        case "document":
          return document;
        case "video":
          return video;
        case "audio":
          return audio;
        default:
          return other;
      }
  }
};

const Thumbnail = ({type, extension, url, imageClassName, className}:{type:string,extension:string, url:string, imageClassName?:string, className?:string}) => {
    const isImage = type==="image" && extension!=="svg";
    console.log(type, isImage);
    
  return (
    
    <figure className={cn("flex-center size-[50px] min-w-[50px] overflow-hidden rounded-full bg-[#125ffa]/10 flex justify-center items-center", className)}>
        <Image src={isImage?url:getFileIcon(extension, type)} alt='Icon' height={100} width={100} className={cn('size-12 object-contain', isImage &&'size-full object-cover object-center')}></Image>

    </figure>
  )
}

export default Thumbnail