import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-[url('/backgrounds/main-color-background.svg')] w-screen bg-center bg-cover bg-no-repeat min-h-screen">
      <div className="flex justify-center items-center w-full pt-[5%]">
        <Image
          src="/home/logo-nplc.webp"
          alt="NPLC 13th Logo"
          draggable={false}
          width={500}
          height={300}
          priority
          className="mt-24 z-20 max-w-[80%] h-auto"
        />
      </div>
      <div className="mt-[5%] login-form-container w-full relative flex justify-center items-center">
        {/* <Image
          src="/login/login-bg.svg"
          alt="login-bg"
          draggable={false}
          width={500}
          height={300}
          priority
          className="absolute w-[35%] h-auto"
        /> */}
        <form className="panel border-8 border-transparent bg-gradient-to-r from-[#272930] via-[#502E5E] to-[#5D190F] relative z-[10] w-[30%] rounded-lg shadow-md p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2 justify-center items-center">
            <Image
              src="/login/login-text.svg"
              alt="NPLC 13th Logo"
              draggable={false}
              width={500}
              height={300}
              priority
              className="z-20 max-w-[30%] h-auto"
            />
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border bg-gradient-to-r from-[#D7FEFF] via-[#DDF8ED] to-[#FEFFF8] border-gray-300 rounded focus:outline-none ring-2 ring-[#824E95]"
              autoComplete="email"
              placeholder="email"
            />
          </div>
          <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 bg-gradient-to-r from-[#D7FEFF] via-[#DDF8ED] to-[#FEFFF8] rounded focus:outline-none ring-2 ring-[#824E95]"
              autoComplete="current-password"
              placeholder="password"
            />
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-white">
              <input type="checkbox" name="remember" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-sm text-[#FCF551] hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 flex justify-center items-center"
          >
            <Image src={"/login/login-form-button.svg"} width={100} height={100} alt="login-form-button" className="w-[45%] login-form-button"></Image>
          </button>
          <div className="text-center text-sm text-white mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#FCF551] hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
