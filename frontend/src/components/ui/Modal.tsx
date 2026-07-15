import { useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";

interface modalprops {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen = false, onClose }: modalprops) => {
  useEffect(() => {
    if(!isOpen) return;
    const closeHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", closeHandler);
    
    return () => {
      window.removeEventListener("keydown", closeHandler);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  return (
    <div
      className="bg-gray-400/40 backdrop-blur-xs fixed inset-0 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="border-2 rounded-md py-3 px-5 bg-white border-gray-400"
      onClick={(e) => e.stopPropagation()}>
        <span className="flex justify-end mb-5">
          <MdOutlineCancel
            className="cursor-pointer bg-prple-500 text-btn_txt2-100 rounded-full hover:scale-105"
            onClick={onClose}
            size={24}
          />
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
};
