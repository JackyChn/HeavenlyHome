import Image from "next/image";
import React from "react";

function BusinessDescription({ business }: { business: BusinessList }) {
  return (
    business?.name && (
      <div>
        <h2 className="text-[25px] font-bold">Description</h2>
        <p className="mt-4 text-lg text-gray-600">{business.about}</p>

        <h2 className="mt-8 text-[25px] font-bold">Gallary</h2>
        <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {business?.images?.map((item, index) => (
            <Image
              src={item?.url}
              key={index}
              alt="image"
              width={700}
              height={200}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>
    )
  );
}

export default BusinessDescription;
