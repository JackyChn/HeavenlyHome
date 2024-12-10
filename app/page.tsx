"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import Hero from "@/components/Hero";
import { getAllBusinessList, getCategory } from "./_services/GlobalApi";
import BusinessList from "@/components/BusinessList";
import Spinner from "@/components/ui/Spinner";

export default function Home() {
  const { data: session, status } = useSession(); // Get session data
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

  if (status === "loading") return <Spinner />;

  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={businessList} title={"Popular Business"} />
    </div>
  );
}
