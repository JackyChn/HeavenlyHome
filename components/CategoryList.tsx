import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryListProps {
  categoryList: Category[];
}

function CategoryList({ categoryList }: CategoryListProps) {
  return (
    <div className="md:mx-22 mx-4 grid grid-cols-3 gap-4 md:grid-cols-4 lg:mx-52 lg:grid-cols-6">
      {categoryList.length > 0
        ? categoryList.map((category, index) => (
            <Link
              href={"/search/" + category.name}
              key={index}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-blue-50 p-5 transition-all ease-in-out hover:scale-110`}
            >
              <Image
                src={category.icon.url}
                alt="icon"
                width={35}
                height={35}
              />
              <h2 className="text-primary">{category.name}</h2>
            </Link>
          ))
        : Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[120px] w-full animate-pulse rounded-lg bg-slate-200"
            />
          ))}
    </div>
  );
}

export default CategoryList;
