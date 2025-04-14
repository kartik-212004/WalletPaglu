"use client";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Wallet() {
  return (
    <motion.div
      initial={{ y: "-50%", opacity: 0 }}
      animate={{ y: "0", opacity: "100" }}
      className="space-y-2"
    >
      <div className="text-5xl font-bold">Secure Access Key</div>
      <div className="text-2xl dark:text-gray-300 font-medium">
        This phrase is your key. Store it securely and never share it.
      </div>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="password"
          className="dark:bg-darkcolor"
          placeholder="Enter your Private Key or ( leave it black to Generate one )"
        />
        <Button type="submit">Subscribe</Button>
      </div>
    </motion.div>
  );
}
