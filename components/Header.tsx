"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth";
import { signOutAction } from "@/app/_services/actions";

export default function Header() {
  const { data: session } = useSession(); // Get session data
  const router = useRouter();

  const handleServiceClick = () => {
    if (session) {
      router.push("/homeService"); // Navigate if authenticated
    } else {
      router.push("/api/auth/signin"); // Redirect to login if not authenticated
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-blue-100 p-5 shadow-sm">
      <div className="mx-4 flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt={"Heavenly Service"}
            width={50}
            height={50}
          />
        </Link>
        {/* Navigation buttons */}
        <div className="mx-6 hidden items-center gap-8 md:flex">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer hover:scale-110 hover:text-primary"
          >
            Home
          </button>
          <button
            onClick={handleServiceClick}
            className="cursor-pointer hover:scale-110 hover:text-primary"
          >
            Service
          </button>
          <button
            onClick={() => router.push("/about")}
            className="cursor-pointer hover:scale-110 hover:text-primary"
          >
            About
          </button>
        </div>
      </div>{" "}
      {/* conditional render the login button / welcome message */}
      <div>
        {session ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {" "}
            <p className="text-sm text-gray-600">
              Welcome, {session?.user?.name}
            </p>
            <Link href={"/mybooking"} title="my booking">
              <Image
                src={session?.user?.image || "/default-avatar.png"}
                className="rounded-full"
                alt="avatar"
                width={30}
                height={30}
              />
            </Link>
            <form
              action={signOutAction}
              className="flex items-center justify-center"
            >
              <button onClick={() => signOut()} title="Log out">
                <LogOut />
              </button>
            </form>
          </div>
        ) : (
          <Button onClick={() => signIn("Google")}>Get Started</Button>
        )}
      </div>
    </div>
  );
}
