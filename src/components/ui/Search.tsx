"use client";

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import search from "@/app/assests/icons/search.svg"
import { Input } from './input'
import { usePathname, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { GetFile } from '@/lib/actions/file.action';
import { StoredFile } from '@/index';
import Thumbnail from '../Thumbnail';
import FormattedDateTime from '../FormattedDateTime';
import { useRouter } from 'next/navigation';
function Search() {

  const router = useRouter();
  const [query, setQuery] = useState("");
  const searchParam = useSearchParams();
  const [result, setresult] = useState<StoredFile[]>([]);
    const [debouncedQuery] = useDebounce(query, 300);
  const currPath = usePathname();
  const [open, setopen] = useState(false);
  const searchQuery = searchParam.get("query")||"";
  useEffect(()=>{
    if(!searchQuery){
      setQuery("");

    }
  },[searchQuery])
  const handleClickItem = (file:StoredFile)=>{
    setopen(false);
    setresult([]);
    router.push(`/${(file.type==='video'||file.type==='audio')?'media':file.type + 's'}?query=${query}`)
    

  }
  useEffect(()=>{
    const fetchFiles = async ()=>{
      if(debouncedQuery.length===0){
        setresult([]);
        setopen(false)
        return router.push(currPath.replace(searchParam.toString(),""))
      }
      
      const files = await GetFile({types:[],searchText:debouncedQuery});
      setresult(files.value.files.documents);
      setopen(true);
    };
    fetchFiles();
  },[debouncedQuery])
  return (
    <div className='bg-[#125ffa]/10 rounded-full w-full relative  md:max-w-[480px] '>
      <div className=' flex h-[52px] flex-1 items-center gap-3 rounded-full px-4 shadow-drop-3'>
        <Image src={search} alt='search icon' height={20} width={20}/>
        <Input value={query} placeholder='Search...' className=' text-[14px] leading-[20px] font-normal outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0   placeholder:text-[16px] placeholder:leading-[24px] placeholder:font-normal w-full border-none p-0 shadow-none placeholder:text-light-200 '
        onChange={(e)=>setQuery(e.target.value)}
        />
        {open && (
          <ul className='absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 '>
            {result.length>0
            
            ?
            result.map((file)=><li
            onClick={()=>handleClickItem(file)}
            className='flex items-center justify-between' key={file.$id}><div className='flex cursor-pointer items-center gap-4'>
              <Thumbnail type={file.type} extension={file.extension} url={file.url} className='size-9 min-w-9'/>
              <p className='text-[14px] leading-[20px] font-semibold line-clamp-1 text-light-100'>

              {file.name}
              </p>
              </div>
              <FormattedDateTime date = {file.$createdAt} className=' text-[12px] leading-[16px] font-normal line-clamp-1 text-light-200'/>
              </li>)
            :<p>No results found</p>}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Search