import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";

import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VideoTask from "@/components/quest/VideoTask";
import TrueFalseTask from "@/components/quest/TrueFalseTask";

const steps = [
  { id: "infographic", label: "Infographic", icon: BookOpen },
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "landmarks", label: "Match Landmarks", icon: MapPin },
  { id: "idioms", label: "Travel Idioms", icon: PenTool },
  { id: "video", label: "Video Task", icon: Video },
  { id: "reading", label: "Reading — Turkey", icon: BookOpen },
  { id: "research", label: "Research", icon: Search },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const landmarks = [
  { num: 1, img: "/images/webquest4/landmark1.jpg" },
  { num: 2, img: "/images/webquest4/landmark2.jpg" },
  { num: 3, img: "/images/webquest4/landmark3.jpg" },
  { num: 4, img: "/images/webquest4/landmark4.jpg" },
  { num: 5, img: "/images/webquest4/landmark5.jpg" },
  { num: 6, img: "/images/webquest4/landmark6.jpg" },
  { num: 7, img: "/images/webquest4/landmark7.jpg" },
  { num: 8, img: "/images/webquest4/landmark8.jpg" },
  { num: 9, img: "/images/webquest4/landmark9.jpg" },
  { num: 10, img: "/images/webquest4/landmark10.jpg" },
];

const WebQuest4 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goTo = useCallback((idx: number) => {
    setCurrentStep(idx);
    setMobileMenuOpen(false);
  }, []);

  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(18,65%,30%)] via-[hsl(30,50%,35%)] to-[hsl(200,50%,40%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>

        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-52 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px"
            style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs font-body mb-0.5 transition-colors"><ArrowLeft className="w-3 h-3" /> Orqaga</Link>
              <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 3</span>
              <h1 className="font-display text-sm font-bold leading-tight">🌍 WebQuest 4 — City Through Tourist Eyes</h1>
            </div>
            {steps.map((s, i) => {
              const Icon = s.icon;
              const active = i === currentStep;
              return (
                <button key={s.id} onClick={() => goTo(i)}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-[13px] font-body ${active ? "bg-primary text-primary-foreground font-semibold shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                  <Icon className="w-4 h-4 shrink-0" /><span className="truncate">{s.label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                </button>
              );
            })}
          </aside>

          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
                <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 md:hidden overflow-y-auto py-4 px-3">
                  <div className="flex items-center justify-between mb-4 px-2"><span className="font-display font-bold text-sm">Steps</span><button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button></div>
                  {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
                    <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-sm font-body mb-1 ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-muted-foreground"}`}><Icon className="w-4 h-4 shrink-0" /><span>{s.label}</span></button>
                  ); })}
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
                <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 3</span>
                <span className="font-display text-xs font-bold truncate">🌍 WQ 4 — City Through Tourist Eyes</span>
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
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      {(() => { const Icon = steps[currentStep].icon; return <Icon className="w-3.5 h-3.5" />; })()}
                    </span>
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
    case "infographic": return <InfographicStep />;
    case "intro": return <IntroStep />;
    case "landmarks": return <LandmarksStep />;
    case "idioms": return <IdiomsStep />;
    case "video": return <VideoStep />;
    case "reading": return <ReadingStepContent />;
    case "research": return <ResearchStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

function InfographicStep() {
  return <img src="/images/webquest4/infographic1.jpg" alt="WebQuest 4 Infographic" loading="lazy" className="rounded-xl w-full object-contain shadow-lg" />;
}

function IntroStep() {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-2 mb-2">
        {["Identify key landmarks, attractions, and cultural features of a chosen city.",
          "Analyze what makes a city unique from a tourist's perspective.",
          "Compare cultural, historical, and social aspects of cities.",
          "Create a multimedia presentation or visual guide for tourists.",
          "Demonstrate effective communication and collaboration skills.",
        ].map((o, i) => (
          <Card key={i} className="glass-card hover:shadow-lg transition-shadow">
            <CardContent className="p-2 flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-xs">{i + 1}</span>
              <p className="font-body text-xs leading-snug">{o}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <img src="/images/webquest4/hero1.jpg" alt="City" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
        <img src="/images/webquest4/hero2.jpg" alt="Tourism" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
      </div>
      <p className="font-body text-muted-foreground text-xs leading-snug">
        Imagine you are a traveler visiting a new city for the first time. Everything is unfamiliar — the people, the buildings, the traditions, the food, and the language. Tourists see cities differently than local residents because they discover places with curiosity, surprise, and fresh emotions.
      </p>
    </>
  );
}

function LandmarksStep() {
  return (
    <>
      <p className="font-body text-muted-foreground text-sm mb-3">Match each picture (1–10) with the correct landmark name.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
        {landmarks.map((l) => (
          <div key={l.num} className="relative rounded-xl overflow-hidden shadow-md border-2 border-border">
            <img src={l.img} alt={`Landmark ${l.num}`} className="w-full h-24 sm:h-32 object-cover" />
            <div className="absolute top-1 left-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{l.num}</div>
          </div>
        ))}
      </div>
      <SelectMatchingTask
        pairs={[
          { left: "Picture 1", right: "" }, { left: "Picture 2", right: "" }, { left: "Picture 3", right: "" },
          { left: "Picture 4", right: "" }, { left: "Picture 5", right: "" }, { left: "Picture 6", right: "" },
          { left: "Picture 7", right: "" }, { left: "Picture 8", right: "" }, { left: "Picture 9", right: "" },
          { left: "Picture 10", right: "" },
        ]}
        options={["Ark Fortress (Uzbekistan)", "Sagrada Familia (Spain)", "Hagia Sophia (Turkey)", "Burj Khalifa (UAE)", "Big Ben (UK)", "Great Wall (China)", "Chichén Itzá (Mexico)", "Sydney Opera House (Australia)", "Neuschwanstein Castle (Germany)", "Gyeongbokgung Palace (South Korea)"]}
        correctAnswers={{ 0: "Ark Fortress (Uzbekistan)", 1: "Sagrada Familia (Spain)", 2: "Hagia Sophia (Turkey)", 3: "Burj Khalifa (UAE)", 4: "Big Ben (UK)", 5: "Great Wall (China)", 6: "Chichén Itzá (Mexico)", 7: "Sydney Opera House (Australia)", 8: "Neuschwanstein Castle (Germany)", 9: "Gyeongbokgung Palace (South Korea)" }}
      />
    </>
  );
}

function IdiomsStep() {
  return (
    <>
      <h4 className="font-display text-sm font-semibold mb-2">Task II — Match Travel Idioms with Meanings</h4>
      <SelectMatchingTask
        pairs={[
          { left: "living out of a suitcase", right: "" }, { left: "at the crack of dawn", right: "" },
          { left: "travel on a shoestring", right: "" }, { left: "make a pit stop", right: "" },
          { left: "travel in style", right: "" }, { left: "travel light", right: "" },
        ]}
        options={[
          "Constantly travelling or moving from one place to another", "Very early in the morning",
          "Travel with a very limited budget", "Briefly stop during a journey for a break",
          "Travel with comfort and luxury", "Pack minimally and carry only essentials",
        ]}
        correctAnswers={{ 0: "Constantly travelling or moving from one place to another", 1: "Very early in the morning", 2: "Travel with a very limited budget", 3: "Briefly stop during a journey for a break", 4: "Travel with comfort and luxury", 5: "Pack minimally and carry only essentials" }}
      />
    </>
  );
}

function VideoStep() {
  return (
    <>
      <VideoTask title="The City Through Tourist Eyes" instruction="Watch the video and answer the questions below." videoUrl="https://www.youtube.com/watch?v=k_Vx_u2CoIQ" thumbnail="/images/webquest4/video_thumb.jpg" />
      <div className="mt-4">
        <OpenQuestionTask title="Task A: Answer the questions" questions={[
          "What is the main message or theme of the video?",
          "Which example or story stood out to you the most? Why?",
          "Did the video change any of your own beliefs or assumptions?",
          "What practical action from the video might you try in your own life?",
          "What follow-up question would you ask the speaker?",
        ]} />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task B: True or False</h4>
        <TrueFalseTask statements={[
          { text: "The video's central theme is exploring the identity of cities through their historical landmarks.", answer: true },
          { text: "The speaker argues that tourists always see the best parts of a city, never its challenges.", answer: false },
          { text: "Local people and tourists interpret public spaces in the same way.", answer: false },
          { text: "Understanding everyday urban life is as important as seeing famous attractions.", answer: true },
          { text: "A city's spirit is best captured by observing how people live day to day.", answer: true },
        ]} />
      </div>
    </>
  );
}

function ReadingStepContent() {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-2 mb-3">
        <img src="/images/webquest4/turkey1.jpg" alt="Turkey" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
        <img src="/images/webquest4/turkey2.jpg" alt="Turkey travel" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
      </div>
      <ReadingSection title="The Trip">The itinerary included the lively beach town of Bodrum, ancient ruins in Ephesus, the natural wonder of Pamukkale, sailing on a traditional Turkish Gulet boat, one day in Istanbul, and the magical landscapes of Cappadocia.</ReadingSection>
      <ReadingSection title="How Long to Spend?">Around 2 weeks, or a minimum of 10 days is recommended. This is ample time to visit the main sites.</ReadingSection>
      <ReadingSection title="Getting Around">Turkey has a comprehensive, well-priced public transport system — buses, trains, dolmuş, and domestic airlines.</ReadingSection>
      <ReadingSection title="Useful Tips">Check visa requirements. Currency is Turkish Lira (TL). The Museum Pass covers many attractions across Turkey.</ReadingSection>
      <div className="mt-4">
        <OpenQuestionTask title="Task II: Answer the questions" questions={[
          "What were the main destinations in the author's trip?",
          "How did the author describe solo travel in Turkey as a female traveler?",
          "What are the recommended seasons for visiting Turkey?",
          "How does the author describe public transportation?",
          "What cultural or practical items are recommended for Turkey?",
        ]} />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task III: True or False</h4>
        <TrueFalseTask statements={[
          { text: "The author traveled using only private transfers and taxis.", answer: false },
          { text: "The itinerary included Bodrum, Ephesus, Pamukkale, a Gulet cruise, Istanbul, and Cappadocia.", answer: true },
          { text: "Two weeks is usually enough to see the main highlights of Turkey.", answer: true },
          { text: "Winter is the best and only recommended time to visit Turkey.", answer: false },
          { text: "Public transportation in Turkey is affordable, reliable, and mostly clean.", answer: true },
          { text: "Tourists do not need to follow any dress code at religious buildings.", answer: false },
          { text: "The Museum Pass allows visitors to access various historical sites across Turkey.", answer: true },
        ]} />
      </div>
    </>
  );
}

function ResearchStep() {
  return (
    <>
      <OpenQuestionTask title="Part 1 — Choose Your City" questions={[
        "Write the name of the city you will explore.",
        "What surprised you when you first saw the city?",
        "What is the atmosphere like? (busy, quiet, colorful, historic, etc.)",
      ]} />
      <div className="mt-4">
        <OpenQuestionTask title="Tourist Research Chart" questions={[
          "Famous landmarks — what would a tourist notice?",
          "Traditional food — what dishes are popular?",
          "Local customs — any unique traditions?",
          "Transportation — how do people get around?",
          "Street life — what is the everyday atmosphere like?",
          "Possible difficulties — what challenges might tourists face?",
        ]} />
      </div>
    </>
  );
}

function ReflectionStep() {
  return (
    <>
      <OpenQuestionTask title="Discussion Questions" questions={[
        "How do tourists see a city differently from locals?",
        "What are the first things a tourist usually notices?",
        "If a tourist visited your city, what places would impress them most?",
        "Do tourists focus more on beauty, culture, or comfort?",
        "How can local people help tourists see the 'real' side of a city?",
      ]} />
      <div className="mt-4">
        <SelfEvalChecklist items={[
          "I wrote from a tourist's point of view.",
          "I included facts about culture and daily life.",
          "I described landmarks or attractions.",
          "I used my imagination and personal reaction.",
          "I checked my spelling and grammar.",
        ]} />
      </div>
      <Card className="mt-4 border-primary/30 bg-primary/5">
        <CardContent className="p-4 text-center">
          <h3 className="font-display text-lg font-bold text-primary mb-1">🎉 Congratulations!</h3>
          <p className="font-body text-xs text-muted-foreground">Through this WebQuest, you explored a city from a tourist's perspective and discovered its cultural, historical, and social attractions.</p>
        </CardContent>
      </Card>
    </>
  );
}

function ReadingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 p-3 rounded-xl bg-muted/50 border-l-4 border-primary/40">
      <h5 className="font-display font-semibold text-sm mb-1">{title}</h5>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
          <span className="font-body text-sm">{item}</span>
          {checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
        </label>
      ))}
    </div>
  );
}

export default WebQuest4;
