import type { HTMLInputTypeAttribute, KeyboardEventHandler, Ref } from "react";

interface InputProps {
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  keydownfxn?: KeyboardEventHandler<HTMLInputElement>;
  refs?: Ref<HTMLInputElement>;
  className?: string; 
}

export const Input = ({
  placeholder,
  type = "text",
  keydownfxn,
  refs,
  className = "", // Default to an empty string if no extra styles are passed
}: InputProps) => {
  return (
    <input
      ref={refs}
      type={type}
      placeholder={placeholder}
      onKeyDown={keydownfxn}
      className={`w-full p-2 my-2 border rounded-lg focus:border-2 focus:border-purple-700 outline-0 bg-black text-white ${className}`}
    />
  );
};
