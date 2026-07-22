import { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Login = () => {
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPass, setShowPass] = useState(false);

    function goToNextFeild(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Enter") {
            e.preventDefault();
            if(passwordRef.current){
                passwordRef.current.focus();
            }
        }
    }

    return (
        <>
        <form onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Username" keydownfxn={goToNextFeild}/>
            <div className="relative w-full flex items-center">
                <Input placeholder="Password" type={showPass ? "text" : "password"} refs={passwordRef} className="pr-10 overflow-x-auto" />
                <span className="z-20 absolute cursor-pointer right-3 hover:scale-105 transition-transform" onClick={() => setShowPass(!showPass)}> 
                    {showPass ? <BsEyeSlash className="text-white text-xl" /> : <BsEye className="text-white text-xl" />} 
                </span>
            </div>
          </form>
        </>
    )
}
