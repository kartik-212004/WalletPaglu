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
import { Eye, Copy, EyeOff, RefreshCw, Trash2, AlertTriangle, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Generate() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [mnemonics, setMnemonics] = useState<string[] | null>(null);
  const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const params = searchParams.get("private_key");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookiePublicKey = getCookie("public_key") as string | undefined;
      const cookiePrivateKey = getCookie("private_key") as string | undefined;
      
      if (cookiePublicKey && cookiePrivateKey) {
        setPublicKey(cookiePublicKey);
        setPrivateKey(cookiePrivateKey);
        console.log("Wallet loaded from cookies:", cookiePublicKey);
        
        localStorage.setItem("public_key", cookiePublicKey);
        localStorage.setItem("private_key", cookiePrivateKey);
        
        if (!params) return;
      } else {
        const storedPublicKey = localStorage.getItem("public_key");
        const storedPrivateKey = localStorage.getItem("private_key");
        
        if (storedPublicKey && storedPrivateKey) {
          setPublicKey(storedPublicKey);
          setPrivateKey(storedPrivateKey);
          
          setCookie("public_key", storedPublicKey, { maxAge: 60 * 60 * 24 * 30 });
          setCookie("private_key", storedPrivateKey, { maxAge: 60 * 60 * 24 * 30 });
          
          console.log("✅ Wallet loaded from localStorage and synced to cookies:", storedPublicKey);
          
          if (!params) return;
        } else if (!params) {
          router.push("/");
          return;
        }
      }
    }

    if (!params) return;

    if (params === "createnewwallet") {
      const wallet = ethers.Wallet.createRandom();
      setPublicKey(wallet.address);
      setPrivateKey(wallet.privateKey);
      
      localStorage.setItem("public_key", wallet.address);
      localStorage.setItem("private_key", wallet.privateKey);
      setCookie("public_key", wallet.address, { maxAge: 60 * 60 * 24 * 30 });
      setCookie("private_key", wallet.privateKey, { maxAge: 60 * 60 * 24 * 30 });
      
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
        setCookie("public_key", wallet.address, { maxAge: 60 * 60 * 24 * 30 }); 
        setCookie("private_key", wallet.privateKey, { maxAge: 60 * 60 * 24 * 30 });
      } catch (error) {
        console.error("Invalid private key:", error);
      }
    }
  }, [params, router]);

  const handleCopyMnemonics = () => {
    if (!mnemonics) return;
    const mnemonicString = mnemonics.join(" ");
    navigator.clipboard
      .writeText(mnemonicString)
      .then(() => {
        console.log("Mnemonics copied to clipboard!");
        toast("Copied To Clipboard");
      })
      .catch((err) => {
        toast("Failed to Copy");
        console.error("Failed to copy mnemonics:", err);
      });
  };

  const handleCopyPublicKey = () => {
    if (!publicKey) return;
    navigator.clipboard
      .writeText(publicKey)
      .then(() => {
        console.log("Public key copied to clipboard!");
        toast("Public Key Copied To Clipboard");
      })
      .catch((err) => {
        toast.error("Failed to Copy");
        console.error("Failed to copy public key:", err);
      });
  };

  const handleCopyPrivateKey = () => {
    if (!privateKey) return;
    navigator.clipboard
      .writeText(privateKey)
      .then(() => {
        console.log("📋 Private key copied to clipboard!");
        toast("Private Key Copied To Clipboard");
      })
      .catch((err) => {
        toast.error("Failed to Copy");
        console.error("❌ Failed to copy private key:", err);
      });
  };

  const regenerateMnemonics = () => {
    if (!privateKey) return;
    try {
      toast("Recovery phrase can only be shown for newly created wallets", {
        description: "For security, we cannot recover the original phrase for imported wallets."
      });
    } catch (error) {
      console.error("Error regenerating mnemonics:", error);
      toast.error("Could not regenerate recovery phrase");
    }
  };

  const clearWalletData = () => {
    localStorage.removeItem("public_key");
    localStorage.removeItem("private_key");
    deleteCookie("public_key");
    deleteCookie("private_key");
    
    toast("Wallet data cleared from all storage");
    router.push("/");
  };

  const createNewWallet = () => {
    localStorage.removeItem("public_key");
    localStorage.removeItem("private_key");
    deleteCookie("public_key");
    deleteCookie("private_key");
    
    router.push("/wallet");
  };

  const backupWallet = () => {
    if (!publicKey || !privateKey) {
      toast.error("No wallet data to backup");
      return;
    }
    
    try {
      const walletData = {
        publicKey,
        privateKey,
        createdAt: new Date().toISOString(),
        network: "Ethereum"
      };
      
      const jsonData = JSON.stringify(walletData, null, 2);
      
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `wallet-backup-${publicKey.substring(0, 8)}.json`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Wallet backup file created", {
        description: "Store this file securely and never share it"
      });
    } catch (error) {
      console.error("Failed to backup wallet:", error);
      toast.error("Failed to create backup");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
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
          <div className="flex items-center">
            <span>Public Key: </span>
            <div className="ml-2 flex-1 overflow-x-auto whitespace-nowrap text-base dark:text-gray-400">
              {publicKey}
            </div>
            <button
              onClick={handleCopyPublicKey}
              className="ml-2 hover:text-gray-300 text-white transition"
              title="Copy public key"
            >
              <Copy size={20} />
            </button>
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
            <button
              onClick={handleCopyPrivateKey}
              className="ml-2 hover:text-gray-300 text-white transition"
              title="Copy private key"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {!mnemonics && publicKey && (
        <motion.div
          initial={{ y: "-50%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border border-customgray py-4 px-12 rounded-2xl mt-4"
        >
          <div className="text-2xl font-semibold dark:text-zinc-200 mb-3">
            Recovery Phrase Information
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Your recovery phrase is only available when you first create a wallet. 
            For security reasons, we cannot recover it from an existing private key.
          </p>
          <Button 
            onClick={regenerateMnemonics}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} /> Show Recovery Info
          </Button>
        </motion.div>
      )}

      {/* Delete confirmation overlay - show when delete is clicked */}
      {showDeleteConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-lg max-w-md w-full">
            <div className="flex items-center mb-4 text-red-500">
              <AlertTriangle size={24} className="mr-2" />
              <h3 className="text-xl font-bold">Delete Wallet</h3>
            </div>
            <p className="mb-4 dark:text-gray-300">
              Are you sure you want to delete this wallet? This action cannot be undone, and you will lose access to this wallet unless you have backed up your private key or recovery phrase.
            </p>
            <div className="flex space-x-3 justify-end">
              <Button
                variant="outline"
                onClick={handleCancelDelete}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={clearWalletData}
              >
                Delete Wallet
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <Button 
            onClick={handleDeleteClick}
            variant="destructive" 
            className="flex items-center gap-2"
          >
            <Trash2 size={16} /> Delete Wallet
          </Button>
          
          <Button 
            onClick={backupWallet}
            variant="secondary" 
            className="flex items-center gap-2"
          >
            <Save size={16} /> Backup Wallet
          </Button>
        </div>
        
        <Button 
          onClick={createNewWallet}
          variant="outline" 
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} /> Create New Wallet
        </Button>
      </div>
    </div>
  );
}
