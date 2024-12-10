"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CategoryList from "@/components/CategoryList";
import Hero from "@/components/Hero";
import { getAllBusinessList, getCategory } from "./_services/GlobalApi";
import BusinessList from "@/components/BusinessList";

export default function Home() {
  const { data: session, status } = useSession(); // Get session data
  const [categoryList, setCategoryList] = useState([]);
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      getCategoryList();
      getAllBusinessLists();
    }
  }, [status]);

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

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={businessList} title={"Popular Business"} />
    </div>
  );
}
