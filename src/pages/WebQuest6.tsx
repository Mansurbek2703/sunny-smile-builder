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
      <div className="fixed inset-0 z-0"><div className="absolute inset-0 bg-gradient-to-br from-[hsl(25,70%,30%)] via-[hsl(40,60%,35%)] to-[hsl(15,50%,25%)]" /><div className="absolute inset-0 bg-background/60" /></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px" style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-lg font-body mb-0.5 transition-colors"><ArrowLeft className="w-3 h-3" /> Orqaga</Link>
              <span className="text-[11px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 5</span>
              <h1 className="font-display text-xl font-bold leading-tight">🍽️ WebQuest 6 — Food Culture & Dining</h1>
            </div>
            {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
              <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-sm font-body ${active ? "bg-primary text-primary-foreground font-semibold shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}><Icon className="w-4 h-4 shrink-0" /><span className="truncate">{s.label}</span>{active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}</button>); })}
          </aside>
          <AnimatePresence>{mobileMenuOpen && (<>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
            <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 md:hidden overflow-y-auto py-4 px-3">
              <div className="flex items-center justify-between mb-4 px-2"><span className="font-display font-bold text-xl">Steps</span><button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button></div>
              {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (<button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-xl font-body mb-1 ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-muted-foreground"}`}><Icon className="w-4 h-4 shrink-0" /><span>{s.label}</span></button>); })}
            </motion.aside></>)}</AnimatePresence>
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center gap-2 px-3 pt-2 pb-1"><Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link><span className="text-[11px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 5</span><span className="font-display text-lg font-bold truncate">🍽️ WQ 6 — Food Culture</span></div>
              <div className="flex items-center gap-2 px-3 pb-2"><button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button><span className="font-body text-xl text-primary">{currentStep + 1}/{steps.length}</span><span className="font-display font-semibold text-xl truncate">{steps[currentStep].label}</span></div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="p-1 sm:p-1.5 md:px-4 md:py-1">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 shadow-sm border-2 border-transparent hover:shadow-lg transition-all duration-300" style={{ borderImage: 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1', borderRadius: '0.75rem' }} onMouseEnter={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1'; }} onMouseLeave={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1'; }}>
                  <div className="flex items-center gap-2 mb-1.5"><span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">{(() => { const Icon = steps[currentStep].icon; return <Icon className="w-3.5 h-3.5" />; })()}</span><div><span className="text-[11px] font-body text-primary uppercase tracking-wider">Step {currentStep + 1} / {steps.length}</span><h3 className="font-display text-xl font-bold leading-none">{steps[currentStep].label}</h3></div></div>
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
    case "infographic": return <img src="/images/webquest6/infographic.webp" alt="Cross-Cultural Dining Etiquette — Know the Do's and Don'ts Around the World" loading="eager" decoding="async" className="rounded-xl w-full object-contain shadow-lg" />;
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
        <Card key={i} className="glass-card hover:shadow-lg transition-shadow"><CardContent className="p-2 flex items-start gap-2"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-lg">{i + 1}</span><p className="font-body text-lg leading-snug">{o}</p></CardContent></Card>))}
    </div>
    <img src="/images/webquest6/hero1.jpg" alt="Food Culture" loading="lazy" className="rounded-xl w-full h-48 object-cover shadow-md mb-2" />
    <p className="font-body text-foreground text-lg leading-snug">This WebQuest invites students to explore food culture in various countries. Through guided online research, students will learn how food-related customs, table manners, and social behaviors differ across cultures.</p>
  </>);
}

function VideoStep() {
  return (<>
    <VideoTask title="Dining Etiquette Around the World" instruction="Watch the video about dining etiquette rules and complete the tasks below." videoUrl="https://www.youtube.com/watch?v=BjN7Sp-DwQ4" thumbnail="/images/webquest6/video_thumb.jpg" />
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Task A: Match country with dining rule</h4>
      <SelectMatchingTask pairs={[{ left: "Thailand", right: "" }, { left: "China", right: "" }, { left: "Ethiopia", right: "" }, { left: "Italy", right: "" }, { left: "Portugal", right: "" }, { left: "Japan", right: "" }, { left: "Middle East / India", right: "" }, { left: "Kazakhstan", right: "" }]}
        options={["Use a spoon, not a fork, to eat", "Do not finish all food on your plate", "Eat from one shared plate", "Do not ask for extra cheese", "Do not ask for salt or pepper", "Do not refill your own wine", "Do not use the left hand", "Tea has strict drinking rules"]}
        correctAnswers={{ 0: "Use a spoon, not a fork, to eat", 1: "Do not finish all food on your plate", 2: "Eat from one shared plate", 3: "Do not ask for extra cheese", 4: "Do not ask for salt or pepper", 5: "Do not refill your own wine", 6: "Do not use the left hand", 7: "Tea has strict drinking rules" }} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Task B: True or False</h4>
      <TrueFalseTask statements={[{ text: "In Thailand, eating with a fork is completely acceptable.", answer: true }, { text: "In China, an empty plate may be seen as rude.", answer: true }, { text: "Ethiopians usually eat with individual plates and cutlery.", answer: false }, { text: "Asking for extra cheese in Italy may insult the chef.", answer: true }, { text: "Cappuccino is commonly drunk in Italy in the evening.", answer: false }, { text: "In Japan, it is polite to pour wine for others.", answer: true }]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Task C: Choose the correct option</h4>
      <MultipleChoiceTask questions={[{ question: "In Portugal, asking for salt or pepper is considered rude because:", options: ["Spices are expensive", "It may insult the cook", "It is unhealthy"], correctIndex: 1 }, { question: "Chopsticks placed vertically are associated with:", options: ["Celebration", "Daily meals", "Funerals"], correctIndex: 2 }, { question: "Traditional Chinese teapots:", options: ["Must be washed with soap", "Should never be washed", "Should not be washed with dish liquid"], correctIndex: 2 }]} />
    </div>
  </>);
}

function Reading1Step() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-3">
      <img src="/images/webquest6/culinary_map.webp" alt="World Culinary Map — global food cultures" loading="eager" decoding="async" className="rounded-xl w-full h-48 object-cover shadow-md" />
      <img src="/images/webquest6/culinary_dishes.webp" alt="Diverse culinary dishes from around the world" loading="eager" decoding="async" className="rounded-xl w-full h-48 object-cover shadow-md" />
    </div>
    <ReadingSection title="Food Culture & Identity">
      Food culture is an integral part of human civilization, representing the way societies prepare, share, and cherish their meals. It encapsulates the essence of a community's identity, reflecting historical, geographical, and social influences. The importance of these traditions extends far beyond mere sustenance, as they intricately reflect the unique identities of diverse societies.
      {"\n\n"}Whether it's the ceremonial tea traditions in Japan or the communal feasts in Ethiopia, food culture is a dynamic expression of shared values.
      {"\n\n"}The primary objective of this article is to delve into the myriad cultural aspects that contribute to the rich tapestry of global culinary traditions. By exploring the historical, geographical, and sociocultural influences on world cuisine, we aim to gain a comprehensive understanding of how different cultures have left an indelible mark on today's foods we savour.
    </ReadingSection>
    <ReadingSection title="Geographical Factors">
      The impact of climate is evident in the types of crops that thrive in specific regions. For instance, tropical climates foster the growth of exotic fruits like mangoes and bananas, influencing the vibrant and tropical flavours found in Caribbean and Southeast Asian cuisines. Similarly, arid regions might emphasize drought-resistant crops, leading to the prevalence of grains like couscous in North African dishes.
      {"\n\n"}Terrain also plays a crucial role. Coastal areas, blessed with abundant seafood, showcase a predilection for fish-based dishes. Scandinavia, with its extensive coastline, embraces a seafood-centric cuisine, exemplified by dishes like gravlax and pickled herring. Conversely, mountainous regions may rely on hardy grains and livestock adapted to rugged landscapes, as seen in the hearty fare of the Swiss Alps.
    </ReadingSection>
    <ReadingSection title="Historical Roots of Culinary Traditions">
      Over time, different events, movements, and trade have influenced the way we cook and eat, creating a diverse and colourful world of food cultures. Exploring the historical roots of culinary traditions unveils the intricate ways in which societies have evolved, influencing, and being influenced by the foods they prepare and savour.
      {"\n\n"}Historical events, such as conquests and colonization, have left an indelible mark on food cultures in the world's culinary traditions. The Columbian Exchange, for example, facilitated the interchange of crops between the Old and New Worlds, transforming the diets of both hemispheres. The introduction of New World ingredients like potatoes and tomatoes to Europe and vice versa laid the foundation for new culinary possibilities.
      {"\n\n"}Trade routes served as conduits for the exchange of spices, herbs, and culinary techniques, fostering the fusion of different culinary traditions. The Silk Road, connecting East and West, facilitated the exchange of ingredients like spices and noodles, shaping the cuisines of regions along the route.
    </ReadingSection>
    <ReadingSection title="Role of Food in Cultural Rituals">
      Rituals and ceremonies play a significant role in the world of culinary practices, adding a layer of tradition and meaning to the act of preparing and sharing meals.
      {"\n\n"}In Japan, the tea ceremony known as "sado" is a highly ritualized practice that involves the precise preparation and consumption of matcha tea. The entire process is considered a form of art, promoting mindfulness and connection. In India, the preparation of certain dishes during festivals, like making sweets during Diwali or preparing biryani during Eid, is a culinary ritual that brings families together, symbolizing joy and celebration. Similarly, in Italy, the act of making pasta from scratch is not just a cooking task but a ritual that connects generations, preserving the authenticity of traditional recipes and fostering a sense of family identity.
      {"\n\n"}Communal cooking and eating rituals are a cornerstone of preserving cultural identity. The act of sharing a meal fosters a sense of belonging and strengthens social bonds. In Mexico, the preparation of tamales is a family affair, with generations coming together during special occasions. In China, the art of dumpling-making is often a cherished tradition passed from grandparents to children. In the Southern United States, slow-cooking barbecue is a family affair with secret spice rubs handed down through generations.
    </ReadingSection>
    <ReadingSection title="Globalization's Impact & Conclusion">
      The interconnectedness of the modern world through globalization has both reshaped and challenged traditional food cultures. Globalization has facilitated the exchange of culinary ideas and ingredients on an unprecedented scale. Fast food chains, culinary tourism, and the global availability of ingredients have led to a blending of culinary cultures. Sushi in the heart of New York or curry in London exemplifies how once-regional dishes have become global culinary staples.
      {"\n\n"}In conclusion, preserving and appreciating diverse culinary heritages emerge as a crucial theme. Food is more than nourishment; it is a bridge that connects us to our past, shapes our present, and contributes to human culture. In a world where borders become blurred and connections deepen, food is a universal language that transcends differences. Let us embrace the richness of global culinary traditions, recognizing that each dish is a story, a legacy, and an invitation to understand the diverse world food cultures that contribute to our shared human experience.
    </ReadingSection>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Choose the right answer</h4>
      <MultipleChoiceTask questions={[{ question: "What does food culture primarily represent?", options: ["Only a source of nutrition", "A community's identity and traditions", "A type of entertainment", "A form of art only"], correctIndex: 1 }, { question: "How does geography influence cuisine?", options: ["It determines only cooking techniques", "It affects ingredient availability and types of crops", "It has no effect", "It only influences desserts"], correctIndex: 1 }, { question: "Which historical event introduced potatoes and tomatoes to Europe?", options: ["The Silk Road", "The Columbian Exchange", "The Industrial Revolution", "The Transatlantic Trade"], correctIndex: 1 }]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">True or False</h4>
      <TrueFalseTask statements={[{ text: "Tropical climates often influence dishes with fruits like mangoes and bananas.", answer: true }, { text: "The Silk Road only traded textiles, not food.", answer: false }, { text: "Thanksgiving dinner in the USA is an example of a cultural food ritual.", answer: true }, { text: "Making pasta from scratch in Italy is considered a family and cultural tradition.", answer: true }, { text: "Globalization has made it impossible to preserve traditional culinary practices.", answer: false }]} />
    </div>
  </>);
}

function Reading2Step() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-3 mb-3">
      <img src="/images/webquest6/manners_sandwich.webp" alt="Mind Your Manners — Dining Etiquette Around the World" className="w-full h-auto rounded-xl shadow-md object-contain" loading="eager" decoding="async" />
      <img src="/images/webquest6/manners_indian.webp" alt="Traditional Indian dining etiquette" className="w-full h-auto rounded-xl shadow-md object-contain" loading="eager" decoding="async" />
    </div>
    <ReadingSection title="Mind Your Manners: Introduction">Dining in different countries involves learning the local etiquette – at least if you want to avoid any cultural faux pas. Trying the local cuisine is one of the highlights of travelling. But what's acceptable at the dinner table in one country may not be the case in another. We all grow up with different table manners, but sometimes, when you travel, the etiquette you're used to may be flipped on its head faster than you can say, 'No elbows on the table!' From eating only with your right hand in India to slurping your noodles in Japan, here are some dining etiquette practices you may encounter on your travels.</ReadingSection>
    <ReadingSection title="India & Italy">
      <strong>1. Don't eat with your left hand in India.</strong> Eating with your hands is the norm in many parts of India. Locals even say it makes the food taste better. However, you should only ever use your right hand – even if you're a leftie. The left hand is traditionally reserved for 'unsavoury' activities, so using it to eat is considered unclean.{"\n\n"}<strong>2. Don't drink a milky coffee after 11 am in Italy.</strong> If you order a cappuccino in Italy after 11 am, be prepared to be met with a look of disdain. There's an unwritten rule that cappuccinos should only be consumed at breakfast. Italians think milk is heavy and believe drinking it later can disrupt digestion. Do like the Italians and order "Un caffè, per favore" — a small but caffeine-packed shot of espresso. Also, don't ask for a 'latte' unless you want a glass of milk – ask for a "caffe latte".{"\n\n"}<strong>3. Don't cut pasta in Italy.</strong> Never, ever cut your pasta with a knife in Italy — it's considered sacrilege. The whole point of Italian cuisine is to take your time and savour each bite. Breaking pasta in half before boiling is a severe culinary sin in the eyes of an Italian.
    </ReadingSection>
    <ReadingSection title="China & Japan">
      <strong>4. Burping at the dinner table is acceptable in China.</strong> Burping gently is seen as a sign of gratitude to the chef. While you don't have to participate, remain open-minded to hearing a burp or two at the dining table.{"\n\n"}<strong>5. Feel free to slurp your noodles in Japan.</strong> Slurping noodles is seen as a compliment to the cook. But just because slurping is fine in ramen joints doesn't mean you should do it in other restaurant settings.{"\n\n"}<strong>6. Don't stick chopsticks in your rice in Japan.</strong> Sticking chopsticks in rice resembles 'tate-bashi', a type of offering reserved for Buddhist and Shinto funerals. Doing it at a dinner table is considered a bad omen. Instead, rest your chopsticks over your bowl or place them in the chopstick holder.
    </ReadingSection>
    <ReadingSection title="USA & Ethiopia">
      <strong>7. Don't leave without tipping in the USA.</strong> Leaving a sit-down restaurant without tipping is unheard of. Hospitality staff rely on tips as they're usually paid below the federal minimum wage. The accepted amount is 15 to 20 per cent of the bill. In bars, it's standard to tip USD $1 per drink.{"\n\n"}<strong>8. Don't lick your fingers in Ethiopia.</strong> Most dishes are brought out on injera, a large, spongy flatbread which also serves as cutlery. The platter is placed in the middle of the table so everyone can tear off pieces and scoop up stews, curries and salads. Like in India, eating should only be done with the right hand. Don't lick your fingers during the meal — hold out till the end when you wash your hands.
    </ReadingSection>
    <ReadingSection title="Conclusion">There can be a lot to navigate when you travel to a new country for the first time. When you travel with an expert local leader by your side, they can help you with the do's and don'ts so you can get a true taste of the local culture.{"\n\n"}<em>Written by Cliona Elliott, May 10, 2024</em></ReadingSection>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">True, False, or Culture-dependent?</h4>
      <TrueFalseTask statements={[{ text: "Slurping food is rude in all countries.", answer: false }, { text: "Using the left hand while eating is acceptable everywhere.", answer: false }, { text: "Tipping is optional in the USA.", answer: false }, { text: "Burping at the table is always impolite.", answer: false }]} />
    </div>
    <div className="mt-4"><OpenQuestionTask title="Compare dining etiquette" questions={["What behaviours are considered polite in both your culture and another?", "What behaviour might cause misunderstanding?", "Why do these differences exist?"]} /></div>
  </>);
}

function DiscussionStep() { return <OpenQuestionTask title="Discuss in groups" questions={["Give one example of how geography affects cuisine in a specific region.", "Name a food ritual from any country and describe its cultural significance.", "Why is it important to know dining rules and etiquette across cultures?"]} />; }

function ResearchStep() {
  return (<>
    <OpenQuestionTask title="Signature Dishes" questions={["Write your chosen country name.", "Why did you choose this country?", "Name 2–3 national dishes and describe them (ingredients, preparation, history)."]} />
    <div className="mt-4"><OpenQuestionTask title="Food Etiquette & Eating Traditions" questions={["What are the table manners in your chosen country?", "Do they use cutlery, hands, or chopsticks?", "Describe food sharing traditions.", "What is polite or impolite at the table?"]} /></div>
    <div className="mt-4"><OpenQuestionTask title="Cultural Meaning & Comparison" questions={["What does the cuisine tell about the country's history, lifestyle, and values?", "Write 3 comparison sentences between your culture and the chosen country's food culture."]} /></div>
  </>);
}

function ReflectionStep() {
  return (<>
    <OpenQuestionTask title="Intercultural Reflection" questions={["What did you learn about another culture through food?", "What dining rules have you learned?", "How can this knowledge prevent misunderstandings?"]} />
    <div className="mt-4"><SelfEvalChecklist items={["I used 8+ vocabulary words from the unit.", "I used the Passive / Comparatives / Relatives.", "I researched reliable sources.", "I compared two cultures' dining etiquette.", "My final product is clear and organized.", "I worked well in my group."]} /></div>
    <Card className="mt-4 border-primary/30 bg-primary/5"><CardContent className="p-4 text-center"><h3 className="font-display text-xl font-bold text-primary mb-1">🎉 Congratulations!</h3><p className="font-body text-lg text-foreground">Through this WebQuest, you explored traditional dishes, food etiquette and cultures from different countries. Understanding the meaning of food helps avoid misunderstandings and shows respect for other cultures.</p></CardContent></Card>
  </>);
}

function ReadingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="mb-3 p-3 rounded-xl bg-muted/50 border-l-4 border-primary/40"><h5 className="font-display font-semibold text-xl mb-1">{title}</h5><p className="font-body text-xl text-foreground leading-relaxed">{children}</p></div>);
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (<div className="space-y-1">{items.map((item, i) => (<label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"><input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" /><span className="font-body text-xl">{item}</span>{checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}</label>))}</div>);
}

export default WebQuest6;
