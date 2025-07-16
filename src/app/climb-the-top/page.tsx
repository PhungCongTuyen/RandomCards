"use client";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";

enum Mode {
  EASY = "EASY",
  NORMAL = "NORMAL",
  HARD = "HARD",
  CUSTOM = "CUSTOM",
}

const ClimbTheTop = () => {
  const [mode, setMode] = React.useState<Mode>(Mode.EASY);

  return (
    <div className="p-4 flex flex-wrap">
      <div
        className={
          "flex gap-2 p-4 border col-span-12 md:col-span-9 flex-wrap content-start w-auto h-auto"
        }
        // ref={ref}
      ></div>
      <div className="col-span-12 md:col-span-3 flex flex-col gap-2 p-4 border">
        <div>
          <ToggleGroup
            type="single"
            variant="outline"
            value={mode}
            onValueChange={(value: Mode) => setMode(value)}
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
          <div className="font-bold text-sm">Losestreak</div>
          <Input type="number" disabled={mode !== Mode.CUSTOM} />
        </div>
        <div>
          <div className="font-bold text-sm">Top height</div>
          <Input type="number" disabled={mode !== Mode.CUSTOM} />
        </div>
      </div>
    </div>
  );
};

export default ClimbTheTop;
