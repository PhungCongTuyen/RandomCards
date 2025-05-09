"use client";

import { Card } from "@/components/card";
// import { useState } from "react";

export default function FlipCards() {
  const array = [...Array(10).keys()];
  // const [isMultipleFlipping, setIsMultipleFlipping] = useState(false);
  console.log(array);
  return (
    <div>
      Flip Cards
      {array.map((item, index) => (
        <Card key={index} />
      ))}
    </div>
  );
}
