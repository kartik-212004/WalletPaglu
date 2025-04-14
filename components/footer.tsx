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
          width={70}
          height={70}
          src="https://media.tenor.com/8Y1OBCtpf4AAAAAi/spider-man-no-way-home-marvel-studios.gif"
          alt=""
        />
      </div>
    </motion.div>
  );
}
