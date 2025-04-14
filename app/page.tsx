"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <motion.div
      initial={{ y: "-90%", opacity: 0 }}
      animate={{ y: "0%", opacity: 100 }}
      transition={{ duration: 0.5 }}
      className="text-primary"
    >
      <div className="space-y-2">
        <div className="text-5xl  font-bold">Supported Blockchains</div>
        <div className="text-2xl dark:text-gray-400">Choose A Blockchain</div>
        <div className="flex flex-row space-x-3">
          <Button className="text-sm font-mono">Enterium</Button>
          <Button className="text-sm font-mono">Solana</Button>
        </div>
      </div>
    </motion.div>
  );
}
