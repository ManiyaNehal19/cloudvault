"use client"
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from 'next/navigation'
import { sortTypes } from '@/constants'
const Sort = () => {
  const router = useRouter();
  const exitingPath = usePathname();
  const handleSort = (value:string)=>{
    router.push(`${exitingPath}?.sort=${value}`)
  }
  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[0].value}>
  <SelectTrigger className="outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0  h-11 w-full rounded-[8px] border-transparent bg-white !shadow-sm sm:w-[210px]">
    <SelectValue placeholder={sortTypes[0].value} />
  </SelectTrigger>
  <SelectContent className='!shadow-drop-3 
  border-none bg-white'>
    {sortTypes.map(type=>(
      <SelectItem key={type.label}
      className=' cursor-pointer hover:bg-[#125ffa]/10 '
      value={type.value}>
        {type.label}
      </SelectItem>
    ))}
    
  </SelectContent>
</Select>
  )
}

export default Sort