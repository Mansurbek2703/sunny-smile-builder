import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import SiteHeader from "@/components/SiteHeader";
import FloatingCulturalElements from "@/components/FloatingCulturalElements";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const stepIcons: Record<string, React.ReactNode> = {
  intro: <BookOpen className="w-5 h-5" />,
  task: <PenTool className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  reading: <BookOpen className="w-5 h-5" />,
  group: <Users className="w-5 h-5" />,
  research: <Search className="w-5 h-5" />,
  reflection: <MessageSquare className="w-5 h-5" />,
  hero: <Award className="w-5 h-5" />,
};

const WebQuest7 = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ infographic: true });
  const toggle = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="min-h-screen bg-background border-x-2 sm:border-x-4 border-[hsl(var(--frame-color))]">
      <SiteHeader />
      <FloatingCulturalElements />
      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[60vh] min-h-[320px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(200,60%,20%)] via-[hsl(220,50%,30%)] to-[hsl(180,40%,25%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(200,50%,10%)/0.6] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(45,60%,50%,0.15),transparent_60%)]" />
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
          <Link to="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-12 md:left-12">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 font-body"><ArrowLeft className="w-4 h-4 mr-2" /> Orqaga</Button>
          </Link>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-body font-medium uppercase tracking-widest mb-3">Module 6 — Cultural Heritage</motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3">🏆 WebQuest 7</motion.h1>
            <motion.h2 variants={fadeUp} className="font-display text-lg sm:text-xl md:text-2xl text-white/90 font-semibold">Cultural Heroes</motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/70 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Research the lives, achievements, and contributions of outstanding cultural figures to understand their impact on society.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h3 variants={fadeUp} className="font-display text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">🎯 Learning Outcomes</motion.h3>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              "Remember key facts about the life and achievements of a selected cultural hero.",
              "Understand the cultural significance and values represented by the cultural hero.",
              "Apply appropriate language (topic-related vocabulary, past tenses, passive voice, reported speech).",
              "Analyze the impact of the cultural hero on national and global culture.",
              "Create a role-play interview and a multimedia product to present research findings.",
            ].map((o, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="glass-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm">{i + 1}</span>
                    <p className="font-body text-sm leading-relaxed">{o}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Introduction */}
      <QuestSection id="intro" icon={stepIcons.intro} stepNum="Step 1" title="Introduction" isOpen={openSections.intro} onToggle={() => toggle("intro")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest7/hero1.jpg" alt="Cultural Heroes" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest7/hero2.jpg" alt="Heritage" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
        <p className="font-body text-muted-foreground leading-relaxed">
          Every culture has its heroes — writers, artists, scientists, musicians, activists — whose ideas and achievements shape national identity and influence the world. In this WebQuest, you will explore the life and legacy of a cultural hero and discover how individual contributions can promote cultural understanding and global dialogue.
        </p>
      </QuestSection>

      {/* Task */}
      <QuestSection id="task" icon={stepIcons.task} stepNum="Step 2" title="Your Task" isOpen={openSections.task} onToggle={() => toggle("task")}>
        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          Work in a small group and research a cultural hero from a selected country or culture. A cultural hero may be a writer, artist, scientist, historical leader, or public figure who has made a significant contribution to national culture or global heritage. You will investigate the hero's life, achievements, and cultural impact, and explain why this person is considered a cultural symbol.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Research the hero's life, achievements, and cultural significance",
            "Explain why this person is a cultural symbol",
            "Create a presentation, poster, interview role-play, or podcast",
            "Present your findings to the class",
          ].map((task, i) => (
            <Card key={i} className="border-accent/20">
              <CardContent className="p-4 flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <p className="font-body text-sm">{task}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </QuestSection>

      {/* Research */}
      <QuestSection id="research" icon={stepIcons.research} stepNum="Step 3" title="Research Your Cultural Hero" isOpen={openSections.research} onToggle={() => toggle("research")}>
        <OpenQuestionTask
          title="Cultural Hero Research"
          questions={[
            "Who is the cultural hero you chose and from which country?",
            "What are the key facts about their life and early years?",
            "What are their major achievements and contributions?",
            "What cultural significance do they hold for their nation?",
            "How has this person influenced global culture or understanding?",
            "Why is this person considered a cultural symbol?",
            "What values do they represent (freedom, creativity, knowledge, equality)?",
          ]}
        />
      </QuestSection>

      {/* Create Final Product */}
      <QuestSection id="create" icon={stepIcons.hero} stepNum="Step 4" title="Create Your Final Product" isOpen={openSections.create} onToggle={() => toggle("create")}>
        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          Based on your research, create one of the following products:
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          {[
            { title: "🎤 Role-Play Interview", desc: "Prepare and perform an interview with your cultural hero (3-5 min)" },
            { title: "🖼️ Poster / Infographic", desc: "Design a visual biography with key facts and images" },
            { title: "🎙️ Podcast", desc: "Record a short podcast episode about your cultural hero" },
            { title: "📊 Presentation", desc: "Create a multimedia slideshow presentation" },
          ].map((p, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <h5 className="font-display font-semibold text-sm mb-1">{p.title}</h5>
                <p className="font-body text-xs text-muted-foreground">{p.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <OpenQuestionTask
          title="Project Plan"
          questions={[
            "What is the title of your project?",
            "What main points will you include?",
            "How will you present your findings (poster, podcast, role-play, presentation)?",
          ]}
        />
      </QuestSection>

      {/* Reflection */}
      <QuestSection id="reflection" icon={stepIcons.reflection} stepNum="Step 5" title="Reflection & Self-Evaluation" isOpen={openSections.reflection} onToggle={() => toggle("reflection")}>
        <OpenQuestionTask
          title="Reflection Questions"
          questions={[
            "What did you learn about the cultural hero and their country?",
            "How does understanding cultural heroes help us appreciate diversity?",
            "What skills did you develop during this WebQuest (research, teamwork, communication)?",
            "How can cultural heroes inspire intercultural dialogue?",
          ]}
        />
        <div className="mt-8">
          <SelfEvalChecklist items={[
            "I researched and presented key facts about the cultural hero.",
            "I understood the cultural significance of my chosen hero.",
            "I used appropriate vocabulary and grammar structures.",
            "I analyzed the impact on national and global culture.",
            "I created a quality final product (poster, interview, podcast, etc.).",
            "I worked effectively with my group.",
          ]} />
        </div>
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="font-display text-xl font-bold text-primary mb-2">🎉 Congratulations!</h3>
            <p className="font-body text-sm text-muted-foreground">
              Through this WebQuest, you explored the life and legacy of a cultural hero, gaining insight into how individual contributions shape national identity and global culture. Understanding cultural heroes promotes appreciation of diversity and inspires intercultural dialogue.
            </p>
          </CardContent>
        </Card>
      </QuestSection>

      <footer className="border-t py-8 text-center mt-16 space-y-1">
        <p className="font-body text-sm text-muted-foreground">WebQuest Explorer — WebQuest 7: Cultural Heroes</p>
        <p className="font-body text-xs text-muted-foreground/70">
          This site developed by <span className="font-semibold text-foreground/70">Mansurbek Qazaqov</span>. Lead specialist of IT department at AL-Khwarizmi University.
        </p>
      </footer>
    </div>
  );
};

function QuestSection({ id, icon, stepNum, title, isOpen, onToggle, children }: {
  id: string; icon: React.ReactNode; stepNum: string; title: string; isOpen?: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
      <button onClick={onToggle} className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card border-2 hover:border-primary/30 transition-colors group">
        <span className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{icon}</span>
        <div className="text-left flex-1 min-w-0">
          <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">{stepNum}</span>
          <h3 className="font-display text-base sm:text-lg font-semibold truncate">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
            <div className="p-4 sm:p-6 border-x-2 border-b-2 rounded-b-xl bg-card/50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <label key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
          <span className="font-body text-sm">{item}</span>
          {checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
        </label>
      ))}
    </div>
  );
}

export default WebQuest7;
