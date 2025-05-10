"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import React, { useState } from "react";
import Image from "next/image";

export function Card({ cardBack }: { cardBack: string }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-32 h-48 cursor-pointer perspective"
    >
      <motion.div
        className={clsx(
          "relative w-full h-full",
          "transform-style-preserve-3d"
        )}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-indigo-500 rounded-xl shadow-xl flex items-center justify-center backface-hidden">
          <Image
            src={"/logo.svg"}
            width={100}
            height={38}
            priority
            alt="logo"
          />
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-secondary rounded-xl shadow-xl flex items-center justify-center rotate-y-180 backface-hidden p-2">
          <h2
            className="text-xl font-bold wrap-anywhere text-ellipsis w-full text-center"
            style={{
              display: "-webkit-box",
              "-webkit-line-clamp": "4",
              "-webkit-box-orient": "vertical",
              overflow: "hidden",
            }}
          >
            {cardBack}
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
