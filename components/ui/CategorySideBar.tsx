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
      const categoryFromPath = params.split("/")[2];
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
    <div>
      <h2 className="mb-3 text-lg font-bold text-primary">Categories</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={"/search/" + category.name}
            key={index}
            className={`mb-3 flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:border-primary hover:bg-blue-50 hover:text-primary hover:shadow-md md:mr-10 ${
              selectedCategory == category.name &&
              "border-primary bg-blue-50 text-primary shadow-md"
            } `}
          >
            <Image src={category.icon.url} alt="icon" width={30} height={30} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySideBar;
