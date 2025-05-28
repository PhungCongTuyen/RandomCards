import React from "react";
import { motion } from "framer-motion";

interface LuckyWheelProps {
  names: string[];
  isSpinning: boolean;
  colors: string[];
  spinDuration: number;
}

export const LuckyWheel: React.FC<LuckyWheelProps> = ({
  names,
  isSpinning,
  colors,
  spinDuration,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = React.useState(0);
  const [targetRotation, setTargetRotation] = React.useState(0);

  // Draw the wheel
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (names.length === 0) {
      // Draw empty wheel
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "#e4e4e7";
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.fillStyle = "#71717a";
      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Add names", centerX, centerY);
      return;
    }

    // Draw segments
    const totalNames = names.length;
    const arcSize = (2 * Math.PI) / totalNames;

    names.forEach((name, index) => {
      // Calculate angles - we need to offset by -Math.PI/2 to start at the top (0 degrees)
      const startAngle = index * arcSize - Math.PI / 2;
      const endAngle = (index + 1) * arcSize - Math.PI / 2;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Fill with color
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      // Add border
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      // Add name text
      const textAngle = startAngle + arcSize / 2;
      const textRadius = radius * 0.75;
      const textX = centerX + textRadius * Math.cos(textAngle);
      const textY = centerY + textRadius * Math.sin(textAngle);

      // Save context state
      ctx.save();

      // Position and rotate text
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);

      // Draw text
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.min(16, 200 / totalNames)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Truncate text if too long
      const maxLength = 12;
      const displayName =
        name.length > maxLength ? name.substring(0, maxLength) + "..." : name;
      ctx.fillText(displayName, 0, 0);

      // Restore context state
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#d1d5db";
    ctx.stroke();
  }, [names, colors, rotation, isSpinning]);

  // Handle spinning animation
  React.useEffect(() => {
    if (isSpinning && names.length > 0) {
      // Generate random rotation (minimum 2 full rotations + random segment)
      const minRotation = 2 * 360;
      const randomRotation = Math.floor(Math.random() * 360);
      const newTargetRotation = rotation + minRotation + randomRotation;

      setTargetRotation(newTargetRotation);
    }
  }, [isSpinning, rotation, names]);

  return (
    <div className="w-full aspect-square relative">
      <motion.canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="w-full h-full lucky-wheel-canvas"
        animate={{
          rotate: targetRotation,
        }}
        transition={{
          type: "spring",
          duration: spinDuration,
          bounce: 0.2,
        }}
        onAnimationComplete={() => {
          setRotation(targetRotation % 360);
        }}
      />
      {/* Triangle pointer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-primary"></div>
      </div>
    </div>
  );
};
