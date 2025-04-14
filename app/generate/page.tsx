"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
export default function Generate() {
  return (
    <div>
      <motion.div className="border border-customgray p-4 rounded-2xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-4xl font-medium">
              Your Secret Mnemonics
            </AccordionTrigger>
            <AccordionContent>hello</AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
}
