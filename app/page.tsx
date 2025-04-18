"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { getCookie } from 'cookies-next';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookiePublicKey = getCookie("public_key");
      
      if (cookiePublicKey) {
        console.log("✅ Wallet found in cookies");
        router.push("/generate");
        return;
      }
      
      if (localStorage.getItem("public_key")) {
        console.log("✅ Wallet found in localStorage");
        router.push("/generate");
      }
    }
  }, [router]);

  return (
    <motion.div
      initial={{ y: "-50%", opacity: 0 }}
      animate={{ y: "0%", opacity: 100 }}
      transition={{ duration: 0.5 }}
      className="text-primary"
    >
      <div className="space-y-2">
        <div className="text-5xl  font-bold">Supported Blockchains</div>
        <div className="text-2xl dark:text-gray-400">Choose A Blockchain</div>
        <div className="flex flex-row space-x-3">
          <Link
            onClick={() => {
              toast("Enterium Wallet Selected", {
                description: new Date().toDateString(),
                action: {
                  label: "Undo",
                  onClick: () => router.push("/"),
                },
              });
            }}
            href={"/wallet"}
          >
            <Button className="text-sm font-mono">Enterium</Button>
          </Link>
          <Link
            onClick={() => {
              toast("Solana Wallet Selected", {
                description: new Date().toDateString(),
                action: {
                  label: "Undo",
                  onClick: () => router.push("/"),
                },
              });
            }}
            href={"/wallet"}
          >
            <Button className="text-sm font-mono">Solana</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
