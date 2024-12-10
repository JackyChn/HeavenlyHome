"use client";

import CategoryList from "@/components/CategoryList";
import Hero from "@/components/Hero";
import { getAllBusinessList, getCategory } from "./_services/GlobalApi";
import { useEffect, useState } from "react";
import BusinessList from "@/components/BusinessList";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getCategoryList();
    getAllBusinessLists();
  }, []);

  const getCategoryList = () => {
    getCategory().then((res) => {
      setCategoryList(res.categories);
    });
  };
  const getAllBusinessLists = () => {
    getAllBusinessList().then((res) => {
      console.log(res.businessLists[0]);
      setBusinessList(res.businessLists);
    });
  };
  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={businessList} title={"Popular Business"} />
    </div>
  );
}
