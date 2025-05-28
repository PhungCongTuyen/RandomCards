import React from "react";

export const useWheelState = () => {
  // Default names
  const defaultNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Hannah",
  ];

  // State
  const [names, setNames] = React.useState<string[]>(defaultNames);
  const [winner, setWinner] = React.useState<string | null>(null);
  const [isSpinning, setIsSpinning] = React.useState(false);
  const [wheelColors, setWheelColors] = React.useState<string[]>([
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ]);
  const [spinDuration, setSpinDuration] = React.useState(3);
  const [finalRotation, setFinalRotation] = React.useState(0);

  // Calculate winner based on final rotation
  const calculateWinner = (rotation: number) => {
    if (names.length === 0) return null;

    // Normalize the rotation to 0-360 degrees
    const normalizedRotation = rotation % 360;

    // Each segment size in degrees
    const segmentSize = 360 / names.length;

    // The pointer is at the top (0 degrees)
    // When the wheel rotates clockwise, we need to determine which segment is at the top
    // Since the wheel rotates clockwise, the segment at the top is 360 - normalizedRotation degrees from the starting position
    // We need to add half a segment to align with the center of the segment
    let winnerIndex = Math.floor(
      ((360 - normalizedRotation) % 360) / segmentSize
    );

    // Ensure the index is within bounds
    winnerIndex = (winnerIndex + names.length) % names.length;

    return names[winnerIndex];
  };

  // Spin the wheel
  const spinWheel = () => {
    if (names.length < 2 || isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // Generate random rotation (minimum 2 full rotations + random segment)
    const minRotation = 2 * 360;
    const randomRotation = Math.floor(Math.random() * 360);
    const newRotation = finalRotation + minRotation + randomRotation;
    setFinalRotation(newRotation);

    // Determine winner after spin animation completes
    setTimeout(() => {
      const selectedWinner = calculateWinner(newRotation);
      setWinner(selectedWinner);
      setIsSpinning(false);
    }, spinDuration * 1000);
  };

  return {
    names,
    setNames,
    winner,
    isSpinning,
    spinWheel,
    wheelColors,
    setWheelColors,
    spinDuration,
    setSpinDuration,
    finalRotation,
  };
};
