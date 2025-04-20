import React from "react";
import { motion } from "framer-motion";

interface ActionButtonProps {
  variant: "outline" | "primary";
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const ActionButton = ({ variant, onClick, icon, label }: ActionButtonProps) => {
  const buttonClasses = {
    outline:
      "border border-white/40 text-white px-7 py-3.5 rounded-full backdrop-blur-sm shadow-md bg-white/20 hover:bg-white/30",
    primary:
      "border border-rose-300/40 bg-gradient-to-r from-rose-700/80 to-rose-800/80 text-white px-7 py-3.5 rounded-full backdrop-blur-sm shadow-md hover:from-rose-500/90 hover:to-rose-600/90",
  };

  const spanClasses = {
    outline:
      "absolute inset-0 w-0 bg-gradient-to-r from-white/20 to-white/30 transition-all duration-700 group-hover:w-full",
    primary:
      "absolute inset-0 w-0 bg-gradient-to-r from-rose-400/30 to-rose-500/40 transition-all duration-700 group-hover:w-full",
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.5 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative overflow-hidden ${buttonClasses[variant]} w-2/3 sm:w-full md:w-full lg:min-w-[200px] transition-all duration-500`}
    >
      <motion.span className={spanClasses[variant]}></motion.span>
      <span className="relative flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-semibold">
        {icon}
        {label}
      </span>
    </motion.button>
  );
};

export default ActionButton;
