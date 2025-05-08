"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import React, { useState } from "react";

export function Card() {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-64 h-96 cursor-pointer perspective"
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
        <div className="absolute w-full h-full bg-white rounded-xl shadow-xl flex items-center justify-center backface-hidden">
          <h2 className="text-2xl font-bold">Front</h2>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-indigo-500 text-white rounded-xl shadow-xl flex items-center justify-center rotate-y-180 backface-hidden">
          <h2 className="text-2xl font-bold">Back</h2>
        </div>
      </motion.div>
    </div>
  );
}
