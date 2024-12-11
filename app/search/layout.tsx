import CategorySideBar from "@/components/ui/CategorySideBar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 flex">
      {/* Side Category Nav bar */}
      <div className="sticky mr-4 hidden w-48 flex-shrink-0 border-r-2 border-secondary md:block">
        <CategorySideBar />
      </div>

      {/* Main content */}
      <div className="flex-grow">{children}</div>
    </div>
  );
}

export default layout;
