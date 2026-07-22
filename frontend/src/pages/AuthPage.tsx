import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Signup } from "../components/SignUp";
import { Login } from "../components/Login";
import ShinyText from "../components/ui/ShinyText";

export const AuthPage = () => {
  const [authstate, setAuthState] = useState("signup");
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-[radial-gradient(circle_at_top,#1a1730,#0a0a12)]">
        <div className="relative z-10 border-3 bg-content-bg border-prple-200 hover:border-prple-500 shadow-md shadow-prple-500/70 w-72 p-2 rounded-md flex flex-col gap-2">
          <div className="bg-gray-200 rounded-md flex justify-evenly items-center mb-2">
            <span
              className={`${authstate === "signup" ? "border-b-2 border-prple-500 " : ""}`}
            >
              <button
                onClick={() => setAuthState("signup")}
                className="cursor-pointer"
              >
                <ShinyText
                  text="SignUp"
                  speed={2}
                  delay={0}
                  color="black"
                  shineColor={authstate === "signup" ? "#ffffff" : "black"}
                  spread={120}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={authstate === "signup" ? false : true}
                  className="font-bold"
                />
              </button>
            </span>
            <span
              className={`${authstate === "login" ? "border-b-2 border-prple-500" : ""}`}
            >
              <button
                onClick={() => setAuthState("login")}
                className="cursor-pointer"
              >
                <ShinyText
                  text="Login"
                  speed={2}
                  delay={0}
                  color="black"
                  shineColor={authstate === "login" ? "#ffffff" : "black"}
                  spread={120}
                  direction="right"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={authstate === "login" ? false : true}
                  className="font-bold"
                />
              </button>
            </span>
          </div>

          <div className="row-span-1 flex flex-col gap-7">
            <div className="flex flex-col">
              <span className="flex justify-center text-xl">
                {authstate === "signup" ? "Create Account" : "Welcome Back!"}
              </span>
              <div>{authstate === "signup" ? <Signup /> : <Login />}</div>
              <button
                className="text-end text-sm font-bold text-prple-500 hover:text-prple-700 cursor-pointer"
                role="button"
              >
                Forgot Password?
              </button>
            </div>
            <Button
              variant="secondary"
              text={authstate === "signup" ? "Sign Up" : "Login"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
