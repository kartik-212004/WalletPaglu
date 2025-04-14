"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
export default function Footer() {
  return (
    <motion.div
      initial={{ y: "50%", opacity: 0 }}
      animate={{ y: "0%", opacity: 100 }}
      transition={{ duration: 0.5 }}
      className="border-t flex flex-row items-center space-x-2 dark:border-[#434952] tracking-wide font-medium text-lg w-[55%] container mx-auto bottom-0 "
    >
      <span>
        Developed By{" "}
        <Link
          href={"https://github.com/kartik-212004"}
          className="font-bold dark:text-white"
        >
          Kartik
        </Link>
      </span>

      <div>
        <Image
          width={80}
          height={80}
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGhyMWdvYW1qYTh2OXlnbmY3cGl4ZGlyMTNjZmtndWQxMWhyNWRoNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/W3fOvEAyRZ9TxDsf3Y/giphy.gif"
          alt=""
        />
      </div>
    </motion.div>
  );
}
