import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Video, PenTool, Users, Search, MessageSquare, CheckCircle2, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SiteHeader from "@/components/SiteHeader";
import FloatingCulturalElements from "@/components/FloatingCulturalElements";
import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import VideoTask from "@/components/quest/VideoTask";
import TrueFalseTask from "@/components/quest/TrueFalseTask";
import MultipleChoiceTask from "@/components/quest/MultipleChoiceTask";

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
  food: <UtensilsCrossed className="w-5 h-5" />,
};

const WebQuest6 = () => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(25,70%,30%)] via-[hsl(40,60%,35%)] to-[hsl(15,50%,25%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(25,50%,12%)/0.6] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(40,70%,50%,0.2),transparent_60%)]" />
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 md:p-12 max-w-5xl mx-auto">
          <Link to="/" className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-12 md:left-12">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 font-body"><ArrowLeft className="w-4 h-4 mr-2" /> Orqaga</Button>
          </Link>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-body font-medium uppercase tracking-widest mb-3">Module 5 — Food & Dining</motion.span>
            <motion.h1 variants={fadeUp} className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3">🍽️ WebQuest 6</motion.h1>
            <motion.h2 variants={fadeUp} className="font-display text-lg sm:text-xl md:text-2xl text-white/90 font-semibold">Food Culture & Dining Etiquette</motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/70 mt-3 max-w-2xl text-xs sm:text-sm md:text-base">
              Explore cuisines and dining etiquette from different countries and discover how food helps us understand other cultures.
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
              "Develop curiosity about other cultures through food.",
              "Respect cultural differences in dining customs.",
              "Compare cultures critically through culinary traditions.",
              "Gain awareness of food traditions and dining etiquette around the world.",
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
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest6/infographic1.jpg" alt="Infographic" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest6/infographic2.jpg" alt="Infographic 2" className="rounded-xl w-full object-contain shadow-lg bg-muted/30" />
        </div>
      </QuestSection>

      {/* Introduction */}
      <QuestSection id="intro" icon={stepIcons.intro} stepNum="Step 1" title="Introduction" isOpen={openSections.intro} onToggle={() => toggle("intro")}>
        <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest6/hero1.jpg" alt="Food Culture" className="rounded-xl w-full h-48 sm:h-56 object-contain sm:object-cover shadow-md bg-muted/30 mb-6" />
        <p className="font-body text-muted-foreground leading-relaxed">
          This WebQuest invites students to explore food culture in various countries and regions. Through guided online research, students will learn how food-related customs, table manners, and social behaviors differ across cultures. Special attention will be paid to topics such as food around the world, use of cutlery, shared meals, politeness rules, taboos, and host–guest relationships.
        </p>
      </QuestSection>

      {/* Video Task — Dining Etiquette */}
      <QuestSection id="video" icon={stepIcons.video} stepNum="Step 3" title="Video Task — Dining Etiquette Rules" isOpen={openSections.video} onToggle={() => toggle("video")}>
        <VideoTask
          title="Dining Etiquette Around the World"
          instruction="Watch the video about dining etiquette rules and complete the tasks below."
          videoUrl="https://www.youtube.com/watch?v=BjN7Sp-DwQ4"
          thumbnail="/images/webquest6/video_thumb.jpg"
        />

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task A: Match country with dining rule</h4>
          <SelectMatchingTask
            pairs={[
              { left: "Thailand", right: "" },
              { left: "China", right: "" },
              { left: "Ethiopia", right: "" },
              { left: "Italy", right: "" },
              { left: "Portugal", right: "" },
              { left: "Japan", right: "" },
              { left: "Middle East / India", right: "" },
              { left: "Kazakhstan", right: "" },
            ]}
            options={[
              "Use a spoon, not a fork, to eat",
              "Do not finish all food on your plate",
              "Eat from one shared plate",
              "Do not ask for extra cheese",
              "Do not ask for salt or pepper",
              "Do not refill your own wine",
              "Do not use the left hand",
              "Tea has strict drinking rules",
            ]}
            correctAnswers={{
              0: "Use a spoon, not a fork, to eat",
              1: "Do not finish all food on your plate",
              2: "Eat from one shared plate",
              3: "Do not ask for extra cheese",
              4: "Do not ask for salt or pepper",
              5: "Do not refill your own wine",
              6: "Do not use the left hand",
              7: "Tea has strict drinking rules",
            }}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task B: True or False</h4>
          <TrueFalseTask
            statements={[
              { text: "In Thailand, eating with a fork is completely acceptable.", answer: true },
              { text: "In China, an empty plate may be seen as rude.", answer: true },
              { text: "Ethiopians usually eat with individual plates and cutlery.", answer: false },
              { text: "Asking for extra cheese in Italy may insult the chef.", answer: true },
              { text: "Cappuccino is commonly drunk in Italy in the evening.", answer: false },
              { text: "In Japan, it is polite to pour wine for others.", answer: true },
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task C: Choose the correct option</h4>
          <MultipleChoiceTask
            questions={[
              {
                question: "In Portugal, asking for salt or pepper is considered rude because:",
                options: ["Spices are expensive", "It may insult the cook", "It is unhealthy"],
                correctIndex: 1,
              },
              {
                question: "Chopsticks placed vertically are associated with:",
                options: ["Celebration", "Daily meals", "Funerals"],
                correctIndex: 2,
              },
              {
                question: "Traditional Chinese teapots:",
                options: ["Must be washed with soap", "Should never be washed", "Should not be washed with dish liquid"],
                correctIndex: 2,
              },
            ]}
          />
        </div>
      </QuestSection>

      {/* Reading 1 — Culinary Traditions */}
      <QuestSection id="reading1" icon={stepIcons.reading} stepNum="Step 3" title="Reading — Culinary Traditions Around the Globe" isOpen={openSections.reading1} onToggle={() => toggle("reading1")}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest6/reading1.jpg" alt="Culinary Traditions" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
          <motion.img whileHover={{ scale: 1.03 }} src="/images/webquest6/reading2.jpg" alt="Dining Etiquette" className="rounded-xl w-full h-40 sm:h-48 object-contain sm:object-cover shadow-md bg-muted/30" />
        </div>

        <ReadingSection title="Food Culture & Identity">
          Food culture is an integral part of human civilization, representing the way societies prepare, share, and cherish their meals. It encapsulates the essence of a community's identity, reflecting historical, geographical, and social influences.
        </ReadingSection>
        <ReadingSection title="Geographical Factors">
          Tropical climates foster exotic fruits influencing Caribbean and Southeast Asian cuisines. Arid regions emphasize grains like couscous. Coastal areas showcase seafood-centric cuisines like Scandinavian gravlax.
        </ReadingSection>
        <ReadingSection title="Historical Roots">
          The Columbian Exchange introduced potatoes and tomatoes to Europe. The Silk Road facilitated the exchange of spices and noodles. Trade routes shaped cuisines of regions along them.
        </ReadingSection>
        <ReadingSection title="Communal Cooking">
          Communal cooking and eating rituals are a cornerstone of preserving cultural identity. In Mexico, tamale-making is a family affair. In China, dumpling-making is a cherished tradition passed through generations.
        </ReadingSection>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task II: Choose the right answer</h4>
          <MultipleChoiceTask
            questions={[
              {
                question: "What does food culture primarily represent?",
                options: ["Only a source of nutrition", "A community's identity and traditions", "A type of entertainment", "A form of art only"],
                correctIndex: 1,
              },
              {
                question: "How does geography influence cuisine?",
                options: ["It determines only cooking techniques", "It affects ingredient availability and types of crops", "It has no effect on culinary traditions", "It only influences desserts"],
                correctIndex: 1,
              },
              {
                question: "Which historical event introduced potatoes and tomatoes to Europe?",
                options: ["The Silk Road", "The Columbian Exchange", "The Industrial Revolution", "The Transatlantic Trade"],
                correctIndex: 1,
              },
              {
                question: "Which is an example of a ritual involving food?",
                options: ["Making pizza at a fast-food restaurant", "Japan's tea ceremony (sado)", "Buying groceries online", "Eating instant noodles"],
                correctIndex: 1,
              },
              {
                question: "How does communal cooking help preserve culture?",
                options: ["It saves time in meal preparation", "It strengthens family bonds and passes down traditions", "It encourages everyone to eat fast food", "It reduces the variety of foods"],
                correctIndex: 1,
              },
            ]}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task III: True or False</h4>
          <TrueFalseTask
            statements={[
              { text: "Tropical climates often influence dishes with fruits like mangoes and bananas.", answer: true },
              { text: "The Silk Road only traded textiles, not food.", answer: false },
              { text: "Thanksgiving dinner in the USA is an example of a cultural food ritual.", answer: true },
              { text: "Making pasta from scratch in Italy is considered a family and cultural tradition.", answer: true },
              { text: "Globalization has made it impossible to preserve traditional culinary practices.", answer: false },
            ]}
          />
        </div>
      </QuestSection>

      {/* Reading 2 — Dining Etiquette */}
      <QuestSection id="reading2" icon={stepIcons.reading} stepNum="Step 3" title="Reading — Mind Your Manners: Dining Etiquette" isOpen={openSections.reading2} onToggle={() => toggle("reading2")}>
        <ReadingSection title="India — Right Hand Only">
          Eating with your hands is the norm. You should only ever use your right hand — the left is traditionally reserved for unsanitary activities.
        </ReadingSection>
        <ReadingSection title="Italy — Coffee Rules">
          Don't order a cappuccino after 11 am. Italians think milk is heavy and disrupts digestion. Also, never cut your pasta with a knife — it's considered sacrilege.
        </ReadingSection>
        <ReadingSection title="China — Burping & Chopsticks">
          Burping gently is a sign of gratitude to the chef. Never stick chopsticks vertically in rice — it resembles a funeral offering.
        </ReadingSection>
        <ReadingSection title="Japan — Slurping & Wine">
          Slurping noodles is a compliment to the cook in ramen joints. Always pour wine for others, not for yourself.
        </ReadingSection>
        <ReadingSection title="USA — Tipping">
          Leaving without tipping 15-20% is unheard of. Service staff rely on tips as they are paid below minimum wage.
        </ReadingSection>
        <ReadingSection title="Ethiopia — Injera">
          Dishes are served on injera flatbread. Everyone shares from the same platter using only the right hand. Don't lick your fingers during the meal.
        </ReadingSection>

        <div className="mt-8">
          <h4 className="font-display text-lg font-semibold mb-4">Task 3: True, False, or Culture-dependent?</h4>
          <TrueFalseTask
            statements={[
              { text: "Slurping food is rude in all countries.", answer: false },
              { text: "Using the left hand while eating is acceptable everywhere.", answer: false },
              { text: "Tipping is optional in the USA.", answer: false },
              { text: "Burping at the table is always impolite.", answer: false },
            ]}
          />
        </div>

        <div className="mt-8">
          <OpenQuestionTask
            title="Task 4: Compare dining etiquette"
            questions={[
              "What behaviours are considered polite in both your culture and another?",
              "What behaviour might cause misunderstanding?",
              "Why do these differences exist?",
            ]}
          />
        </div>
      </QuestSection>

      {/* Discussion */}
      <QuestSection id="discussion" icon={stepIcons.group} stepNum="Step 3" title="Discussion" isOpen={openSections.discussion} onToggle={() => toggle("discussion")}>
        <OpenQuestionTask
          title="Discuss in groups"
          questions={[
            "Give one example of how geography affects cuisine in a specific region.",
            "Name a food ritual from any country and describe its cultural significance.",
            "Why is it important to know dining rules and etiquette across cultures?",
          ]}
        />
      </QuestSection>

      {/* Research */}
      <QuestSection id="research" icon={stepIcons.research} stepNum="Step 4" title="Research — Choose Your Country" isOpen={openSections.research} onToggle={() => toggle("research")}>
        <OpenQuestionTask
          title="Signature Dishes"
          questions={[
            "Write your chosen country name.",
            "Why did you choose this country?",
            "Name 2–3 national dishes and describe them (ingredients, preparation, history).",
          ]}
        />
        <div className="mt-6">
          <OpenQuestionTask
            title="Food Etiquette & Eating Traditions"
            questions={[
              "What are the table manners in your chosen country?",
              "Do they use cutlery, hands, or chopsticks?",
              "Describe food sharing traditions.",
              "What is polite or impolite at the table?",
              "What are the host-guest relationships like?",
            ]}
          />
        </div>
        <div className="mt-6">
          <OpenQuestionTask
            title="Cultural Meaning & Comparison"
            questions={[
              "What does the cuisine tell about the country's history, lifestyle, and values?",
              "Write 3 comparison sentences between your culture and the chosen country's food culture.",
            ]}
          />
        </div>
      </QuestSection>

      {/* Reflection */}
      <QuestSection id="reflection" icon={stepIcons.reflection} stepNum="Step 6" title="Reflection & Self-Evaluation" isOpen={openSections.reflection} onToggle={() => toggle("reflection")}>
        <OpenQuestionTask
          title="Intercultural Reflection"
          questions={[
            "What did you learn about another culture through food?",
            "What dining rules have you learned?",
            "How can this knowledge prevent misunderstandings?",
          ]}
        />
        <div className="mt-8">
          <SelfEvalChecklist items={[
            "I used 8+ vocabulary words from the unit.",
            "I used the Passive / Comparatives / Relatives.",
            "I researched reliable sources.",
            "I compared two cultures' dining etiquette.",
            "My final product is clear and organized.",
            "I worked well in my group.",
          ]} />
        </div>
        <Card className="mt-8 border-primary/30 bg-primary/5">
          <CardContent className="p-4 sm:p-6 text-center">
            <h3 className="font-display text-xl font-bold text-primary mb-2">🎉 Congratulations!</h3>
            <p className="font-body text-sm text-muted-foreground">
              Through this WebQuest, you explored traditional dishes, food etiquette and cultures from different countries. Dining etiquette is a significant aspect of cross-cultural communication. Understanding the meaning of food helps avoid misunderstandings, shows respect for other cultures, and builds positive international relationships.
            </p>
          </CardContent>
        </Card>
      </QuestSection>

      <footer className="border-t py-8 text-center mt-16 space-y-1">
        <p className="font-body text-sm text-muted-foreground">WebQuest Explorer — WebQuest 6: Food Culture & Dining Etiquette</p>
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

export default WebQuest6;
