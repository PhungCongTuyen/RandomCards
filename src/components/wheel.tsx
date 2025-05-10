import { motion, useAnimation } from "motion/react";
import { useMemo, useState } from "react";

export function Wheel() {
  const [result, setResult] = useState("");
  const controls = useAnimation();

  const segments = [
    { label: "🍕 Pizza", color: "#f87171" },
    { label: "🎁 Gift", color: "#60a5fa" },
    { label: "💰 Cash", color: "#34d399" },
    { label: "❌ Nothing", color: "#fbbf24" },
    { label: "🏆 Win", color: "#a78bfa" },
    { label: "🍕 Pizza", color: "#f87171" },
    { label: "🎁 Gift", color: "#60a5fa" },
    { label: "💰 Cash", color: "#34d399" },
    { label: "❌ Nothing", color: "#fbbf24" },
    { label: "🏆 Win", color: "#a78bfa" },
  ];

  const segmentAngle = useMemo(() => {
    return 360 / segments.length;
  }, [segments]);

  const spin = async () => {
    const spins = 10;
    const selected = Math.floor(Math.random() * segments.length);
    const anglePerItem = 360 / segments.length;

    const rotateTo =
      spins * 360 + (360 - selected * anglePerItem - anglePerItem / 2);

    await controls.start({
      rotate: rotateTo,
      transition: { duration: 3, ease: "easeInOut" },
    });

    setResult(segments[selected].label);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700">
        <motion.div
          className="w-full h-full relative flex"
          animate={controls}
          initial={{ rotate: 0 }}
        >
          {segments.map((seg, i) => {
            return (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center"
                style={{
                  transform: `rotate(${segmentAngle * (i + 1)}deg)`,
                  backgroundColor: seg.color,
                  clipPath: `polygon(0% 0%, ${
                    segmentAngle + 15
                  }% 0%, 100% 100%, 0 ${segmentAngle + 15}%)`,
                }}
              >
                <div
                  style={{
                    transform: `rotate(45deg)`,
                  }}
                >
                  {seg.label}
                </div>
              </div>
            );
          })}
        </motion.div>
        <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-b-[20px] border-l-transparent border-r-transparent border-b-red-500" />
      </div>

      <button
        onClick={spin}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Spin
      </button>

      {result && <p className="text-lg font-bold">You got: {result}</p>}
    </div>
  );
}
