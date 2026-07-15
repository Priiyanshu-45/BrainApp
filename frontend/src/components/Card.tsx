import type { ReactElement } from "react";
import { NoteIcon } from "../icons/noteIcon";
import { LinkIcon } from "../icons/linkIcon";
import { FiYoutube } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { VscTwitter } from "react-icons/vsc";
import { HiOutlineBookOpen } from "react-icons/hi";
import { TrashIcon } from "../icons/trashIcon";
import { ShareIcon } from "../icons/shareIcon";
import { Tag } from "./ui/Tags";

type iconType = "note" | "link" | "youtube" | "instagram" | "twitter" | "other";

interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  tags?: string[];
  link?: string;
  date: Date;
  cardIcon: iconType;
}

type iconValue = Record<iconType, ReactElement>;

const iconDesign: iconValue = {
  note: <NoteIcon />,
  instagram: <FaInstagram size={21} />,
  youtube: <FiYoutube size={22} />,
  twitter: <VscTwitter size={20} />,
  link: <LinkIcon />,
  other: <HiOutlineBookOpen size={20} />,
};

export const Card = (props: CardProps) => {
  return (
    <div className="border-prple-200 border-2 rounded-lg flex flex-col items-center gap-2 bg-white h-80 w-72 px-2 pt-1 overflow-y-scroll overflow-x-hidden">
      <div className="flex items-center justify-between w-full">
        <div className="shrink-0">{iconDesign[props.cardIcon]}</div>

        <div className="flex-1 text-center font-medium px-2">{props.title}</div>

        <div className="flex items-center gap-1 shrink-0">
          <ShareIcon />
          <TrashIcon />
        </div>
      </div>

      <div className="py-2 text-center">
         <div className="line-clamp-6 ">
          {props.description}
          </div>
        <div>{props.link}</div> 
      </div>

      <div className="flex flex-col justify-center items-center gap-2 mt-auto text-center">
        <div className="flex flex-wrap justify-center gap-1">
          {props.tags &&
            props.tags.map((tag, index) => {
              return <Tag title={tag} key={index} />;
            })}
        </div>
        <div className="">
          <span className="text-slate-500 font-normal">
            Added on {props.date.toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
