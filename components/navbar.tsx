import { ModeToggle } from "./theme";
import { Bitcoin } from "lucide-react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="flex text-primary flex-row w-full mb-11 justify-around p-5">
      <Link
        href={"/"}
        className="font-bold text-3xl flex flex-row space-x-3 justify-center items-center"
      >
        <Bitcoin className="size-10" />
        <span> Laxmi Crypto Funds</span>
      </Link>
      <div className="w-[4vw]">
        <ModeToggle />
      </div>
    </div>
  );
}
