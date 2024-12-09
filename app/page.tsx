"use client";

import CategoryList from "@/components/CategoryList";
import Hero from "@/components/Hero";
import { getCategory } from "./_services/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    getCategory().then((res) => {
      setCategoryList(res.categories);
    });
  };
  return (
    <div>
      <Hero />

      <CategoryList categoryList={categoryList} />
    </div>
  );
}
