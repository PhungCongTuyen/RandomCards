import { ModeToggle } from "@/components/mode-toggle"; // Assuming you have theme toggle

export default function Navbar() {
  return (
    <nav className="w-full border-b px-4 py-2 flex items-center justify-between bg-background">
      <br />
      <div className="text-lg font-semibold">
        <div>Ngoos</div>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
      </div>
    </nav>
  );
}
