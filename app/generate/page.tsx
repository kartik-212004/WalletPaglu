"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Generate() {
  const [value, setValue] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const params = searchParams.get("private_key");

  useEffect(() => {
    if (!params) return;

    setValue(params);

    if (params === "createnewwallet") {
      const wallet = ethers.Wallet.createRandom();
      setPublicKey(wallet.address);
      setPrivateKey(wallet.privateKey);
    } else {
      try {
        const wallet = new ethers.Wallet(params);
        console.log("✅ Wallet verified!");
        setPublicKey(wallet.address);
        setPrivateKey(wallet.privateKey);
      } catch (error) {
        console.error("❌ Invalid private key:", error);
      }
    }
  }, [params]);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ y: "-50%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border border-customgray py-4 px-12 rounded-2xl"
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-4xl font-semibold dark:text-zinc-200">
              Your Secret Mnemonics
            </AccordionTrigger>
            <AccordionContent>{value ?? "Loading..."}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      <motion.div
        initial={{ y: "-50%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border border-customgray pt-4 rounded-2xl"
      >
        <div className="text-4xl font-semibold px-12 my-3 dark:text-zinc-200">
          Ethereum Wallet
        </div>
        <div className="border dark:bg-neutral-800 bg-neutral-100 px-12 font-medium text-xl rounded-lg py-3 border-customgray space-y-3">
          <div>
            <span>Public Key: </span>
            <span className="text-xl break-all dark:text-gray-400">
              {publicKey}
            </span>
          </div>
          <div className="flex items-center">
            <span>Private Key: </span>
            <div className="ml-2 flex-1 overflow-x-auto whitespace-nowrap text-xl bg-transparent dark:text-gray-300">
              <input
                type={showPrivateKey ? "text" : "password"}
                value={privateKey ?? ""}
                readOnly
                className="w-full text-red-600 bg-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="ml-2 text-gray-600 hover:text-black transition"
            >
              {showPrivateKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
