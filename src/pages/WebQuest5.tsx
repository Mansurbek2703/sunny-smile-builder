import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2 } from "lucide-react";
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

const WebQuest5 = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ infographic: true });
  const toggle = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="min-h-screen bg-background border-x-2 sm:border-x-4 border-[hsl(var(--frame-color))]">
      <SiteHeader />
      
      {/* Hero */}
      <div className="relative h-[50vh] sm:h-[60vh] min-h-[320px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(340,50%,25%)] via-[hsl(280,40%,30%)] to-[hsl(220,50%,35%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(340,40%,12%)/0.6] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(280,50%,45%,0.2),transparent_60%)]" />
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
          <Link to="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-12 md:left-12">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 font-body"><ArrowLeft className="w-4 h-4 mr-2" /> Orqaga</Button>
          </Link>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-body font-medium uppercase tracking-widest mb-3">Module 4 — Cultural Adaptation</motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3">🌍 WebQuest 5</motion.h1>
            <motion.h2 variants={fadeUp} className="font-display text-lg sm:text-xl md:text-2xl text-white/90 font-semibold">Culture Shock & Cross-Cultural Etiquette</motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/70 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Explore the phenomenon of culture shock, understand its stages, and discover effective strategies to overcome it while studying or living abroad.
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
              "Understand how culture shock affects people.",
              "Learn strategies for successful cultural adaptation.",
              "Develop intercultural communication and teamwork skills.",
              "Learn cross-cultural etiquette rules and body language.",
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
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest5/infographic1.jpg" alt="Infographic" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest5/infographic2.jpg" alt="Infographic 2" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
        </div>
      </QuestSection>

      {/* Introduction */}
      <QuestSection id="intro" icon={stepIcons.intro} stepNum="Step 1" title="Introduction" isOpen={openSections.intro} onToggle={() => toggle("intro")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest5/hero1.jpg" alt="Culture Shock" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest5/hero2.jpg" alt="Adaptation" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>
        <div className="p-4 rounded-xl bg-muted/50 border-l-4 border-primary/40 mb-4">
          <p className="font-body text-sm italic text-muted-foreground">"When in Rome, do as the Romans do"</p>
        </div>
        <p className="font-body text-muted-foreground leading-relaxed">
          Have you ever felt out of place in a new country or even in a new group? That feeling of confusion or discomfort is called culture shock. In this WebQuest, you will step into the shoes of exchange students, explore their real-life experiences, and learn how to adapt successfully in multicultural environments. You will also study the rules of etiquette across cultures as ignoring cross-cultural etiquette exacerbates culture shock, while mastering it accelerates cultural adjustment.
        </p>
      </QuestSection>

      {/* Task 1: Culture Shock Idioms */}
      <QuestSection id="idioms" icon={stepIcons.task} stepNum="Step 3" title="Task I — Culture Shock Idioms & Phrases" isOpen={openSections.idioms} onToggle={() => toggle("idioms")}>
        <p className="font-body text-muted-foreground mb-6">Match the idioms and phrases with their correct meanings.</p>
        <SelectMatchingTask
          pairs={[
            { left: "Lost at sea / adrift", right: "" },
            { left: "Keep an open mind", right: "" },
            { left: "To get the hang of something", right: "" },
            { left: "A fish out of water", right: "" },
            { left: "To learn the ropes", right: "" },
            { left: "Overwhelmed", right: "" },
            { left: "Shaken up / taken aback", right: "" },
            { left: "Like a deer in headlights", right: "" },
            { left: "All at sea", right: "" },
          ]}
          options={[
            "Feeling confused and without direction in a new environment",
            "Be willing to consider new ideas",
            "To finally understand or learn how to do something",
            "Feeling awkward or uncomfortable in an unfamiliar situation",
            "To learn basic rules or procedures in a new place",
            "Feeling buried under too much stress or new information",
            "Feeling very surprised, shocked, or unsettled",
            "Feeling frozen and unable to react because of shock",
            "Feeling extremely confused or bewildered",
          ]}
          correctAnswers={{
            0: "Feeling confused and without direction in a new environment",
            1: "Be willing to consider new ideas",
            2: "To finally understand or learn how to do something",
            3: "Feeling awkward or uncomfortable in an unfamiliar situation",
            4: "To learn basic rules or procedures in a new place",
            5: "Feeling buried under too much stress or new information",
            6: "Feeling very surprised, shocked, or unsettled",
            7: "Feeling frozen and unable to react because of shock",
            8: "Feeling extremely confused or bewildered",
          }}
        />
      </QuestSection>

      {/* Vocabulary */}
      <QuestSection id="vocabulary" icon={stepIcons.task} stepNum="Step 2" title="Vocabulary — Culture Shock & Etiquette" isOpen={openSections.vocabulary} onToggle={() => toggle("vocabulary")}>
        <h4 className="font-display text-lg font-semibold mb-4">Match the terms with definitions</h4>
        <VocabularyMatchTask
          words={[
            { word: "Culture shock", definition: "Feeling of disorientation and anxiety in an unfamiliar culture" },
            { word: "Homesickness", definition: "A feeling of longing for one's home" },
            { word: "Adapt / Adjust", definition: "To change to suit new conditions" },
            { word: "Cope", definition: "To deal effectively with something difficult" },
            { word: "Cultural misunderstanding", definition: "A failure to understand customs or behavior of another culture" },
            { word: "Stereotypes", definition: "Fixed, often inaccurate ideas about a group" },
            { word: "Taboo", definition: "Prohibited behaviors or topics" },
            { word: "Faux Pas", definition: "A social blunder or mistake" },
          ]}
        />
      </QuestSection>

      {/* Reading — Culture Shock */}
      <QuestSection id="reading" icon={stepIcons.reading} stepNum="Step 3" title="Reading — Understanding Culture Shock" isOpen={openSections.reading} onToggle={() => toggle("reading")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest5/culture_shock.jpg" alt="Culture Shock Stages" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest5/etiquette1.jpg" alt="Cross-cultural etiquette" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>

        <ReadingSection title="What Is Culture Shock?">
          Culture shock happens when people experience uncertainty, confusion, or anxiety as they adjust to a new culture when they move abroad or study in another country. It often follows stages: the honeymoon phase of excitement, frustration from differences, gradual adaptation, and acceptance.
        </ReadingSection>
        <ReadingSection title="The Four Stages">
          <strong>Honeymoon:</strong> Excitement and thrill in the new environment. <strong>Frustration:</strong> Irritation, disorientation, and homesickness set in. <strong>Adaptation:</strong> Gradually adjusting and understanding cultural cues. <strong>Acceptance:</strong> Feeling comfortable, confident, and accepting cultural differences.
        </ReadingSection>
        <ReadingSection title="Symptoms">
          Homesickness, feeling helpless or isolated, lack of concentration, irritability, sadness, sleep or eating disturbances, and disorientation.
        </ReadingSection>
        <ReadingSection title="Strategies to Overcome">
          Be open-minded, avoid constantly comparing to home, keep a journal, socialize with locals, ask for advice, and share your own cultural background.
        </ReadingSection>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task II: Match headings to paragraphs</h4>
          <SelectMatchingTask
            pairs={[
              { left: "Paragraph A", right: "" },
              { left: "Paragraph B", right: "" },
              { left: "Paragraph C", right: "" },
              { left: "Paragraph D", right: "" },
              { left: "Paragraph E", right: "" },
            ]}
            options={[
              "What Is Culture Shock?",
              "Insight into the Culture Shock Experience",
              "Recognizing the Symptoms of Culture Shock",
              "Navigating the Four Stages of Culture Shock",
              "Strategies to Overcome Culture Shock",
            ]}
            correctAnswers={{
              0: "What Is Culture Shock?",
              1: "Insight into the Culture Shock Experience",
              2: "Recognizing the Symptoms of Culture Shock",
              3: "Navigating the Four Stages of Culture Shock",
              4: "Strategies to Overcome Culture Shock",
            }}
          />
        </div>

        <div className="mt-8">
          <OpenQuestionTask
            title="Answer the following questions"
            questions={[
              "What is the main definition of culture shock, and when does it usually occur?",
              "What are the four stages of culture shock, and how does each stage differ?",
              "What are some common symptoms people may experience during culture shock?",
              "How can individuals overcome culture shock and make the adaptation process easier?",
              "Why can experiencing culture shock eventually lead to personal growth?",
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task 2: Match terms with descriptions</h4>
          <SelectMatchingTask
            pairs={[
              { left: "Culture Shock", right: "" },
              { left: "Honeymoon Stage", right: "" },
              { left: "Frustration Stage", right: "" },
              { left: "Adaptation Stage", right: "" },
              { left: "Acceptance Stage", right: "" },
            ]}
            options={[
              "A feeling of confusion and anxiety when entering a new cultural environment",
              "The initial phase filled with excitement and curiosity",
              "The period when misunderstandings and homesickness cause stress",
              "The stage where individuals begin to adjust and understand the new culture",
              "People start to feel comfortable, confident, and accept cultural differences",
            ]}
            correctAnswers={{
              0: "A feeling of confusion and anxiety when entering a new cultural environment",
              1: "The initial phase filled with excitement and curiosity",
              2: "The period when misunderstandings and homesickness cause stress",
              3: "The stage where individuals begin to adjust and understand the new culture",
              4: "People start to feel comfortable, confident, and accept cultural differences",
            }}
          />
        </div>
      </QuestSection>

      {/* Cross-Cultural Etiquette Reading */}
      <QuestSection id="etiquette" icon={stepIcons.reading} stepNum="Step 3" title="Reading — Cross-Cultural Etiquette Rules" isOpen={openSections.etiquette} onToggle={() => toggle("etiquette")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest5/etiquette1.jpg" alt="Etiquette" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest5/etiquette2.jpg" alt="Cultural rules" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>

        <ReadingSection title="Why Cross-Cultural Etiquette Matters">
          When we think about cross-cultural etiquette rules, our first thought may be our next Zoom meeting with global partners. In these turbulent times, we need to be particularly mindful of cultural nuances and customs. Universal social codes include politeness, kindness, and empathy.
        </ReadingSection>
        <ReadingSection title="Key Tips">
          Do your research about the culture. Pay special attention to the culture's attitude toward time, space, religion, food/dining, dress, hand gestures, and body language. Learn what is considered taboo. Follow the host country's customs and rules.
        </ReadingSection>
        <ReadingSection title="Examples">
          Looking into someone's eyes is considered rude in Japan. A simple thumbs up is offensive in parts of Africa, Australia, and Greece. In Asia, saving face means never pointing out an elder's mistake in public. Silence can be an expression of respect in Japanese culture.
        </ReadingSection>

        <div className="mt-8">
          <OpenQuestionTask
            title="Task I: Reading Comprehension"
            questions={[
              "Why is cross-cultural etiquette especially important today?",
              "What advantages can good etiquette give in professional life?",
              "What is the first step toward cultural competence, according to the text?",
              "Why should people respect the host country's rules when traveling?",
              "How does the attitude toward eye contact differ in the USA and Japan?",
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task II: True or False</h4>
          <TrueFalseTask
            statements={[
              { text: "Cross-cultural etiquette is more important for tourists than for online meetings.", answer: false },
              { text: "Universal etiquette rules are based on politeness and empathy.", answer: true },
              { text: "Being late for meetings is unacceptable in all cultures.", answer: false },
              { text: "In Japan, silence during communication can be a sign of respect.", answer: true },
              { text: "The 'thumbs up' gesture is considered polite everywhere in the world.", answer: false },
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task III: Match words with meanings</h4>
          <SelectMatchingTask
            pairs={[
              { left: "Etiquette", right: "" },
              { left: "Nuance", right: "" },
              { left: "Taboo", right: "" },
              { left: "Empathy", right: "" },
              { left: "Competence", right: "" },
            ]}
            options={[
              "Rules of polite behavior",
              "A small but important difference",
              "Something socially unacceptable",
              "Ability to understand others' feelings",
              "Strong understanding of what is acceptable in a culture",
            ]}
            correctAnswers={{
              0: "Rules of polite behavior",
              1: "A small but important difference",
              2: "Something socially unacceptable",
              3: "Ability to understand others' feelings",
              4: "Strong understanding of what is acceptable in a culture",
            }}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task IV: Fill in the blanks</h4>
          <FillBlanksTask
            wordBank={["respectful", "customs", "punctual", "gestures", "empathy"]}
            sentences={[
              { text: "Being ___ helps you build positive international relationships.", blank: "respectful" },
              { text: "Cultural ___ differ from country to country.", blank: "customs" },
              { text: "In some cultures, being ___ is extremely important.", blank: "punctual" },
              { text: "Hand ___ can have different meanings around the world.", blank: "gestures" },
              { text: "Showing ___ allows you to communicate politely across cultures.", blank: "empathy" },
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task V: Match Culture with Etiquette Rule</h4>
          <SelectMatchingTask
            pairs={[
              { left: "Japan", right: "" },
              { left: "USA", right: "" },
              { left: "Middle East", right: "" },
              { left: "Some Asian cultures", right: "" },
              { left: "Parts of Africa & Greece", right: "" },
            ]}
            options={[
              "Direct eye contact is often avoided",
              "Direct eye contact shows confidence",
              "Hair covering may be required in certain situations",
              "Saving face is very important",
              "Thumbs-up gesture may be offensive",
            ]}
            correctAnswers={{
              0: "Direct eye contact is often avoided",
              1: "Direct eye contact shows confidence",
              2: "Hair covering may be required in certain situations",
              3: "Saving face is very important",
              4: "Thumbs-up gesture may be offensive",
            }}
          />
        </div>
      </QuestSection>

      {/* Video Task */}
      <QuestSection id="video" icon={stepIcons.video} stepNum="Step 3" title="Video Task — Cultural Taboos & Etiquette" isOpen={openSections.video} onToggle={() => toggle("video")}>
        <VideoTask
          title="Cultural Taboos Around the World"
          instruction="Watch the video about cultural taboos and etiquette, then complete the tasks below."
          videoUrl="https://www.youtube.com/watch?v=-7lUYoIiNXU"
          thumbnail="/images/webquest5/video_thumb.jpg"
        />
        <div className="mt-6">
          <h4 className="font-display text-lg font-semibold mb-4">Task A: Choose the correct answer</h4>
          <MultipleChoiceTask
            questions={[
              {
                question: "The main purpose of the video is to:",
                options: ["Entertain tourists", "Explain cultural taboos and etiquette", "Compare national cuisines"],
                correctIndex: 1,
              },
              {
                question: "The video mainly focuses on:",
                options: ["Food etiquette only", "Hand gestures only", "Social behavior, gestures, food, and photography rules"],
                correctIndex: 2,
              },
            ]}
          />
        </div>
        <div className="mt-8">
          <OpenQuestionTask
            title="Task B: Complete the table while watching"
            questions={[
              "Name a country from the video and describe one etiquette rule.",
              "Name another country and its specific cultural taboo.",
              "What surprised you the most from the video?",
            ]}
          />
        </div>
      </QuestSection>

      {/* Case Study */}
      <QuestSection id="casestudy" icon={stepIcons.group} stepNum="Step 3" title="Case Study — Intercultural Misunderstanding" isOpen={openSections.casestudy} onToggle={() => toggle("casestudy")}>
        <div className="p-4 rounded-xl bg-muted/50 border-l-4 border-accent/40 mb-6">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            <strong>Situation:</strong> An Uzbek student feels offended because British friends never invite her to their home. The British friends believe they are being polite by respecting privacy.
          </p>
        </div>
        <OpenQuestionTask
          title="Answer the questions"
          questions={[
            "What cultural values are in conflict?",
            "Is this behaviour unfriendly or culturally normal?",
            "How does the proverb 'When in Rome, do as the Romans do' apply here?",
          ]}
        />

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Critical Thinking</h4>
          <OpenQuestionTask
            title="Answer briefly"
            questions={[
              "Why can gestures cause misunderstandings in global communication?",
              "How can cultural awareness reduce conflict in international meetings?",
              "Why is it not necessary to share beliefs in order to respect them?",
            ]}
          />
        </div>
      </QuestSection>

      {/* Discussion */}
      <QuestSection id="discussion" icon={stepIcons.group} stepNum="Step 3" title="Discussion & Reflection" isOpen={openSections.discussion} onToggle={() => toggle("discussion")}>
        <OpenQuestionTask
          title="Discuss in pairs or small groups"
          questions={[
            "Which cultural difference mentioned above surprised you most?",
            "Have you ever experienced a cultural misunderstanding (online or offline)?",
            "How can this knowledge help you in your future profession?",
          ]}
        />
      </QuestSection>

      {/* Research */}
      <QuestSection id="research" icon={stepIcons.research} stepNum="Step 4" title="Research & Create Final Product" isOpen={openSections.research} onToggle={() => toggle("research")}>
        <OpenQuestionTask
          title="Beginner's Guide Abroad"
          questions={[
            "Write a short explanation of what culture shock is.",
            "List the four stages (honeymoon, frustration, adjustment, acceptance).",
            "Give 5–7 practical tips for newcomers (communication etiquette, mindset, daily habits).",
            "Describe a role-play scenario showing a newcomer facing culture shock and overcoming it.",
          ]}
        />
      </QuestSection>

      {/* Self-Evaluation */}
      <QuestSection id="reflection" icon={stepIcons.reflection} stepNum="Step 6" title="Self-Evaluation & Conclusion" isOpen={openSections.reflection} onToggle={() => toggle("reflection")}>
        <SelfEvalChecklist items={[
          "I understand what culture shock is and can explain its main stages.",
          "I can recognize symptoms of culture shock in myself or others.",
          "I am open-minded toward cultural differences and new customs.",
          "I try to cope with difficulties instead of avoiding them.",
          "I make an effort to communicate with people from the host culture.",
          "I avoid negative stereotypes and cultural prejudice.",
          "I can explain why cross-cultural etiquette is important today.",
          "I can identify cultural differences in behavior (time, space, gestures, eye contact).",
          "I can give examples of taboo or sensitive behaviors in other cultures.",
          "I can compare my own culture with other cultures respectfully.",
        ]} />
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="font-display text-xl font-bold text-primary mb-2">🎉 Congratulations!</h3>
            <p className="font-body text-sm text-muted-foreground">
              Culture shock is not a setback but a step toward personal growth and global understanding. Awareness of cross-cultural etiquette encourages respect, empathy, and open-mindedness. By learning and applying culturally appropriate behavior, people can avoid misunderstandings, build trust, and create positive relationships.
            </p>
          </CardContent>
        </Card>
      </QuestSection>

      <footer className="border-t py-8 text-center mt-16 space-y-1">
        <p className="font-body text-sm text-muted-foreground">WebQuest Explorer — WebQuest 5: Culture Shock & Cross-Cultural Etiquette</p>
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

export default WebQuest5;
