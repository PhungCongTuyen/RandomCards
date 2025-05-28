"use client";

import { Card, FlipCard } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { LuckyWheel } from "@/components/wheel";
// import { WheelControls } from "@/components/wheel-control";
// import { useWheelState } from "@/hooks/use-wheel-state";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function FlipCards() {
  const [listName, setListName] = useState<string>("");
  const [finalList, setFinalList] = useState<FlipCard[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"idle" | "shuffle" | "shake" | "spread">(
    "idle"
  );

  // const {
  //   names,
  //   setNames,
  //   winner,
  //   isSpinning,
  //   spinWheel,
  //   wheelColors,
  //   setWheelColors,
  //   spinDuration,
  //   setSpinDuration,
  //   finalRotation,
  // } = useWheelState();

  const handleReset = useCallback(() => {
    setListName("");
    setFinalList([]);
  }, []);

  const shuffleArray = async () => {
    const array = [
      ...listName
        ?.split("\n")
        .filter((i) => !!i)
        .map((item, index) => ({
          id: index,
          name: item,
          isFlipped: false,
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
    setListName(value);
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
          .map((item, index) => ({
            id: index,
            name: item,
            isFlipped: false,
          }))
      );
    } else setFinalList([]);
  }, [listName]);

  const calculatePosition = useCallback(
    (parentWidth: number, index: number) => {
      const itemsInOneLine = Math.floor(parentWidth / 136);
      const positionInLine = index % itemsInOneLine;
      const positionInColumn = Math.floor(index / itemsInOneLine);

      return {
        x: positionInLine * 136,
        y: positionInColumn * 202,
      };
    },
    []
  );

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
          rotate: [0, index * 1, index * 1, index * -1, index * -1, 0],
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
    <div className="grid grid-cols-12 gap-2 p-4">
      <div
        className={
          "flex gap-2 p-4 border col-span-12 md:col-span-9 flex-wrap content-start w-auto h-auto"
        }
        ref={ref}
      >
        {finalList.map((item, index) => {
          const parentWidth = ref?.current?.offsetWidth
            ? ref?.current?.offsetWidth - 32
            : 0;

          const { x, y } = calculatePosition(parentWidth, index);

          return (
            <motion.div
              key={index}
              layout
              initial={{ y: 0, rotate: 0, scale: 1 }}
              animate={getAnimation(index, x, y)}
            >
              <Card
                key={index}
                id={index}
                name={item?.name}
                isFlipped={item?.isFlipped}
                onClick={() => handleClickCard(index)}
                isBingoCard={false}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="col-span-12 md:col-span-3 flex flex-col gap-2 p-4 border ">
        {/* <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="enable-wheel"
            checked={isEnableWheel}
            onCheckedChange={setIsEnableWheel}
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
        </div> */}
        <div>
          <Textarea
            placeholder={"Please fill in with multiple rows..."}
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

        {/* {isEnableWheel && (
          <div>
            <LuckyWheel
              names={names}
              isSpinning={isSpinning}
              colors={wheelColors}
              spinDuration={spinDuration}
            />
            <WheelControls
              names={names}
              setNames={setNames}
              wheelColors={wheelColors}
              setWheelColors={setWheelColors}
              spinDuration={spinDuration}
              setSpinDuration={setSpinDuration}
              isSpinning={isSpinning}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
