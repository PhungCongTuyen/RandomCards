"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import React from "react";
import Image from "next/image";

const style = {
  display: "-webkit-box",
  WebkitLineClamp: "4",
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

export interface FlipCard {
  name: string;
  isFlipped: boolean;
  onClick?: () => void;
  isBingoCard?: boolean;
}

export function Card({ name, isFlipped, onClick, isBingoCard }: FlipCard) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "cursor-pointer perspective",
        isBingoCard ? "w-32 h-32" : "w-32 h-48"
      )}
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
        <div className="absolute w-full h-full bg-indigo-500 rounded-xl shadow-xl flex items-center justify-center backface-hidden pointer-events-none">
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
          <div
            className="text-xl font-bold wrap-anywhere text-ellipsis w-full text-center"
            style={style}
          >
            {name}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
