import Link from "next/link";
export default function Footer() {
  return (
    <div className="border-t  dark:text-gray-400 dark:border-[#434952] tracking-wide py-8 font-semibold text-lg w-[55%] container mx-auto bottom-0 ">
      Developed By{" "}
      <Link
        href={"https://github.com/kartik-212004"}
        className="font-bold dark:text-white"
      >
        Kartik
      </Link>
    </div>
  );
}
