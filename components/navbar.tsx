import { ModeToggle } from "./theme";
import { Bitcoin } from "lucide-react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="flex text-primary flex-row w-full mb-6 md:mb-11 justify-between md:justify-around p-3 md:p-5">
      <Link
        href={"/"}
        className="font-bold text-xl sm:text-2xl md:text-3xl flex flex-row space-x-2 md:space-x-3 justify-center items-center"
      >
        <Bitcoin className="size-6 sm:size-8 md:size-10" />
        <span className="flex flex-col">
          <span className="line-clamp-1"> Laxmi Crypto Funds</span>
          <span className="text-xs sm:text-sm hidden sm:block"> 21 din mai crypto double</span>
        </span>
      </Link>
      <div className="flex items-center">
        <ModeToggle />
      </div>
    </div>
  );
}
