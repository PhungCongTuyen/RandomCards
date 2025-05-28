/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";

export default function AboutMe() {
  return (
    <div className="p-4">
      <div className="max-w-[720px] m-auto h-full w-full relative">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <img
            alt=""
            className="h-60 mx-auto"
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemVrZzdoM2oxNjd3enNyc2RtNm96c3EydXEzMWprbHRmcGFod210OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ogwFGEHrVxusDbDjO/giphy.gif"
          />
          Hi!
        </motion.div>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 2,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          My name is Tuyen, you can call me Tom in English or Ngoos as my
          parents and my whole family call me with that name.
        </motion.div>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 4,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          I'm 27 and I love to watch Ibby's videos since I was 22 ^^!
        </motion.div>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 8,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          As I remember, he's mentioned that he wants to have new tool likes
          Random Wheel and something to give him more ideas. Then I've made
          this. It's not 100% perfect, but I hope it could help him to have more
          ideas about making contents. Also other people can use it - Just for
          fun!
        </motion.div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 12,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          Remember! I'm not asking anyone to have to donate or give me money so
          please don't get me wrong. If you want to support me even just a cent,
          I'm happy with that. But one more time, I'm not asking you to give me
          your money like a robber. I just want to help my dad to pay his
          medical treatment fees for his personal issues
        </motion.div>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 16,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          This is my wallet addresses. If you want to support me, feel free to
          do it.
          <div className="font-bold italic mt-2">USDT-ERC20:</div>
          <div className="italic">
            0x089a2c50631780f9faa9fa79eff83ce987314e9a
          </div>
          <div className="font-bold italic">LTC:</div>
          <div className="italic">LPvrdMPFALuFZrWgyyhMzG465ykfouGM7A</div>
        </motion.div>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 20,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          Sheeessh! I don't want to talk too much about him. Of course his
          treatment fees could take all my life but I'm trying to do it{" "}
          <span className="italic">
            (If you don't know, it takes 24.000$, 80 times my saving money per
            month. Jesus!)
          </span>{" "}
          But nah. Do I crying about it now? Nah, at least I've paid 3,4k$ for
          him since 2024 so keep fighting dad.
        </motion.div>
        <motion.div
          className="mt-4 font-semibold italic"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 24,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          Btw, if you want to support me, thank you for that. I appreciate it. I
          will update it on this page every single day. Have fun with my
          website, new features will come.
        </motion.div>
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 26,
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <img
            alt=""
            className="mx-auto h-60"
            src={
              "https://media.giphy.com/media/s92pVeifyTMdi/giphy.gif?cid=ecf05e47ogh0r3as5kraoj6jaax6uod9pzgf98xuzfed4w1x&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            }
          />
        </motion.div>
      </div>
    </div>
  );
}
