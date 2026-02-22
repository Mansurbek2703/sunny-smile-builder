import { motion } from "framer-motion";

const culturalEmojis = ["🌍", "🕌", "⛩️", "🗽", "🎭", "🎎", "🏛️", "🌸", "🎪", "✨", "🌐", "🤝"];

const FloatingCulturalElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {culturalEmojis.map((emoji, i) => {
        const size = 16 + (i % 4) * 6;
        const left = (i * 17 + 5) % 95;
        const top = (i * 23 + 10) % 90;
        const duration = 15 + (i % 5) * 5;
        const delay = i * 1.2;

        return (
          <motion.div
            key={i}
            className="absolute select-none opacity-[0.06]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: `${size}px`,
            }}
            animate={{
              y: [0, -20, 0, 15, 0],
              x: [0, 10, -10, 5, 0],
              rotate: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        );
      })}

      {/* Subtle glowing orbs */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(45 80% 55% / 0.03), transparent 70%)",
          right: "-100px",
          top: "20%",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(220 50% 50% / 0.04), transparent 70%)",
          left: "-80px",
          bottom: "30%",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
};

export default FloatingCulturalElements;
