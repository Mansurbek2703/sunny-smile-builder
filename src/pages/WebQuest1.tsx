import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import DragMatchingTask from "@/components/quest/DragMatchingTask";
import MatchingTask from "@/components/quest/MatchingTask";
import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import VocabularyMatchTask from "@/components/quest/VocabularyMatchTask";
import ComparisonTable from "@/components/quest/ComparisonTable";
import VideoTask from "@/components/quest/VideoTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VennDiagram from "@/components/quest/VennDiagram";

/* ── step definitions ── */
const steps = [
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "task1", label: "Match Countries", icon: PenTool },
  { id: "videos", label: "Video Tasks", icon: Video },
  { id: "navruz-reading", label: "Reading — Navruz", icon: BookOpen },
  { id: "navruz-tasks", label: "Navruz Tasks", icon: PenTool },
  { id: "thanksgiving", label: "Reading — Thanksgiving", icon: BookOpen },
  { id: "thanksgiving-tasks", label: "Thanksgiving Tasks", icon: PenTool },
  { id: "individual", label: "Glossary & Comparison", icon: PenTool },
  { id: "roleplay", label: "Role Play", icon: Users },
  { id: "research", label: "Research Resources", icon: Search },
  { id: "group", label: "Group Work", icon: Users },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goTo = useCallback((idx: number) => {
    setCurrentStep(idx);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Full-screen background image */}
      <div className="fixed inset-0 z-0">
        <img src="/images/webquest1/hero_banner.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/55" />
      </div>

      <div className="relative z-10">
        <SiteHeader />

        {/* Main layout: sidebar + content */}
        <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-100px)]">

          {/* Desktop sidebar */}
          <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-border/50 bg-card/70 backdrop-blur-md sticky top-0 self-start max-h-screen overflow-y-auto py-3 px-2 gap-0.5">
            {/* Title inside sidebar */}
            <div className="px-3 pb-3 mb-2 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-xs font-body mb-1.5 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Orqaga
              </Link>
              <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 1</span>
              <h1 className="font-display text-sm font-bold leading-tight">🌍 WebQuest 1 — Thanksgiving & Navruz</h1>
            </div>
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = i === currentStep;
            return (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm font-body ${
                  active
                    ? "bg-primary text-primary-foreground font-semibold shadow-md"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{s.label}</span>
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
              </button>
            );
          })}
        </aside>

        {/* Mobile menu overlay */}
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
                    <button
                      key={s.id}
                      onClick={() => goTo(i)}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-sm font-body mb-1 ${
                        active
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Content area */}
        <main className="flex-1 min-w-0">
          {/* Mobile top bar */}
          <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
            <div className="flex items-center gap-2 px-3 pt-2 pb-1">
              <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
              <span className="text-[9px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 1</span>
              <span className="font-display text-xs font-bold truncate">🌍 WQ 1 — Thanksgiving & Navruz</span>
            </div>
            <div className="flex items-center gap-2 px-3 pb-2">
              <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button>
              <span className="font-body text-sm text-muted-foreground">{currentStep + 1}/{steps.length}</span>
              <span className="font-display font-semibold text-sm truncate">{steps[currentStep].label}</span>
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-6 md:p-8"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {(() => { const Icon = steps[currentStep].icon; return <Icon className="w-5 h-5" />; })()}
                  </span>
                  <div>
                    <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">Step {currentStep + 1} / {steps.length}</span>
                    <h3 className="font-display text-lg sm:text-xl font-bold">{steps[currentStep].label}</h3>
                  </div>
                </div>

                <StepContent stepId={steps[currentStep].id} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 border-t border-border/50 bg-card/70 backdrop-blur-md">
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
        </main>
        </div>

        <footer className="border-t border-border/50 py-6 text-center space-y-1 bg-card/70 backdrop-blur-md">
          <p className="font-body text-sm text-muted-foreground">WebQuest Explorer — WebQuest 1: Thanksgiving & Navruz</p>
          <p className="font-body text-xs text-muted-foreground/70">
            This site developed by <span className="font-semibold text-foreground/70">Mansurbek Qazaqov</span>. Lead specialist of IT department at AL-Khwarizmi University.
          </p>
        </footer>
      </div>
    </div>
  );
};

/* ── Step content renderer ── */
function StepContent({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "intro": return <IntroStep />;
    case "task1": return <Task1Step />;
    case "videos": return <VideosStep />;
    case "navruz-reading": return <NavruzReadingStep />;
    case "navruz-tasks": return <NavruzTasksStep />;
    case "thanksgiving": return <ThanksgivingReadingStep />;
    case "thanksgiving-tasks": return <ThanksgivingTasksStep />;
    case "individual": return <IndividualStep />;
    case "roleplay": return <RolePlayStep />;
    case "research": return <ResearchStep />;
    case "group": return <GroupStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

/* ── Individual step components ── */

function IntroStep() {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        {["Learn the origins, traditions, and customs of Thanksgiving and Navruz.",
          "Compare these two holidays using charts and visuals.",
          "Work in groups to design a \"Thanksgiving–Navruz Cultural Evening\".",
          "Present your findings and reflections in class or online.",
        ].map((outcome, i) => (
          <Card key={i} className="glass-card hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm">{i + 1}</span>
              <p className="font-body text-sm leading-relaxed">{outcome}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="font-body text-muted-foreground leading-relaxed mb-6">
        Holidays are more than just days off — they reflect the history, culture, and values of people. In this WebQuest, you will explore two important holidays: <strong>Thanksgiving</strong> in the United States and <strong>Navruz</strong> in Central Asia. While they come from different cultural traditions, both emphasize gratitude, family, food, and community.
      </p>
      <img src="/images/webquest1/intro_traditions.jpg" alt="Navruz and Thanksgiving celebrations" loading="lazy" className="rounded-xl w-full h-48 sm:h-64 md:h-80 object-cover shadow-md" />
    </>
  );
}

function Task1Step() {
  return (
    <>
      <p className="font-body text-muted-foreground mb-6">
        Read the descriptions of holidays in Column B and match them with the countries in Column A. Drag the flag images and drop them next to the correct description.
      </p>
      <DragMatchingTask
        items={[
          { label: "USA", image: "/images/webquest1/task1_2.jpg" },
          { label: "Uzbekistan", image: "/images/webquest1/task1_3.jpg" },
          { label: "Ireland", image: "/images/webquest1/task1_4.jpg" },
          { label: "India", image: "/images/webquest1/task1_5.jpg" },
          { label: "China", image: "/images/webquest1/flag_china.png" },
          { label: "Mexico", image: "/images/webquest1/flag_mexico.png" },
        ]}
        descriptions={[
          { letter: "A", text: "Spring festival, March 21, sumalak, cultural performances" },
          { letter: "B", text: "Festival of lights, victory of good over evil, fireworks" },
          { letter: "C", text: "Late November, turkey, pumpkin pie, gratitude" },
          { letter: "D", text: "Lunar calendar, dragon dances, red envelopes" },
          { letter: "E", text: "March 17, patron saint, wearing green, parades" },
          { letter: "F", text: "Honouring deceased relatives, sugar skulls, marigolds" },
          { letter: "G", text: "July 4, fireworks, barbecues, Declaration of Independence" },
        ]}
        correctAnswers={{ 0: 1, 1: 3, 2: 0, 3: 4, 4: 2, 5: 5 }}
      />
    </>
  );
}

function VideosStep() {
  return (
    <div className="space-y-8">
      <VideoTask title="Video Task I — Navruz in Tashkent" instruction="Watch the video and tell why Tashkent locals expect Navruz." videoUrl="https://www.youtube.com/watch?v=3k5bE-jV7sQ" thumbnail="/images/webquest1/video_task1.jpg" />
      <VideoTask title="Video Task II — Origin of Thanksgiving" instruction="Watch the video and tell about the origin of Thanksgiving Day." videoUrl="https://www.youtube.com/watch?v=oJ9B5HHYNbE" thumbnail="/images/webquest1/video_task2.jpg" />
    </div>
  );
}

function NavruzReadingStep() {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <img src="/images/webquest1/navruz1.jpg" alt="Navruz" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        <img src="/images/webquest1/navruz2.jpg" alt="Navruz celebration" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        <img src="/images/webquest1/navruz3.jpg" alt="Navruz food" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30 hidden sm:block" />
      </div>
      <ReadingSection title="A — How Navruz is celebrated">
        Each spring, Uzbekistan bursts into colour and celebration as Navruz — literally translating to 'New Day' — ushers in the Persian New Year. Marking the arrival of spring on 21 March, Navruz is one of the most significant festivals across Central Asia, deeply rooted in tradition, history, and community spirit. Streets come alive with festivities, music, and dance, while families prepare special meals and visit relatives. One of the most beloved traditions is cooking and sharing sumalak.
      </ReadingSection>
      <ReadingSection title="B — Origins of Navruz">
        Navruz dates back over 3,000 years to the Zoroastrian era, celebrated by ancient Persians and Central Asian civilisations. It is closely tied to nature, symbolising rebirth, hope, and harmony. The festival is based on the solar calendar, aligning with the vernal equinox — a time when day and night are equal.
      </ReadingSection>
      <ReadingSection title="C — Regional Variations">
        While Uzbekistan's celebrations are distinct, the festival is observed across many countries. In Iran, Navruz involves setting up a Haft-Seen table. In Kazakhstan and Kyrgyzstan, traditional equestrian games play a central role.
      </ReadingSection>
      <ReadingSection title="D — Legends">
        One of the most famous legends tells of the tyrant Zahhak, whose rule was overthrown by the hero Kaveh, bringing light and justice back — an allegory for the arrival of spring.
      </ReadingSection>
      <ReadingSection title="E — Food and Drink">
        Besides sumalak, popular dishes include halim (wheat and meat porridge) and kuk samsa (pastries filled with greens). Dried fruits and nuts are shared generously.
      </ReadingSection>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
        <img src="/images/webquest1/navruz_celebration1.jpg" alt="Navruz" className="rounded-xl w-full h-36 sm:h-40 object-contain sm:object-cover shadow-md bg-muted/30" />
        <img src="/images/webquest1/navruz_celebration2.jpg" alt="Navruz" className="rounded-xl w-full h-36 sm:h-40 object-contain sm:object-cover shadow-md bg-muted/30" />
        <img src="/images/webquest1/navruz_celebration3.jpg" alt="Kupkari" className="rounded-xl w-full h-36 sm:h-40 object-contain sm:object-cover shadow-md bg-muted/30 hidden sm:block" />
      </div>
    </>
  );
}

function NavruzTasksStep() {
  return (
    <>
      <h4 className="font-display text-lg font-semibold mb-4">Task I: Match headings with paragraphs A–E</h4>
      <MatchingTask
        pairs={[
          { left: "1. The origins of Navruz", right: "Paragraph ___" },
          { left: "2. Modern adaptations", right: "Paragraph ___" },
          { left: "3. What to say during Navruz", right: "Paragraph ___" },
          { left: "4. Legends and stories", right: "Paragraph ___" },
          { left: "5. Regional variations", right: "Paragraph ___" },
          { left: "6. How Navruz is celebrated", right: "Paragraph ___" },
          { left: "7. Traditional food and drink", right: "Paragraph ___" },
        ]}
        correctAnswers={{ 0: "B", 1: "F", 2: "F", 3: "D", 4: "C", 5: "A", 6: "E" }}
      />
      <div className="mt-10">
        <h4 className="font-display text-lg font-semibold mb-4">Task II: Match Words with Meanings</h4>
        <VocabularyMatchTask
          words={[
            { word: "usher in", definition: "To introduce or mark the beginning of something" },
            { word: "cherished", definition: "Highly valued and loved" },
            { word: "reconciliation", definition: "The act of restoring friendly relations" },
            { word: "equinox", definition: "A period when day and night are of equal length" },
            { word: "folklore", definition: "Stories and traditions passed down through generations" },
            { word: "abundance", definition: "A large quantity or plenty of something" },
            { word: "allegory", definition: "A symbolic story with a deeper meaning" },
            { word: "endurance", definition: "The ability to continue despite physical difficulty" },
          ]}
        />
      </div>
    </>
  );
}

function ThanksgivingReadingStep() {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <img src="/images/webquest1/thanksgiving1.jpg" alt="Thanksgiving" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        <img src="/images/webquest1/thanksgiving2.jpg" alt="Thanksgiving" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        <img src="/images/webquest1/thanksgiving3.jpg" alt="Thanksgiving" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30 hidden sm:block" />
      </div>
      {[
        { title: "🦃 Watch the Macy's Parade", text: "The Macy's Thanksgiving Day Parade is one of the most famous holiday traditions in the US. Thousands line the streets of Manhattan to watch giant inflatable balloons float between skyscrapers." },
        { title: "🍗 Eat a Traditional Meal", text: "Must-eats: roast turkey, cranberry sauce, stuffing, mashed potatoes and gravy, sweet potatoes, and pumpkin pie for dessert." },
        { title: "🏈 Watch Football", text: "Football on Thanksgiving dates back to 1876. Families gather to watch their favorite teams or play a game themselves." },
        { title: "🤝 Friendsgiving", text: "Friends gathering together — 'Friendsgiving' — is a newer tradition. A time to share a meal and enjoy each other's company." },
        { title: "🏃 Turkey Trot", text: "Turkey trots are 5K fun runs to half marathons across the US on Thanksgiving Day." },
        { title: "🛍️ Black Friday", text: "Stores have their biggest sales the day after Thanksgiving — almost a holiday in itself." },
        { title: "❤️ Giving Back", text: "Many communities hold annual food drives and host Thanksgiving dinners for those in need." },
      ].map((item, i) => (
        <ReadingSection key={i} title={item.title}>{item.text}</ReadingSection>
      ))}
    </>
  );
}

function ThanksgivingTasksStep() {
  return (
    <>
      <OpenQuestionTask
        title="Task II: Answer the Questions"
        questions={[
          "Which Thanksgiving traditions might seem unusual to people from your culture?",
          "Which traditions are similar to holidays in your country?",
        ]}
      />
      <div className="mt-8">
        <h4 className="font-display text-lg font-semibold mb-4">Cultural Meanings</h4>
        <SelectMatchingTask
          pairs={[
            { left: "Sharing what you're thankful for", right: "" },
            { left: "Friendsgiving", right: "" },
            { left: "Volunteering / food drives", right: "" },
            { left: "Family gathering", right: "" },
            { left: "Inviting international students", right: "" },
            { left: "Charity dinners", right: "" },
          ]}
          options={[
            "Gratitude and reflection",
            "Community support",
            "Social inclusion beyond family",
            "Strengthening family bonds",
            "Empathy and social responsibility",
            "Cultural openness and hospitality",
          ]}
          correctAnswers={{
            0: "Gratitude and reflection",
            1: "Community support",
            2: "Social inclusion beyond family",
            3: "Strengthening family bonds",
            4: "Empathy and social responsibility",
            5: "Cultural openness and hospitality",
          }}
        />
      </div>
    </>
  );
}

function IndividualStep() {
  return (
    <>
      <h4 className="font-display text-lg font-semibold mb-4">Task IV: Holiday Glossary</h4>
      <VocabularyMatchTask
        words={[
          { word: "Harvest", definition: "The time of year when crops are collected" },
          { word: "Gratitude", definition: "The act of being thankful" },
          { word: "Equinox", definition: "A time when day and night are of equal length" },
          { word: "Renewal", definition: "A new beginning or fresh start" },
          { word: "Feast", definition: "A large meal to celebrate something" },
          { word: "Hospitality", definition: "The quality of being friendly and welcoming" },
          { word: "Unity", definition: "A state of being joined together" },
          { word: "Parade", definition: "An event where people march and celebrate in public" },
          { word: "Blessing", definition: "Something that brings good fortune" },
          { word: "Tradition", definition: "A custom passed from generation to generation" },
        ]}
      />
      <div className="mt-10">
        <h4 className="font-display text-lg font-semibold mb-4">Task V: Compare Navruz & Thanksgiving</h4>
        <ComparisonTable
          headers={["Aspect", "Navruz (Uzbekistan)", "Thanksgiving (USA)"]}
          rows={[
            { aspect: "Family roles" },
            { aspect: "Food sharing" },
            { aspect: "Charity & kindness" },
            { aspect: "Respect for elders" },
            { aspect: "Community activities" },
          ]}
        />
      </div>
    </>
  );
}

function RolePlayStep() {
  return (
    <>
      <img src="/images/webquest1/role_play.jpg" alt="Role play" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md mb-6 bg-muted/30" />
      <h4 className="font-display text-lg font-semibold mb-3">Task VI: Do's and Don'ts for Visitors</h4>
      <p className="font-body text-muted-foreground mb-4">Create a "Tourist Behaviour Guide": 3 Do's and 3 Don'ts for each holiday.</p>
      <OpenQuestionTask
        title="Task VII: Values Behind the Behaviour"
        questions={[
          "What cultural value does sharing sumalak represent?",
          "What cultural value does Thanksgiving charity represent?",
          "How do family gatherings reflect togetherness?",
          "How does forgiveness at Navruz symbolize renewal?",
        ]}
      />
      <div className="mt-8">
        <h4 className="font-display text-lg font-semibold mb-3">Task VIII: Cultural Scenario Role-Play</h4>
        <Card className="glass-card">
          <CardContent className="p-4 sm:p-6 font-body text-sm space-y-3">
            <p>You are invited to a <strong>Navruz celebration in Uzbekistan</strong> or a <strong>Thanksgiving dinner in the USA</strong>.</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Greet people correctly</li>
              <li>Behave politely at the table</li>
              <li>Show respect for traditions</li>
            </ul>
            <p className="text-primary font-medium">Extension: Act out one correct and one incorrect behaviour and explain why.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ResearchStep() {
  return (
    <>
      <p className="font-body text-muted-foreground mb-4">Use these links to deepen your knowledge:</p>
      <div className="space-y-2">
        {[
          { name: "Thanksgiving Day — Britannica", url: "https://www.britannica.com/topic/Thanksgiving-Day" },
          { name: "History of Thanksgiving — History.com", url: "https://www.history.com/topics/thanksgiving" },
          { name: "Nowruz — UNESCO", url: "https://ich.unesco.org/en/RL/nawrouz-novruz-nowrouz-nowruz-nawruz-nauryz-nooruz-nowruz-navruz-nauroz-nevruz-and-nowruz-00550" },
          { name: "Navruz — Nord Anglia Education", url: "https://www.nordangliaeducation.com" },
        ].map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors font-body text-sm text-primary">
            <Search className="w-4 h-4" />
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}

function GroupStep() {
  return (
    <>
      <h4 className="font-display text-lg font-semibold mb-4">Task IX: Venn Diagram</h4>
      <VennDiagram leftLabel="Navruz" rightLabel="Thanksgiving" />
      <div className="mt-8">
        <h4 className="font-display text-lg font-semibold mb-3">Plan Your Cultural Evening</h4>
        <Card className="glass-card">
          <CardContent className="p-4 sm:p-6 font-body text-sm space-y-2 text-muted-foreground">
            <p>Plan a "Thanksgiving–Navruz Cultural Evening" with your group:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Decide the menu</li>
              <li>Plan performances</li>
              <li>Design decorations</li>
              <li>Prepare a presentation (PowerPoint, Canva, or poster)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function ReflectionStep() {
  return (
    <>
      <OpenQuestionTask
        title="Reflection"
        questions={[
          "What behaviour during Navruz or Thanksgiving would feel unfamiliar to you? How would you adapt to show respect?",
          "Which of the studied words do you think is most important to describe holidays? Why?",
        ]}
      />
      <div className="mt-8">
        <h4 className="font-display text-lg font-semibold mb-4">Self-Evaluation Checklist</h4>
        <SelfEvalChecklist items={[
          "I can explain the origins of Navruz and Thanksgiving.",
          "I know the main traditions and foods of each holiday.",
          "I can compare the two celebrations.",
          "I understand that holidays may have different meanings for different people.",
          "I used new vocabulary correctly.",
          "I completed all tasks and shared my work.",
          "I learned something new about another culture.",
          "I can use this knowledge in future intercultural situations.",
        ]} />
      </div>
      <Card className="mt-8 border-primary/30 bg-primary/5">
        <CardContent className="p-4 sm:p-6 text-center">
          <h3 className="font-display text-xl font-bold text-primary mb-2">🎉 Congratulations!</h3>
          <p className="font-body text-sm text-muted-foreground">
            You have compared two important traditions and discovered how people in different cultures celebrate gratitude, renewal, and family. Remember: learning about other cultures is the first step toward becoming a global citizen.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

/* ── Shared sub-components ── */

function ReadingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 p-4 rounded-xl bg-muted/50 border-l-4 border-primary/40">
      <h5 className="font-display font-semibold text-sm mb-2">{title}</h5>
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
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

export default WebQuest1;
