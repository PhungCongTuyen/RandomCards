"use client";

import { redirect } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [showButton, setShowButton] = useState(false);
  const goToAboutPage = () => {
    redirect("/flip-cards");
  };

  const ball = {
    width: 100,
    height: 100,
    backgroundColor: "rgb(180 255 228)",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    margin: "auto",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-[calc(100vh_-_90px)]">
      <main className="my-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center uppercase text-9xl"
        >
          Just
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center uppercase text-9xl"
        >
          For Fun
        </motion.div>
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
              }}
              style={ball}
              onClick={goToAboutPage}
            >
              Let&apos;s go!
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
