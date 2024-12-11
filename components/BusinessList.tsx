import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BusinessListProps {
  businessList: BusinessList[];
  title: string;
}

function BusinessList({ businessList, title }: BusinessListProps) {
  return (
    <div className="mt-5">
      <h2 className="text-[22px] font-bold">{title}</h2>
      <div className="mt-5 grid w-fit grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {businessList.length > 0
          ? businessList.map((business, index) => (
              <Link
                href={"/details/" + business.id}
                key={index}
                className="cursor-pointer rounded-lg shadow-md transition-all ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-primary"
              >
                <Image
                  src={business?.images[0].url}
                  alt={business.name}
                  width={500}
                  height={200}
                  className="h-[150px] rounded-lg object-cover md:h-[200px]"
                />
                <div className="flex flex-col items-baseline gap-1 p-3">
                  <h2 className="rounded-full bg-blue-100 p-1 px-2 text-[12px] text-primary">
                    {business.category.name}
                  </h2>
                  <h2 className="text-lg font-bold">{business.name}</h2>
                  <h2 className="text-primary">{business.contactPerson}</h2>
                  <h2 className="text-sm text-gray-500">{business.address}</h2>
                  <Button className="mt-3 rounded-lg">Book Now</Button>
                </div>
              </Link>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[200px] w-full animate-pulse rounded-lg bg-slate-200"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BusinessList;
