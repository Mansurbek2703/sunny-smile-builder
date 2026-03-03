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
  { id: "idioms", label: "Idioms & Phrases", icon: PenTool },
  { id: "vocabulary", label: "Vocabulary", icon: PenTool },
  { id: "reading", label: "Reading — Culture Shock", icon: BookOpen },
  { id: "etiquette", label: "Etiquette Reading", icon: BookOpen },
  { id: "video", label: "Video Task", icon: Video },
  { id: "casestudy", label: "Case Study", icon: Users },
  { id: "research", label: "Research", icon: Search },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest5 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const goTo = useCallback((idx: number) => { setCurrentStep(idx); setMobileMenuOpen(false); }, []);
  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(340,50%,25%)] via-[hsl(280,40%,30%)] to-[hsl(220,50%,35%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-52 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px" style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs font-body mb-0.5 transition-colors"><ArrowLeft className="w-3 h-3" /> Orqaga</Link>
              <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 4</span>
              <h1 className="font-display text-sm font-bold leading-tight">🌍 WebQuest 5 — Culture Shock & Etiquette</h1>
            </div>
            {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
              <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-[13px] font-body ${active ? "bg-primary text-primary-foreground font-semibold shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                <Icon className="w-4 h-4 shrink-0" /><span className="truncate">{s.label}</span>{active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
              </button>
            ); })}
          </aside>
          <AnimatePresence>
            {mobileMenuOpen && (<>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 md:hidden overflow-y-auto py-4 px-3">
                <div className="flex items-center justify-between mb-4 px-2"><span className="font-display font-bold text-sm">Steps</span><button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button></div>
                {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
                  <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-sm font-body mb-1 ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-muted-foreground"}`}><Icon className="w-4 h-4 shrink-0" /><span>{s.label}</span></button>
                ); })}
              </motion.aside>
            </>)}
          </AnimatePresence>
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
                <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 4</span>
                <span className="font-display text-xs font-bold truncate">🌍 WQ 5 — Culture Shock</span>
              </div>
              <div className="flex items-center gap-2 px-3 pb-2">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button>
                <span className="font-body text-sm text-muted-foreground">{currentStep + 1}/{steps.length}</span>
                <span className="font-display font-semibold text-sm truncate">{steps[currentStep].label}</span>
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
                      <span className="text-[9px] font-body text-muted-foreground uppercase tracking-wider">Step {currentStep + 1} / {steps.length}</span>
                      <h3 className="font-display text-sm font-bold leading-none">{steps[currentStep].label}</h3>
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
    case "infographic": return <img src="/images/webquest5/infographic1.jpg" alt="WebQuest 5 Infographic" loading="lazy" className="rounded-xl w-full object-contain shadow-lg" />;
    case "intro": return <IntroStep />;
    case "idioms": return <IdiomsStep />;
    case "vocabulary": return <VocabularyStep />;
    case "reading": return <ReadingStep />;
    case "etiquette": return <EtiquetteStep />;
    case "video": return <VideoStep />;
    case "casestudy": return <CaseStudyStep />;
    case "research": return <ResearchStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

function IntroStep() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-2">
      {["Understand how culture shock affects people.", "Learn strategies for successful cultural adaptation.", "Develop intercultural communication and teamwork skills.", "Learn cross-cultural etiquette rules and body language."].map((o, i) => (
        <Card key={i} className="glass-card hover:shadow-lg transition-shadow"><CardContent className="p-2 flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-xs">{i + 1}</span>
          <p className="font-body text-xs leading-snug">{o}</p>
        </CardContent></Card>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-2 mb-2">
      <img src="/images/webquest5/hero1.jpg" alt="Culture Shock" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
      <img src="/images/webquest5/hero2.jpg" alt="Adaptation" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
    </div>
    <div className="p-3 rounded-xl bg-muted/50 border-l-4 border-primary/40 mb-2">
      <p className="font-body text-sm italic text-muted-foreground">"When in Rome, do as the Romans do"</p>
    </div>
    <p className="font-body text-muted-foreground text-xs leading-snug">
      Have you ever felt out of place in a new country or even in a new group? That feeling of confusion or discomfort is called culture shock. In this WebQuest, you will step into the shoes of exchange students, explore their real-life experiences, and learn how to adapt successfully in multicultural environments.
    </p>
  </>);
}

function IdiomsStep() {
  return (<>
    <p className="font-body text-muted-foreground text-sm mb-3">Match the idioms and phrases with their correct meanings.</p>
    <SelectMatchingTask
      pairs={[
        { left: "Lost at sea / adrift", right: "" }, { left: "Keep an open mind", right: "" },
        { left: "To get the hang of something", right: "" }, { left: "A fish out of water", right: "" },
        { left: "To learn the ropes", right: "" }, { left: "Overwhelmed", right: "" },
        { left: "Shaken up / taken aback", right: "" }, { left: "Like a deer in headlights", right: "" },
        { left: "All at sea", right: "" },
      ]}
      options={["Feeling confused and without direction in a new environment", "Be willing to consider new ideas", "To finally understand or learn how to do something", "Feeling awkward or uncomfortable in an unfamiliar situation", "To learn basic rules or procedures in a new place", "Feeling buried under too much stress or new information", "Feeling very surprised, shocked, or unsettled", "Feeling frozen and unable to react because of shock", "Feeling extremely confused or bewildered"]}
      correctAnswers={{ 0: "Feeling confused and without direction in a new environment", 1: "Be willing to consider new ideas", 2: "To finally understand or learn how to do something", 3: "Feeling awkward or uncomfortable in an unfamiliar situation", 4: "To learn basic rules or procedures in a new place", 5: "Feeling buried under too much stress or new information", 6: "Feeling very surprised, shocked, or unsettled", 7: "Feeling frozen and unable to react because of shock", 8: "Feeling extremely confused or bewildered" }}
    />
  </>);
}

function VocabularyStep() {
  return (<>
    <h4 className="font-display text-sm font-semibold mb-2">Match the terms with definitions</h4>
    <VocabularyMatchTask words={[
      { word: "Culture shock", definition: "Feeling of disorientation and anxiety in an unfamiliar culture" },
      { word: "Homesickness", definition: "A feeling of longing for one's home" },
      { word: "Adapt / Adjust", definition: "To change to suit new conditions" },
      { word: "Cope", definition: "To deal effectively with something difficult" },
      { word: "Cultural misunderstanding", definition: "A failure to understand customs or behavior of another culture" },
      { word: "Stereotypes", definition: "Fixed, often inaccurate ideas about a group" },
      { word: "Taboo", definition: "Prohibited behaviors or topics" },
      { word: "Faux Pas", definition: "A social blunder or mistake" },
    ]} />
  </>);
}

function ReadingStep() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-3">
      <img src="/images/webquest5/culture_shock.jpg" alt="Culture Shock Stages" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
      <img src="/images/webquest5/etiquette1.jpg" alt="Cross-cultural etiquette" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
    </div>
    <ReadingSection title="What Is Culture Shock?">Culture shock happens when people experience uncertainty, confusion, or anxiety as they adjust to a new culture. It often follows stages: honeymoon, frustration, adaptation, and acceptance.</ReadingSection>
    <ReadingSection title="The Four Stages"><strong>Honeymoon:</strong> Excitement. <strong>Frustration:</strong> Irritation and homesickness. <strong>Adaptation:</strong> Gradually adjusting. <strong>Acceptance:</strong> Feeling comfortable and confident.</ReadingSection>
    <ReadingSection title="Symptoms">Homesickness, feeling helpless or isolated, lack of concentration, irritability, sadness, sleep or eating disturbances.</ReadingSection>
    <ReadingSection title="Strategies to Overcome">Be open-minded, avoid constantly comparing to home, keep a journal, socialize with locals, ask for advice.</ReadingSection>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Match headings to paragraphs</h4>
      <SelectMatchingTask pairs={[{ left: "Paragraph A", right: "" }, { left: "Paragraph B", right: "" }, { left: "Paragraph C", right: "" }, { left: "Paragraph D", right: "" }, { left: "Paragraph E", right: "" }]}
        options={["What Is Culture Shock?", "Insight into the Culture Shock Experience", "Recognizing the Symptoms of Culture Shock", "Navigating the Four Stages of Culture Shock", "Strategies to Overcome Culture Shock"]}
        correctAnswers={{ 0: "What Is Culture Shock?", 1: "Insight into the Culture Shock Experience", 2: "Recognizing the Symptoms of Culture Shock", 3: "Navigating the Four Stages of Culture Shock", 4: "Strategies to Overcome Culture Shock" }} />
    </div>
    <div className="mt-4">
      <OpenQuestionTask title="Answer the following questions" questions={[
        "What is the main definition of culture shock?", "What are the four stages of culture shock?",
        "What are some common symptoms?", "How can individuals overcome culture shock?",
        "Why can experiencing culture shock eventually lead to personal growth?",
      ]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Match terms with descriptions</h4>
      <SelectMatchingTask pairs={[{ left: "Culture Shock", right: "" }, { left: "Honeymoon Stage", right: "" }, { left: "Frustration Stage", right: "" }, { left: "Adaptation Stage", right: "" }, { left: "Acceptance Stage", right: "" }]}
        options={["A feeling of confusion and anxiety when entering a new cultural environment", "The initial phase filled with excitement and curiosity", "The period when misunderstandings and homesickness cause stress", "The stage where individuals begin to adjust and understand the new culture", "People start to feel comfortable, confident, and accept cultural differences"]}
        correctAnswers={{ 0: "A feeling of confusion and anxiety when entering a new cultural environment", 1: "The initial phase filled with excitement and curiosity", 2: "The period when misunderstandings and homesickness cause stress", 3: "The stage where individuals begin to adjust and understand the new culture", 4: "People start to feel comfortable, confident, and accept cultural differences" }} />
    </div>
  </>);
}

function EtiquetteStep() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-3">
      <img src="/images/webquest5/etiquette1.jpg" alt="Etiquette" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
      <img src="/images/webquest5/etiquette2.jpg" alt="Cultural rules" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
    </div>
    <ReadingSection title="Why Cross-Cultural Etiquette Matters">When we think about cross-cultural etiquette rules, our first thought may be our next Zoom meeting with global partners. Universal social codes include politeness, kindness, and empathy.</ReadingSection>
    <ReadingSection title="Key Tips">Do your research about the culture. Pay special attention to attitude toward time, space, religion, food/dining, dress, hand gestures, and body language.</ReadingSection>
    <ReadingSection title="Examples">Looking into someone's eyes is considered rude in Japan. A simple thumbs up is offensive in parts of Africa, Australia, and Greece. In Asia, saving face means never pointing out an elder's mistake in public.</ReadingSection>
    <div className="mt-4">
      <OpenQuestionTask title="Reading Comprehension" questions={[
        "Why is cross-cultural etiquette especially important today?",
        "What advantages can good etiquette give in professional life?",
        "How does the attitude toward eye contact differ in the USA and Japan?",
      ]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">True or False</h4>
      <TrueFalseTask statements={[
        { text: "Cross-cultural etiquette is more important for tourists than for online meetings.", answer: false },
        { text: "Universal etiquette rules are based on politeness and empathy.", answer: true },
        { text: "Being late for meetings is unacceptable in all cultures.", answer: false },
        { text: "In Japan, silence during communication can be a sign of respect.", answer: true },
        { text: "The 'thumbs up' gesture is considered polite everywhere in the world.", answer: false },
      ]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Match words with meanings</h4>
      <SelectMatchingTask pairs={[{ left: "Etiquette", right: "" }, { left: "Nuance", right: "" }, { left: "Taboo", right: "" }, { left: "Empathy", right: "" }, { left: "Competence", right: "" }]}
        options={["Rules of polite behavior", "A small but important difference", "Something socially unacceptable", "Ability to understand others' feelings", "Strong understanding of what is acceptable in a culture"]}
        correctAnswers={{ 0: "Rules of polite behavior", 1: "A small but important difference", 2: "Something socially unacceptable", 3: "Ability to understand others' feelings", 4: "Strong understanding of what is acceptable in a culture" }} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Fill in the blanks</h4>
      <FillBlanksTask wordBank={["respectful", "customs", "punctual", "gestures", "empathy"]}
        sentences={[
          { text: "Being ___ helps you build positive international relationships.", blank: "respectful" },
          { text: "Cultural ___ differ from country to country.", blank: "customs" },
          { text: "In some cultures, being ___ is extremely important.", blank: "punctual" },
          { text: "Hand ___ can have different meanings around the world.", blank: "gestures" },
          { text: "Showing ___ allows you to communicate politely across cultures.", blank: "empathy" },
        ]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Match Culture with Etiquette Rule</h4>
      <SelectMatchingTask pairs={[{ left: "Japan", right: "" }, { left: "USA", right: "" }, { left: "Middle East", right: "" }, { left: "Some Asian cultures", right: "" }, { left: "Parts of Africa & Greece", right: "" }]}
        options={["Direct eye contact is often avoided", "Direct eye contact shows confidence", "Hair covering may be required in certain situations", "Saving face is very important", "Thumbs-up gesture may be offensive"]}
        correctAnswers={{ 0: "Direct eye contact is often avoided", 1: "Direct eye contact shows confidence", 2: "Hair covering may be required in certain situations", 3: "Saving face is very important", 4: "Thumbs-up gesture may be offensive" }} />
    </div>
  </>);
}

function VideoStep() {
  return (<>
    <VideoTask title="Cultural Taboos Around the World" instruction="Watch the video about cultural taboos and etiquette, then complete the tasks below." videoUrl="https://www.youtube.com/watch?v=-7lUYoIiNXU" thumbnail="/images/webquest5/video_thumb.jpg" />
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Choose the correct answer</h4>
      <MultipleChoiceTask questions={[
        { question: "The main purpose of the video is to:", options: ["Entertain tourists", "Explain cultural taboos and etiquette", "Compare national cuisines"], correctIndex: 1 },
        { question: "The video mainly focuses on:", options: ["Food etiquette only", "Hand gestures only", "Social behavior, gestures, food, and photography rules"], correctIndex: 2 },
      ]} />
    </div>
    <div className="mt-4">
      <OpenQuestionTask title="Complete the table while watching" questions={[
        "Name a country from the video and describe one etiquette rule.",
        "Name another country and its specific cultural taboo.",
        "What surprised you the most from the video?",
      ]} />
    </div>
  </>);
}

function CaseStudyStep() {
  return (<>
    <div className="p-3 rounded-xl bg-muted/50 border-l-4 border-accent/40 mb-4">
      <p className="font-body text-sm text-muted-foreground leading-relaxed">
        <strong>Situation:</strong> An Uzbek student feels offended because British friends never invite her to their home. The British friends believe they are being polite by respecting privacy.
      </p>
    </div>
    <OpenQuestionTask title="Answer the questions" questions={[
      "What cultural values are in conflict?",
      "Is this behaviour unfriendly or culturally normal?",
      "How does the proverb 'When in Rome, do as the Romans do' apply here?",
    ]} />
    <div className="mt-4">
      <OpenQuestionTask title="Critical Thinking" questions={[
        "Why can gestures cause misunderstandings in global communication?",
        "How can cultural awareness reduce conflict in international meetings?",
        "Why is it not necessary to share beliefs in order to respect them?",
      ]} />
    </div>
  </>);
}

function ResearchStep() {
  return (<>
    <OpenQuestionTask title="Beginner's Guide Abroad" questions={[
      "Write a short explanation of what culture shock is.",
      "List the four stages (honeymoon, frustration, adjustment, acceptance).",
      "Give 5–7 practical tips for newcomers.",
      "Describe a role-play scenario showing a newcomer facing culture shock and overcoming it.",
    ]} />
  </>);
}

function ReflectionStep() {
  return (<>
    <SelfEvalChecklist items={[
      "I understand what culture shock is and can explain its main stages.",
      "I can recognize symptoms of culture shock in myself or others.",
      "I am open-minded toward cultural differences and new customs.",
      "I can explain why cross-cultural etiquette is important today.",
      "I can identify cultural differences in behavior.",
      "I can compare my own culture with other cultures respectfully.",
    ]} />
    <Card className="mt-4 border-primary/30 bg-primary/5">
      <CardContent className="p-4 text-center">
        <h3 className="font-display text-lg font-bold text-primary mb-1">🎉 Congratulations!</h3>
        <p className="font-body text-xs text-muted-foreground">Culture shock is not a setback but a step toward personal growth and global understanding. Awareness of cross-cultural etiquette encourages respect, empathy, and open-mindedness.</p>
      </CardContent>
    </Card>
  </>);
}

function ReadingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="mb-3 p-3 rounded-xl bg-muted/50 border-l-4 border-primary/40"><h5 className="font-display font-semibold text-sm mb-1">{title}</h5><p className="font-body text-sm text-muted-foreground leading-relaxed">{children}</p></div>);
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (<div className="space-y-1">{items.map((item, i) => (
    <label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
      <span className="font-body text-sm">{item}</span>{checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
    </label>
  ))}</div>);
}

export default WebQuest5;
