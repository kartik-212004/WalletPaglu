import Link from "next/link";
export default function Footer() {
  return (
    <div className="border-t dark:border-[#2a3039] tracking-wide py-8 font-medium text-xl w-[55%] container mx-auto bottom-0 ">
      Developed By{" "}
      <Link href={"https://github.com/kartik-212004"} className="font-bold">
        Kartik
      </Link>
    </div>
  );
}
