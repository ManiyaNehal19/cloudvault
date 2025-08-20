import React from 'react'
import Image from 'next/image'
import { cn, getFileIcon } from '@/lib/utils';
const Thumbnail = ({type, extension, url, imageClassName, className}:{type:string,extension:string, url:string, imageClassName?:string, className?:string}) => {
    const isImage = type==="image" && extension!=="svg";
  return (
    <figure className={cn("flex-center size-[50px] min-w-[50px] overflow-hidden rounded-full bg-[#125ffa]/10", className)}>
        <Image src={isImage?url:getFileIcon(extension, type)} alt='Icon' height={100} width={100} className={cn('size-8 object-contain', imageClassName, isImage &&'size-full object-cover object-center')}></Image>

    </figure>
  )
}

export default Thumbnail