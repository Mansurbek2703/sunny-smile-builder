import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import FloatingCulturalElements from "@/components/FloatingCulturalElements";
import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import VocabularyMatchTask from "@/components/quest/VocabularyMatchTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VideoTask from "@/components/quest/VideoTask";
import TrueFalseTask from "@/components/quest/TrueFalseTask";
import MultipleChoiceTask from "@/components/quest/MultipleChoiceTask";
import FillBlanksTask from "@/components/quest/FillBlanksTask";
import MatchingTask from "@/components/quest/MatchingTask";

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
};

const WebQuest2 = () => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,60%,25%)] via-[hsl(200,50%,35%)] to-[hsl(45,80%,50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(200,40%,20%)/0.5] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(45,80%,60%,0.25),transparent_60%)]" />
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
          <Link to="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-12 md:left-12">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 font-body">
              <ArrowLeft className="w-4 h-4 mr-2" /> Orqaga
            </Button>
          </Link>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-body font-medium uppercase tracking-widest mb-3">
              Module 1 — Holidays & Traditions
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3">
              🌍 WebQuest 2
            </motion.h1>
            <motion.h2 variants={fadeUp} className="font-display text-lg sm:text-xl md:text-2xl text-white/90 font-semibold">
              Holidays Around the World
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/70 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Explore major holidays celebrated in different countries, understand their cultural significance, and develop intercultural awareness.
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
              "Explore and describe traditional holidays from different countries.",
              "Compare cultural traditions across nations.",
              "Create a group product (poster, presentation, role-play, or blog).",
              "Develop teamwork, research, and intercultural communication skills.",
            ].map((outcome, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="glass-card hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-5 flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm">{i + 1}</span>
                    <p className="font-body text-sm leading-relaxed">{outcome}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Infographic Introduction */}
      <QuestSection id="infographic" icon={stepIcons.intro} stepNum="Introduction" title="WebQuest Infographic" isOpen={openSections.infographic} onToggle={() => toggle("infographic")}>
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest2/infographic1.jpg" alt="Infographic 1" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest2/holidays_world.jpg" alt="Holidays World" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
        </div>
      </QuestSection>

      {/* Step 1: Introduction */}
      <QuestSection id="intro" icon={stepIcons.intro} stepNum="Step 1" title="Introduction" isOpen={openSections.intro} onToggle={() => toggle("intro")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest2/hero1.jpg" alt="Holidays" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest2/hero2.jpg" alt="Celebrations" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
        <p className="font-body text-muted-foreground leading-relaxed mb-4">
          Holidays and festivals play a significant role in shaping national identity and cultural values. They reflect a country's history, beliefs, traditions, and social practices, offering insight into how people celebrate, remember important events, and express shared meanings.
        </p>
        <p className="font-body text-muted-foreground leading-relaxed">
          This WebQuest invites students to explore traditional holidays from various countries around the world. By researching and comparing international celebrations, students will expand their cultural knowledge and develop critical thinking, teamwork, and communication skills in English.
        </p>
      </QuestSection>

      {/* Step 2-3: Task — Match Holidays */}
      <QuestSection id="match-holidays" icon={stepIcons.task} stepNum="Step 3" title="Task — Holidays Around the World" isOpen={openSections["match-holidays"]} onToggle={() => toggle("match-holidays")}>
        <p className="font-body text-muted-foreground mb-6">
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

        <div className="mt-8">
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
      </QuestSection>

      {/* Discussion */}
      <QuestSection id="discussion" icon={stepIcons.group} stepNum="Step 3" title="Discussion & Vocabulary" isOpen={openSections.discussion} onToggle={() => toggle("discussion")}>
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
        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Give definitions to the words</h4>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <motion.img whileHover={{ scale: 1.05 }} src="/images/webquest2/carnival.jpg" alt="Carnival" className="rounded-xl w-full h-28 sm:h-36 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.05 }} src="/images/webquest2/tomatina.jpg" alt="La Tomatina" className="rounded-xl w-full h-28 sm:h-36 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.05 }} src="/images/webquest2/cherry_blossom.jpg" alt="Cherry Blossom" className="rounded-xl w-full h-28 sm:h-36 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.05 }} src="/images/webquest2/day_of_dead.jpg" alt="Day of the Dead" className="rounded-xl w-full h-28 sm:h-36 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
      </QuestSection>

      {/* Video Tasks */}
      <QuestSection id="video" icon={stepIcons.video} stepNum="Step 3" title="Video Tasks" isOpen={openSections.video} onToggle={() => toggle("video")}>
        <VideoTask
          title="Holidays Around the World"
          instruction="Watch the video about holidays around the world and complete the tasks below."
          videoUrl="https://www.youtube.com/watch?v=6sdCUbe0s7E"
          thumbnail="/images/webquest2/video_thumb.jpg"
        />

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task A: Match holidays with descriptions</h4>
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

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task B: True or False</h4>
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

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task C: Choose the correct answer</h4>
          <MultipleChoiceTask
            questions={[
              {
                question: "According to the video, holidays may be based on:",
                options: ["Religion only", "Culture, religion, or history", "Climate and geography", "Age groups"],
                correctIndex: 1,
              },
              {
                question: "Which activity is NOT mentioned as part of Christmas celebrations?",
                options: ["Decorating homes", "Exchanging gifts", "Lighting oil lamps", "Attending church services"],
                correctIndex: 2,
              },
              {
                question: "Cinco de Mayo commemorates:",
                options: ["Mexico's independence", "A religious celebration", "A historical military victory", "The end of a harvest season"],
                correctIndex: 2,
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <OpenQuestionTask
            title="Task D: Answer in 1-2 sentences"
            questions={[
              "Why does the video emphasize that holidays are celebrated by different faiths and cultures?",
              "How does the video connect holidays with family and community values?",
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task E: Match words with meanings</h4>
          <VocabularyMatchTask
            words={[
              { word: "Tradition", definition: "Long-established custom" },
              { word: "Gratitude", definition: "Feeling of thankfulness" },
              { word: "Parade", definition: "Public celebration or march" },
              { word: "Unity", definition: "Being joined together" },
            ]}
          />
        </div>
      </QuestSection>

      {/* Reading */}
      <QuestSection id="reading" icon={stepIcons.reading} stepNum="Step 3" title="Reading — 6 Tips for Celebrating Holidays Abroad" isOpen={openSections.reading} onToggle={() => toggle("reading")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest2/reading1.jpg" alt="Holidays abroad" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest2/tips1.jpg" alt="Tips" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
        {[
          { title: "1. Find a Local Guide", text: "Connect with someone native to the country. A local guide can offer insights into meanings behind traditions, explain local etiquette, and help you feel comfortable." },
          { title: "2. Do Your Homework", text: "Research the holiday's history, meaning, and rituals. Consider: What values does this holiday represent? Are there particular foods or music? Is it family-centered or public?" },
          { title: "3. Dress for the Occasion", text: "How you dress can carry special meaning. For religious holidays, there may be guidelines on modesty. Ask someone you trust or research appropriate attire." },
          { title: "4. Be Thoughtful with Gifts", text: "Gift-giving customs vary widely. In some countries, small thoughtful gifts are ideal; in others, extravagant gifts are typical. Consider cultural or religious backgrounds." },
          { title: "5. Clarify Food Preferences", text: "Food is central to celebrations. Check about dietary needs and religious food restrictions like kosher, halal, or vegetarian. Show awareness and interest." },
          { title: "6. Keep an Open Mind", text: "Come with curiosity rather than comparison. Watch, listen, and absorb the experience. Keeping an open mind lets you immerse yourself in the moment." },
        ].map((tip, i) => (
          <ReadingSection key={i} title={tip.title}>{tip.text}</ReadingSection>
        ))}

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task III: Match tips with purposes</h4>
          <SelectMatchingTask
            pairs={[
              { left: "1. Find a Local Guide", right: "" },
              { left: "2. Do Your Homework", right: "" },
              { left: "3. Dress for the Occasion", right: "" },
              { left: "4. Be Thoughtful with Gifts", right: "" },
              { left: "5. Clarify Food Preferences", right: "" },
              { left: "6. Keep an Open Mind", right: "" },
            ]}
            options={[
              "Builds trust and community connections",
              "Helps avoid misunderstandings",
              "Shows respect for religious and cultural norms",
              "Prevents cultural offense",
              "Ensures inclusivity and comfort",
              "Encourages cultural adaptation",
            ]}
            correctAnswers={{
              0: "Builds trust and community connections",
              1: "Helps avoid misunderstandings",
              2: "Shows respect for religious and cultural norms",
              3: "Prevents cultural offense",
              4: "Ensures inclusivity and comfort",
              5: "Encourages cultural adaptation",
            }}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task V: Match words with definitions</h4>
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

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task VI: Fill in the blanks</h4>
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

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task VII: Match situations with advice</h4>
          <SelectMatchingTask
            pairs={[
              { left: "You are invited to a religious holiday", right: "" },
              { left: "You don't understand local traditions", right: "" },
              { left: "You feel homesick during a holiday", right: "" },
              { left: "You want to bring a present", right: "" },
              { left: "You are unsure what to wear", right: "" },
            ]}
            options={[
              "Clarify food restrictions",
              "Find a local guide",
              "Keep an open mind",
              "Be thoughtful with gifts",
              "Dress for the occasion",
            ]}
            correctAnswers={{
              0: "Clarify food restrictions",
              1: "Find a local guide",
              2: "Keep an open mind",
              3: "Be thoughtful with gifts",
              4: "Dress for the occasion",
            }}
          />
        </div>
      </QuestSection>

      {/* Step 4: Research */}
      <QuestSection id="research" icon={stepIcons.research} stepNum="Step 4" title="Research — Holiday Investigation" isOpen={openSections.research} onToggle={() => toggle("research")}>
        <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest2/research.png" alt="Research" className="rounded-xl w-full max-w-sm mx-auto mb-6 object-contain bg-muted/30 shadow-md" />
        <p className="font-body text-muted-foreground mb-4">Work in groups of 3–4. Each group investigates one country's holiday:</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
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
      </QuestSection>

      {/* Reflection */}
      <QuestSection id="reflection" icon={stepIcons.reflection} stepNum="Step 6" title="Reflection & Self-Evaluation" isOpen={openSections.reflection} onToggle={() => toggle("reflection")}>
        <OpenQuestionTask
          title="Reflect on your experience"
          questions={[
            "Which holiday did you find most interesting and why?",
            "What similarities/differences did you notice between this holiday and your own traditions?",
            "What does this tell us about the role of holidays in cultural identity?",
            "How did you contribute to your group? What skills did you develop?",
          ]}
        />
        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Self-Evaluation Checklist</h4>
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
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="font-display text-xl font-bold text-primary mb-2">🎉 Congratulations!</h3>
            <p className="font-body text-sm text-muted-foreground">
              Through this WebQuest, you discovered how holidays and traditions reflect cultural values. By comparing your own holidays with those of other countries, you gained deeper intercultural understanding.
            </p>
          </CardContent>
        </Card>
      </QuestSection>

      <footer className="border-t py-8 text-center mt-16 space-y-1">
        <p className="font-body text-sm text-muted-foreground">WebQuest Explorer — WebQuest 2: Holidays Around the World</p>
        <p className="font-body text-xs text-muted-foreground/70">
          This site developed by <span className="font-semibold text-foreground/70">Mansurbek Qazaqov</span>. Lead specialist of IT department at AL-Khwarizmi University.
        </p>
      </footer>
    </div>
  );
};

// --- Sub-components ---
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

export default WebQuest2;
