import { useState, useCallback } from "react";
import { useResponseTracker } from "@/hooks/useResponseTracker";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuestSubmitButton } from "@/components/QuestSubmitButton";
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
  { id: "navruz", label: "Navruz — Reading & Tasks", icon: BookOpen },
  { id: "thanksgiving", label: "Thanksgiving — Reading & Tasks", icon: BookOpen },
  { id: "individual", label: "Glossary & Comparison", icon: PenTool },
  { id: "roleplay", label: "Role Play", icon: Users },
  { id: "research", label: "Research Resources", icon: Search },
  { id: "group", label: "Group Work", icon: Users },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useResponseTracker(1, steps, currentStep);

  const goTo = useCallback((idx: number) => {
    setCurrentStep(idx);
    setMobileMenuOpen(false);
  }, []);

  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img src="/images/webquest1/hero_banner.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/55" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0">
          <SiteHeader />
        </div>

        <div className="flex flex-1 overflow-hidden">

          {/* Desktop sidebar */}
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px"
            style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}
          >
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-lg font-body mb-0.5 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Orqaga
              </Link>
              <span className="text-xs font-body font-medium uppercase tracking-widest text-quest-gold">Module 1</span>
              <h1 className="font-display text-xl font-bold leading-tight">🌍 WebQuest 1 — Thanksgiving & Navruz</h1>
            </div>
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = i === currentStep;
            return (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-sm font-body ${
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
                  <span className="font-display font-bold text-xl">Steps</span>
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
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* Mobile top bar */}
          <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
            <div className="flex items-center gap-2 px-3 pt-2 pb-1">
              <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
              <span className="text-xs font-body font-medium uppercase tracking-widest text-quest-gold">Module 1</span>
              <span className="font-display text-lg font-bold truncate">🌍 WQ 1 — Thanksgiving & Navruz</span>
            </div>
            <div className="flex items-center gap-2 px-3 pb-2">
              <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button>
              <span className="font-body text-lg text-primary">{currentStep + 1}/{steps.length}</span>
              <span className="font-display font-semibold text-lg truncate">{steps[currentStep].label}</span>
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
              className="p-1 sm:p-1.5 md:px-4 md:py-1"
            >
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 shadow-sm border-2 border-transparent hover:shadow-lg transition-all duration-300"
                style={{ borderImage: 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1', borderRadius: '0.75rem' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1'; }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    {(() => { const Icon = steps[currentStep].icon; return <Icon className="w-3.5 h-3.5" />; })()}
                  </span>
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

        {/* Sticky footer navigation */}
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

/* ── Step content renderer ── */
function StepContent({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "intro": return <IntroStep />;
    case "task1": return <Task1Step />;
    case "videos": return <VideosStep />;
    case "navruz": return <NavruzStep />;
    case "thanksgiving": return <ThanksgivingStep />;
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
      <div className="grid sm:grid-cols-2 gap-2 mb-2">
        {["Learn the origins, traditions, and customs of Thanksgiving and Navruz.",
          "Compare these two holidays using charts and visuals.",
          "Work in groups to design a \"Thanksgiving–Navruz Cultural Evening\".",
          "Present your findings and reflections in class or online.",
        ].map((outcome, i) => (
          <Card key={i} className="glass-card hover:shadow-lg transition-shadow">
            <CardContent className="p-2 flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-lg">{i + 1}</span>
              <p className="font-body text-lg leading-snug">{outcome}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="font-body text-foreground text-lg leading-snug mb-2">
        Holidays are more than just days off — they reflect the history, culture, and values of people. In this WebQuest, you will explore two important holidays: <strong>Thanksgiving</strong> in the United States and <strong>Navruz</strong> in Central Asia. While they come from different cultural traditions, both emphasize gratitude, family, food, and community.
      </p>
      <div className="grid grid-cols-2 gap-2">
        <img src="/images/webquest1/intro_navruz.jpg" alt="Navruz - oila dasturxon atrofida" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
        <img src="/images/webquest1/intro_thanksgiving.jpg" alt="Thanksgiving - oila ovqatlanmoqda" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
      </div>
    </>
  );
}

function Task1Step() {
  return (
    <>
      <p className="font-body text-foreground text-lg mb-2">
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
          { letter: "D", text: "Lunar calendar, dragon dances, red envelopes" },
          { letter: "E", text: "March 17, patron saint, wearing green, parades" },
          { letter: "F", text: "Honouring deceased relatives, sugar skulls, marigolds" },
          { letter: "G", text: "July 4, fireworks, barbecues, Declaration of Independence" },
        ]}
        correctAnswers={{ 0: 1, 1: 3, 2: 4, 3: 2, 4: 5, 5: 0 }}
      />
    </>
  );
}

function VideosStep() {
  return (
    <div className="grid md:grid-cols-2 gap-2">
      <VideoTask title="Video Task I — Navruz in Tashkent" instruction="Watch the video and tell why Tashkent locals expect Navruz." videoUrl="https://www.youtube.com/watch?v=3k5bE-jV7sQ" thumbnail="/images/webquest1/video_task1.jpg" />
      <VideoTask title="Video Task II — Origin of Thanksgiving" instruction="Watch the video and tell about the origin of Thanksgiving Day." videoUrl="https://www.youtube.com/watch?v=oJ9B5HHYNbE" thumbnail="/images/webquest1/video_task2.jpg" />
    </div>
  );
}

function NavruzStep() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <img src="/images/webquest1/navruz_reading1.jpg" alt="Navro'z bayram dasturxoni" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
        <img src="/images/webquest1/navruz_reading2.jpg" alt="Sumalak pishirish marosimi" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
      </div>

      <div className="mb-2 p-2 rounded-lg bg-primary/5 border-l-3 border-primary">
        <p className="font-body text-lg text-foreground leading-snug">
          Each spring, Uzbekistan bursts into colour and celebration as Navruz — literally translating to 'New Day' — ushers in the Persian New Year. Marking the arrival of spring on 21 March, Navruz is one of the most significant and cherished festivals across Central Asia, deeply rooted in tradition, history, and community spirit. For Uzbek families, it's a time of joy, renewal, and connection, as people gather to welcome the changing season with open hearts.
        </p>
      </div>

      <ReadingSection title="A">
        In Uzbekistan, Navruz is more than just a holiday; it is an expression of national identity and cultural pride. Streets come alive with festivities, music, and dance, while families prepare special meals and visit relatives. One of the most beloved traditions is cooking and sharing sumalak, a thick, sweet wheat-based dish that requires hours of slow stirring. Made in large cauldrons, it's normally prepared collectively, with family and friends taking turns stirring and making wishes for the coming year.
        {"\n\n"}Another key aspect of Navruz is acts of kindness and charity. Many people give to those in need, while elders are honoured with visits and special meals. It's a time for reconciliation — any past grievances are set aside, which reinforces the spirit of unity.
      </ReadingSection>

      <ReadingSection title="B">
        Navruz (also known as Nowruz, Nawruz, Norooz or Nevruz) dates back over 3,000 years to the Zoroastrian era, celebrated by ancient Persians and Central Asian civilisations as the first day of the new year. It is closely tied to nature, symbolising rebirth, hope, and harmony. The festival is based on the solar calendar, aligning with the vernal equinox — a time when day and night are equal in length, signifying balance and new beginnings.
      </ReadingSection>

      <ReadingSection title="C">
        While Uzbekistan's Navruz celebrations are distinct, the festival is observed across many countries, each adding their own cultural flair. In neighbouring Tajikistan and Iran, for example, Navruz involves setting up a Haft-Seen table, featuring seven symbolic items starting with the Persian letter 'S'. Meanwhile, in Kazakhstan and Kyrgyzstan, traditional equestrian games and wrestling competitions play a central role.
        {"\n\n"}Even within Uzbekistan, different regions have their own customs. In the Fergana Valley, Navruz often features intricate atlas silk costumes and lively folk performances, while in Samarkand and Bukhara, the holiday embraces Persian influences, with poetry readings and classical music.
      </ReadingSection>

      <ReadingSection title="D">
        Navruz is steeped in folklore. One of the most famous legends tells of the tyrant Zahhak, whose rule was overthrown by the hero Kaveh, bringing light and justice back to the land — an allegory for the arrival of spring. Another story tells of a wise ruler who declared Navruz a day for forgiveness and new beginnings, ensuring that every citizen, regardless of status, started the year afresh.
      </ReadingSection>

      <ReadingSection title="E">
        Food plays a central role in Navruz festivities, symbolising abundance and prosperity. Besides sumalak, popular dishes include halim (a slow-cooked wheat and meat porridge) and kuk samsa (flaky pastries filled with fragrant greens). Dried fruits and nuts are shared generously, while herbal teas and refreshing drinks made from sumalak juice are enjoyed throughout the celebrations.
      </ReadingSection>

      <ReadingSection title="F">
        If you want to greet someone during Navruz, a simple "Navruz muborak!" (Happy Navruz!) is a warm and appreciated way to share in the joy of the season. You might also hear "Navruz bayramingiz muborak bo'lsin!" which expresses wishes for a blessed and happy Navruz.
      </ReadingSection>

      <ReadingSection title="G — Modern Adaptations">
        While traditional customs remain at the heart of Navruz, modern adaptations have emerged, particularly in urban areas. Large-scale concerts and cultural events are organised in city centres, featuring contemporary music and dance alongside traditional performances. Eco-friendly initiatives, such as tree planting and community clean-ups, have become a growing trend, aligning with Navruz's themes of renewal and harmony with nature.
      </ReadingSection>

      <div className="mt-2 space-y-1.5">
        <ReadingSection title="🎈 Navruz Activities for Children">
          Navruz is a joyous time for children, who take part in games, storytelling, and craft-making activities. Many schools organise Navruz-themed performances and encourage students to create traditional decorations. Kite flying and outdoor games are also popular, as families embrace the warmer weather and festive atmosphere.
        </ReadingSection>

        <ReadingSection title="🎵 Navruz Music and Dance">
          Music and dance are central to Navruz celebrations. Traditional bakhshi musicians perform epic storytelling songs, while dance troupes showcase Uzbek folk dances such as Lazgi, known for its expressive movements. The rhythmic sounds of doira (a frame drum) and nay (a flute-like instrument) fill the air as people dance and celebrate together.
        </ReadingSection>
        <ReadingSection title="🐎 Kupkari: Traditional Horseback Games">
          No Navruz celebration in Uzbekistan would be complete without the exhilarating spectacle of Kupkari, a traditional horseback competition that has been played for centuries. Also known as buzkashi in other parts of Central Asia, this game is a test of strength, horsemanship, and teamwork, drawing large crowds eager to witness the action.
          {"\n\n"}In Kupkari, skilled riders compete to seize a goat or calf carcass and carry it to the goal while fending off challengers. The game demands incredible agility, endurance, and strategy, as competitors must not only control their horses but also wrestle the heavy prize from their rivals. The stakes are often high, with winners receiving valuable rewards such as livestock, cash, or even a new horse! During Navruz, Kupkari takes on special significance as communities come together to celebrate the new season.
        </ReadingSection>

        <ReadingSection title="👗 Traditional Fashion and Clothing">
          Many people dress in traditional Uzbek clothing during Navruz, wearing vibrant silk atlas dresses and embroidered doppi caps. Women often wear colourful scarves, while men don embroidered robes called chapan. These outfits reflect Uzbekistan's rich textile heritage and add to the festive spirit of the holiday.
        </ReadingSection>

        <ReadingSection title="✨ Astrological and Symbolic Meanings">
          As Navruz aligns with the spring equinox, some believe it holds astrological significance, representing a cosmic balance between light and dark. In many traditions, Navruz is seen as a time to set intentions for the year ahead, with nature's renewal symbolising personal growth and prosperity.
        </ReadingSection>
      </div>

      <ReadingSection title="H — Conclusion">
        Navruz is not just a celebration; it embodies the values of renewal, generosity, and gratitude. Whether through sharing meals, reconnecting with loved ones, or honouring traditions passed down for generations, Navruz remains a powerful reminder of the importance of community and cultural heritage.
        {"\n\n"}As Uzbekistan embraces the new season, the warmth of Navruz brings people together, reaffirming the belief that every new beginning holds the promise of joy, growth, and unity.
      </ReadingSection>

      {/* Tasks section */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <h4 className="font-display text-xl font-semibold mb-1">Task I: Match headings with paragraphs A–H</h4>
        <div className="md:columns-2 md:gap-2">
          <MatchingTask
            pairs={[
              { left: "1. How Navruz is celebrated", right: "Paragraph ___" },
              { left: "2. The origins of Navruz", right: "Paragraph ___" },
              { left: "3. Regional and international variations", right: "Paragraph ___" },
              { left: "4. Legends and stories of Navruz", right: "Paragraph ___" },
              { left: "5. Traditional Navruz food and drink", right: "Paragraph ___" },
              { left: "6. Navruz greetings", right: "Paragraph ___" },
              { left: "7. Modern adaptations", right: "Paragraph ___" },
              { left: "8. Conclusion", right: "Paragraph ___" },
            ]}
            correctAnswers={{ 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G", 7: "H" }}
          />
        </div>
        <div className="mt-4">
          <h4 className="font-display text-xl font-semibold mb-1.5">Task II: Match Words with Meanings</h4>
          <VocabularyMatchTask
            words={[
              { word: "A. usher in", definition: "To introduce or mark the beginning of something" },
              { word: "B. cherished", definition: "Highly valued and loved" },
              { word: "C. reconciliation", definition: "The act of restoring friendly relations" },
              { word: "D. equinox", definition: "A period when day and night are of equal length" },
              { word: "E. folklore", definition: "Stories and traditions passed down through generations" },
              { word: "F. abundance", definition: "A large quantity or plenty of something" },
              { word: "G. flair", definition: "A distinctive and creative style" },
              { word: "H. allegory", definition: "A symbolic story with a deeper meaning" },
              { word: "I. endurance", definition: "The ability to continue despite physical difficulty" },
              { word: "J. heritage", definition: "Cultural traditions and history passed from the past" },
            ]}
          />
        </div>
      </div>
    </>
  );
}

function ThanksgivingStep() {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-2 mb-2">
        <img src="/images/webquest1/thanksgiving2.jpg" alt="Thanksgiving" className="rounded-lg w-full h-24 sm:h-28 object-cover shadow-sm bg-muted/30" />
        <img src="/images/webquest1/thanksgiving3.jpg" alt="Thanksgiving" className="rounded-lg w-full h-24 sm:h-28 object-cover shadow-sm bg-muted/30" />
      </div>

      <div className="mb-2 p-2 rounded-lg bg-primary/5 border-l-3 border-primary">
        <p className="font-body text-lg text-foreground leading-snug">
          It's the most wonderful time of the year in the US – a time for food, family, friends, and being thankful. Originating as a harvest festival, Thanksgiving is one of the biggest holidays in the US. People across the country gather together to share a meal and reflect on all the things they're grateful for. But there's much more to do during this beautiful time of giving thanks than just eating. From parades to shopping, running to volunteering – Thanksgiving is celebrated in a wide variety of ways. We've put together our bucket list for the ultimate US Thanksgiving celebration.
        </p>
      </div>

      <ReadingSection title="🦃 Watch the Macy's Thanksgiving Day Parade">
        The Macy's Thanksgiving Day Parade is now one of the most famous holiday traditions in the United States. In New York City, thousands of people line the streets of Manhattan to watch. This particular parade is known for its giant inflatable balloons that float between the skyscrapers, high above the onlookers.
      </ReadingSection>

      <ReadingSection title="🦴 Break the Wishbone for Good Luck">
        It may sound silly, but this is a real thing! After carving the turkey, the wishbone, a Y-shaped bone that carries much superstition, gets set aside to dry. Once the meal is over, two people make their wishes and break the wishbone. Whoever ends up with the bigger piece is said to have their wish come true and good luck for the upcoming year.
      </ReadingSection>

      <ReadingSection title="🍗 Eat a Traditional Thanksgiving Meal">
        No Thanksgiving Day would be complete without the traditional meal. Must-eats are: roast turkey, cranberry sauce, stuffing, mashed potatoes and gravy, and sweet potatoes and Brussels sprouts. Green bean casserole has become a popular dish, especially in the Midwest. Completing the meal is, of course, pumpkin pie for dessert. After all of that it's time for the next tradition...
      </ReadingSection>

      <ReadingSection title="😴 Take a Nap">
        After an afternoon filled with cooking and eating delicious food, many retreat to the couch for a mid-day nap. Turkey is well known as the culprit of this sudden onset of sleepiness, with its high levels of the amino acid tryptophan. While tryptophan is known to help release chemicals like melatonin (which makes you drowsy), it's not entirely the turkey's fault. Eating other foods that are high in sugar (like pie) also increase your tiredness. But with all the business of the holiday, everyone deserves some rest!
      </ReadingSection>

      <ReadingSection title="🙏 Share What You're Most Thankful For">
        Thanksgiving is a perfect time to reflect on the year alongside family and friends. Whether it's during the meal or while relaxing later in the day, go around the room and share something you're especially grateful for. It's wonderful to hear everyone talk about their favorite moments and experiences from the previous year.
      </ReadingSection>

      <ReadingSection title="🏈 Watch an American Football Game">
        Football is the most popular sport to watch in the US and the idea of games played on Thanksgiving Day actually dates back as early as 1876, shortly after the game was invented. Families and friends gather around to watch their favorite teams compete in one of America's favorite sports. Or, to burn off some of those Thanksgiving calories, some families split into teams and play a game of football themselves.
      </ReadingSection>

      <ReadingSection title="🤝 Be Grateful for Friendsgiving">
        Because most people celebrate Thanksgiving with their families, dedicating time to give thanks with friends has become equally important. Friends gathering together, aptly called "Friendsgiving," is a newer tradition. It's a time to share a meal and enjoy each other's company before traveling home to join family.
      </ReadingSection>

      <ReadingSection title="🏃 Run a Turkey Trot">
        It may seem counterintuitive (or genius) to run a race on America's biggest food holiday, but turkey trots are a trend across the US on Thanksgiving Day. The name derives from the turkey, the typical centerpiece of Thanksgiving dinner. From 5K fun runs to half marathons, these races bring out runners, walkers and fans in local communities. It's a fun way to earn and burn the calories consumed during the Thanksgiving meal.
      </ReadingSection>

      <ReadingSection title="🛍️ Shop 'til You Drop on Black Friday">
        Stores all across the country have some of their biggest sales the day after Thanksgiving. Now known as Black Friday, this day is almost a holiday in itself. While this shopping tradition has changed with the rise of e-commerce, people still stand in line for hours early in the morning to get great discounts and start their Christmas shopping.
      </ReadingSection>

      <ReadingSection title="❤️ Giving Back">
        In the spirit of giving thanks and helping others, many communities across the US hold annual food drives that collect non-perishable packaged and canned foods for those in need. These organizations also host Thanksgiving dinners so that everyone has a place to enjoy a warm meal.
        {"\n\n"}Each year at EF Academy New York, students from all over the world get to share in the holiday spirit. They share the traditional Thanksgiving meal together, go Black Friday shopping at a nearby mall, and decorate the halls for the holiday season. It's a fun and festive way to share this important piece of US culture with our international community.
      </ReadingSection>

      {/* Tasks section */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="grid md:grid-cols-2 gap-2">
          <OpenQuestionTask
            title="Task II: Answer the Questions"
            questions={[
              "Which Thanksgiving traditions might seem unusual to people from your culture?",
              "Which traditions are similar to holidays in your country?",
            ]}
          />
          <div>
            <h4 className="font-display text-xl font-semibold mb-1">Cultural Meanings</h4>
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
                1: "Social inclusion beyond family",
                2: "Empathy and social responsibility",
                3: "Strengthening family bonds",
                4: "Cultural openness and hospitality",
                5: "Community support",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function IndividualStep() {
  return (
    <>
      <h4 className="font-display text-xl font-semibold mb-1.5">Task IV: Holiday Glossary</h4>
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
      <div className="mt-3">
        <h4 className="font-display text-xl font-semibold mb-1.5">Task V: Compare Navruz & Thanksgiving</h4>
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
      <h4 className="font-display text-xl font-semibold mb-0.5">Task VI: Do's and Don'ts for Visitors</h4>
      <p className="font-body text-lg text-foreground mb-1">Create a "Tourist Behaviour Guide": 3 Do's and 3 Don'ts for each holiday.</p>
      <div className="grid md:grid-cols-2 gap-2">
        <OpenQuestionTask
          title="Task VII: Values Behind the Behaviour"
          questions={[
            "What cultural value does sharing sumalak represent?",
            "What cultural value does Thanksgiving charity represent?",
            "How do family gatherings reflect togetherness?",
            "How does forgiveness at Navruz symbolize renewal?",
          ]}
        />
        <div>
          <h4 className="font-display text-xl font-semibold mb-0.5">Task VIII: Cultural Scenario Role-Play</h4>
        <Card className="glass-card">
          <CardContent className="p-2 sm:p-3 font-body text-lg space-y-1">
            <p>You are invited to a <strong>Navruz celebration in Uzbekistan</strong> or a <strong>Thanksgiving dinner in the USA</strong>.</p>
            <ul className="list-disc pl-4 space-y-0.5 text-foreground">
              <li>Greet people correctly</li>
              <li>Behave politely at the table</li>
              <li>Show respect for traditions</li>
            </ul>
            <p className="text-primary font-medium">Extension: Act out one correct and one incorrect behaviour and explain why.</p>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}

function ResearchStep() {
  return (
    <>
      <p className="font-body text-lg text-foreground mb-2">Use these links to deepen your knowledge:</p>
      <div className="space-y-1">
        {[
          { name: "Thanksgiving Day — Britannica", url: "https://www.britannica.com/topic/Thanksgiving-Day" },
          { name: "History of Thanksgiving — History.com", url: "https://www.history.com/topics/thanksgiving" },
          { name: "Nowruz — UNESCO", url: "https://ich.unesco.org/en/RL/nawrouz-novruz-nowrouz-nowruz-nawruz-nauryz-nooruz-nowruz-navruz-nauroz-nevruz-and-nowruz-00550" },
          { name: "Navruz — Nord Anglia Education", url: "https://www.nordangliaeducation.com" },
        ].map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2 rounded-md bg-primary/5 hover:bg-primary/10 transition-colors font-body text-lg text-primary">
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
      <h4 className="font-display text-xl font-semibold mb-1.5">Task IX: Venn Diagram</h4>
      <VennDiagram leftLabel="Navruz" rightLabel="Thanksgiving" />
      <div className="mt-3">
        <h4 className="font-display text-xl font-semibold mb-1">Plan Your Cultural Evening</h4>
        <Card className="glass-card">
          <CardContent className="p-2 sm:p-3 font-body text-lg space-y-1 text-foreground">
            <p>Plan a "Thanksgiving–Navruz Cultural Evening" with your group:</p>
            <ul className="list-disc pl-4 space-y-0.5">
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
      <div className="mt-3">
        <h4 className="font-display text-xl font-semibold mb-1.5">Self-Evaluation Checklist</h4>
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
      <QuestSubmitButton questNumber={1} />
    </>
  );
}

/* ── Shared sub-components ── */

function ReadingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-1.5 p-2 rounded-lg bg-muted/50 border-l-3 border-primary/40">
      <h5 className="font-display font-semibold text-lg mb-0.5">{title}</h5>
      <p className="font-body text-lg text-foreground leading-snug whitespace-pre-line">{children}</p>
    </div>
  );
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-0.5">
      {items.map((item, i) => (
        <label key={i} className="flex items-start gap-2 p-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
          <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-3.5 h-3.5 rounded border-primary text-primary focus:ring-primary" />
          <span className="font-body text-lg">{item}</span>
          {checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
        </label>
      ))}
    </div>
  );
}

export default WebQuest1;
