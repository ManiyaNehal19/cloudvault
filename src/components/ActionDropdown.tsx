"use client";
import download_icon from "@/app/assests/icons/download.svg";
import delete_icon from "@/app/assests/icons/delete.svg";
import edit_icon from "@/app/assests/icons/edit.svg";
import share_icon from "@/app/assests/icons/share.svg";
import info_icon from "@/app/assests/icons/info.svg";


import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Dots from "@/app/assests/icons/dots.svg"
import Image from "next/image";
import Loader from "@/app/assests/icons/loader.svg"
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionType } from "..";
import {
  deleteFile,
  renameFile,
  updateFileUsers,
} from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "@/components/ActionsModalContent";
import { StoredFile } from "..";

const ActionDropdown = ({ file }: { file: StoredFile}) => {
  const actionsDropdownItems = [
  {
    label: "Rename",
    icon: edit_icon,
    value: "rename",
  },
  {
    label: "Details",
    icon: info_icon,
    value: "details",
  },
  {
    label: "Share",
    icon: share_icon,
    value: "share",
  },
  {
    label: "Download",
    icon: download_icon,
    value: "download",
  },
  {
    label: "Delete",
    icon: delete_icon,
    value: "delete",
  },
];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
    //   setEmails([]);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () =>
        renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () =>
        deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="rounded-[26px] bg-white w-[90%] max-w-[400px] px-6 py-8 text-[14px] leading-[20px] font-medium ring-none border-none [&>button]:outline-none [&>button]:ring-0 [&>button]:focus:outline-none [&>button]:focus:ring-0">
        <DialogHeader className="flex flex-col gap-3 text-black ">
          <DialogTitle className="text-center text-black ">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <p className="text-center ">
              Are you sure you want to delete{` `}
              <span className="font-medium text-[#125ffa]-100 ">{file.name}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 text-black  md:flex-row">
            <Button onClick={closeAllModals} className="h-[52px] flex-1 rounded-full hover:bg-[#125ffa] hover:text-white border border-[#125ffa]/50 text-black bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleAction} className="primary-btn rounded-full !mx-0 h-[52px] w-full flex-1 hover:bg-[#1559e1] hover:text-white  bg-[#125ffa] text-white">
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Image
                  src={Loader}
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="outline-none  ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0">
          <Image
            src={Dots}
            alt="dots"
            width={24}
            height={24}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border-none ">
          <DropdownMenuLabel className="max-w-[200px] truncate  font-semibold">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="cursor-pointer hover:bg-[#125ffa]/10 "
              onClick={() => {
                setAction(actionItem);

                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value,
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};
export default ActionDropdown;