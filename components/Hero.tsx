import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import React from "react";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 pb-7 pt-14">
      {/* Title */}
      <TextGenerateEffect
        className="text-center text-[40px] md:text-3xl lg:text-5xl"
        words="Discover Service for Your Heavenly Home"
        duration={1}
      />

      <h2 className="text-xl text-gray-500">
        Explore Best Home Care Services Near You
      </h2>

      {/* Search section */}
      <div className="mt-4 flex items-center gap-4">
        <Input placeholder="Search..." className="rounded-full md:w-[350px]" />
        <Button className="h-[46px] rounded-full">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
