"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children, width = "100%" }: RevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ position: "relative", width }}
    >
      {children}
    </motion.div>
  );
};

