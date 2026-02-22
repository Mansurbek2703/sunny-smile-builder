import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import VocabularyMatchTask from "@/components/quest/VocabularyMatchTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VideoTask from "@/components/quest/VideoTask";
import TrueFalseTask from "@/components/quest/TrueFalseTask";
import MultipleChoiceTask from "@/components/quest/MultipleChoiceTask";
import FillBlanksTask from "@/components/quest/FillBlanksTask";

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

const WebQuest3 = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ infographic: true });
  const toggle = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="min-h-screen bg-background border-x-2 sm:border-x-4 border-[hsl(210,20%,88%)]">
      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[60vh] min-h-[320px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(265,50%,25%)] via-[hsl(280,40%,35%)] to-[hsl(200,50%,40%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(265,40%,15%)/0.5] to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
          <Link to="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-12 md:left-12">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 font-body"><ArrowLeft className="w-4 h-4 mr-2" /> Orqaga</Button>
          </Link>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-body font-medium uppercase tracking-widest mb-3">Module 2 — Cultural Awareness</motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3">🌍 WebQuest 3</motion.h1>
            <motion.h2 variants={fadeUp} className="font-display text-lg sm:text-xl md:text-2xl text-white/90 font-semibold">Cultural Stereotypes: Truth or Myth</motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/70 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Recognize cultural stereotypes, research their accuracy, and learn to distinguish facts from misconceptions.
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
              "Identify common cultural stereotypes and explain their origins.",
              "Analyze how stereotypes affect perceptions and interactions.",
              "Differentiate between myths and factual cultural traits.",
              "Evaluate media, texts, and experiences for bias or stereotyping.",
              "Demonstrate respectful intercultural communication.",
              "Use new vocabulary, cultural idioms and phrases.",
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
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest3/infographic1.jpg" alt="Infographic" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest3/infographic2.jpg" alt="Infographic 2" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
        </div>
      </QuestSection>

      {/* Introduction */}
      <QuestSection id="intro" icon={stepIcons.intro} stepNum="Step 1" title="Introduction" isOpen={openSections.intro} onToggle={() => toggle("intro")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest3/hero1.jpg" alt="Stereotypes" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest3/hero2.jpg" alt="Culture" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
        <p className="font-body text-muted-foreground leading-relaxed mb-4">
          Stereotypes are simplified ideas about people and cultures. They often live in compliments, traditions, everyday behavior, songs, and social rules. If people are unaware of cultural differences, stereotypes may cause discomfort, misunderstanding, or even conflict. Remember the proverb: <strong>"Don't judge a book by its cover."</strong>
        </p>
        <p className="font-body text-muted-foreground leading-relaxed">
          In today's interconnected world, people from different cultural backgrounds interact more frequently than ever before. This WebQuest focuses on exploring cultural stereotypes in a critical and reflective way.
        </p>
      </QuestSection>

      {/* Video Task */}
      <QuestSection id="video" icon={stepIcons.video} stepNum="Step 3" title="Video Task — How Stereotypes Affect Us" isOpen={openSections.video} onToggle={() => toggle("video")}>
        <VideoTask
          title="How Stereotypes Impact Performance"
          instruction="Watch the video and answer the questions below."
          videoUrl="https://www.youtube.com/watch?v=wY4rAN5HlAk"
          thumbnail="/images/webquest3/video_thumb.jpg"
        />
        <div className="mt-6">
          <OpenQuestionTask
            title="Task I: Video Questions"
            questions={[
              "What is the main definition of \"stereotype\" given in the video?",
              "Can you identify at least two examples of harmful stereotypes?",
              "How does the video explain the psychological impact of stereotyping?",
              "What arguments does the video present for challenging stereotypes?",
              "What actions would you propose to reduce stereotyping in your community?",
            ]}
          />
        </div>
        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task II: True or False</h4>
          <TrueFalseTask
            statements={[
              { text: "The video defines a stereotype as a fixed and oversimplified image about a group of people.", answer: true },
              { text: "According to the video, stereotypes are always negative and never based on real experiences.", answer: false },
              { text: "The video explains that stereotypes can lead to unfair treatment and prejudice.", answer: true },
              { text: "The video suggests that learning about different cultures can help reduce stereotyping.", answer: true },
              { text: "The video claims that once a stereotype is formed, it can never be changed.", answer: false },
            ]}
          />
        </div>
      </QuestSection>

      {/* Cultural Idioms */}
      <QuestSection id="idioms" icon={stepIcons.task} stepNum="Step 3" title="Cultural Idioms Tasks" isOpen={openSections.idioms} onToggle={() => toggle("idioms")}>
        <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest3/idioms.png" alt="Cultural Idioms" className="rounded-xl w-full max-w-lg mx-auto mb-6 object-contain bg-muted/30 shadow-md" />
        
        <h4 className="font-display text-lg font-semibold mb-4">Task III: Match cultural idioms with meanings</h4>
        <SelectMatchingTask
          pairs={[
            { left: "When in Rome, do as the Romans do", right: "" },
            { left: "Speak the same language", right: "" },
            { left: "Break the ice", right: "" },
            { left: "Bridge the gap", right: "" },
            { left: "Lost in translation", right: "" },
          ]}
          options={[
            "Overcome obstacles in understanding between cultures",
            "Start a conversation to reduce tension",
            "Interactions between cultures from different parts of the world",
            "Overcome differences between people from diverse backgrounds",
            "Meanings not accurately conveyed between languages/cultures",
          ]}
          correctAnswers={{
            0: "Overcome obstacles in understanding between cultures",
            1: "Overcome differences between people from diverse backgrounds",
            2: "Start a conversation to reduce tension",
            3: "Overcome obstacles in understanding between cultures",
            4: "Meanings not accurately conveyed between languages/cultures",
          }}
        />

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task IV: Idioms and Stereotypes</h4>
          <SelectMatchingTask
            pairs={[
              { left: "Tar everyone with the same brush", right: "" },
              { left: "Pigeonhole someone", right: "" },
              { left: "Cut from the same cloth", right: "" },
              { left: "Like peas in a pod", right: "" },
              { left: "Never judge a book by its cover", right: "" },
              { left: "Break the mold", right: "" },
              { left: "When in Rome, do as the Romans do", right: "" },
            ]}
            options={[
              "Treat all people in a group as identical",
              "Place someone into a fixed category",
              "Be extremely similar in character",
              "Be very alike because of shared background",
              "Don't form opinions based only on appearances",
              "Be different from what is typical or expected",
              "Adapt to customs of the place you visit",
            ]}
            correctAnswers={{
              0: "Treat all people in a group as identical",
              1: "Place someone into a fixed category",
              2: "Be extremely similar in character",
              3: "Be very alike because of shared background",
              4: "Don't form opinions based only on appearances",
              5: "Be different from what is typical or expected",
              6: "Adapt to customs of the place you visit",
            }}
          />
        </div>
      </QuestSection>

      {/* Vocabulary */}
      <QuestSection id="vocabulary" icon={stepIcons.task} stepNum="Step 3" title="Vocabulary — Stereotypes Glossary" isOpen={openSections.vocabulary} onToggle={() => toggle("vocabulary")}>
        <h4 className="font-display text-lg font-semibold mb-4">Task V: Fill in the Gaps</h4>
        <FillBlanksTask
          wordBank={["stereotype", "discrimination", "bias", "ethnocentrism", "assumption", "diversity", "generalization", "prejudice", "tolerance", "cultural identity"]}
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
          ]}
        />
      </QuestSection>

      {/* Reading */}
      <QuestSection id="reading" icon={stepIcons.reading} stepNum="Step 3" title="Reading — Cultural Stereotypes: The World As We Know" isOpen={openSections.reading} onToggle={() => toggle("reading")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest3/reading1.jpg" alt="Reading" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest3/reading2.jpg" alt="Stereotypes" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
        <ReadingSection title="What are stereotypes?">
          Cultural stereotypes are fixed ideas that people have about what specific social groups or individuals are like — especially ideas that are wrong. The term has Greek origin: "stereos" means solid and "typos" means blow or impression.
        </ReadingSection>
        <ReadingSection title="Why do stereotypes exist?">
          Because stereotypes are standardized and simplified ideas based on prejudices, they are not derived from objective facts. As Sociologist Charles E. Hurst states: "One reason for stereotypes is the lack of personal familiarity that individuals have with persons in other groups."
        </ReadingSection>
        <ReadingSection title="Impact of stereotypes">
          Stereotypes may affect people negatively: forming inaccurate images, scapegoating, making erroneous judgments. They can lead to xenophobic or racist behavior, and stereotyped people may feel inferior, which can impair their performance.
        </ReadingSection>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Comprehension Task II: Choose correct answer</h4>
          <MultipleChoiceTask
            questions={[
              { question: "The word 'stereotype' has:", options: ["A Greek origin", "An English origin", "A Latin origin"], correctIndex: 0 },
              { question: "Stereotypes are used to:", options: ["Make generalizations about different groups", "Have accurate understanding of people", "Humiliate people"], correctIndex: 0 },
              { question: "If you label people in terms of stereotypes, you will probably:", options: ["Be having an exact judgment", "Be behaving in a discriminatory way", "Be behaving in a polite way"], correctIndex: 1 },
              { question: "Stereotypes may affect people:", options: ["Positively", "Negatively", "In no way"], correctIndex: 1 },
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task III: Fill in the blanks</h4>
          <FillBlanksTask
            wordBank={["fixed", "wrong", "Greek", "contact", "superior", "ignorance", "unwilling", "false", "xenophobic", "inferior"]}
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
            ]}
          />
        </div>
      </QuestSection>

      {/* Cultural Observations */}
      <QuestSection id="observations" icon={stepIcons.task} stepNum="Step 3" title="Recognizing Cultural Stereotypes" isOpen={openSections.observations} onToggle={() => toggle("observations")}>
        <h4 className="font-display text-lg font-semibold mb-4">Task I: Cultural Observations</h4>
        <div className="space-y-3 mb-6">
          {[
            "In Kazakh culture, female beauty is often described as moon-faced and tall in songs.",
            "In Uzbek culture, bread is treated as a sacred symbol, not just food.",
            "In Anglo-Saxon cultures, inviting someone to a restaurant may be more common than inviting them home.",
            "In Japanese culture, openly correcting an older person is considered impolite.",
            "In Italian culture, loud emotional speech is often seen as natural and sincere.",
          ].map((obs, i) => (
            <Card key={i} className="glass-card"><CardContent className="p-3 font-body text-sm">{obs}</CardContent></Card>
          ))}
        </div>

        <h4 className="font-display text-lg font-semibold mb-4">Task II: Match situation with cultural meaning</h4>
        <SelectMatchingTask
          pairs={[
            { left: "Bread is never thrown away", right: "" },
            { left: "Guests are treated as 'sent by God'", right: "" },
            { left: "Older people are not openly corrected", right: "" },
            { left: "Home is a private space", right: "" },
            { left: "Direct eye contact is avoided", right: "" },
          ]}
          options={["Sacred everyday objects", "Moral obligation of hospitality", "Age-based respect", "Clear personal boundaries", "Respect and modesty"]}
          correctAnswers={{ 0: "Sacred everyday objects", 1: "Moral obligation of hospitality", 2: "Age-based respect", 3: "Clear personal boundaries", 4: "Respect and modesty" }}
        />

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task III: True, False, or Depends?</h4>
          <TrueFalseTask
            statements={[
              { text: "All cultures treat food only as something to eat.", answer: false },
              { text: "In German culture, direct criticism is often considered honest, not rude.", answer: true },
              { text: "In Uzbek culture, hospitality always includes inviting guests home.", answer: true },
              { text: "In British culture, privacy is an important social value.", answer: true },
              { text: "Cultural stereotypes can influence behaviour even if people deny them.", answer: true },
            ]}
          />
        </div>
      </QuestSection>

      {/* Research */}
      <QuestSection id="research" icon={stepIcons.research} stepNum="Step 4" title="Research — Investigate Stereotypes" isOpen={openSections.research} onToggle={() => toggle("research")}>
        <p className="font-body text-muted-foreground mb-4">
          In pairs or small groups, list at least 5 cultural stereotypes. Select 3-4 to investigate using reliable sources (BBC Culture, National Geographic, Cultural Atlas, Britannica, UNESCO).
        </p>
        <OpenQuestionTask
          title="Research & Write"
          questions={[
            "List 5 cultural stereotypes you have heard about different nations.",
            "For each stereotype, find facts that confirm or disprove it.",
            "Compare them with your own country. Which difference could cause the most misunderstanding?",
          ]}
        />
      </QuestSection>

      {/* Reflection */}
      <QuestSection id="reflection" icon={stepIcons.reflection} stepNum="Step 6" title="Reflection & Self-Evaluation" isOpen={openSections.reflection} onToggle={() => toggle("reflection")}>
        <OpenQuestionTask
          title="Discussion Questions"
          questions={[
            "Which stereotypes turned out to be completely false?",
            "Why do people continue to believe some of these clichés?",
            "What did you learn about judging other cultures?",
            "Can a positive stereotype still be problematic? Give an example.",
            "How can cultural awareness help avoid conflict?",
          ]}
        />
        <div className="mt-8">
          <SelfEvalChecklist items={[
            "I identified common cultural stereotypes.",
            "I checked stereotypes using reliable sources.",
            "I can tell the difference between facts and opinions.",
            "I learned new information about another culture.",
            "I understand why stereotypes can be misleading or harmful.",
            "I participated actively in the WebQuest activities.",
            "I can reflect on my own attitudes and assumptions.",
          ]} />
        </div>
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="font-display text-xl font-bold text-primary mb-2">🎉 Congratulations!</h3>
            <p className="font-body text-sm text-muted-foreground">
              You have learned that stereotypes are not always true — they are generalizations that can hide the diversity within cultures. Understanding the difference between truth and myth helps us become more open-minded and globally aware citizens.
            </p>
          </CardContent>
        </Card>
      </QuestSection>

      <footer className="border-t py-8 text-center mt-16 space-y-1">
        <p className="font-body text-sm text-muted-foreground">WebQuest Explorer — WebQuest 3: Cultural Stereotypes</p>
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

export default WebQuest3;
