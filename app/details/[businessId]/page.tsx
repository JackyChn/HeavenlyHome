"use client";

import { getBusinessById } from "@/app/_services/GlobalApi";
import React, { useEffect, useState } from "react";
import BusinessInfo from "@/components/ui/BusinessInfo";
import BusinessDescription from "@/components/ui/BusinessDescription";
import SuggestedBusinessList from "@/components/ui/SuggestedBusinessList";

export default function DetailsPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const [business, setBusiness] = useState();

  useEffect(() => {
    params.then((resolvedParams) => {
      // getBusinessById
      getBusinessById(resolvedParams.businessId).then((res) => {
        setBusiness(res.businessList);
      });
    });
  }, [params]);

  if (!business) <div>{"No business currently"}</div>;
  return (
    <div className="px-10 py-8 md:px-36 md:py-20">
      <BusinessInfo business={business} />

      <div className="mt-16 grid grid-cols-3">
        <div className="order-last col-span-3 md:order-first md:col-span-2">
          <BusinessDescription business={business} />
        </div>
        <div className="">
          <SuggestedBusinessList business={business} />
        </div>
      </div>
    </div>
  );
}
