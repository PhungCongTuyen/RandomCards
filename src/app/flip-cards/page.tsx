"use client";

import { Card, FlipCard } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Wheel } from "@/components/wheel";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function FlipCards() {
  const [isEnableWheel, setIsEnableWheel] = useState<boolean>(false);
  const [isEnalbleBingo, setIsEnableBingo] = useState<boolean>(false);
  const [isBingo, setIsBingo] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");
  const [finalList, setFinalList] = useState<FlipCard[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"idle" | "shuffle" | "shake" | "spread">(
    "idle"
  );

  const handleReset = useCallback(() => {
    setListName("");
    setFinalList([]);
  }, []);

  const shuffleArray = async () => {
    const array = [
      ...listName
        ?.split("\n")
        .filter((i) => !!i)
        .map((item) => ({
          name: item,
          isFlipped: isEnalbleBingo,
        })),
    ];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setFinalList(array);

    setStage("shuffle");
    await new Promise((res) => setTimeout(res, 300));

    setStage("shake");
    await new Promise((res) => setTimeout(res, 1100));

    setStage("spread");
    await new Promise((res) => setTimeout(res, 600));

    setStage("idle");
  };

  const handleTextarea = (value: string) => {
    if (isEnalbleBingo) {
      if (value.split("\n").length > 25) {
        return;
      } else {
        setListName(value);
      }
    } else {
      setListName(value);
    }
  };

  const handleSwitchBingo = (value: boolean) => {
    setFinalList((prev) =>
      prev.slice(0, 25).map((i) => ({ ...i, isFlipped: value }))
    );
    setListName((prev) =>
      prev
        .split("\n")
        .filter((i) => i)
        .slice(0, 25)
        .join("\n")
    );
    setIsEnableBingo(value);
  };

  const handleClickCard = (index: number) => {
    const newList = [...finalList];
    newList[index].isFlipped = !newList[index].isFlipped;
    setFinalList(newList);
  };

  useEffect(() => {
    if (listName?.length) {
      setFinalList(
        listName
          ?.split("\n")
          .filter((i) => !!i)
          .map((item) => ({
            name: item,
            isFlipped: isEnalbleBingo,
          }))
      );
    } else setFinalList([]);
  }, [listName, isEnalbleBingo]);

  const calculatePosition = useCallback(
    (parentWidth: number, index: number, isEnalbleBingo: boolean) => {
      const itemsInOneLine = Math.floor(
        parentWidth / (isEnalbleBingo ? 128 : 136)
      );
      const positionInLine = index % itemsInOneLine;
      const positionInColumn = Math.floor(index / itemsInOneLine);

      return {
        x: positionInLine * (isEnalbleBingo ? 128 : 136),
        y: positionInColumn * (isEnalbleBingo ? 128 : 202),
      };
    },
    []
  );

  const validateBingo = (list: FlipCard[]) => {
    // Check rows
    const flippedSet = list.filter((i) => !i.isFlipped);
    const size = 5;
    for (let r = 0; r < size; r++) {
      const rowStart = r * size;
      const row = list.slice(rowStart, rowStart + size);
      if (row.every((cell) => flippedSet.includes(cell))) return true;
    }

    // Check columns
    for (let c = 0; c < size; c++) {
      const column = [];
      for (let r = 0; r < size; r++) {
        column.push(list[r * size + c]);
      }
      if (column.every((cell) => flippedSet.includes(cell))) return true;
    }

    // Check diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
      diag1.push(list[i * size + i]); // top-left to bottom-right
      diag2.push(list[i * size + (size - 1 - i)]); // top-right to bottom-left
    }

    if (diag1.every((cell) => flippedSet.includes(cell))) return true;
    if (diag2.every((cell) => flippedSet.includes(cell))) return true;

    return false;
  };

  useEffect(() => {
    setIsBingo(validateBingo(finalList));
  }, [finalList]);

  const getAnimation = (index: number, x: number, y: number) => {
    switch (stage) {
      case "shuffle":
        return {
          y: 0 - y,
          x: 0 - x,
          scale: 1.1,
          rotate: 0,
          zIndex: 10 + index,
        };
      case "shake":
        return {
          y: 0 - y,
          x: 0 - x,
          rotate: [0, index * 15, index * 25, index * -15, index * -25, 0],
          scale: 1,
          transition: { duration: 1 },
        };
      case "spread":
        return {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        };
      default:
        return {
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        };
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2">
      <div
        className={clsx(
          "flex gap-2 p-4 border col-span-8 flex-wrap content-start",
          isEnalbleBingo ? "w-[707px] h-[707px] m-auto" : "w-auto h-auto"
        )}
        ref={ref}
      >
        {finalList.map((item, index) => {
          const parentWidth = ref?.current?.offsetWidth
            ? ref?.current?.offsetWidth - 32
            : 0;

          const { x, y } = calculatePosition(
            parentWidth,
            index,
            isEnalbleBingo
          );

          return (
            <motion.div
              key={index}
              layout
              initial={{ y: 0, rotate: 0, scale: 1 }}
              animate={getAnimation(index, x, y)}
            >
              <Card
                key={index}
                name={item?.name}
                isFlipped={item?.isFlipped}
                onClick={() => handleClickCard(index)}
                isBingoCard={isEnalbleBingo}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="col-span-12 md:col-span-4 flex flex-col gap-2 p-4 border ">
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="enable-wheel"
            checked={isEnableWheel}
            onCheckedChange={setIsEnableWheel}
            disabled
          />
          <Label htmlFor="enable-wheel">
            Wants to use random money wheel ? (is updating)
          </Label>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="enable-bingo"
            checked={isEnalbleBingo}
            onCheckedChange={(value) => handleSwitchBingo(value)}
          />
          <Label htmlFor="enable-bingo">Wants to use it as bingo ?</Label>

          {isEnalbleBingo && isBingo && finalList.length === 25 && (
            <div className="text-red-500 font-bold">Bingo!</div>
          )}
        </div>
        <div>
          <Textarea
            placeholder={
              isEnalbleBingo
                ? "Please fill in 25 rows..."
                : "Please fill in with multiple rows..."
            }
            value={listName}
            onChange={(event) => handleTextarea(event.target.value)}
          />
        </div>
        <Label>Total rows: {finalList.length}</Label>
        <Button className="w-full" onClick={handleReset}>
          Reset
        </Button>
        <Button
          className="w-full"
          onClick={shuffleArray}
          disabled={stage !== "idle" || !finalList.length}
        >
          {stage !== "idle" ? <Loader2 className="animate-spin" /> : "Shuffle"}
        </Button>

        {isEnableWheel && <Wheel />}
      </div>
    </div>
  );
}
