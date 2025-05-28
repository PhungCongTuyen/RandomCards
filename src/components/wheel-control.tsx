import React from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface WheelControlsProps {
  names: string[];
  setNames: (names: string[]) => void;
  wheelColors: string[];
  setWheelColors: (colors: string[]) => void;
  spinDuration: number;
  setSpinDuration: (duration: number) => void;
  isSpinning: boolean;
}

export const WheelControls: React.FC<WheelControlsProps> = ({
  names,
  setNames,
  wheelColors,
  setWheelColors,
  spinDuration,
  setSpinDuration,
  isSpinning,
}) => {
  const [namesText, setNamesText] = React.useState("");

  // Initialize namesText from names array
  React.useEffect(() => {
    setNamesText(names.join("\n"));
  }, [names]);

  // Handle bulk names update
  const handleNamesChange = (value: string) => {
    setNamesText(value);
  };

  React.useEffect(() => {
    if (namesText.length) {
      const namesList = namesText;
      setNames(
        namesList
          .split("\n")
          .map((name) => name.trim())
          .filter((name) => name !== "")
      );
    }
  }, [namesText]);

  // Handle randomizing names
  const handleRandomize = () => {
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    setNames(shuffled);
    setNamesText(shuffled.join("\n"));
  };

  // Handle clearing all names
  const handleClearAll = () => {
    setNames([]);
    setNamesText("");
  };

  // Handle spin duration change
  const handleDurationChange = (value: string) => {
    const parseValue = parseFloat(value);
    if (!isNaN(parseValue) && parseValue >= 1 && parseValue <= 10) {
      setSpinDuration(parseValue);
    }
  };

  // Predefined color schemes
  const colorSchemes = [
    // Default
    ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"],
    // Pastel
    ["#93c5fd", "#6ee7b7", "#fcd34d", "#fca5a5", "#c4b5fd", "#fbcfe8"],
    // Dark
    ["#1e40af", "#065f46", "#b45309", "#991b1b", "#5b21b6", "#9d174d"],
    // Monochrome
    ["#1e3a8a", "#1e40af", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"],
  ];

  return (
    <div className="space-y-6">
      <div>
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Names List
              </label>
              <Textarea
                placeholder="Enter names (one per line)"
                value={namesText}
                onChange={(event) => handleNamesChange(event.target.value)}
                disabled={isSpinning}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                color="primary"
                onClick={handleRandomize}
                disabled={names.length < 2 || isSpinning}
              >
                Randomize
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={handleClearAll}
                disabled={names.length === 0 || isSpinning}
              >
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="pb-0">
          <h3 className="text-lg font-semibold">Wheel Settings</h3>
        </div>
        <div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Spin Duration (seconds)
              </label>
              <Textarea
                value={spinDuration.toString()}
                onChange={(e) => handleDurationChange(e.target.value)}
                disabled={isSpinning}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Color Scheme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colorSchemes.map((scheme, index) => (
                  <button
                    key={index}
                    className={`p-1 rounded-md border-2 ${
                      JSON.stringify(wheelColors) === JSON.stringify(scheme)
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setWheelColors(scheme)}
                    disabled={isSpinning}
                  >
                    <div className="flex h-6 rounded-sm overflow-hidden">
                      {scheme.map((color, i) => (
                        <div
                          key={i}
                          className="flex-1 h-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
