import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, Play, CheckCircle2, XCircle, BookOpen, Video, PenTool, Users, Search, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DragMatchingTask from "@/components/quest/DragMatchingTask";
import MatchingTask from "@/components/quest/MatchingTask";
import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import VocabularyMatchTask from "@/components/quest/VocabularyMatchTask";
import ComparisonTable from "@/components/quest/ComparisonTable";
import VideoTask from "@/components/quest/VideoTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VennDiagram from "@/components/quest/VennDiagram";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stepIcons: Record<string, React.ReactNode> = {
  intro: <BookOpen className="w-5 h-5" />,
  task: <PenTool className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  reading: <BookOpen className="w-5 h-5" />,
  group: <Users className="w-5 h-5" />,
  research: <Search className="w-5 h-5" />,
  reflection: <MessageSquare className="w-5 h-5" />,
};

const WebQuest1 = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ intro: true });

  const toggle = useCallback((key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-[50vh] sm:h-[60vh] min-h-[320px] overflow-hidden">
        <img
          src="/images/webquest1/hero1.jpg"
          alt="Holidays and Traditions"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />

        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
          <Link to="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-12 md:left-12">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 font-body">
              <ArrowLeft className="w-4 h-4 mr-2" /> Orqaga
            </Button>
          </Link>

          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-body font-medium uppercase tracking-widest mb-3">
              Module 1 — Holidays & Traditions
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3">
              🌍 WebQuest 1
            </motion.h1>
            <motion.h2 variants={fadeUp} className="font-display text-lg sm:text-xl md:text-2xl text-white/90 font-semibold">
              Thanksgiving & Navruz — Traditions of Gratitude and Renewal
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/70 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Compare national holidays, explore cultural traditions, and discover how gratitude connects people around the world.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h3 variants={fadeUp} className="font-display text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
            🎯 Learning Outcomes
          </motion.h3>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              "Learn the origins, traditions, and customs of Thanksgiving and Navruz.",
              "Compare these two holidays using charts and visuals.",
              "Work in groups to design a \"Thanksgiving–Navruz Cultural Evening\".",
              "Present your findings and reflections in class or online.",
            ].map((outcome, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="glass-card hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-5 flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="font-body text-sm leading-relaxed">{outcome}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Step 1: Introduction */}
      <QuestSection
        id="intro"
        icon={stepIcons.intro}
        stepNum="Step 1"
        title="Introduction"
        isOpen={openSections.intro}
        onToggle={() => toggle("intro")}
      >
        <p className="font-body text-muted-foreground leading-relaxed mb-6">
          Holidays are more than just days off — they reflect the history, culture, and values of people. In this WebQuest, you will explore two important holidays: <strong>Thanksgiving</strong> in the United States and <strong>Navruz</strong> in Central Asia. While they come from different cultural traditions, both emphasize gratitude, family, food, and community.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <motion.img
            whileHover={{ scale: 1.03 }}
            src="/images/webquest1/hero1.jpg"
            alt="Traditions"
            className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md"
          />
          <motion.img
            whileHover={{ scale: 1.03 }}
            src="/images/webquest1/hero2.jpg"
            alt="Celebrations"
            className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md"
          />
        </div>
      </QuestSection>

      {/* Step 2: Task - Country Matching with Drag & Drop Flags */}
      <QuestSection
        id="task1"
        icon={stepIcons.task}
        stepNum="Step 2"
        title="Task I — Match Countries with Holiday Descriptions"
        isOpen={openSections.task1}
        onToggle={() => toggle("task1")}
      >
        <p className="font-body text-muted-foreground mb-6">
          Read the descriptions of holidays in Column B and match them with the countries in Column A. Drag the flag images and drop them next to the correct description. One description is extra.
        </p>
        <DragMatchingTask
          items={[
            { label: "USA", image: "/images/webquest1/task1_2.jpg" },
            { label: "Uzbekistan", image: "/images/webquest1/task1_3.jpg" },
            { label: "Ireland", image: "/images/webquest1/task1_4.jpg" },
            { label: "India", image: "/images/webquest1/task1_5.jpg" },
            { label: "China", image: "/images/webquest1/task1_1.png" },
            { label: "Mexico", image: "/images/webquest1/task1_1.png" },
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
      </QuestSection>

      {/* Video Tasks */}
      <QuestSection
        id="videos"
        icon={stepIcons.video}
        stepNum="Step 2"
        title="Video Tasks"
        isOpen={openSections.videos}
        onToggle={() => toggle("videos")}
      >
        <div className="space-y-8">
          <VideoTask
            title="Video Task I — Navruz in Tashkent"
            instruction="Watch the video and tell why Tashkent locals expect Navruz."
            videoUrl="https://www.youtube.com/watch?v=3k5bE-jV7sQ"
            thumbnail="/images/webquest1/video_task1.jpg"
          />
          <VideoTask
            title="Video Task II — Origin of Thanksgiving"
            instruction="Watch the video and tell about the origin of Thanksgiving Day."
            videoUrl="https://www.youtube.com/watch?v=oJ9B5HHYNbE"
            thumbnail="/images/webquest1/video_task2.jpg"
          />
        </div>
      </QuestSection>

      {/* Navruz Reading */}
      <QuestSection
        id="navruz-reading"
        icon={stepIcons.reading}
        stepNum="Step 3"
        title="Reading — The Ultimate Guide to Navruz"
        isOpen={openSections["navruz-reading"]}
        onToggle={() => toggle("navruz-reading")}
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/navruz1.jpg" alt="Navruz" className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/navruz2.jpg" alt="Navruz celebration" className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/navruz3.jpg" alt="Navruz food" className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md hidden sm:block" />
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/navruz_celebration1.jpg" alt="Navruz" className="rounded-xl w-full h-36 sm:h-40 object-cover shadow-md" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/navruz_celebration2.jpg" alt="Navruz" className="rounded-xl w-full h-36 sm:h-40 object-cover shadow-md" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/navruz_celebration3.jpg" alt="Kupkari" className="rounded-xl w-full h-36 sm:h-40 object-cover shadow-md hidden sm:block" />
        </div>
      </QuestSection>

      {/* Navruz Tasks */}
      <QuestSection
        id="navruz-tasks"
        icon={stepIcons.task}
        stepNum="Step 3"
        title="Navruz Tasks — Match Headings & Vocabulary"
        isOpen={openSections["navruz-tasks"]}
        onToggle={() => toggle("navruz-tasks")}
      >
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
      </QuestSection>

      {/* Thanksgiving Reading */}
      <QuestSection
        id="thanksgiving"
        icon={stepIcons.reading}
        stepNum="Step 3"
        title="Reading — Top 10 Thanksgiving Traditions"
        isOpen={openSections.thanksgiving}
        onToggle={() => toggle("thanksgiving")}
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/thanksgiving1.jpg" alt="Thanksgiving" className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/thanksgiving2.jpg" alt="Thanksgiving" className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest1/thanksgiving3.jpg" alt="Thanksgiving" className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md hidden sm:block" />
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
          <ReadingSection key={i} title={item.title}>
            {item.text}
          </ReadingSection>
        ))}
      </QuestSection>

      {/* Thanksgiving Tasks */}
      <QuestSection
        id="thanksgiving-tasks"
        icon={stepIcons.task}
        stepNum="Step 3"
        title="Thanksgiving Tasks"
        isOpen={openSections["thanksgiving-tasks"]}
        onToggle={() => toggle("thanksgiving-tasks")}
      >
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
      </QuestSection>

      {/* Individual Work */}
      <QuestSection
        id="individual"
        icon={stepIcons.task}
        stepNum="Step 3"
        title="Individual Work — Glossary & Comparison"
        isOpen={openSections.individual}
        onToggle={() => toggle("individual")}
      >
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
      </QuestSection>

      {/* Role Play & Behaviour */}
      <QuestSection
        id="roleplay"
        icon={stepIcons.group}
        stepNum="Step 3"
        title="Role Play & Cultural Behaviour"
        isOpen={openSections.roleplay}
        onToggle={() => toggle("roleplay")}
      >
        <img src="/images/webquest1/role_play.jpg" alt="Role play" className="rounded-xl w-full h-40 sm:h-48 object-cover shadow-md mb-6" />
        <h4 className="font-display text-lg font-semibold mb-3">Task VI: Do's and Don'ts for Visitors</h4>
        <p className="font-body text-muted-foreground mb-4">
          Create a "Tourist Behaviour Guide": 3 Do's and 3 Don'ts for each holiday.
        </p>
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
      </QuestSection>

      {/* Research & Resources */}
      <QuestSection
        id="research"
        icon={stepIcons.research}
        stepNum="Step 4"
        title="Research with Resources"
        isOpen={openSections.research}
        onToggle={() => toggle("research")}
      >
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
      </QuestSection>

      {/* Venn Diagram & Group Work */}
      <QuestSection
        id="group"
        icon={stepIcons.group}
        stepNum="Step 4"
        title="Group Work — Venn Diagram & Cultural Evening"
        isOpen={openSections.group}
        onToggle={() => toggle("group")}
      >
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
      </QuestSection>

      {/* Reflection */}
      <QuestSection
        id="reflection"
        icon={stepIcons.reflection}
        stepNum="Step 6"
        title="Reflection & Self-Evaluation"
        isOpen={openSections.reflection}
        onToggle={() => toggle("reflection")}
      >
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
      </QuestSection>

      <footer className="border-t py-8 text-center mt-16">
        <p className="font-body text-sm text-muted-foreground">
          WebQuest Explorer — WebQuest 1: Thanksgiving & Navruz
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
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card border-2 hover:border-primary/30 transition-colors group"
      >
        <span className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </span>
        <div className="text-left flex-1 min-w-0">
          <span className="text-xs font-body text-muted-foreground uppercase tracking-wider">{stepNum}</span>
          <h3 className="font-display text-base sm:text-lg font-semibold truncate">{title}</h3>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
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
          <input
            type="checkbox"
            checked={checked[i] || false}
            onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))}
            className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary"
          />
          <span className="font-body text-sm">{item}</span>
          {checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
        </label>
      ))}
    </div>
  );
}

export default WebQuest1;
