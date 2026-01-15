"use client";

// biome-ignore assist/source/organizeImports: <explanation>
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { BriefcaseIcon, Unlock, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed z-50 top-0 w-full border-b bg-[#fafafa] h-20 py-4">
      <div className="max-w-5xl flex items-center justify-between mx-auto px-4 lg:px-0">
        <Link href="/" className="text-xl font-bold">
          LOGO
        </Link>
        <div className="flex space-x-6">
          <Link
            href="/jobs"
            className="text-base font-bold flex flex-col items-center gap-2 text-center"
          >
            <BriefcaseIcon className="w-5 h-5" />
            Jobs
          </Link>
          {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
          {!session?.user && status !== "loading" && (
            <Link
              href="/login"
              className="text-base font-bold flex flex-col items-center gap-2 text-center"
            >
              <Unlock className="w-5 h-5" />
              Login
            </Link>
          )}

          {/** biome-ignore lint/nursery/noLeakedRender: <explanation> */}
          {session?.user && status === "authenticated" && (
            <DropdownMenu>
              {/* FIX: Trigger now has only ONE child (The Button) */}
              <DropdownMenuTrigger asChild>
                <span className="text-black text-base font-bold flex flex-col items-center gap-2 text-center cursor-pointer">
                  <UserIcon className="w-5 h-5" />
                  Profile
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 bg-white border rounded shadow-md p-2">
                <DropdownMenuItem className="flex items-center px-2 py-1 outline-none hover:bg-gray-100 cursor-pointer">
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex items-center px-2 py-1 outline-none hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};
