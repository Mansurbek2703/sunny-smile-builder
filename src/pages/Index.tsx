import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import FloatingCulturalElements from "@/components/FloatingCulturalElements";

const quests = [
  {
    number: 1,
    title: "Thanksgiving & Navruz",
    subtitle: "Traditions of Gratitude and Renewal",
    module: "Module 1: Holidays and Traditions",
    image: "/images/cards/quest1_thanksgiving_navruz.jpg",
    available: true,
  },
  {
    number: 2,
    title: "Holidays Around the World",
    subtitle: "Explore global celebrations and traditions",
    module: "Module 1: Holidays and Traditions",
    image: "/images/cards/quest2_holidays_world.jpg",
    available: true,
  },
  {
    number: 3,
    title: "Cultural Stereotypes",
    subtitle: "Truth or Myth — Challenge your assumptions",
    module: "Module 2: Cultural Awareness",
    image: "/images/cards/module2_awareness.jpg",
    available: true,
  },
  {
    number: 4,
    title: "City Through Tourist Eyes",
    subtitle: "Explore cities from a visitor's perspective",
    module: "Module 3: Travel & Tourism",
    image: "/images/cards/module3_travel.jpg",
    available: true,
  },
  {
    number: 5,
    title: "Culture Shock & Etiquette",
    subtitle: "Navigate cross-cultural adaptation",
    module: "Module 4: Cultural Adaptation",
    image: "/images/cards/module4_adaptation.jpg",
    available: true,
  },
  {
    number: 6,
    title: "Food Culture",
    subtitle: "Explore global cuisines and dining etiquette",
    module: "Module 5: Food & Dining",
    image: "/images/cards/module5_food.jpg",
    available: true,
  },
  {
    number: 7,
    title: "Cultural Heroes",
    subtitle: "Discover outstanding cultural figures",
    module: "Module 6: Cultural Heritage",
    image: "/images/cards/module6_heroes.jpg",
    available: true,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden border-x-2 sm:border-x-4 border-[hsl(var(--frame-color))] relative">
      {/* Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full w-auto h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-0 animate-[fadeIn_2s_ease-in-out_forwards]"
          src="/videos/bg-culture.mp4"
        />
        <div className="absolute inset-0 bg-[hsl(220,22%,8%)]/40" />
      </div>

      <div className="relative z-10">
      <SiteHeader />
      <FloatingCulturalElements />

      {/* Hero */}
      <header className="relative py-16 md:py-28 px-4 sm:px-8 lg:px-12 z-10">
        <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(var(--quest-gold))]/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--quest-gold))]/10 text-[hsl(var(--quest-gold))] mb-6 border border-[hsl(var(--quest-gold))]/20"
          >
            <span className="text-sm font-medium font-body">Interactive Learning Platform</span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
            <span className="text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.5), 0 2px 10px rgba(0,0,0,0.8)' }}>Building</span>
            <br />
            <span className="text-white">Intercultural </span>
            <span className="text-[hsl(var(--quest-sky))]">Behaviour</span>
          </h1>

          <p className="font-body text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Discover cultures, traditions, and languages through <strong className="text-[hsl(160,65%,70%)]">immersive interactive quests</strong>.
            Learn by exploring, comparing, and creating.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-white/90 font-body font-medium drop-shadow"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[hsl(var(--quest-gold))]" /> 7 WebQuests
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> Interactive Tasks
            </span>
          </motion.div>
        </motion.div>
      </header>

      {/* Quest Grid */}
      <section className="px-4 sm:px-8 lg:px-12 pb-24 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {quests.map((q) => (
            <motion.div key={q.number} variants={item}>
              <Link to={`/quest/${q.number}`} className="block group">
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(var(--quest-gold)/0.3)] border-2 border-white/10 hover:border-[hsl(var(--quest-gold))]/50">
                  <img
                    src={q.image}
                    alt={q.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[hsl(220,22%,8%)]/40 group-hover:bg-[hsl(220,22%,8%)]/30 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-body font-bold uppercase tracking-widest text-[hsl(160,65%,70%)] mb-1 drop-shadow">
                      {q.module}
                    </span>
                    <span className="font-display text-4xl font-bold mb-1 text-[hsl(var(--quest-gold))] drop-shadow-lg">
                      {String(q.number).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl font-semibold drop-shadow-md">{q.title}</h3>
                    <p className="font-body text-sm text-white/90 mt-1 drop-shadow">{q.subtitle}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center space-y-1 relative z-10 bg-[hsl(220,22%,8%)]/60 backdrop-blur-sm">
        <p className="font-body text-sm text-white/70">
          Building Intercultural Behaviour — Interactive Learning Platform
        </p>
        <p className="font-body text-xs text-white/50">
          Author: <span className="font-semibold text-[hsl(var(--quest-gold))]">A.Sh.Sekerova</span> | Developed by <span className="font-semibold text-[hsl(var(--quest-sky))]">Mansurbek Qazaqov</span>
        </p>
      </footer>
      </div>
    </div>
  );
};

export default Index;
