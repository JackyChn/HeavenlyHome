import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex items-center justify-between border-b border-blue-100 p-5 shadow-sm">
      <div className="mx-4 flex items-center gap-8">
        <Image
          src={"/logo.png"}
          alt={"Heavenly Service"}
          width={50}
          height={50}
        />
        {/* home service about */}
        <div className="mx-6 hidden items-center gap-8 md:flex">
          <h2 className="cursor-pointer hover:scale-110 hover:text-primary">
            Home
          </h2>
          <h2 className="cursor-pointer hover:scale-110 hover:text-primary">
            Service
          </h2>
          <h2 className="cursor-pointer hover:scale-110 hover:text-primary">
            About
          </h2>
        </div>
      </div>{" "}
      <div>
        <Button>Get Started</Button>
      </div>
    </div>
  );
}
