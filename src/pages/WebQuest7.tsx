import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, BookOpen, PenTool, Search, MessageSquare, CheckCircle2, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import SiteHeader from "@/components/SiteHeader";

const steps = [
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "task", label: "Your Task", icon: PenTool },
  { id: "research", label: "Research", icon: Search },
  { id: "create", label: "Create Product", icon: Award },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest7 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const goTo = useCallback((idx: number) => { setCurrentStep(idx); setMobileMenuOpen(false); }, []);
  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(200,60%,20%)] via-[hsl(220,50%,30%)] to-[hsl(180,40%,25%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px" style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-body mb-0.5 transition-colors"><ArrowLeft className="w-3 h-3" /> Orqaga</Link>
              <span className="text-[11px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 6</span>
              <h1 className="font-display text-base font-bold leading-tight">🏆 WebQuest 7 — Cultural Heroes</h1>
            </div>
            {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
              <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-[15px] font-body ${active ? "bg-primary text-primary-foreground font-semibold shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                <Icon className="w-4 h-4 shrink-0" /><span className="truncate">{s.label}</span>{active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
              </button>
            ); })}
          </aside>
          <AnimatePresence>
            {mobileMenuOpen && (<>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 md:hidden overflow-y-auto py-4 px-3">
                <div className="flex items-center justify-between mb-4 px-2"><span className="font-display font-bold text-base">Steps</span><button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button></div>
                {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
                  <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-base font-body mb-1 ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-muted-foreground"}`}><Icon className="w-4 h-4 shrink-0" /><span>{s.label}</span></button>
                ); })}
              </motion.aside>
            </>)}
          </AnimatePresence>
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
                <span className="text-[11px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 6</span>
                <span className="font-display text-sm font-bold truncate">🏆 WQ 7 — Cultural Heroes</span>
              </div>
              <div className="flex items-center gap-2 px-3 pb-2">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button>
                <span className="font-body text-base text-primary">{currentStep + 1}/{steps.length}</span>
                <span className="font-display font-semibold text-base truncate">{steps[currentStep].label}</span>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="p-1 sm:p-1.5 md:px-4 md:py-1">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 shadow-sm border-2 border-transparent hover:shadow-lg transition-all duration-300"
                  style={{ borderImage: 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1', borderRadius: '0.75rem' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1'; }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">{(() => { const Icon = steps[currentStep].icon; return <Icon className="w-3.5 h-3.5" />; })()}</span>
                    <div>
                      <span className="text-[11px] font-body text-primary uppercase tracking-wider">Step {currentStep + 1} / {steps.length}</span>
                      <h3 className="font-display text-base font-bold leading-none">{steps[currentStep].label}</h3>
                    </div>
                  </div>
                  <StepContent stepId={steps[currentStep].id} />
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 md:px-8 py-1.5 border-t border-border/50 bg-card/70 backdrop-blur-md">
          <Button variant="outline" size="sm" onClick={prev} disabled={currentStep === 0} className="font-body"><ChevronLeft className="w-4 h-4 mr-1" /> Previous</Button>
          <div className="flex gap-1">{steps.map((_, i) => (<button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? "bg-primary" : "bg-muted-foreground/30"}`} />))}</div>
          <Button variant={currentStep === steps.length - 1 ? "outline" : "default"} size="sm" onClick={next} disabled={currentStep === steps.length - 1} className="font-body">Next <ChevronRight className="w-4 h-4 ml-1" /></Button>
        </div>
      </div>
    </div>
  );
};

function StepContent({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "intro": return <IntroStep />;
    case "task": return <TaskStep />;
    case "research": return <ResearchStep />;
    case "create": return <CreateStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

function IntroStep() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-2">
      {["Remember key facts about the life and achievements of a selected cultural hero.",
        "Understand the cultural significance and values represented by the cultural hero.",
        "Apply appropriate language (topic-related vocabulary, past tenses, passive voice, reported speech).",
        "Analyze the impact of the cultural hero on national and global culture.",
        "Create a role-play interview and a multimedia product to present research findings.",
      ].map((o, i) => (
        <Card key={i} className="glass-card hover:shadow-lg transition-shadow"><CardContent className="p-2 flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm">{i + 1}</span>
          <p className="font-body text-sm leading-snug">{o}</p>
        </CardContent></Card>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-2 mb-2">
      <img src="/images/webquest7/hero1.jpg" alt="Cultural Heroes" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
      <img src="/images/webquest7/hero2.jpg" alt="Heritage" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
    </div>
    <p className="font-body text-foreground text-sm leading-snug">
      Every culture has its heroes — writers, artists, scientists, musicians, activists — whose ideas and achievements shape national identity and influence the world. In this WebQuest, you will explore the life and legacy of a cultural hero.
    </p>
  </>);
}

function TaskStep() {
  return (<>
    <p className="font-body text-foreground text-base mb-3">
      Work in a small group and research a cultural hero from a selected country or culture. Investigate the hero's life, achievements, and cultural impact.
    </p>
    <div className="grid sm:grid-cols-2 gap-2">
      {["Research the hero's life, achievements, and cultural significance",
        "Explain why this person is a cultural symbol",
        "Create a presentation, poster, interview role-play, or podcast",
        "Present your findings to the class",
      ].map((task, i) => (
        <Card key={i} className="border-accent/20"><CardContent className="p-3 flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center text-sm font-bold">{i + 1}</span>
          <p className="font-body text-base">{task}</p>
        </CardContent></Card>
      ))}
    </div>
  </>);
}

function ResearchStep() {
  return <OpenQuestionTask title="Cultural Hero Research" questions={[
    "Who is the cultural hero you chose and from which country?",
    "What are the key facts about their life and early years?",
    "What are their major achievements and contributions?",
    "What cultural significance do they hold for their nation?",
    "How has this person influenced global culture or understanding?",
    "Why is this person considered a cultural symbol?",
    "What values do they represent (freedom, creativity, knowledge, equality)?",
  ]} />;
}

function CreateStep() {
  return (<>
    <p className="font-body text-foreground text-base mb-3">Based on your research, create one of the following products:</p>
    <div className="grid sm:grid-cols-2 gap-2 mb-4">
      {[{ title: "🎤 Role-Play Interview", desc: "Prepare and perform an interview with your cultural hero (3-5 min)" },
        { title: "🖼️ Poster / Infographic", desc: "Design a visual biography with key facts and images" },
        { title: "🎙️ Podcast", desc: "Record a short podcast episode about your cultural hero" },
        { title: "📊 Presentation", desc: "Create a multimedia slideshow presentation" },
      ].map((p, i) => (
        <Card key={i} className="hover:shadow-lg transition-shadow"><CardContent className="p-3">
          <h5 className="font-display font-semibold text-base mb-1">{p.title}</h5>
          <p className="font-body text-sm text-foreground">{p.desc}</p>
        </CardContent></Card>
      ))}
    </div>
    <OpenQuestionTask title="Project Plan" questions={[
      "What is the title of your project?",
      "What main points will you include?",
      "How will you present your findings (poster, podcast, role-play, presentation)?",
    ]} />
  </>);
}

function ReflectionStep() {
  return (<>
    <OpenQuestionTask title="Reflection Questions" questions={[
      "What did you learn about the cultural hero and their country?",
      "How does understanding cultural heroes help us appreciate diversity?",
      "What skills did you develop during this WebQuest?",
      "How can cultural heroes inspire intercultural dialogue?",
    ]} />
    <div className="mt-4">
      <SelfEvalChecklist items={[
        "I researched and presented key facts about the cultural hero.",
        "I understood the cultural significance of my chosen hero.",
        "I used appropriate vocabulary and grammar structures.",
        "I analyzed the impact on national and global culture.",
        "I created a quality final product.",
        "I worked effectively with my group.",
      ]} />
    </div>
    <Card className="mt-4 border-primary/30 bg-primary/5">
      <CardContent className="p-4 text-center">
        <h3 className="font-display text-xl font-bold text-primary mb-1">🎉 Congratulations!</h3>
        <p className="font-body text-sm text-muted-foreground">Through this WebQuest, you explored the life and legacy of a cultural hero, gaining insight into how individual contributions shape national identity and global culture.</p>
      </CardContent>
    </Card>
  </>);
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (<div className="space-y-1">{items.map((item, i) => (
    <label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
      <span className="font-body text-base">{item}</span>{checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
    </label>
  ))}</div>);
}

export default WebQuest7;
