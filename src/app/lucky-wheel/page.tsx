"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Loader2 } from "lucide-react";
import { LOCAL_STORAGE_KEYS } from "@/constants/constants";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type WheelItem = {
  id: string | number;
  label: string;
  color: string;
};

export default function LuckyWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [listName, setListName] = useState<string>("");
  const [isSpining, setIsSpining] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [items, setItems] = useState<WheelItem[]>([]);
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [totalRotation, setTotalRotation] = useState(0);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const numItems = items.length;
    const arc = (2 * Math.PI) / numItems;

    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < numItems; i++) {
      const angle = i * arc;
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, center, angle, angle + arc);
      ctx.fillStyle = items[i].color;
      ctx.fill();
      ctx.save();

      // Draw label
      ctx.translate(center, center);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "16px Arial";
      ctx.fillText(items[i].label, center - 10, 10);
      ctx.restore();
    }
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 14)];
    }
    return color;
  };

  const spin = () => {
    setIsSpining(true);
    const numItems = items.length;
    const anglePerSlice = 360 / numItems;
    const randomIndex = Math.floor(Math.random() * numItems);

    const fullSpins = 5;
    const targetAngle =
      360 - randomIndex * anglePerSlice - anglePerSlice / Math.random();
    const newRotation = totalRotation + fullSpins * 360 + targetAngle;

    setTotalRotation(newRotation);
    setRotation(newRotation); // triggers motion animation

    // Delay selection until animation completes
    setTimeout(() => {
      const normalized = newRotation % 360;
      const selectedIndex =
        Math.floor((360 - normalized) / anglePerSlice) % numItems;
      setSelected(selectedIndex);
      setIsSpining(false);
      setIsOpen(true);
    }, 4000); // match transition.duration
  };

  const handleReset = useCallback(() => {
    setListName("");
    setItems([]);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.LUCKY_WHEEL_DATA,
      JSON.stringify([])
    );
  }, []);

  const handleRemove = useCallback(() => {
    //get selected value
    const selectedValue = !!selected && items[selected].label;

    //get original array in the textarea
    const lines = listName.split("\n").filter((i) => !!i);

    //get the first item same as selected value in the textarea
    const currentIndex = lines.findIndex((x) => x === selectedValue);

    //remove in the textarea
    lines.splice(currentIndex, 1);

    const newLines = lines.join("\n");

    setListName(newLines);

    const newItems = newLines
      ?.split("\n")
      .filter((i) => !!i)
      .map((item, index) => ({
        id: index,
        label: item,
        color: getRandomColor(),
      }));

    setItems(newItems);
    setIsOpen(false);
    setSelected(null);

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.LUCKY_WHEEL_DATA,
      JSON.stringify(newItems)
    );
  }, [items, listName, selected]);

  const shuffleArray = async () => {
    const array = [
      ...listName
        ?.split("\n")
        .filter((i) => !!i)
        .map((item, index) => ({
          id: index,
          label: item,
          color: getRandomColor(),
        })),
    ];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    setItems(array);
  };

  const handleTextarea = (value: string) => {
    setListName(value);
    const newListName = value
      ?.split("\n")
      .filter((i) => !!i)
      .map((item, index) => ({
        id: index,
        label: item,
        color: getRandomColor(),
      }));
    setItems(newListName);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.LUCKY_WHEEL_DATA,
      JSON.stringify(newListName)
    );
  };

  useEffect(() => {
    drawWheel();
  }, [items]);

  useEffect(() => {
    const lastData = localStorage.getItem(LOCAL_STORAGE_KEYS.LUCKY_WHEEL_DATA);
    if (lastData && lastData.length) {
      const parsedData = JSON.parse(lastData);
      const mappedData = parsedData
        .map((item: WheelItem) => item.label)
        .join("\n");
      setListName(mappedData);
      setItems(parsedData);
    }
  }, []);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-9 border p-4">
        <div className="relative w-[508px] h-[508px] bg-blue-400 rounded-full p-1 m-auto">
          {/* Pointer */}
          <div className="absolute top-1/2 right-[-8px] transform -translate-y-1/2 z-10">
            <div className="w-0 h-0 border-y-8 border-y-transparent border-r-[20px] border-r-red-500" />
          </div>
          {/* Wheel */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.1, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              className="rounded-full"
            />
          </motion.div>
        </div>
        <div className="flex justify-center mt-4 relative z-10">
          <Button onClick={spin} disabled={isSpining || !items.length}>
            {isSpining ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Spin The Wheel"
            )}
          </Button>
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 flex flex-col gap-2 p-4 border">
        <div>
          <Textarea
            placeholder={"Please fill in with multiple rows..."}
            value={listName}
            onChange={(event) => handleTextarea(event.target.value)}
          />
        </div>
        <Label>Total rows: {items.length}</Label>
        <Button
          className="w-full"
          onClick={handleReset}
          disabled={isSpining || !items.length}
        >
          {isSpining ? <Loader2 className="animate-spin" /> : "Reset"}
        </Button>
        <Button
          className="w-full"
          onClick={shuffleArray}
          disabled={isSpining || !items.length}
        >
          {isSpining ? <Loader2 className="animate-spin" /> : "Shuffle"}
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selected !== null &&
              ["all in", "all"]?.includes(items[selected]?.label?.toLowerCase())
                ? "Oh no! Please don't do it!"
                : "Congrats !"}
            </DialogTitle>
            <DialogDescription className="text-3xl font-bold">
              {selected !== null && items[selected]?.label}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemove()}
            >
              Remove!
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
