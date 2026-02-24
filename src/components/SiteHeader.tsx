import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SiteHeader = () => {
  return (
    <header className="relative bg-gradient-to-r from-[hsl(210,60%,92%)] via-[hsl(200,50%,95%)] to-[hsl(220,55%,90%)] text-foreground overflow-hidden shadow-md">
      {/* Top accent line — vivid gradient */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--quest-sky))] via-[hsl(var(--quest-gold))] to-[hsl(var(--quest-emerald))]" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center gap-3 sm:gap-5">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <motion.img
            src="/images/aysek_logo.png"
            alt="AySek Global Study"
            className="h-10 sm:h-14 md:h-16 w-auto drop-shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
        
        {/* Platform Info */}
        <div className="flex-1 min-w-0">
          <Link to="/" className="block">
            <h1 className="font-display text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[hsl(220,50%,30%)] leading-tight">
              Building Intercultural Behaviour
            </h1>
            <p className="font-body text-[8px] sm:text-[9px] md:text-[10px] text-[hsl(220,20%,45%)] tracking-wide mt-0.5 truncate">
              WebQuest based model for non-philology students
            </p>
          </Link>
        </div>

        {/* Author */}
        <div className="hidden sm:block text-right flex-shrink-0">
          <p className="font-body text-[9px] md:text-[10px] text-[hsl(220,15%,50%)] tracking-wide">Author</p>
          <p className="font-display text-[10px] md:text-xs text-[hsl(220,50%,30%)] font-semibold">A.Sh.Sekerova</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[hsl(var(--quest-sky))]/60 via-[hsl(var(--quest-gold))]/80 to-[hsl(var(--quest-emerald))]/60" />
    </header>
  );
};

export default SiteHeader;
