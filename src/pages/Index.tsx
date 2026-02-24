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
    color: "from-[hsl(220,40%,20%)] to-[hsl(45,80%,45%)]",
    image: "/images/webquest1/hero1.jpg",
    available: true,
  },
  {
    number: 2,
    title: "Holidays Around the World",
    subtitle: "Explore global celebrations and traditions",
    module: "Module 1: Holidays and Traditions",
    color: "from-[hsl(220,50%,25%)] to-[hsl(200,60%,45%)]",
    image: "/images/webquest2/hero1.jpg",
    available: true,
  },
  {
    number: 3,
    title: "Cultural Stereotypes",
    subtitle: "Truth or Myth — Challenge your assumptions",
    module: "Module 2: Cultural Awareness",
    color: "from-[hsl(265,40%,30%)] to-[hsl(220,50%,40%)]",
    image: "/images/webquest3/hero1.jpg",
    available: true,
  },
  {
    number: 4,
    title: "City Through Tourist Eyes",
    subtitle: "Explore cities from a visitor's perspective",
    module: "Module 3: Travel & Tourism",
    color: "from-[hsl(18,60%,40%)] to-[hsl(45,80%,50%)]",
    image: "/images/webquest4/hero1.jpg",
    available: true,
  },
  {
    number: 5,
    title: "Culture Shock & Etiquette",
    subtitle: "Navigate cross-cultural adaptation",
    module: "Module 4: Cultural Adaptation",
    color: "from-[hsl(265,40%,25%)] to-[hsl(18,60%,45%)]",
    image: "/images/webquest5/hero1.jpg",
    available: true,
  },
  {
    number: 6,
    title: "Food Culture",
    subtitle: "Explore global cuisines and dining etiquette",
    module: "Module 5: Food & Dining",
    color: "from-[hsl(18,50%,35%)] to-[hsl(160,50%,35%)]",
    image: "/images/webquest6/hero1.jpg",
    available: true,
  },
  {
    number: 7,
    title: "Cultural Heroes",
    subtitle: "Discover outstanding cultural figures",
    module: "Module 6: Cultural Heritage",
    color: "from-[hsl(220,45%,25%)] to-[hsl(160,50%,35%)]",
    image: "/images/webquest7/hero1.jpg",
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
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-0 animate-[fadeIn_2s_ease-in-out_forwards]"
          src="/videos/bg-culture.mp4"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10">
      <SiteHeader />
      <FloatingCulturalElements />

      {/* Hero */}
      <header className="relative py-16 md:py-28 px-6 z-10">
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

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="text-gradient">Building</span>
            <br />
            <span className="text-foreground/80">Intercultural Behaviour</span>
          </h1>

          <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover cultures, traditions, and languages through immersive interactive quests.
            Learn by exploring, comparing, and creating.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground font-body"
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
      <section className="px-6 pb-24 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {quests.map((q) => (
            <motion.div key={q.number} variants={item}>
              <Link to={`/quest/${q.number}`} className="block group">
                <div className="relative h-80 rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <img
                    src={q.image}
                    alt={q.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${q.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-body font-medium uppercase tracking-widest opacity-80 mb-1">
                      {q.module}
                    </span>
                    <span className="font-display text-4xl font-bold mb-1 text-[hsl(var(--quest-gold))]">
                      {String(q.number).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-xl font-semibold">{q.title}</h3>
                    <p className="font-body text-sm opacity-80 mt-1">{q.subtitle}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center space-y-1 relative z-10 bg-background/80 backdrop-blur-sm">
        <p className="font-body text-sm text-muted-foreground">
          Building Intercultural Behaviour — Interactive Learning Platform
        </p>
        <p className="font-body text-xs text-muted-foreground/70">
          Author: <span className="font-semibold text-foreground/70">A.Sh.Sekerova</span> | Developed by <span className="font-semibold text-foreground/70">Mansurbek Qazaqov</span>
        </p>
      </footer>
      </div>
    </div>
  );
};

export default Index;
