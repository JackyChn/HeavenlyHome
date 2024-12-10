import React from "react";

export default function Spinner() {
  return (
    <div
      className="border-blue-button mx-auto my-20 h-16 w-16 animate-spin rounded-full border-4 border-solid border-t-transparent"
      style={{
        borderTopColor: "#3b82f6",
        borderRadius: "50%",
      }}
    ></div>
  );
}
