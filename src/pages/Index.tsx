import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, BookOpen, Sparkles } from "lucide-react";

const quests = [
  {
    number: 1,
    title: "Thanksgiving & Navruz",
    subtitle: "Traditions of Gratitude and Renewal",
    module: "Module 1: Holidays and Traditions",
    color: "from-quest-emerald to-quest-gold",
    image: "/images/webquest1/hero1.jpg",
    available: true,
  },
  { number: 2, title: "Coming Soon", subtitle: "WebQuest 2", module: "Module 2", color: "from-quest-sky to-quest-plum", available: false },
  { number: 3, title: "Coming Soon", subtitle: "WebQuest 3", module: "Module 3", color: "from-quest-terracotta to-quest-gold", available: false },
  { number: 4, title: "Coming Soon", subtitle: "WebQuest 4", module: "Module 4", color: "from-quest-plum to-quest-sky", available: false },
  { number: 5, title: "Coming Soon", subtitle: "WebQuest 5", module: "Module 5", color: "from-quest-gold to-quest-emerald", available: false },
  { number: 6, title: "Coming Soon", subtitle: "WebQuest 6", module: "Module 6", color: "from-quest-sky to-quest-terracotta", available: false },
  { number: 7, title: "Coming Soon", subtitle: "WebQuest 7", module: "Module 7", color: "from-quest-emerald to-quest-plum", available: false },
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
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-primary text-primary-foreground py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-display text-lg font-bold tracking-wide">🌍 WebQuest Explorer</span>
          <span className="font-body text-xs opacity-80">Interactive Learning Platform</span>
        </div>
      </div>

      {/* Hero */}
      <header className="relative py-20 md:py-32 px-6 border-x-4 border-secondary/40 mx-2 sm:mx-4 md:mx-8 rounded-b-2xl">
        <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium font-body">Interactive Learning Platform</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-gradient">WebQuest</span>
            <br />
            <span className="text-foreground/80">Explorer</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover cultures, traditions, and languages through immersive interactive quests. 
            Learn by exploring, comparing, and creating.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground font-body"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> 7 WebQuests
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-secondary" /> Interactive Tasks
            </span>
          </motion.div>
        </motion.div>
      </header>

      {/* Quest Grid */}
      <section className="px-6 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {quests.map((q) => (
            <motion.div key={q.number} variants={item}>
              {q.available ? (
                <Link to={`/quest/${q.number}`} className="block group">
                  <div className="relative h-80 rounded-2xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <img
                      src={q.image}
                      alt={q.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${q.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <span className="text-xs font-body font-medium uppercase tracking-widest opacity-80 mb-1">
                        {q.module}
                      </span>
                      <span className="font-display text-4xl font-bold mb-1">
                        {String(q.number).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl font-semibold">{q.title}</h3>
                      <p className="font-body text-sm opacity-80 mt-1">{q.subtitle}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="relative h-80 rounded-2xl overflow-hidden border border-border/30 bg-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <span className="font-display text-4xl font-bold text-muted-foreground/30">
                      {String(q.number).padStart(2, "0")}
                    </span>
                    <p className="font-body text-sm text-muted-foreground/50 mt-2">Coming Soon</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center space-y-1">
        <p className="font-body text-sm text-muted-foreground">
          WebQuest Explorer — Interactive Learning Platform
        </p>
        <p className="font-body text-xs text-muted-foreground/70">
          This site developed by <span className="font-semibold text-foreground/70">Mansurbek Qazaqov</span>. Lead specialist of IT department at AL-Khwarizmi University.
        </p>
      </footer>
    </div>
  );
};

export default Index;
