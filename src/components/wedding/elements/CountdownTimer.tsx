import React from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const CountdownTimer = ({ timeLeft }: CountdownTimerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.5, duration: 1.5 }}
      className="flex justify-center mb-10 max-w-xl mx-auto relative"
    >
      <div className="flex flex-row gap-6 md:gap-10 px-10 py-5 border-t-2 border-b-2 border-white/50">
        <CountdownItem value={timeLeft.days} label="Days" />
        <CountdownItem value={timeLeft.hours} label="Hours" />
        <CountdownItem value={timeLeft.minutes} label="Minutes" />
        <CountdownItem value={timeLeft.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
};

interface CountdownItemProps {
  value: number;
  label: string;
}

const CountdownItem = ({ value, label }: CountdownItemProps) => {
  // Format the value with leading zero if needed
  const formattedValue = value < 10 ? `0${value}` : value;

  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
      className="flex flex-col items-center justify-center"
    >
      <motion.span
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 8 }}
        className="text-4xl md:text-5xl font-serif text-white mb-1 font-medium drop-shadow-lg"
      >
        {formattedValue}
      </motion.span>
      <span className="text-xs uppercase tracking-wider text-white/90 font-medium mt-1">
        {label}
      </span>
    </motion.div>
  );
};

export default CountdownTimer;
