"use client";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie, setCookie } from 'cookies-next';
import { Upload } from "lucide-react";

export default function Wallet() {
  const [value, setValue] = useState<string>("createnewwallet");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookiePublicKey = getCookie("public_key");
      const cookiePrivateKey = getCookie("private_key");
      
      if (cookiePublicKey && cookiePrivateKey) {
        console.log("✅ Wallet found in cookies");
        router.push("/generate");
        return;
      }
      
      if (localStorage.getItem("public_key") && localStorage.getItem("private_key")) {
        console.log("✅ Wallet found in localStorage");
        router.push("/generate");
      }
    }
  }, [router]);

  useEffect(() => {
    if (value !== "createnewwallet") {
      try {
        const wallet = new ethers.Wallet(value);
        console.log("✅ Wallet verified!");
        toast("Wallet validated successfully");
        console.log("Address:", wallet.address);
      } catch (error) {
        console.error("Invalid private key:", error);
        if (value.length > 0 && value !== "createnewwallet") {
          toast.error("Invalid private key format");
        }
      }
    }
  }, [value]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const contents = e.target?.result as string;
        const walletData = JSON.parse(contents);
        
        if (!walletData.publicKey || !walletData.privateKey) {
          toast.error("Invalid wallet backup file");
          setIsUploading(false);
          return;
        }
        
        try {
          const wallet = new ethers.Wallet(walletData.privateKey);
          
          if (wallet.address !== walletData.publicKey) {
            toast.error("Public key in backup doesn't match the private key");
            setIsUploading(false);
            return;
          }
          
          localStorage.setItem("public_key", walletData.publicKey);
          localStorage.setItem("private_key", walletData.privateKey);
          setCookie("public_key", walletData.publicKey, { maxAge: 60 * 60 * 24 * 30 });
          setCookie("private_key", walletData.privateKey, { maxAge: 60 * 60 * 24 * 30 });
          
          toast.success("Wallet imported successfully");
          
          router.push("/generate");
        } catch (error) {
          console.error("Invalid private key in backup:", error);
          toast.error("Invalid private key in backup file");
        }
      } catch (error) {
        console.error("Failed to parse wallet backup:", error);
        toast.error("Invalid backup file format");
      }
      
      setIsUploading(false);
    };
    
    reader.onerror = () => {
      toast.error("Failed to read the file");
      setIsUploading(false);
    };
    
    reader.readAsText(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ y: "-50%", opacity: 0 }}
      animate={{ y: "0", opacity: "100" }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div className="text-5xl font-bold">Secure Access Key</div>
      <div className="text-2xl dark:text-gray-300 font-medium">
        This phrase is your key. Store it securely and never share it.
      </div>
      <div className="flex w-full items-center space-x-2">
        <Input
          onChange={(e) => {
            setValue(e.target.value || "createnewwallet");
          }}
          type="password"
          className="dark:bg-darkcolor my-4 placeholder:text-neutral-400 placeholder:font-mono"
          placeholder="Enter your Private Key or (leave it blank to Generate)"
        />
        <Link href={`/generate/?private_key=${value}`}>
          <Button type="button">Generate Wallet</Button>
        </Link>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-medium mb-3">Restore from Backup</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Import your wallet from a previous backup file.
        </p>
        
        <input 
          type="file" 
          accept=".json"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden" 
        />
        
        <Button
          onClick={triggerFileUpload}
          variant="secondary"
          disabled={isUploading}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          {isUploading ? "Importing..." : "Import Wallet Backup"}
        </Button>
      </div>
    </motion.div>
  );
}
