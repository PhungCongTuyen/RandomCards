"use client";

import { Card, FlipCard } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LOCAL_STORAGE_KEYS } from "@/constants/constants";
import { Input } from "@/components/ui/input";

export default function FlipCards() {
  const [isBingo, setIsBingo] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lines, setLines] = useState<number>(1);
  const [listName, setListName] = useState<string>("");
  const [finalList, setFinalList] = useState<FlipCard[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<"idle" | "shuffle" | "shake" | "spread">(
    "idle"
  );

  const handleClear = useCallback(() => {
    setFinalList([]);
    setListName("");
    localStorage.setItem(LOCAL_STORAGE_KEYS.BINGO_DATA, JSON.stringify([]));
  }, []);

  const handleReset = useCallback(() => {
    const array = [
      ...listName
        ?.split("\n")
        .filter((i) => !!i)
        .map((item, index) => ({
          id: index,
          name: item,
          isFlipped: true,
        })),
    ];
    setFinalList(array);
  }, [listName]);

  const shuffleArray = async () => {
    const array = [
      ...listName
        ?.split("\n")
        .filter((i) => !!i)
        .map((item, index) => ({
          id: index,
          name: item,
          isFlipped: true,
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
    if (value.split("\n").length > 25) {
      return;
    } else {
      setListName(value);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.BINGO_DATA,
        JSON.stringify(value)
      );
    }
  };

  const handleClickCard = (index: number) => {
    const newList = [...finalList];
    newList[index].isFlipped = !newList[index].isFlipped;
    setFinalList(newList);
  };

  const handleRenew = () => {
    shuffleArray();
    setIsBingo(false);
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
            isFlipped: true,
          }))
      );
    } else setFinalList([]);
  }, [listName]);

  const calculatePosition = useCallback(
    (parentWidth: number, index: number) => {
      const itemsInOneLine = Math.floor(parentWidth / 128);
      const positionInLine = index % itemsInOneLine;
      const positionInColumn = Math.floor(index / itemsInOneLine);

      return {
        x: positionInLine * 128,
        y: positionInColumn * 128,
      };
    },
    []
  );

  const validateBingo = (list: FlipCard[]) => {
    if (!list.length || list.length < 25) return false;

    let lineCount = 0;
    // Check rows
    const flippedSet = list.filter((i) => {
      return !i.isFlipped;
    });

    const size = 5;
    for (let r = 0; r < size; r++) {
      const rowStart = r * size;
      const row = list.slice(rowStart, rowStart + size);
      if (row.every((cell) => flippedSet.includes(cell))) {
        lineCount++;
      }
    }

    // Check columns
    for (let c = 0; c < size; c++) {
      const column = [];
      for (let r = 0; r < size; r++) {
        column.push(list[r * size + c]);
      }
      if (column.every((cell) => flippedSet.includes(cell))) {
        lineCount++;
      }
    }

    // Check diagonals
    const diag1 = [];
    const diag2 = [];
    for (let i = 0; i < size; i++) {
      diag1.push(list[i * size + i]); // top-left to bottom-right
      diag2.push(list[i * size + (size - 1 - i)]); // top-right to bottom-left
    }

    if (diag1.every((cell) => flippedSet.includes(cell))) {
      lineCount++;
    }
    if (diag2.every((cell) => flippedSet.includes(cell))) {
      lineCount++;
    }

    return lineCount === lines;
  };

  const handleChangeLines = (value: number) => {
    setLines(value);
  };

  useEffect(() => {
    setIsBingo(validateBingo(finalList));
  }, [finalList]);

  useEffect(() => {
    setIsOpen(isBingo);
  }, [isBingo]);

  useEffect(() => {
    const lastData = localStorage.getItem(LOCAL_STORAGE_KEYS.BINGO_DATA);
    if (lastData && lastData.length) {
      const parsedData = JSON.parse(lastData);
      setListName(parsedData);
    }
  }, []);

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
          rotate: [0, index * 2, index * 2, index * -2, index * -2, 0],
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
    <div className="p-4 flex flex-wrap">
      <div
        className={
          "flex gap-2 p-4 border flex-wrap content-start w-[707px] h-[707px] min-w-[707px] min-h-[707px] m-auto"
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
                isBingoCard={true}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="w-full xl:w-[462px] flex flex-col gap-2 p-4 border ">
        <Label>Lines to bingo:</Label>
        <Input
          type="number"
          value={lines}
          min={1}
          max={5}
          onChange={(event) => handleChangeLines(Number(event.target.value))}
        />
        <Label>Data:</Label>
        <div>
          <Textarea
            placeholder={"Please fill in 25 rows..."}
            value={listName}
            onChange={(event) => handleTextarea(event.target.value)}
          />
        </div>
        <Label>Total rows: {finalList.length}</Label>
        <Button className="w-full" onClick={handleClear}>
          Clear
        </Button>
        <Button className="w-full" onClick={handleReset}>
          Reset bingo
        </Button>
        <Button
          className="w-full"
          onClick={shuffleArray}
          disabled={stage !== "idle" || !finalList.length}
        >
          {stage !== "idle" ? <Loader2 className="animate-spin" /> : "Shuffle"}
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Congrats !</DialogTitle>
            <DialogDescription>Finally you made this. Bingo!</DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRenew()}
            >
              Renew!
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsBingo(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
