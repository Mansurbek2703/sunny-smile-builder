import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import VocabularyMatchTask from "@/components/quest/VocabularyMatchTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VideoTask from "@/components/quest/VideoTask";
import TrueFalseTask from "@/components/quest/TrueFalseTask";
import MultipleChoiceTask from "@/components/quest/MultipleChoiceTask";
import FillBlanksTask from "@/components/quest/FillBlanksTask";

const steps = [
  { id: "infographic", label: "Infographic", icon: BookOpen },
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "video", label: "Video Task", icon: Video },
  { id: "idioms", label: "Cultural Idioms", icon: PenTool },
  { id: "vocabulary", label: "Vocabulary", icon: PenTool },
  { id: "reading", label: "Reading", icon: BookOpen },
  { id: "observations", label: "Observations", icon: PenTool },
  { id: "research", label: "Research", icon: Search },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest3 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const goTo = useCallback((idx: number) => { setCurrentStep(idx); setMobileMenuOpen(false); }, []);
  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(265,50%,25%)] via-[hsl(280,40%,35%)] to-[hsl(200,50%,40%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px"
            style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-lg font-body mb-0.5 transition-colors"><ArrowLeft className="w-3 h-3" /> Orqaga</Link>
              <span className="text-xs font-body font-medium uppercase tracking-widest text-quest-gold">Module 2</span>
              <h1 className="font-display text-xl font-bold leading-tight">🌍 WebQuest 3 — Cultural Stereotypes</h1>
            </div>
            {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
              <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-lg font-body ${active ? "bg-primary text-primary-foreground font-semibold shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                <Icon className="w-4 h-4 shrink-0" /><span className="truncate">{s.label}</span>{active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
              </button>); })}
          </aside>
          <AnimatePresence>
            {mobileMenuOpen && (<>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 md:hidden overflow-y-auto py-4 px-3">
                <div className="flex items-center justify-between mb-4 px-2"><span className="font-display font-bold text-xl">Steps</span><button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button></div>
                {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
                  <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-lg font-body mb-1 ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-muted-foreground"}`}><Icon className="w-4 h-4 shrink-0" /><span>{s.label}</span></button>); })}
              </motion.aside>
            </>)}
          </AnimatePresence>
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
                <span className="text-xs font-body font-medium uppercase tracking-widest text-quest-gold">Module 2</span>
                <span className="font-display text-lg font-bold truncate">🌍 WQ 3 — Cultural Stereotypes</span>
              </div>
              <div className="flex items-center gap-2 px-3 pb-2">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button>
                <span className="font-body text-lg text-primary">{currentStep + 1}/{steps.length}</span>
                <span className="font-display font-semibold text-lg truncate">{steps[currentStep].label}</span>
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
                      <span className="text-xs font-body text-primary uppercase tracking-wider">Step {currentStep + 1} / {steps.length}</span>
                      <h3 className="font-display text-xl font-bold leading-none">{steps[currentStep].label}</h3>
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
    case "infographic": return <InfographicStep />;
    case "intro": return <IntroStep />;
    case "video": return <VideoStep />;
    case "idioms": return <IdiomsStep />;
    case "vocabulary": return <VocabularyStep />;
    case "reading": return <ReadingStepContent />;
    case "observations": return <ObservationsStep />;
    case "research": return <ResearchStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

function InfographicStep() { return <img src="/images/webquest3/infographic2.jpg" alt="WebQuest 3 Infographic — Cultural Stereotypes" loading="lazy" className="rounded-xl w-full object-contain shadow-lg" />; }

function IntroStep() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-2">
      {["Identify common cultural stereotypes and explain their origins.", "Analyze how stereotypes affect perceptions and interactions.", "Differentiate between myths and factual cultural traits.", "Evaluate media, texts, and experiences for bias or stereotyping.", "Demonstrate respectful intercultural communication.", "Use new vocabulary, cultural idioms and phrases."].map((o, i) => (
        <Card key={i} className="glass-card hover:shadow-lg transition-shadow"><CardContent className="p-2 flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-lg">{i + 1}</span>
          <p className="font-body text-lg leading-snug">{o}</p>
        </CardContent></Card>))}
    </div>
    <div className="grid grid-cols-2 gap-2 mb-2">
      <img src="/images/webquest3/hero1.jpg" alt="Stereotypes" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
      <img src="/images/webquest3/hero2.jpg" alt="Culture" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
    </div>
    <p className="font-body text-foreground text-lg leading-snug mb-2">Stereotypes are simplified ideas about people and cultures. They often live in compliments, traditions, everyday behavior, songs, and social rules. If people are unaware of cultural differences, stereotypes may cause discomfort, misunderstanding, or even conflict. Remember the proverb: <strong>"Don't judge a book by its cover."</strong></p>
    <p className="font-body text-foreground text-lg leading-snug">In today's interconnected world, people from different cultural backgrounds interact more frequently than ever before. This WebQuest focuses on exploring cultural stereotypes in a critical and reflective way.</p>
  </>);
}

function VideoStep() {
  return (<>
    <VideoTask title="How Stereotypes Impact Performance" instruction="Watch the video and answer the questions below." videoUrl="https://www.youtube.com/watch?v=wY4rAN5HlAk" thumbnail="/images/webquest3/video_thumb.jpg" />
    <div className="mt-4"><OpenQuestionTask title="Task I: Video Questions" questions={["What is the main definition of \"stereotype\" given in the video?", "Can you identify at least two examples of harmful stereotypes?", "How does the video explain the psychological impact of stereotyping?", "What arguments does the video present for challenging stereotypes?", "What actions would you propose to reduce stereotyping in your community?"]} /></div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Task II: True or False</h4>
      <TrueFalseTask statements={[
        { text: "The video defines a stereotype as a fixed and oversimplified image about a group of people.", answer: true },
        { text: "According to the video, stereotypes are always negative and never based on real experiences.", answer: false },
        { text: "The video explains that stereotypes can lead to unfair treatment and prejudice.", answer: true },
        { text: "The video suggests that learning about different cultures can help reduce stereotyping.", answer: true },
        { text: "The video claims that once a stereotype is formed, it can never be changed.", answer: false },
      ]} />
    </div>
  </>);
}

function IdiomsStep() {
  return (<>
    <h4 className="font-display text-xl font-semibold mb-2">Task III: Match cultural idioms with meanings</h4>
    <SelectMatchingTask pairs={[{ left: "When in Rome, do as the Romans do", right: "" }, { left: "Speak the same language", right: "" }, { left: "Break the ice", right: "" }, { left: "Bridge the gap", right: "" }, { left: "Lost in translation", right: "" }]}
      options={["Overcome obstacles in understanding between cultures", "Start a conversation to reduce tension", "Interactions between cultures from different parts of the world", "Overcome differences between people from diverse backgrounds", "Meanings not accurately conveyed between languages/cultures"]}
      correctAnswers={{ 0: "Overcome obstacles in understanding between cultures", 1: "Overcome differences between people from diverse backgrounds", 2: "Start a conversation to reduce tension", 3: "Overcome obstacles in understanding between cultures", 4: "Meanings not accurately conveyed between languages/cultures" }} />
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Task IV: Idioms and Stereotypes</h4>
      <SelectMatchingTask pairs={[{ left: "Tar everyone with the same brush", right: "" }, { left: "Pigeonhole someone", right: "" }, { left: "Cut from the same cloth", right: "" }, { left: "Like peas in a pod", right: "" }, { left: "Never judge a book by its cover", right: "" }, { left: "Break the mold", right: "" }, { left: "When in Rome, do as the Romans do", right: "" }]}
        options={["Treat all people in a group as identical", "Place someone into a fixed category", "Be extremely similar in character", "Be very alike because of shared background", "Don't form opinions based only on appearances", "Be different from what is typical or expected", "Adapt to customs of the place you visit"]}
        correctAnswers={{ 0: "Treat all people in a group as identical", 1: "Place someone into a fixed category", 2: "Be extremely similar in character", 3: "Be very alike because of shared background", 4: "Don't form opinions based only on appearances", 5: "Be different from what is typical or expected", 6: "Adapt to customs of the place you visit" }} />
    </div>
  </>);
}

function VocabularyStep() {
  return (<>
    <h4 className="font-display text-xl font-semibold mb-2">Task V: Fill in the Gaps</h4>
    <FillBlanksTask wordBank={["stereotype", "discrimination", "bias", "ethnocentrism", "assumption", "diversity", "generalization", "prejudice", "tolerance", "cultural identity"]}
      sentences={[
        { text: "A ___ is a fixed, oversimplified belief about a group of people.", blank: "stereotype" },
        { text: "___ occurs when someone is treated unfairly because of their race, gender, or culture.", blank: "discrimination" },
        { text: "Having a ___ means favoring one group over another, often unconsciously.", blank: "bias" },
        { text: "___ is judging another culture based on the standards of one's own.", blank: "ethnocentrism" },
        { text: "An ___ is something believed to be true without proof.", blank: "assumption" },
        { text: "___ refers to the variety of cultures, beliefs, and backgrounds in a group.", blank: "diversity" },
        { text: "A ___ is a broad statement that applies a single idea to many people.", blank: "generalization" },
        { text: "___ is a negative attitude toward someone based solely on group membership.", blank: "prejudice" },
        { text: "___ means accepting and respecting differences between people.", blank: "tolerance" },
        { text: "A person's ___ includes their traditions, language, values, and sense of belonging.", blank: "cultural identity" },
      ]} />
  </>);
}

function ReadingStepContent() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-3">
      <img src="/images/webquest3/reading1.jpg" alt="Reading" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
      <img src="/images/webquest3/reading2.jpg" alt="Stereotypes" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
    </div>
    <ReadingSection title="What are stereotypes?">Cultural stereotypes are fixed ideas that people have about what specific social groups or individuals are like — especially ideas that are wrong. The term has Greek origin: "stereos" means solid and "typos" means blow or impression.</ReadingSection>
    <ReadingSection title="Why do stereotypes exist?">Because stereotypes are standardized and simplified ideas based on prejudices, they are not derived from objective facts. As Sociologist Charles E. Hurst states: "One reason for stereotypes is the lack of personal familiarity."</ReadingSection>
    <ReadingSection title="Impact of stereotypes">Stereotypes may affect people negatively: forming inaccurate images, scapegoating, making erroneous judgments. They can lead to xenophobic or racist behavior.</ReadingSection>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Comprehension: Choose correct answer</h4>
      <MultipleChoiceTask questions={[
        { question: "The word 'stereotype' has:", options: ["A Greek origin", "An English origin", "A Latin origin"], correctIndex: 0 },
        { question: "Stereotypes are used to:", options: ["Make generalizations about different groups", "Have accurate understanding of people", "Humiliate people"], correctIndex: 0 },
        { question: "If you label people in terms of stereotypes, you will probably:", options: ["Be having an exact judgment", "Be behaving in a discriminatory way", "Be behaving in a polite way"], correctIndex: 1 },
        { question: "Stereotypes may affect people:", options: ["Positively", "Negatively", "In no way"], correctIndex: 1 },
      ]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Fill in the blanks</h4>
      <FillBlanksTask wordBank={["fixed", "wrong", "Greek", "contact", "superior", "ignorance", "unwilling", "false", "xenophobic", "inferior"]}
        sentences={[
          { text: "Cultural stereotypes are ___ ideas that people believe about certain groups.", blank: "fixed" },
          { text: "These beliefs are often ___ and not based on real facts.", blank: "wrong" },
          { text: "The word 'stereotype' originally comes from the ___ language.", blank: "Greek" },
          { text: "When people have no personal ___ with other cultures, they start to generalize.", blank: "contact" },
          { text: "Some groups use stereotypes to feel more ___ than others.", blank: "superior" },
          { text: "Stereotypes can be used to excuse ___ or a lack of understanding.", blank: "ignorance" },
          { text: "Many people are ___ to change their opinions about other groups.", blank: "unwilling" },
          { text: "Stereotypes often create ___ and distorted images of people.", blank: "false" },
          { text: "They can lead to racist or ___ behavior in society.", blank: "xenophobic" },
          { text: "People who are stereotyped may start to feel ___ or less confident.", blank: "inferior" },
        ]} />
    </div>
  </>);
}

function ObservationsStep() {
  return (<>
    <h4 className="font-display text-xl font-semibold mb-2">Task I: Cultural Observations</h4>
    <div className="space-y-2 mb-4">
      {["In Kazakh culture, female beauty is often described as moon-faced and tall in songs.", "In Uzbek culture, bread is treated as a sacred symbol, not just food.", "In Anglo-Saxon cultures, inviting someone to a restaurant may be more common than inviting them home.", "In Japanese culture, openly correcting an older person is considered impolite.", "In Italian culture, loud emotional speech is often seen as natural and sincere."].map((obs, i) => (
        <Card key={i} className="glass-card"><CardContent className="p-2 font-body text-lg">{obs}</CardContent></Card>))}
    </div>
    <h4 className="font-display text-xl font-semibold mb-2">Task II: Match situation with cultural meaning</h4>
    <SelectMatchingTask pairs={[{ left: "Bread is never thrown away", right: "" }, { left: "Guests are treated as 'sent by God'", right: "" }, { left: "Older people are not openly corrected", right: "" }, { left: "Home is a private space", right: "" }, { left: "Direct eye contact is avoided", right: "" }]}
      options={["Sacred everyday objects", "Moral obligation of hospitality", "Age-based respect", "Clear personal boundaries", "Respect and modesty"]}
      correctAnswers={{ 0: "Sacred everyday objects", 1: "Moral obligation of hospitality", 2: "Age-based respect", 3: "Clear personal boundaries", 4: "Respect and modesty" }} />
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Task III: True, False, or Depends?</h4>
      <TrueFalseTask statements={[
        { text: "All cultures treat food only as something to eat.", answer: false },
        { text: "In German culture, direct criticism is often considered honest, not rude.", answer: true },
        { text: "In Uzbek culture, hospitality always includes inviting guests home.", answer: true },
        { text: "In British culture, privacy is an important social value.", answer: true },
        { text: "Cultural stereotypes can influence behaviour even if people deny them.", answer: true },
      ]} />
    </div>
  </>);
}

function ResearchStep() {
  return (<>
    <p className="font-body text-foreground text-lg mb-3">In pairs or small groups, list at least 5 cultural stereotypes. Select 3-4 to investigate using reliable sources (BBC Culture, National Geographic, Cultural Atlas, Britannica, UNESCO).</p>
    <OpenQuestionTask title="Research & Write" questions={["List 5 cultural stereotypes you have heard about different nations.", "For each stereotype, find facts that confirm or disprove it.", "Compare them with your own country. Which difference could cause the most misunderstanding?"]} />
  </>);
}

function ReflectionStep() {
  return (<>
    <OpenQuestionTask title="Discussion Questions" questions={["Which stereotypes turned out to be completely false?", "Why do people continue to believe some of these clichés?", "What did you learn about judging other cultures?", "Can a positive stereotype still be problematic? Give an example.", "How can cultural awareness help avoid conflict?"]} />
    <div className="mt-4">
      <SelfEvalChecklist items={["I identified common cultural stereotypes.", "I checked stereotypes using reliable sources.", "I can tell the difference between facts and opinions.", "I learned new information about another culture.", "I understand why stereotypes can be misleading or harmful.", "I participated actively in the WebQuest activities.", "I can reflect on my own attitudes and assumptions."]} />
    </div>
    <Card className="mt-4 border-primary/30 bg-primary/5"><CardContent className="p-4 text-center">
      <h3 className="font-display text-xl font-bold text-primary mb-1">🎉 Congratulations!</h3>
      <p className="font-body text-lg text-foreground">You have learned that stereotypes are not always true — they are generalizations that can hide the diversity within cultures. Understanding the difference between truth and myth helps us become more open-minded and globally aware citizens.</p>
    </CardContent></Card>
  </>);
}

function ReadingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="mb-3 p-3 rounded-xl bg-muted/50 border-l-4 border-primary/40"><h5 className="font-display font-semibold text-lg mb-1">{title}</h5><p className="font-body text-lg text-foreground leading-relaxed">{children}</p></div>);
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (<div className="space-y-1">{items.map((item, i) => (
    <label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
      <span className="font-body text-lg">{item}</span>{checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
    </label>))}</div>);
}

export default WebQuest3;
