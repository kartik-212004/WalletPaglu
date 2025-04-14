import { ModeToggle } from "./theme";
import { Bitcoin } from "lucide-react";
export default function Navbar() {
  return (
    <div className="flex text-primary flex-row w-full  justify-around p-5">
      <div className="font-bold text-3xl flex flex-row space-x-3 justify-center items-center">
        <Bitcoin className="size-10" />
        <span> Laxmi Crypto Funds</span>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
