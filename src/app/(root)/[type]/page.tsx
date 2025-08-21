import Sort from '@/components/Sort';
import { GetFile } from '@/lib/actions/file.action';
import { Section } from 'lucide-react';
import React from 'react'
import { Models } from 'node-appwrite';
import { StoredFile, SearchParamProps, FileType } from '@/index';
import Card from '@/components/Card';
import { string } from 'zod';
import { getFileType, getFileTypesParams } from '@/lib/utils';

const  Page = async ({searchParams,params}: SearchParamProps) => {
    const type = ((await params)?.type as string) ||"";
    const searchText = ((await searchParams)?.query) as string || "";
    const sort = ((await searchParams)?.sort) as string || "";

    const total_size = "0MB";
    const types = getFileTypesParams(type) as FileType[] ;
    const files = await GetFile({types, searchText, sort});
    console.log(files.value.files.documents);
    

  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col items-center gap-8'> 
    <section className='w-full'>
        <h1 className=' text-center text-light-100 md:text-left  capitalize'>{type}</h1>
        <div className='flex mt-2 flex-col justify-between sm:flex-row sm:items-center'>
            <p className=' text-[16px] leading-[24px] font-normal'>
                Total: <span className='text-[16px] leading-[24px] font-semibold'>{total_size}</span></p> 
                <div className=' mt-5 flex items-center sm:mt-0 sm:gap-3 '>
                    <p className='text-[16px] leading-[24px] font-normal hidden sm:block text-light-200'>
                        Sort by:
                    </p>
                    <Sort/>
                </div>
            </div>
    </section>
    {files.value.files.total>0
    ? <section className='grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {files.value.files.documents.map((file:StoredFile) =>(
            <h1 key={file.$id} className='text-[34px] leading-[42px] font-bold'>
                <Card key={file.$id} file={file}/>
            </h1>
        ))}
    </section>
    :<p className='body-1 mt-10 text-center text-light-200'>
        No Files Uploaded </p>}
    </div>
  )
}

export default Page