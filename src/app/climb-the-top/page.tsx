"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HeartIcon } from "lucide-react";
import React from "react";

enum Mode {
  EASY = "EASY",
  NORMAL = "NORMAL",
  HARD = "HARD",
  CUSTOM = "CUSTOM",
}

const ClimbTheTop = () => {
  const [mode, setMode] = React.useState<Mode>(Mode.EASY);
  const [life, setLife] = React.useState<number>(5);
  const [currentLife, setCurrentLife] = React.useState<number>(5);
  const [topHeight, setTopHeight] = React.useState<number>(5);

  const handleChangeMode = (value: Mode) => {
    setMode(value);
    switch (value) {
      case Mode.EASY:
        setLife(5);
        setCurrentLife(5);
        setTopHeight(5);
        break;
      case Mode.NORMAL:
        setLife(4);
        setCurrentLife(4);
        setTopHeight(7);
        break;
      case Mode.HARD:
        setLife(3);
        setCurrentLife(3);
        setTopHeight(10);
        break;
      default:
        setLife(5);
        setCurrentLife(5);
        setTopHeight(5);
    }
  };

  const handleChangeLife = (value: number) => {
    setLife(value);
  };

  const handleChangeTopHeight = (value: number) => {
    setTopHeight(value);
  };

  return (
    <div className="p-4 flex flex-wrap">
      <div
        className={
          "flex gap-2 p-4 border col-span-12 md:col-span-9 flex-wrap content-start w-auto h-auto"
        }
        // ref={ref}
      >
        <div>
          {[...new Array(currentLife)].map((i, index) => (
            <HeartIcon key={index} fill="red" />
          ))}
        </div>
        <div>
          <Button>Lose</Button>
          <Button>Win</Button>
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 flex flex-col gap-2 p-4 border">
        <div>
          <ToggleGroup
            type="single"
            variant="outline"
            value={mode}
            onValueChange={handleChangeMode}
          >
            <ToggleGroupItem value={Mode.EASY} aria-label="Toggle easy">
              <div>Easy</div>
            </ToggleGroupItem>
            <ToggleGroupItem value={Mode.NORMAL} aria-label="Toggle normal">
              <div>Normal</div>
            </ToggleGroupItem>
            <ToggleGroupItem value={Mode.HARD} aria-label="Toggle hard">
              <div>Hard</div>
            </ToggleGroupItem>
            <ToggleGroupItem value={Mode.CUSTOM} aria-label="Toggle custom">
              <div>Custom</div>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div>
          <div className="font-bold text-sm">Life</div>
          <Input
            type="number"
            disabled={mode !== Mode.CUSTOM}
            value={life}
            onChange={(event) => handleChangeLife(Number(event.target.value))}
          />
        </div>
        <div>
          <div className="font-bold text-sm">Height</div>
          <Input
            type="number"
            disabled={mode !== Mode.CUSTOM}
            value={topHeight}
            onChange={(event) =>
              handleChangeTopHeight(Number(event.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ClimbTheTop;
