import DashboardIcon from "@/app/assests/dashboard-4-svgrepo-com.svg";
import DocumentsIcon from "@/app/assests/documents-svgrepo-com.svg";
import ImagesIcon from "@/app/assests/images-967-svgrepo-com.svg";
import MediaIcon from "@/app/assests/media-file-svgrepo-com.svg";
import PieIcon from "@/app/assests/pie-chart-svgrepo-com.svg";

export const navItems = [
  { name: "Dashboard", icon: DashboardIcon, href: "/" },
  { name: "Documents", icon: DocumentsIcon, href: "/document" },
  { name: "Images", icon: ImagesIcon, href: "/images" },
  { name: "Media", icon: MediaIcon, href: "/media" },
  { name: "Others", icon: PieIcon, href: "/others" },
];
export const avatarUSer = "https://www.svgrepo.com/show/213788/avatar-user.svg"


export const actionsDropdownItems = [
  {
    label: "Rename",
    icon: "/assets/icons/edit.svg",
    value: "rename",
  },
  {
    label: "Details",
    icon: "/assets/icons/info.svg",
    value: "details",
  },
  {
    label: "Share",
    icon: "/assets/icons/share.svg",
    value: "share",
  },
  {
    label: "Download",
    icon: "/assets/icons/download.svg",
    value: "download",
  },
  {
    label: "Delete",
    icon: "/assets/icons/delete.svg",
    value: "delete",
  },
];

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];

export const avatarPlaceholderUrl =
  "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB