"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Wheel } from "@/components/wheel";
import { useCallback, useState } from "react";

export default function FlipCards() {
  const [isMultipleFlipping, setIsMultipleFlipping] = useState<boolean>(false);
  const [isEnableWheel, setIsEnableWheel] = useState<boolean>(false);
  const [listName, setListName] = useState<string>("");

  const handleReset = useCallback(() => {
    setIsMultipleFlipping(false);
    setListName("");
  }, []);

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="flex gap-2 p-4 border col-span-8 flex-wrap">
        {listName
          .split("\n")
          .map(
            (item, index) => item !== "" && <Card key={index} cardBack={item} />
          )}
      </div>
      <div className="col-span-12 md:col-span-4 grid gap-2 p-4 border ">
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="multiple-flipping"
            checked={isMultipleFlipping}
            onCheckedChange={setIsMultipleFlipping}
          />
          <Label htmlFor="multiple-flipping">Want to flip multiple ?</Label>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="enable-wheel"
            checked={isEnableWheel}
            onCheckedChange={setIsEnableWheel}
          />
          <Label htmlFor="enable-wheel">Want to use random money wheel ?</Label>
        </div>
        <div>
          <Textarea
            placeholder="Type your list games here. Break line by Enter"
            value={listName}
            onChange={(event) => setListName(event.target.value)}
          />
        </div>
        <Button className="w-full" onClick={handleReset}>
          Reset
        </Button>
        <Button className="w-full">Sort</Button>

        {isEnableWheel && <Wheel />}
      </div>
    </div>
  );
}
