import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SiteHeader = () => {
  return (
    <header className="relative bg-gradient-to-r from-[hsl(220,30%,15%)] via-[hsl(220,25%,18%)] to-[hsl(220,30%,15%)] text-white overflow-hidden">
      {/* Subtle gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--quest-gold))] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-5">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <motion.img
            src="/images/aysek_logo.png"
            alt="AySek Global Study"
            className="h-10 sm:h-14 md:h-16 w-auto drop-shadow-[0_0_8px_hsl(45,80%,55%,0.4)]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
        
        {/* Platform Info */}
        <div className="flex-1 min-w-0">
          <Link to="/" className="block">
            <h1 className="font-display text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[hsl(var(--quest-gold))] leading-tight">
              Building Intercultural Behaviour
            </h1>
            <p className="font-body text-[8px] sm:text-[9px] md:text-[10px] text-white/60 tracking-wide mt-0.5 truncate">
              WebQuest based model for non-philology students
            </p>
          </Link>
        </div>

        {/* Author */}
        <div className="hidden sm:block text-right flex-shrink-0">
          <p className="font-body text-[9px] md:text-[10px] text-white/40 tracking-wide">Author</p>
          <p className="font-display text-[10px] md:text-xs text-[hsl(var(--quest-gold))]/80 font-semibold">A.Sh.Sekerova</p>
        </div>
      </div>

      {/* Bottom gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--quest-gold))]/40 to-transparent" />
    </header>
  );
};

export default SiteHeader;
