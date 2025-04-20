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
      className="border-t flex flex-row justify-center items-center space-x-2 dark:border-[#434952] tracking-wide font-medium text-sm sm:text-base md:text-lg w-full md:w-[80%] lg:w-[70%] xl:w-[55%] container mx-auto bottom-0 py-3"
    >
      <span className="text-center">
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
          unoptimized
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10"
          src="https://media.tenor.com/8Y1OBCtpf4AAAAAi/spider-man-no-way-home-marvel-studios.gif"
          alt=""
        />
      </div>
    </motion.div>
  );
}
