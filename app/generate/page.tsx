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
import { Eye, Copy, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Generate() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [mnemonics, setMnemonics] = useState<string[] | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const params = searchParams.get("private_key");

  useEffect(() => {
    if (!params) return;

    if (
      localStorage.getItem("public_key") &&
      localStorage.getItem("private_key")
    ) {
      setPublicKey(localStorage.getItem("public_key"));
      setPrivateKey(localStorage.getItem("private_key"));
      return;
    }
    if (params === "createnewwallet") {
      const wallet = ethers.Wallet.createRandom();
      setPublicKey(wallet.address);
      setPrivateKey(wallet.privateKey);
      const phrase = wallet.mnemonic?.phrase;
      if (phrase) {
        const wordsArray = phrase.split(" ");
        setMnemonics(wordsArray);
        console.log(wordsArray);
      }
    } else {
      try {
        const wallet = new ethers.Wallet(params);
        console.log("✅ Wallet verified!");
        setPublicKey(wallet.address);
        setPrivateKey(wallet.privateKey);
        localStorage.setItem("public_key", wallet.address);
        localStorage.setItem("private_key", wallet.privateKey);
      } catch (error) {
        console.error("Invalid private key:", error);
      }
    }
  }, [params]);

  const handleCopyMnemonics = () => {
    if (!mnemonics) return;
    const mnemonicString = mnemonics.join(" ");
    navigator.clipboard
      .writeText(mnemonicString)
      .then(() => {
        console.log("📋 Mnemonics copied to clipboard!");
        toast("Copied To Clipboard");
      })
      .catch((err) => {
        toast("Failed to Copy");
        console.error("❌ Failed to copy mnemonics:", err);
      });
  };

  return (
    <div className="space-y-4">
      {mnemonics && (
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
              <AccordionContent>
                <div className="grid grid-cols-4 grid-rows-3 gap-2 text-center">
                  {mnemonics?.map((e, i) => (
                    <div
                      onClick={handleCopyMnemonics}
                      className="dark:bg-neutral-800 bg-neutral-100 flex justify-center text-2xl dark:text-neutral-200 items-center rounded-lg h-12"
                      key={i}
                    >
                      {e}
                    </div>
                  ))}
                  <div className="mt-3 dark:text-neutral-300 flex flex-row space-x-2 items-center text-lg font-medium">
                    <button
                      onClick={handleCopyMnemonics}
                      className="mt-3 dark:text-neutral-300 flex flex-row space-x-2 items-center text-lg font-medium hover:opacity-80 transition"
                    >
                      <span>Copy to Clipboard</span> <Copy size={18} />
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      )}

      <motion.div
        initial={{ y: "-50%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="border border-customgray pt-4 rounded-2xl"
      >
        <div className="text-4xl font-semibold px-12 my-3 dark:text-zinc-200">
          Ethereum Wallet
        </div>
        <div className="border font-mono dark:text-gray-200 dark:bg-neutral-800 bg-neutral-100 px-12 font-normal text-xl rounded-lg py-3 border-customgray space-y-3">
          <div>
            <span>Public Key: </span>
            <span className="text-base break-all dark:text-gray-400">
              {publicKey}
            </span>
          </div>
          <div className="flex font-mono items-center">
            <span>Private Key: </span>
            <div className="ml-2 flex-1 overflow-x-auto whitespace-nowrap text-base bg-transparent dark:text-gray-300">
              <input
                type={showPrivateKey ? "text" : "password"}
                value={privateKey ?? ""}
                readOnly
                className="w-full dark:text-gray-400 bg-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="ml-2 hover:text-gray-300 text-white transition"
            >
              {showPrivateKey ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
