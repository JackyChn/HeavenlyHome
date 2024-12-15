import { getBusinessByCategory } from "@/app/_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BookingSection from "@/components/ui/BookingSection";
import { Button } from "./button";
import { NotebookPen } from "lucide-react";

function SuggestedBusinessList({ business }: { business: BusinessList }) {
  const [businessList, setBusinessList] = useState<BusinessList[]>([]);

  useEffect(() => {
    if (business) {
      getBusinessByCategory(business?.category?.name).then((res) => {
        setBusinessList(res?.businessLists);
      });
    }
  }, [business]);

  return (
    <div className="md:pl-10">
      <BookingSection business={business}>
        <Button className="flex w-full gap-2">
          <NotebookPen />
          Book Appointment
        </Button>
      </BookingSection>
      <div className="hidden md:block">
        <h2 className="mb-3 mt-3 text-lg font-bold">Similar Business</h2>
        <div className="">
          {businessList &&
            businessList.map((business) => (
              <Link
                key={business.address}
                href={"/details/" + business.id}
                className="mb-4 flex cursor-pointer gap-2 rounded-lg border-primary p-2 hover:border hover:shadow-md"
              >
                <Image
                  src={business?.images[0].url}
                  alt={business.name}
                  width={80}
                  height={80}
                  className="h-[100px] rounded-lg object-cover"
                />
                <div className="">
                  <h2 className="font-bold">{business.name}</h2>
                  <h2 className="text-primary">{business.contactPerson}</h2>
                  <h2 className="text-gray-400">{business.address}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBusinessList;
