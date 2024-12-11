import CategorySideBar from "@/components/ui/CategorySideBar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4">
        {/* Side Category Nav bar  */}
        <div className="mr-4 hidden border-r-2 border-secondary md:block">
          <CategorySideBar />
        </div>

        {/* main content */}
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  );
}

export default layout;
