// import { GalleryVerticalEnd } from "lucide-react";

import { useRef, useState } from "react";
import Logo from "../components/Logo";
import { Button } from "../components/shadcn/Button";
import { Input } from "../components/shadcn/Input";
import { Label } from "../components/shadcn/Label";
import { signIn, signUp } from "../services/auth";

export default function UserAuthenticate() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  {/* <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    required
                    ref={emailRef}
                    /> */}
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    required
                    className={`flex h-9 w-full rounded-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                    ref={emailRef}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  {/* <Input
                    id="password"
                    type="password"
                    required
                    ref={passwordRef}
                  /> */}
                  <input
                    type="password"
                    placeholder=""
                    required
                    className={`flex h-9 w-full rounded-full border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                    ref={emailRef}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <button
                  className="bg-[#bcaeec] text-black h-10 rounded-full px-8s"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn(email, password);
                  }}
                >
                  Login
                </button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          // src="/placeholder.svg"
          // src="https://thumbs.dreamstime.com/b/d-sound-waves-icon-isolated-white-background-d-sound-waves-icon-isolated-white-background-370023306.jpg"
          src="https://static.vecteezy.com/system/resources/thumbnails/009/269/022/small_2x/abstract-dynamic-colorful-flowing-lines-design-sound-wave-background-illustration-of-music-technology-concept-vector.jpg"
          alt="Image"
          className="absolute left-[50%] top-[50%] -translate-1/2 object-cover"
        />
      </div>
    </div>
  );
}
