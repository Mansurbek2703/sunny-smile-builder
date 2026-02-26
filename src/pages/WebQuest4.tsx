import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";

import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import VocabularyMatchTask from "@/components/quest/VocabularyMatchTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VideoTask from "@/components/quest/VideoTask";
import TrueFalseTask from "@/components/quest/TrueFalseTask";

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
  map: <MapPin className="w-5 h-5" />,
};

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
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ infographic: true });
  const toggle = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="min-h-screen bg-background border-x-2 sm:border-x-4 border-[hsl(var(--frame-color))]">
      <SiteHeader />
      
      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[60vh] min-h-[320px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(18,65%,30%)] via-[hsl(30,50%,35%)] to-[hsl(200,50%,40%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(18,40%,15%)/0.5] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(200,60%,50%,0.2),transparent_60%)]" />
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
          <Link to="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-12 md:left-12">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 font-body"><ArrowLeft className="w-4 h-4 mr-2" /> Orqaga</Button>
          </Link>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-body font-medium uppercase tracking-widest mb-3">Module 3 — Travel & Tourism</motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3">🌍 WebQuest 4</motion.h1>
            <motion.h2 variants={fadeUp} className="font-display text-lg sm:text-xl md:text-2xl text-white/90 font-semibold">The City Through the Eyes of a Tourist</motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/70 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Explore a city from a tourist's perspective, research landmarks, culture, and attractions.
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
              "Identify key landmarks, attractions, and cultural features of a chosen city.",
              "Analyze what makes a city unique from a tourist's perspective.",
              "Compare cultural, historical, and social aspects of cities.",
              "Create a multimedia presentation or visual guide for tourists.",
              "Demonstrate effective communication and collaboration skills.",
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

      {/* Infographic */}
      <QuestSection id="infographic" icon={stepIcons.intro} stepNum="Introduction" title="WebQuest Infographic" isOpen={openSections.infographic} onToggle={() => toggle("infographic")}>
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest4/infographic1.jpg" alt="Infographic" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest4/infographic2.jpg" alt="Infographic 2" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
        </div>
      </QuestSection>

      {/* Introduction */}
      <QuestSection id="intro" icon={stepIcons.intro} stepNum="Step 1" title="Introduction" isOpen={openSections.intro} onToggle={() => toggle("intro")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest4/hero1.jpg" alt="City" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest4/hero2.jpg" alt="Tourism" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
        <p className="font-body text-muted-foreground leading-relaxed">
          Imagine you are a traveler visiting a new city for the first time. Everything is unfamiliar — the people, the buildings, the traditions, the food, and the language. Tourists see cities differently than local residents because they discover places with curiosity, surprise, and fresh emotions. In this WebQuest, you will explore a city as a tourist, research its landmarks, culture, and lifestyle, and present it from a visitor's perspective.
        </p>
      </QuestSection>

      {/* Match Landmarks */}
      <QuestSection id="landmarks" icon={stepIcons.task} stepNum="Step 3" title="Task I — Match Pictures with Landmarks" isOpen={openSections.landmarks} onToggle={() => toggle("landmarks")}>
        <p className="font-body text-muted-foreground mb-6">Match each picture (1–10) with the correct landmark name.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {landmarks.map((l) => (
            <motion.div key={l.num} whileHover={{ scale: 1.05 }} className="relative rounded-xl overflow-hidden shadow-md border-2 border-border">
              <img src={l.img} alt={`Landmark ${l.num}`} className="w-full h-24 sm:h-32 object-contain sm:object-cover bg-muted/30" />
              <div className="absolute top-1 left-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">{l.num}</div>
            </motion.div>
          ))}
        </div>
        <SelectMatchingTask
          pairs={[
            { left: "Picture 1", right: "" },
            { left: "Picture 2", right: "" },
            { left: "Picture 3", right: "" },
            { left: "Picture 4", right: "" },
            { left: "Picture 5", right: "" },
            { left: "Picture 6", right: "" },
            { left: "Picture 7", right: "" },
            { left: "Picture 8", right: "" },
            { left: "Picture 9", right: "" },
            { left: "Picture 10", right: "" },
          ]}
          options={[
            "Ark Fortress (Uzbekistan)",
            "Sagrada Familia (Spain)",
            "Hagia Sophia (Turkey)",
            "Burj Khalifa (UAE)",
            "Big Ben (UK)",
            "Great Wall (China)",
            "Chichén Itzá (Mexico)",
            "Sydney Opera House (Australia)",
            "Neuschwanstein Castle (Germany)",
            "Gyeongbokgung Palace (South Korea)",
          ]}
          correctAnswers={{
            0: "Ark Fortress (Uzbekistan)",
            1: "Sagrada Familia (Spain)",
            2: "Hagia Sophia (Turkey)",
            3: "Burj Khalifa (UAE)",
            4: "Big Ben (UK)",
            5: "Great Wall (China)",
            6: "Chichén Itzá (Mexico)",
            7: "Sydney Opera House (Australia)",
            8: "Neuschwanstein Castle (Germany)",
            9: "Gyeongbokgung Palace (South Korea)",
          }}
        />
      </QuestSection>

      {/* Travel Idioms */}
      <QuestSection id="idioms" icon={stepIcons.task} stepNum="Step 3" title="Task II — Travel Idioms" isOpen={openSections.idioms} onToggle={() => toggle("idioms")}>
        <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest4/idioms.png" alt="Travel Idioms" className="rounded-xl w-full max-w-lg mx-auto mb-6 object-contain bg-muted/30 shadow-md" />
        <SelectMatchingTask
          pairs={[
            { left: "living out of a suitcase", right: "" },
            { left: "at the crack of dawn", right: "" },
            { left: "travel on a shoestring", right: "" },
            { left: "make a pit stop", right: "" },
            { left: "travel in style", right: "" },
            { left: "travel light", right: "" },
          ]}
          options={[
            "Constantly travelling or moving from one place to another",
            "Very early in the morning",
            "Travel with a very limited budget",
            "Briefly stop during a journey for a break",
            "Travel with comfort and luxury",
            "Pack minimally and carry only essentials",
          ]}
          correctAnswers={{
            0: "Constantly travelling or moving from one place to another",
            1: "Very early in the morning",
            2: "Travel with a very limited budget",
            3: "Briefly stop during a journey for a break",
            4: "Travel with comfort and luxury",
            5: "Pack minimally and carry only essentials",
          }}
        />
      </QuestSection>

      {/* Video */}
      <QuestSection id="video" icon={stepIcons.video} stepNum="Step 3" title="Video Task — City Through Tourist Eyes" isOpen={openSections.video} onToggle={() => toggle("video")}>
        <VideoTask
          title="The City Through Tourist Eyes"
          instruction="Watch the video and answer the questions below."
          videoUrl="https://www.youtube.com/watch?v=k_Vx_u2CoIQ"
          thumbnail="/images/webquest4/video_thumb.jpg"
        />
        <div className="mt-6">
          <OpenQuestionTask
            title="Task A: Answer the questions"
            questions={[
              "What is the main message or theme of the video?",
              "Which example or story stood out to you the most? Why?",
              "Did the video change any of your own beliefs or assumptions?",
              "What practical action from the video might you try in your own life?",
              "What follow-up question would you ask the speaker?",
            ]}
          />
        </div>
        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task B: True or False</h4>
          <TrueFalseTask
            statements={[
              { text: "The video's central theme is exploring the identity of cities through their historical landmarks.", answer: true },
              { text: "The speaker argues that tourists always see the best parts of a city, never its challenges.", answer: false },
              { text: "Local people and tourists interpret public spaces in the same way.", answer: false },
              { text: "Understanding everyday urban life is as important as seeing famous attractions.", answer: true },
              { text: "A city's spirit is best captured by observing how people live day to day.", answer: true },
            ]}
          />
        </div>
      </QuestSection>

      {/* Reading — Turkey */}
      <QuestSection id="reading" icon={stepIcons.reading} stepNum="Step 3" title="Reading — 2 Weeks in Turkey" isOpen={openSections.reading} onToggle={() => toggle("reading")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest4/turkey1.jpg" alt="Turkey" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest4/turkey2.jpg" alt="Turkey travel" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
        <ReadingSection title="The Trip">
          The itinerary included the lively beach town of Bodrum, ancient ruins in Ephesus, the natural wonder of Pamukkale, sailing on a traditional Turkish Gulet boat, one day in Istanbul, and the magical landscapes of Cappadocia. The author traveled solo and entirely on public transport.
        </ReadingSection>
        <ReadingSection title="How Long to Spend?">
          Around 2 weeks, or a minimum of 10 days is recommended. This is ample time to visit the main sites. A three-week itinerary could include hiking the famous Lycian Way.
        </ReadingSection>
        <ReadingSection title="Getting Around">
          Turkey has a comprehensive, well-priced public transport system — buses, trains, dolmuş, and domestic airlines. Most run on time, are affordable, and comfortable.
        </ReadingSection>
        <ReadingSection title="Useful Tips">
          Check visa requirements. Currency is Turkish Lira (TL). Most people in hospitality speak English. The Museum Pass covers many attractions across Turkey including Ephesus, Pamukkale, and Istanbul.
        </ReadingSection>

        <div className="mt-8">
          <OpenQuestionTask
            title="Task II: Answer the questions"
            questions={[
              "What were the main destinations in the author's trip?",
              "How did the author describe solo travel in Turkey as a female traveler?",
              "What are the recommended seasons for visiting Turkey?",
              "How does the author describe public transportation?",
              "What cultural or practical items are recommended for Turkey?",
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task III: True or False</h4>
          <TrueFalseTask
            statements={[
              { text: "The author traveled using only private transfers and taxis.", answer: false },
              { text: "The itinerary included Bodrum, Ephesus, Pamukkale, a Gulet cruise, Istanbul, and Cappadocia.", answer: true },
              { text: "Two weeks is usually enough to see the main highlights of Turkey.", answer: true },
              { text: "Winter is the best and only recommended time to visit Turkey.", answer: false },
              { text: "Public transportation in Turkey is affordable, reliable, and mostly clean.", answer: true },
              { text: "Tourists do not need to follow any dress code at religious buildings.", answer: false },
              { text: "The Museum Pass allows visitors to access various historical sites across Turkey.", answer: true },
            ]}
          />
        </div>
      </QuestSection>

      {/* Tourist Research */}
      <QuestSection id="research" icon={stepIcons.research} stepNum="Step 4" title="Tourist Research — Choose Your City" isOpen={openSections.research} onToggle={() => toggle("research")}>
        <OpenQuestionTask
          title="Part 1 — Choose Your City"
          questions={[
            "Write the name of the city you will explore.",
            "What surprised you when you first saw the city?",
            "What is the atmosphere like? (busy, quiet, colorful, historic, etc.)",
          ]}
        />
        <div className="mt-6">
          <h4 className="font-display text-lg font-semibold mb-4">Fill in the research chart</h4>
          <OpenQuestionTask
            title="Tourist Research Chart"
            questions={[
              "Famous landmarks — what would a tourist notice?",
              "Traditional food — what dishes are popular?",
              "Local customs — any unique traditions?",
              "Transportation — how do people get around?",
              "Street life — what is the everyday atmosphere like?",
              "Possible difficulties — what challenges might tourists face?",
            ]}
          />
        </div>
      </QuestSection>

      {/* Reflection */}
      <QuestSection id="reflection" icon={stepIcons.reflection} stepNum="Step 6" title="Reflection & Self-Evaluation" isOpen={openSections.reflection} onToggle={() => toggle("reflection")}>
        <OpenQuestionTask
          title="Discussion Questions"
          questions={[
            "How do tourists see a city differently from locals?",
            "What are the first things a tourist usually notices?",
            "If a tourist visited your city, what places would impress them most?",
            "Do tourists focus more on beauty, culture, or comfort?",
            "How can local people help tourists see the 'real' side of a city?",
            "What stereotypes do tourists often have about certain cities?",
            "Can tourism change the way a city looks and functions?",
            "How do food, architecture, and language shape a tourist's impression?",
            "Have you ever seen your own city 'like a tourist'? What surprised you?",
            "What are the biggest challenges tourists face in a new city?",
          ]}
        />
        <div className="mt-8">
          <SelfEvalChecklist items={[
            "I wrote from a tourist's point of view.",
            "I included facts about culture and daily life.",
            "I described landmarks or attractions.",
            "I used my imagination and personal reaction.",
            "I checked my spelling and grammar.",
          ]} />
        </div>
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="font-display text-xl font-bold text-primary mb-2">🎉 Congratulations!</h3>
            <p className="font-body text-sm text-muted-foreground">
              Through this WebQuest, you explored a city from a tourist's perspective and discovered its cultural, historical, and social attractions. By viewing familiar places through new eyes, you gained a deeper understanding of how cities communicate their stories to the world.
            </p>
          </CardContent>
        </Card>
      </QuestSection>

      <footer className="border-t py-8 text-center mt-16 space-y-1">
        <p className="font-body text-sm text-muted-foreground">WebQuest Explorer — WebQuest 4: The City Through Tourist Eyes</p>
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

export default WebQuest4;
