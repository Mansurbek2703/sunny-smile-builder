import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SiteHeader = () => {
  return (
    <header className="relative bg-gradient-to-r from-[hsl(210,45%,88%)] via-[hsl(190,40%,92%)] to-[hsl(170,35%,88%)] text-foreground overflow-hidden shadow-lg">
      {/* Top accent line — vivid gradient */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(var(--quest-sky))] via-[hsl(var(--quest-gold))] to-[hsl(var(--quest-emerald))]" />
      
      <div className="w-full px-4 sm:px-8 lg:px-12 py-3 sm:py-4 flex items-center gap-4 sm:gap-6">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <motion.img
            src="/images/aysek_logo.png"
            alt="AySek Global Study"
            className="h-12 sm:h-16 md:h-[72px] w-auto drop-shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </Link>
        
        {/* Platform Info */}
        <div className="flex-1 min-w-0">
          <Link to="/" className="block">
            <h1 className="font-display text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase text-[hsl(210,55%,25%)] leading-tight">
              Building Intercultural Behaviour
            </h1>
            <p className="font-body text-[9px] sm:text-[10px] md:text-xs text-[hsl(210,20%,45%)] tracking-wide mt-1 truncate">
              WebQuest based model for non-philology students
            </p>
          </Link>
        </div>

        {/* Author */}
        <div className="hidden sm:block text-right flex-shrink-0">
          <p className="font-body text-[10px] md:text-xs text-[hsl(210,15%,50%)] tracking-wide">Author</p>
          <p className="font-display text-xs md:text-sm text-[hsl(210,55%,25%)] font-semibold">A.Sh.Sekerova</p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[hsl(var(--quest-sky))]/60 via-[hsl(var(--quest-gold))]/80 to-[hsl(var(--quest-emerald))]/60" />
    </header>
  );
};

export default SiteHeader;
