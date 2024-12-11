"use client";

import { getBusinessByCategory } from "@/app/_services/GlobalApi";
import BusinessList from "@/components/BusinessList";
import React, { useEffect, useState } from "react";

export default function BusinessByCategory({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const [businessList, setbusinessList] = useState<BusinessList[]>([]);
  const [resolvedParams, setResolvedParams] = useState<{
    category: string;
  }>({ category: "" });

  useEffect(() => {
    // Resolve the params Promise and set the category
    params.then((resolvedParams) => {
      setResolvedParams(resolvedParams);
      getBusinessByCategory(resolvedParams.category).then((result) => {
        setbusinessList(result.businessLists);
      });
    });
  }, [params]);

  return (
    <div>
      <BusinessList
        title={resolvedParams?.category}
        businessList={businessList}
      />
    </div>
  );
}
