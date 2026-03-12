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
import MatchingTask from "@/components/quest/MatchingTask";

const steps = [
  { id: "infographic", label: "Infographic", icon: BookOpen },
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "match-holidays", label: "Match Holidays", icon: PenTool },
  { id: "discussion", label: "Discussion & Vocabulary", icon: Users },
  { id: "video", label: "Video Tasks", icon: Video },
  { id: "reading", label: "Reading — 6 Tips", icon: BookOpen },
  { id: "research", label: "Research", icon: Search },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest2 = () => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,60%,25%)] via-[hsl(200,50%,35%)] to-[hsl(45,80%,50%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop sidebar */}
          <aside className="hidden md:flex flex-col w-52 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px"
            style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs font-body mb-0.5 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Orqaga
              </Link>
              <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 1</span>
              <h1 className="font-display text-sm font-bold leading-tight">🌍 WebQuest 2 — Holidays Around the World</h1>
            </div>
            {steps.map((s, i) => {
              const Icon = s.icon;
              const active = i === currentStep;
              return (
                <button key={s.id} onClick={() => goTo(i)}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-[13px] font-body ${active ? "bg-primary text-primary-foreground font-semibold shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{s.label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                </button>
              );
            })}
          </aside>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
                <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 md:hidden overflow-y-auto py-4 px-3">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="font-display font-bold text-sm">Steps</span>
                    <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
                  </div>
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    const active = i === currentStep;
                    return (
                      <button key={s.id} onClick={() => goTo(i)}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-sm font-body mb-1 ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-muted-foreground"}`}>
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Content */}
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
                <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 1</span>
                <span className="font-display text-xs font-bold truncate">🌍 WQ 2 — Holidays Around the World</span>
              </div>
              <div className="flex items-center gap-2 px-3 pb-2">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button>
                <span className="font-body text-sm text-muted-foreground">{currentStep + 1}/{steps.length}</span>
                <span className="font-display font-semibold text-sm truncate">{steps[currentStep].label}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                className="p-1 sm:p-1.5 md:px-4 md:py-1">
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

        {/* Sticky footer */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 md:px-8 py-1.5 border-t border-border/50 bg-card/70 backdrop-blur-md">
          <Button variant="outline" size="sm" onClick={prev} disabled={currentStep === 0} className="font-body">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? "bg-primary" : "bg-muted-foreground/30"}`} />
            ))}
          </div>
          <Button variant={currentStep === steps.length - 1 ? "outline" : "default"} size="sm" onClick={next} disabled={currentStep === steps.length - 1} className="font-body">
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

function StepContent({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "infographic": return <InfographicStep />;
    case "intro": return <IntroStep />;
    case "match-holidays": return <MatchHolidaysStep />;
    case "discussion": return <DiscussionStep />;
    case "video": return <VideoStep />;
    case "reading": return <ReadingStep />;
    case "research": return <ResearchStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

function InfographicStep() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
        <img
          src="/images/webquest2/infographic1.jpg"
          alt="WebQuest 2 Infographic — Holidays Around the World"
          loading="lazy"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

function IntroStep() {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-2 mb-2">
        {["Explore and describe traditional holidays from different countries.",
          "Compare cultural traditions across nations.",
          "Create a group product (poster, presentation, role-play, or blog).",
          "Develop teamwork, research, and intercultural communication skills.",
        ].map((outcome, i) => (
          <Card key={i} className="glass-card hover:shadow-lg transition-shadow">
            <CardContent className="p-2 flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-xs">{i + 1}</span>
              <p className="font-body text-xs leading-snug">{outcome}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <img src="/images/webquest2/hero1.jpg" alt="World holiday celebrations" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
        <img src="/images/webquest2/hero2.jpg" alt="International celebrations" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
      </div>
      <p className="font-body text-muted-foreground text-xs leading-snug mb-2">
        Holidays and festivals play a significant role in shaping national identity and cultural values. They reflect a country's history, beliefs, traditions, and social practices.
      </p>
      <p className="font-body text-muted-foreground text-xs leading-snug mb-4">
        This WebQuest invites students to explore traditional holidays from various countries around the world. By researching and comparing international celebrations, students will expand their cultural knowledge and develop critical thinking, teamwork, and communication skills in English.
      </p>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border border-border shadow-xl transition-transform duration-300 hover:scale-[1.01]">
          <img
            src="/images/webquest2/holidays_intro_infographic.png"
            alt="Holidays Around the World — Infographic"
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </>
  );
}

function MatchHolidaysStep() {
  return (
    <>
      <p className="font-body text-muted-foreground text-sm mb-2">
        Match each holiday (Column A) with the country where it is traditionally celebrated (Column B). One holiday does not belong — identify the "extra holiday."
      </p>
      <SelectMatchingTask
        pairs={[
          { left: "1. Hanami (Cherry Blossom Festival)", right: "" },
          { left: "2. Oktoberfest", right: "" },
          { left: "3. Bastille Day", right: "" },
          { left: "4. Carnival of Venice", right: "" },
          { left: "5. Eid al-Fitr", right: "" },
          { left: "6. Heritage Day", right: "" },
          { left: "7. Thanksgiving (Extra!)", right: "" },
        ]}
        options={["Japan", "Germany", "France", "Italy", "Saudi Arabia", "South Africa", "Extra — no match"]}
        correctAnswers={{ 0: "Japan", 1: "Germany", 2: "France", 3: "Italy", 4: "Saudi Arabia", 5: "South Africa", 6: "Extra — no match" }}
      />
      <div className="mt-4">
        <OpenQuestionTask
          title="Answer the following questions"
          questions={[
            "Which holidays are national, and which are religious or cultural?",
            "Which of these holidays represent identity and unity for the nation? Give examples.",
            "Compare Heritage Day (South Africa) and Bastille Day (France): how do they reflect historical memory?",
            "Why is \"Thanksgiving\" marked as an extra holiday in this activity?",
          ]}
        />
      </div>
    </>
  );
}

function DiscussionStep() {
  return (
    <>
      <OpenQuestionTask
        title="Discuss in pairs or small groups"
        questions={[
          "What is the most important holiday in your country?",
          "How do you usually celebrate it?",
          "Why is it important for your culture?",
          "Are holidays in your country more influenced by religion, culture, or history?",
          "Do global celebrations help people understand other cultures? Explain your view.",
        ]}
      />
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Give definitions to the words</h4>
        <VocabularyMatchTask
          words={[
            { word: "festival", definition: "A large public celebration or event" },
            { word: "tradition", definition: "A custom passed from generation to generation" },
            { word: "custom", definition: "A traditional way of behaving" },
            { word: "parade", definition: "A public march or procession to celebrate" },
            { word: "celebration", definition: "An act of marking a special event" },
            { word: "commemoration", definition: "Remembering and honoring a person or event" },
            { word: "heritage", definition: "Cultural traditions inherited from the past" },
            { word: "ritual", definition: "A ceremony or series of prescribed actions" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        <img src="/images/webquest2/carnival.jpg" alt="Carnival" className="rounded-xl w-full h-28 sm:h-36 object-cover shadow-md" />
        <img src="/images/webquest2/tomatina.jpg" alt="La Tomatina" className="rounded-xl w-full h-28 sm:h-36 object-cover shadow-md" />
        <img src="/images/webquest2/cherry_blossom.jpg" alt="Cherry Blossom" className="rounded-xl w-full h-28 sm:h-36 object-cover shadow-md" />
        <img src="/images/webquest2/day_of_dead.jpg" alt="Day of the Dead" className="rounded-xl w-full h-28 sm:h-36 object-cover shadow-md" />
      </div>
    </>
  );
}

function VideoStep() {
  return (
    <>
      <VideoTask
        title="Holidays Around the World"
        instruction="Watch the video about holidays around the world and complete the tasks below."
        videoUrl="https://www.youtube.com/watch?v=6sdCUbe0s7E"
        thumbnail="/images/webquest2/video_thumb.jpg"
      />
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task A: Match holidays with descriptions</h4>
        <SelectMatchingTask
          pairs={[
            { left: "1. Christmas", right: "" },
            { left: "2. Hanukkah", right: "" },
            { left: "3. Eid al-Fitr", right: "" },
            { left: "4. Chinese New Year", right: "" },
            { left: "5. Cinco de Mayo", right: "" },
            { left: "6. Thanksgiving", right: "" },
          ]}
          options={[
            "Commemorates the birth of a religious figure",
            "Remembers a miracle involving oil",
            "Celebrates the end of a fasting period",
            "Focuses on a new beginning and family reunions",
            "Celebrates military victory over foreign forces",
            "Marks gratitude for harvest and blessings",
          ]}
          correctAnswers={{
            0: "Commemorates the birth of a religious figure",
            1: "Remembers a miracle involving oil",
            2: "Celebrates the end of a fasting period",
            3: "Focuses on a new beginning and family reunions",
            4: "Celebrates military victory over foreign forces",
            5: "Marks gratitude for harvest and blessings",
          }}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task B: True or False</h4>
        <TrueFalseTask
          statements={[
            { text: "All holidays mentioned in the video are religious in origin.", answer: false },
            { text: "Some holiday traditions are thousands of years old.", answer: true },
            { text: "Diwali is celebrated in the same way in every country.", answer: false },
            { text: "Chinese New Year includes parades and traditional food.", answer: true },
            { text: "Thanksgiving is celebrated worldwide.", answer: false },
          ]}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task C: Choose the correct answer</h4>
        <MultipleChoiceTask
          questions={[
            { question: "According to the video, holidays may be based on:", options: ["Religion only", "Culture, religion, or history", "Climate and geography", "Age groups"], correctIndex: 1 },
            { question: "Which activity is NOT mentioned as part of Christmas celebrations?", options: ["Decorating homes", "Exchanging gifts", "Lighting oil lamps", "Attending church services"], correctIndex: 2 },
            { question: "Cinco de Mayo commemorates:", options: ["Mexico's independence", "A religious celebration", "A historical military victory", "The end of a harvest season"], correctIndex: 2 },
          ]}
        />
      </div>
      <div className="mt-4">
        <OpenQuestionTask
          title="Task D: Answer in 1-2 sentences"
          questions={[
            "Why does the video emphasize that holidays are celebrated by different faiths and cultures?",
            "How does the video connect holidays with family and community values?",
          ]}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task E: Match words with meanings</h4>
        <VocabularyMatchTask
          words={[
            { word: "Tradition", definition: "Long-established custom" },
            { word: "Gratitude", definition: "Feeling of thankfulness" },
            { word: "Parade", definition: "Public celebration or march" },
            { word: "Unity", definition: "Being joined together" },
          ]}
        />
      </div>
    </>
  );
}

function ReadingStep() {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-2 mb-3">
        <img src="/images/webquest2/reading1.jpg" alt="Holidays abroad" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
        <img src="/images/webquest2/tips1.jpg" alt="Tips" loading="lazy" className="rounded-xl w-full h-40 object-cover shadow-md" />
      </div>
      {[
        { title: "1. Find a Local Guide", text: "Connect with someone native to the country. A local guide can offer insights into meanings behind traditions, explain local etiquette, and help you feel comfortable." },
        { title: "2. Do Your Homework", text: "Research the holiday's history, meaning, and rituals. Consider: What values does this holiday represent? Are there particular foods or music? Is it family-centered or public?" },
        { title: "3. Dress for the Occasion", text: "How you dress can carry special meaning. For religious holidays, there may be guidelines on modesty. Ask someone you trust or research appropriate attire." },
        { title: "4. Be Thoughtful with Gifts", text: "Gift-giving customs vary widely. In some countries, small thoughtful gifts are ideal; in others, extravagant gifts are typical." },
        { title: "5. Clarify Food Preferences", text: "Food is central to celebrations. Check about dietary needs and religious food restrictions like kosher, halal, or vegetarian." },
        { title: "6. Keep an Open Mind", text: "Come with curiosity rather than comparison. Watch, listen, and absorb the experience." },
      ].map((tip, i) => (
        <ReadingSection key={i} title={tip.title}>{tip.text}</ReadingSection>
      ))}

      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task III: Match tips with purposes</h4>
        <SelectMatchingTask
          pairs={[
            { left: "1. Find a Local Guide", right: "" },
            { left: "2. Do Your Homework", right: "" },
            { left: "3. Dress for the Occasion", right: "" },
            { left: "4. Be Thoughtful with Gifts", right: "" },
            { left: "5. Clarify Food Preferences", right: "" },
            { left: "6. Keep an Open Mind", right: "" },
          ]}
          options={["Builds trust and community connections", "Helps avoid misunderstandings", "Shows respect for religious and cultural norms", "Prevents cultural offense", "Ensures inclusivity and comfort", "Encourages cultural adaptation"]}
          correctAnswers={{ 0: "Builds trust and community connections", 1: "Helps avoid misunderstandings", 2: "Shows respect for religious and cultural norms", 3: "Prevents cultural offense", 4: "Ensures inclusivity and comfort", 5: "Encourages cultural adaptation" }}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task V: Match words with definitions</h4>
        <VocabularyMatchTask
          words={[
            { word: "milestone", definition: "A significant stage or achievement" },
            { word: "expat", definition: "Living outside one's home country" },
            { word: "etiquette", definition: "Accepted social behavior" },
            { word: "cultural significance", definition: "Traditional actions or ceremonies" },
            { word: "adaptability", definition: "Ability to change behavior in new situations" },
          ]}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task VI: Fill in the blanks</h4>
        <FillBlanksTask
          wordBank={["customs", "etiquette", "sensitive", "adapt", "meaningful"]}
          sentences={[
            { text: "Holidays are deeply ___ events in many cultures.", blank: "meaningful" },
            { text: "Learning local ___ helps avoid misunderstandings.", blank: "etiquette" },
            { text: "Expats must learn to ___ to new traditions.", blank: "adapt" },
            { text: "A culturally ___ approach shows respect.", blank: "sensitive" },
            { text: "Sharing traditions can create ___ connections.", blank: "customs" },
          ]}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-sm font-semibold mb-2">Task VII: Match situations with advice</h4>
        <SelectMatchingTask
          pairs={[
            { left: "You are invited to a religious holiday", right: "" },
            { left: "You don't understand local traditions", right: "" },
            { left: "You feel homesick during a holiday", right: "" },
            { left: "You want to bring a present", right: "" },
            { left: "You are unsure what to wear", right: "" },
          ]}
          options={["Clarify food restrictions", "Find a local guide", "Keep an open mind", "Be thoughtful with gifts", "Dress for the occasion"]}
          correctAnswers={{ 0: "Clarify food restrictions", 1: "Find a local guide", 2: "Keep an open mind", 3: "Be thoughtful with gifts", 4: "Dress for the occasion" }}
        />
      </div>
    </>
  );
}

function ResearchStep() {
  return (
    <>
      <p className="font-body text-muted-foreground text-sm mb-3">Work in groups of 3–4. Each group investigates one country's holiday:</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {["🇯🇵 Japan — Hanami", "🇧🇷 Brazil — Carnival", "🇪🇸 Spain — La Tomatina", "🇪🇬 Egypt — Sham El-Nessim", "🇨🇦 Canada — Canada Day", "🇦🇺 Australia — ANZAC Day"].map((c, i) => (
          <Card key={i} className="glass-card"><CardContent className="p-3 font-body text-sm font-medium">{c}</CardContent></Card>
        ))}
      </div>
      <OpenQuestionTask
        title="Research Questions"
        questions={[
          "When is the holiday celebrated?",
          "What is its historical or cultural background?",
          "What traditions, foods, or activities are typical?",
          "How is it similar or different from holidays in your country?",
        ]}
      />
    </>
  );
}

function ReflectionStep() {
  return (
    <>
      <OpenQuestionTask
        title="Reflect on your experience"
        questions={[
          "Which holiday did you find most interesting and why?",
          "What similarities/differences did you notice between this holiday and your own traditions?",
          "What does this tell us about the role of holidays in cultural identity?",
          "How did you contribute to your group? What skills did you develop?",
        ]}
      />
      <div className="mt-4">
        <SelfEvalChecklist items={[
          "I understood the task and objectives.",
          "I actively participated in group work.",
          "I fulfilled my assigned role responsibly.",
          "I learned new information about another culture.",
          "I was able to compare other holidays with my own culture.",
          "I used English effectively during the task.",
          "I contributed to the final group product.",
        ]} />
      </div>
      <Card className="mt-4 border-primary/30 bg-primary/5">
        <CardContent className="p-4 text-center">
          <h3 className="font-display text-lg font-bold text-primary mb-1">🎉 Congratulations!</h3>
          <p className="font-body text-xs text-muted-foreground">
            Through this WebQuest, you discovered how holidays and traditions reflect cultural values. By comparing your own holidays with those of other countries, you gained deeper intercultural understanding.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

/* Helper components */
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

export default WebQuest2;
