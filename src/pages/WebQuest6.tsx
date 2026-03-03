import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VideoTask from "@/components/quest/VideoTask";
import TrueFalseTask from "@/components/quest/TrueFalseTask";
import MultipleChoiceTask from "@/components/quest/MultipleChoiceTask";

const steps = [
  { id: "infographic", label: "Infographic", icon: BookOpen },
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "video", label: "Video Task", icon: Video },
  { id: "reading1", label: "Reading — Culinary", icon: BookOpen },
  { id: "reading2", label: "Reading — Manners", icon: UtensilsCrossed },
  { id: "discussion", label: "Discussion", icon: Users },
  { id: "research", label: "Research", icon: Search },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest6 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const goTo = useCallback((idx: number) => { setCurrentStep(idx); setMobileMenuOpen(false); }, []);
  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(25,70%,30%)] via-[hsl(40,60%,35%)] to-[hsl(15,50%,25%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-52 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px" style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs font-body mb-0.5 transition-colors"><ArrowLeft className="w-3 h-3" /> Orqaga</Link>
              <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 5</span>
              <h1 className="font-display text-sm font-bold leading-tight">🍽️ WebQuest 6 — Food Culture & Dining</h1>
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
                <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 5</span>
                <span className="font-display text-xs font-bold truncate">🍽️ WQ 6 — Food Culture</span>
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
    case "infographic": return <img src="/images/webquest6/infographic1.jpg" alt="WebQuest 6 Infographic" loading="lazy" className="rounded-xl w-full object-contain shadow-lg" />;
    case "intro": return <IntroStep />;
    case "video": return <VideoStep />;
    case "reading1": return <Reading1Step />;
    case "reading2": return <Reading2Step />;
    case "discussion": return <DiscussionStep />;
    case "research": return <ResearchStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

function IntroStep() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-2">
      {["Develop curiosity about other cultures through food.", "Respect cultural differences in dining customs.", "Compare cultures critically through culinary traditions.", "Gain awareness of food traditions and dining etiquette around the world."].map((o, i) => (
        <Card key={i} className="glass-card hover:shadow-lg transition-shadow"><CardContent className="p-2 flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-xs">{i + 1}</span>
          <p className="font-body text-xs leading-snug">{o}</p>
        </CardContent></Card>
      ))}
    </div>
    <img src="/images/webquest6/hero1.jpg" alt="Food Culture" loading="lazy" className="rounded-xl w-full h-48 object-cover shadow-md mb-2" />
    <p className="font-body text-muted-foreground text-xs leading-snug">
      This WebQuest invites students to explore food culture in various countries. Through guided online research, students will learn how food-related customs, table manners, and social behaviors differ across cultures.
    </p>
  </>);
}

function VideoStep() {
  return (<>
    <VideoTask title="Dining Etiquette Around the World" instruction="Watch the video about dining etiquette rules and complete the tasks below." videoUrl="https://www.youtube.com/watch?v=BjN7Sp-DwQ4" thumbnail="/images/webquest6/video_thumb.jpg" />
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Task A: Match country with dining rule</h4>
      <SelectMatchingTask
        pairs={[{ left: "Thailand", right: "" }, { left: "China", right: "" }, { left: "Ethiopia", right: "" }, { left: "Italy", right: "" }, { left: "Portugal", right: "" }, { left: "Japan", right: "" }, { left: "Middle East / India", right: "" }, { left: "Kazakhstan", right: "" }]}
        options={["Use a spoon, not a fork, to eat", "Do not finish all food on your plate", "Eat from one shared plate", "Do not ask for extra cheese", "Do not ask for salt or pepper", "Do not refill your own wine", "Do not use the left hand", "Tea has strict drinking rules"]}
        correctAnswers={{ 0: "Use a spoon, not a fork, to eat", 1: "Do not finish all food on your plate", 2: "Eat from one shared plate", 3: "Do not ask for extra cheese", 4: "Do not ask for salt or pepper", 5: "Do not refill your own wine", 6: "Do not use the left hand", 7: "Tea has strict drinking rules" }}
      />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Task B: True or False</h4>
      <TrueFalseTask statements={[
        { text: "In Thailand, eating with a fork is completely acceptable.", answer: true },
        { text: "In China, an empty plate may be seen as rude.", answer: true },
        { text: "Ethiopians usually eat with individual plates and cutlery.", answer: false },
        { text: "Asking for extra cheese in Italy may insult the chef.", answer: true },
        { text: "Cappuccino is commonly drunk in Italy in the evening.", answer: false },
        { text: "In Japan, it is polite to pour wine for others.", answer: true },
      ]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Task C: Choose the correct option</h4>
      <MultipleChoiceTask questions={[
        { question: "In Portugal, asking for salt or pepper is considered rude because:", options: ["Spices are expensive", "It may insult the cook", "It is unhealthy"], correctIndex: 1 },
        { question: "Chopsticks placed vertically are associated with:", options: ["Celebration", "Daily meals", "Funerals"], correctIndex: 2 },
        { question: "Traditional Chinese teapots:", options: ["Must be washed with soap", "Should never be washed", "Should not be washed with dish liquid"], correctIndex: 2 },
      ]} />
    </div>
  </>);
}

function Reading1Step() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-3">
      <img src="/images/webquest6/reading1.jpg" alt="Culinary Traditions" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
      <img src="/images/webquest6/reading2.jpg" alt="Dining Etiquette" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
    </div>
    <ReadingSection title="Food Culture & Identity">Food culture is an integral part of human civilization, representing the way societies prepare, share, and cherish their meals.</ReadingSection>
    <ReadingSection title="Geographical Factors">Tropical climates foster exotic fruits influencing Caribbean and Southeast Asian cuisines. Arid regions emphasize grains like couscous.</ReadingSection>
    <ReadingSection title="Historical Roots">The Columbian Exchange introduced potatoes and tomatoes to Europe. The Silk Road facilitated the exchange of spices and noodles.</ReadingSection>
    <ReadingSection title="Communal Cooking">Communal cooking and eating rituals are a cornerstone of preserving cultural identity. In Mexico, tamale-making is a family affair.</ReadingSection>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">Choose the right answer</h4>
      <MultipleChoiceTask questions={[
        { question: "What does food culture primarily represent?", options: ["Only a source of nutrition", "A community's identity and traditions", "A type of entertainment", "A form of art only"], correctIndex: 1 },
        { question: "How does geography influence cuisine?", options: ["It determines only cooking techniques", "It affects ingredient availability and types of crops", "It has no effect", "It only influences desserts"], correctIndex: 1 },
        { question: "Which historical event introduced potatoes and tomatoes to Europe?", options: ["The Silk Road", "The Columbian Exchange", "The Industrial Revolution", "The Transatlantic Trade"], correctIndex: 1 },
      ]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">True or False</h4>
      <TrueFalseTask statements={[
        { text: "Tropical climates often influence dishes with fruits like mangoes and bananas.", answer: true },
        { text: "The Silk Road only traded textiles, not food.", answer: false },
        { text: "Thanksgiving dinner in the USA is an example of a cultural food ritual.", answer: true },
        { text: "Making pasta from scratch in Italy is considered a family and cultural tradition.", answer: true },
        { text: "Globalization has made it impossible to preserve traditional culinary practices.", answer: false },
      ]} />
    </div>
  </>);
}

function Reading2Step() {
  return (<>
    <ReadingSection title="India — Right Hand Only">Eating with your hands is the norm. You should only ever use your right hand.</ReadingSection>
    <ReadingSection title="Italy — Coffee Rules">Don't order a cappuccino after 11 am. Never cut your pasta with a knife.</ReadingSection>
    <ReadingSection title="China — Burping & Chopsticks">Burping gently is a sign of gratitude. Never stick chopsticks vertically in rice.</ReadingSection>
    <ReadingSection title="Japan — Slurping & Wine">Slurping noodles is a compliment. Always pour wine for others, not for yourself.</ReadingSection>
    <ReadingSection title="USA — Tipping">Leaving without tipping 15-20% is unheard of.</ReadingSection>
    <ReadingSection title="Ethiopia — Injera">Dishes are served on injera flatbread. Everyone shares from the same platter using only the right hand.</ReadingSection>
    <div className="mt-4">
      <h4 className="font-display text-sm font-semibold mb-2">True, False, or Culture-dependent?</h4>
      <TrueFalseTask statements={[
        { text: "Slurping food is rude in all countries.", answer: false },
        { text: "Using the left hand while eating is acceptable everywhere.", answer: false },
        { text: "Tipping is optional in the USA.", answer: false },
        { text: "Burping at the table is always impolite.", answer: false },
      ]} />
    </div>
    <div className="mt-4">
      <OpenQuestionTask title="Compare dining etiquette" questions={[
        "What behaviours are considered polite in both your culture and another?",
        "What behaviour might cause misunderstanding?",
        "Why do these differences exist?",
      ]} />
    </div>
  </>);
}

function DiscussionStep() {
  return <OpenQuestionTask title="Discuss in groups" questions={[
    "Give one example of how geography affects cuisine in a specific region.",
    "Name a food ritual from any country and describe its cultural significance.",
    "Why is it important to know dining rules and etiquette across cultures?",
  ]} />;
}

function ResearchStep() {
  return (<>
    <OpenQuestionTask title="Signature Dishes" questions={[
      "Write your chosen country name.", "Why did you choose this country?",
      "Name 2–3 national dishes and describe them (ingredients, preparation, history).",
    ]} />
    <div className="mt-4">
      <OpenQuestionTask title="Food Etiquette & Eating Traditions" questions={[
        "What are the table manners in your chosen country?",
        "Do they use cutlery, hands, or chopsticks?",
        "Describe food sharing traditions.",
        "What is polite or impolite at the table?",
      ]} />
    </div>
    <div className="mt-4">
      <OpenQuestionTask title="Cultural Meaning & Comparison" questions={[
        "What does the cuisine tell about the country's history, lifestyle, and values?",
        "Write 3 comparison sentences between your culture and the chosen country's food culture.",
      ]} />
    </div>
  </>);
}

function ReflectionStep() {
  return (<>
    <OpenQuestionTask title="Intercultural Reflection" questions={[
      "What did you learn about another culture through food?",
      "What dining rules have you learned?",
      "How can this knowledge prevent misunderstandings?",
    ]} />
    <div className="mt-4">
      <SelfEvalChecklist items={[
        "I used 8+ vocabulary words from the unit.",
        "I used the Passive / Comparatives / Relatives.",
        "I researched reliable sources.",
        "I compared two cultures' dining etiquette.",
        "My final product is clear and organized.",
        "I worked well in my group.",
      ]} />
    </div>
    <Card className="mt-4 border-primary/30 bg-primary/5">
      <CardContent className="p-4 text-center">
        <h3 className="font-display text-lg font-bold text-primary mb-1">🎉 Congratulations!</h3>
        <p className="font-body text-xs text-muted-foreground">Through this WebQuest, you explored traditional dishes, food etiquette and cultures from different countries. Understanding the meaning of food helps avoid misunderstandings and shows respect for other cultures.</p>
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

export default WebQuest6;
