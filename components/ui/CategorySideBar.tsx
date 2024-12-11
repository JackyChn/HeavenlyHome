"use client";

import { getCategory } from "@/app/_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function CategorySideBar() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(); // cleaning, shifting, painting, plumbing...
  const params = usePathname(); // /search/cleaning

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (params) {
      const categoryFromPath = params.split("/")[2]; // get that 'cleaning'
      setSelectedCategory(categoryFromPath);
    }
  }, [params]);

  // get All Category List
  const getCategoryList = () => {
    getCategory().then((res) => {
      setCategoryList(res.categories);
    });
  };

  return (
    <div className="w-40">
      <h2 className="mb-3 text-lg font-bold text-primary">Categories</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={"/search/" + category.name}
            key={index}
            className={`mb-3 flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:border-primary hover:bg-blue-50 hover:text-primary hover:shadow-md ${
              selectedCategory == category.name &&
              "border-primary bg-blue-50 text-primary shadow-md"
            } `}
          >
            <Image src={category.icon.url} alt="icon" width={24} height={24} />
            <h2 className="text-sm">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySideBar;
