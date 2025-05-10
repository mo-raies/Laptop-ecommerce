"use client";
import React from "react";
import Product from "./components/Product";

import { useProductContext } from "./context/ProductContext";

export const page = () => {
  const { data } = useProductContext();
  // console.log("context hook:", useProductContext());

  return (
    <div>
      <Product items={data} />
    </div>
  );
};
export default page;
