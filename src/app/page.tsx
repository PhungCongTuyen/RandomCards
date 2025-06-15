"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useMemo } from "react";

export default function Home() {
  const router = useRouter();

  const buttons = useMemo(() => {
    return [
      {
        name: "Mystery Cards",
        route: "/mystery-cards",
      },
      {
        name: "Lucky Wheel",
        route: "/lucky-wheel",
      },
      {
        name: "Coin Flip (updating)",
        route: "/coin-flip",
      },
      {
        name: "Bingo",
        route: "/bingo",
      },
    ];
  }, []);

  const goToPage = (route: string) => {
    router.push(route);
  };

  return (
    <div>
      <div className="flex flex-col min-h-[calc(100vh_-_80px)] h-full items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={1}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center uppercase text-9xl font-bold"
          >
            Just
          </motion.div>
          <motion.div
            key={2}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center uppercase text-9xl font-bold"
          >
            For Fun
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          <motion.div className="flex max-w-[600px] mx-auto flex-wrap mt-12 justify-center w-full">
            {buttons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{
                  scale: 1.2,
                }}
                transition={{
                  delay: 1,
                  duration: 0.8,
                  scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                }}
                className={
                  "font-bold w-[120px] h-[120px] rounded cursor-pointer flex items-center text-center justify-center relative mx-auto transition-colors bg-button hover:bg-button-hover"
                }
                onClick={() => goToPage(item.route)}
              >
                {item.name}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <footer className="flex justify-center items-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{
              duration: 0.4,
              delay: 2,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            onClick={() => goToPage("/about-me")}
            className="cursor-pointer"
          >
            About me?
          </motion.div>
        </AnimatePresence>
      </footer>
    </div>
  );
}
