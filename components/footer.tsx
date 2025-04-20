"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
export default function Footer() {
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 100 }}
      transition={{ duration: 0.4 }}
      className="border-t fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm shadow-md dark:shadow-gray-800/20 z-10 flex flex-row justify-center items-center space-x-2 dark:border-[#434952] tracking-wide font-medium text-sm sm:text-base md:text-lg w-full py-3 px-4"
    >
      <div className="flex items-center justify-center space-x-2 w-full max-w-screen-xl mx-auto">
        <span className="text-center">
          Developed By{" "}
          <Link
            href={"https://github.com/kartik-212004"}
            className="font-bold dark:text-white hover:text-primary/80 transition-colors duration-200"
          >
            Kartik
          </Link>
        </span>

        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            unoptimized
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10"
            src="https://media.tenor.com/8Y1OBCtpf4AAAAAi/spider-man-no-way-home-marvel-studios.gif"
            alt=""
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
