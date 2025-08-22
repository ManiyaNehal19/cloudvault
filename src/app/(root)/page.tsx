import { GetFile, GetTotalSpace } from "@/lib/actions/file.action";
import Image from "next/image";
// import document from "@/app/assests/icons/file-document-light.svg";
// import image from "@/app/assests/icons/file-image-light.svg"
// import media from "@/app/assests/icons/file-video-light.svg"
// import others from "@/app/assests/icons/file-other-light.svg"

import document from "@/app/assests/documents-svgrepo-com.svg";
import image from "@/app/assests/images-967-svgrepo-com.svg";
import media from "@/app/assests/media-file-svgrepo-com.svg";
import others from "@/app/assests/pie-chart-svgrepo-com.svg";
import StorageUsageCard from "@/components/ui/StorageUsageCard";
import Link  from "next/link";
import { file } from "zod";
import { StoredFile } from "@/index";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropdown";
import { convertFileSize } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { log } from "console";
type Size_Date = {
  size:number,
  date:string
}
type totalSpace = {
  value:{
    TotalSpace:
    {image:Size_Date,
      document:Size_Date,
      video:Size_Date,
      audio:Size_Date,
      other:Size_Date,
      used:number,
      all:number}
  }
}
const getUsageSummary = (totalSpace: totalSpace) => {
  return [
    {
      title: "Documents",
      size: totalSpace.value.TotalSpace.document.size,
      latestDate: totalSpace.value.TotalSpace.document.date,
      icon: document,
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.value.TotalSpace.image.size,
      latestDate: totalSpace.value.TotalSpace.image.date,
      icon: image,
      url: "/images",
    },
    {
      title: "Media",
      size: totalSpace.value.TotalSpace.video.size + totalSpace.value.TotalSpace.audio.size,
      latestDate:
        totalSpace.value.TotalSpace.video.date > totalSpace.value.TotalSpace.audio.date
          ? totalSpace.value.TotalSpace.video.date
          : totalSpace.value.TotalSpace.audio.date,
      icon: media,
      url: "/media",
    },
    {
      title: "Others",
      size: totalSpace.value.TotalSpace.other.size,
      latestDate: totalSpace.value.TotalSpace.other.date,
      icon:others,
      url: "/others",
    },
  ];
};
export default async function Home() {
  const [files, space_Total] = await Promise.all([
    GetFile({types:[], limit:10}),
    GetTotalSpace(),
  ])
 
  console.log("files Dashobaord:", files.value.files.documents);
  

  
  const usage = getUsageSummary(space_Total)
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:gap-10">
      <section >
        <StorageUsageCard used={space_Total.value.TotalSpace.used} totalGB={space_Total.value.TotalSpace.all} />
        <ul className="mt-6 grid grid-cols-1 gap-4 xl:mt-10 xl:grid-cols-2 xl:gap-9">
          {usage.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="relative mt-6 rounded-[20px] bg-[#125ffa]/10 p-5 transition-all hover:scale-105"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={40}
                    height={40}
                    alt="uploaded image"
                    // className="absolute -left-3 top-[-25px] bg-transparent z-10 w-[190px] object-contain"
                  />
                  <h4 className="text-[18px] leading-[20px] font-medium relative z-20 w-full text-right">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="text-[16px] leading-[24px] font-semiboldrelative z-20 text-center">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
        </section>




      <section className="h-full rounded-[20px] bg-white p-5 xl:p-8">
       <h2 className="h3 xl:h2 text-light-100">Recent files uploaded</h2>
        {(files.value.files.documents).length>0?(
          <ul className=" mt-6 grid grid-cols-1 gap-4 xl:mt-10 xl:grid-cols-2 xl:gap-9">
          {(files.value.files.documents).map((file:StoredFile)=>(
            <Link href={file.url}
            target="_blank"
            className="flex items-center w-full  gap-3"
            key={file.$id}
            >
              <Thumbnail
              type={file.type}
              extension={file.extension}
              url={file.url}/>
              <div className="flex w-full flex-col xl:flex-row xl:justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] leading-[20px] font-semiboldline-clamp-1 w-full text-light-100 sm:max-w-[200px] lg:max-w-[250px]">
                    {file.name}
                  </p>
                  <FormattedDateTime
                  date={file.$createdAt}
                  className="text-[12px] leading-[16px] font-normal"
                  />
                </div>
                <ActionDropdown file={file}/>

              </div>
            </Link>
          ))}
        </ul>):(
          <p className="text-[16px] leading-[24px] font-normalmt-10 text-center text-light-200">No Files Uploaded</p>
        )}

      </section>
    </div>
  );
}
