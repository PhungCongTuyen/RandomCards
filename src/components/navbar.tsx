"use client";

import { ModeToggle } from "@/components/mode-toggle"; // Assuming you have theme toggle
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();

  const goHome = () => {
    router.push("/");
  };

  return (
    <nav className="w-full border-b px-4 py-2 flex items-center justify-between bg-background">
      {pathName !== "/" ? (
        <Button variant="outline" size="icon" onClick={goHome}>
          <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      ) : (
        <br />
      )}
      <div className="text-lg font-semibold">
        <div>NgoosVN</div>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
      </div>
    </nav>
  );
}
