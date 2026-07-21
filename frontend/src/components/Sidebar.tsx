import { SideBarItem } from "./SidebarItem";

import { FiYoutube } from "react-icons/fi";
import { PiNotepad } from "react-icons/pi";
import { HiLink } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import { VscTwitter } from "react-icons/vsc";
import { HiOutlineBookOpen } from "react-icons/hi";
import { LuBrain } from "react-icons/lu";

const iconAnimation = "size-7 md:size-6 transition-all duration-200";

export const Sidebar = () => {
  return (
    <>
      <div
        className={`
        fixed top-0 left-0 border-r-2 min-h-screen w-72 -translate-x-59 md:translate-x-0 transition-transform duration-300
        `}
      >
        <div
          className="flex items-center gap-2 text-3xl mb-5 mt-2 pl-5 font-semibold
        translate-x-57 md:translate-x-0 transition-transform duration-300"
        >
          {<LuBrain className="text-purple-800" />}
          <span className="-translate-x-60 md:translate-x-0 
          opacity-0 md:opacity-100 transition-all duration-300">
            Second Brain
          </span>
        </div>
        <div className="flex flex-col  border-black pl-5 pt-2 gap-3">
          <SideBarItem
            text="Youtube"
            icon={<FiYoutube className={iconAnimation} />}
          />
          <SideBarItem
            text="Notes"
            icon={<PiNotepad className={iconAnimation} />}
          />
          <SideBarItem
            text="X"
            icon={<VscTwitter className={iconAnimation} />}
          />
          <SideBarItem
            text="Instagram"
            icon={<FaInstagram className={iconAnimation} />}
          />
          <SideBarItem
            text="Link"
            icon={<HiLink className={iconAnimation} />}
          />
          <SideBarItem
            text="Other"
            icon={<HiOutlineBookOpen className={iconAnimation} />}
          />
        </div>
      </div>
    </>
  );
};
