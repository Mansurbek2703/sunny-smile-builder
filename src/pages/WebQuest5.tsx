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

const steps = [
  { id: "infographic", label: "Infographic", icon: BookOpen },
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "idioms", label: "Idioms & Phrases", icon: PenTool },
  { id: "vocabulary", label: "Vocabulary", icon: PenTool },
  { id: "reading", label: "Reading — Culture Shock", icon: BookOpen },
  { id: "etiquette", label: "Etiquette Reading", icon: BookOpen },
  { id: "video", label: "Video Task", icon: Video },
  { id: "casestudy", label: "Case Study", icon: Users },
  { id: "research", label: "Research", icon: Search },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest5 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const goTo = useCallback((idx: number) => { setCurrentStep(idx); setMobileMenuOpen(false); }, []);
  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0"><div className="absolute inset-0 bg-gradient-to-br from-[hsl(340,50%,25%)] via-[hsl(280,40%,30%)] to-[hsl(220,50%,35%)]" /><div className="absolute inset-0 bg-background/60" /></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px" style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-lg font-body mb-0.5 transition-colors"><ArrowLeft className="w-3 h-3" /> Orqaga</Link>
              <span className="text-[11px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 4</span>
              <h1 className="font-display text-xl font-bold leading-tight">🌍 WebQuest 5 — Culture Shock & Etiquette</h1>
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
              <div className="flex items-center gap-2 px-3 pt-2 pb-1"><Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link><span className="text-[11px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 4</span><span className="font-display text-lg font-bold truncate">🌍 WQ 5 — Culture Shock</span></div>
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
    case "infographic": return <img src="/images/webquest5/infographic1.webp" alt="WebQuest 5 — Culture Shock Infographic" loading="lazy" decoding="async" className="rounded-xl w-full object-contain shadow-lg" />;
    case "intro": return <IntroStep />;
    case "idioms": return <IdiomsStep />;
    case "vocabulary": return <VocabularyStep />;
    case "reading": return <ReadingStep />;
    case "etiquette": return <EtiquetteStep />;
    case "video": return <VideoStep />;
    case "casestudy": return <CaseStudyStep />;
    case "research": return <ResearchStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

function IntroStep() {
  return (<>
    <div className="grid sm:grid-cols-2 gap-2 mb-2">
      {["Understand how culture shock affects people.", "Learn strategies for successful cultural adaptation.", "Develop intercultural communication and teamwork skills.", "Learn cross-cultural etiquette rules and body language."].map((o, i) => (
        <Card key={i} className="glass-card hover:shadow-lg transition-shadow"><CardContent className="p-2 flex items-start gap-2"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-lg">{i + 1}</span><p className="font-body text-lg leading-snug">{o}</p></CardContent></Card>))}
    </div>
    <img src="/images/webquest5/intro_culture.webp" alt="Culture Shock and Etiquette Around the World" loading="lazy" decoding="async" className="w-full max-h-[350px] object-cover rounded-xl shadow-md mx-auto mb-2" />
    <div className="p-3 rounded-xl bg-muted/50 border-l-4 border-primary/40 mb-2"><p className="font-body text-xl italic text-foreground">"When in Rome, do as the Romans do"</p></div>
    <p className="font-body text-foreground text-lg leading-snug">Have you ever felt out of place in a new country or even in a new group? That feeling of confusion or discomfort is called culture shock. In this WebQuest, you will step into the shoes of exchange students, explore their real-life experiences, and learn how to adapt successfully in multicultural environments.</p>
  </>);
}

function IdiomsStep() {
  return (<>
    <p className="font-body text-foreground text-xl mb-3">Match the idioms and phrases with their correct meanings.</p>
    <SelectMatchingTask pairs={[{ left: "Lost at sea / adrift", right: "" }, { left: "Keep an open mind", right: "" }, { left: "To get the hang of something", right: "" }, { left: "A fish out of water", right: "" }, { left: "To learn the ropes", right: "" }, { left: "Overwhelmed", right: "" }, { left: "Shaken up / taken aback", right: "" }, { left: "Like a deer in headlights", right: "" }, { left: "All at sea", right: "" }]}
      options={["Feeling confused and without direction in a new environment", "Be willing to consider new ideas", "To finally understand or learn how to do something", "Feeling awkward or uncomfortable in an unfamiliar situation", "To learn basic rules or procedures in a new place", "Feeling buried under too much stress or new information", "Feeling very surprised, shocked, or unsettled", "Feeling frozen and unable to react because of shock", "Feeling extremely confused or bewildered"]}
      correctAnswers={{ 0: "Feeling confused and without direction in a new environment", 1: "Be willing to consider new ideas", 2: "To finally understand or learn how to do something", 3: "Feeling awkward or uncomfortable in an unfamiliar situation", 4: "To learn basic rules or procedures in a new place", 5: "Feeling buried under too much stress or new information", 6: "Feeling very surprised, shocked, or unsettled", 7: "Feeling frozen and unable to react because of shock", 8: "Feeling extremely confused or bewildered" }} />
  </>);
}

function VocabularyStep() {
  return (<>
    <h4 className="font-display text-xl font-semibold mb-2">Match the terms with definitions</h4>
    <VocabularyMatchTask words={[{ word: "Culture shock", definition: "Feeling of disorientation and anxiety in an unfamiliar culture" }, { word: "Homesickness", definition: "A feeling of longing for one's home" }, { word: "Adapt / Adjust", definition: "To change to suit new conditions" }, { word: "Cope", definition: "To deal effectively with something difficult" }, { word: "Cultural misunderstanding", definition: "A failure to understand customs or behavior of another culture" }, { word: "Stereotypes", definition: "Fixed, often inaccurate ideas about a group" }, { word: "Taboo", definition: "Prohibited behaviors or topics" }, { word: "Faux Pas", definition: "A social blunder or mistake" }]} />
  </>);
}

function ReadingStep() {
  return (<>
    <img src="/images/webquest5/culture_shock_reading.webp" alt="Culture Shock concept illustration" loading="lazy" decoding="async" className="w-full max-h-[350px] object-contain rounded-xl shadow-md mx-auto mb-3" />

    <ReadingSection title="Definition">
      <p className="mb-2">Culture shock is the feeling of confusion and uncertainty when an individual is in a new country or environment.</p>
      <p className="mb-2">Culture shock happens when people experience uncertainty, confusion, or anxiety as they adjust to a new culture when they move abroad or study in another country. It often follows stages: the honeymoon phase of excitement, frustration from differences, gradual adaptation, and acceptance. While it can be challenging, overcoming culture shock can help people grow and develop a deeper appreciation for new cultures.</p>
      <p className="font-semibold mt-3 mb-1">Key Takeaways</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Culture shock refers to feelings of confusion and anxiety when adapting to a new environment or culture.</li>
        <li>It typically consists of four stages: honeymoon, frustration, adaptation, and acceptance.</li>
        <li>Common symptoms include homesickness, irritability, and difficulty concentrating.</li>
        <li>Overcoming culture shock involves openness, socializing, and learning about the new culture.</li>
        <li>Successfully adjusting can lead to personal growth and an appreciation of the new environment.</li>
      </ul>
    </ReadingSection>

    <ReadingSection title="Insight into the Culture Shock Experience (B)">
      <p className="mb-2">Culture shock occurs when an individual leaves the comfort of their home and familiar surroundings and moves to an unfamiliar environment. The adjustment period can be fairly intense, particularly if the two locations are completely different, such as going from a small rural area to a large metropolis or moving to another country. People can also experience culture shock when moving from one place to another within the same country.</p>
      <p className="mb-2">Typically, no single event causes culture shock, nor does it occur suddenly or without reason. Instead, it gradually builds from a series of incidents, and culture shock can be difficult to identify while struggling with it.</p>
      <p>The feeling is particularly intense at the beginning and can be tough to overcome. It's important to remember that the cultural adjustment usually dissipates over time as a person becomes more familiar with a place, the people, customs, food, and language. As a result, navigation of surroundings gets easier, friends are made, and everything becomes more comfortable. Over time, adjusting to culture shock can lead to personal growth and appreciation for the new environment.</p>
    </ReadingSection>

    <ReadingSection title="Recognizing the Symptoms (C)">
      <p className="mb-2">Culture shock can produce a range of symptoms, which can vary greatly from person to person in terms of scope and intensity. These may include:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Being homesick</li>
        <li>Feeling helpless</li>
        <li>Feeling isolated</li>
        <li>Disorientation</li>
        <li>Lack of concentration</li>
        <li>Irritability</li>
        <li>Sadness</li>
        <li>Sleep or eating disturbances</li>
        <li>Paranoia</li>
      </ul>
    </ReadingSection>

    <ReadingSection title="Navigating the Four Stages (D)">
      <p className="mb-2">People who experience culture shock may go through four phases that are explained below.</p>
      <p className="font-semibold mt-3 mb-1">Embracing the Honeymoon Stage</p>
      <p className="mb-2">The first stage is commonly referred to as the honeymoon phase. That's because people are thrilled to be in their new environment. They often see it as an adventure. If someone is on a short stay, this initial excitement may define the entire experience. However, the honeymoon phase for those on a longer-term move eventually ends, even though people expect it to last.</p>
      <p className="font-semibold mt-3 mb-1">Managing the Frustration Stage</p>
      <p className="mb-2">As initial excitement fades, people may feel more irritated and disoriented. Fatigue can develop from misunderstandings about others' actions, conversations, and customs. Language barriers can leave people feeling overwhelmed by a new culture. Local habits can also become increasingly challenging, and previously easy tasks can take longer to accomplish, leading to exhaustion.</p>
      <p className="mb-2">The inability to effectively communicate—interpreting what others mean and making oneself understood—is usually the prime source of frustration. This stage can be the most difficult period of cultural adjustment, as some people may feel the urge to withdraw. For example, international students adjusting to life in the United States during study abroad programs can feel angry and anxious, leading to withdrawal from new friends.</p>
      <p className="font-semibold mt-3 mb-1">Transitioning Through the Adaptation Stage</p>
      <p className="mb-2">The adaptation stage gradually occurs as people feel more at home. The feelings from the frustration stage begin to subside as people adjust to their new environment. Although they may still not understand certain cultural cues, people will become more familiar—at least to the point that interpreting them becomes much easier.</p>
      <p className="font-semibold mt-3 mb-1">Achieving Acceptance in Your New Culture</p>
      <p className="mb-2">In the acceptance stage, people can better enjoy their new home. Typically, beliefs and attitudes toward their new surroundings improve, leading to increased self-confidence and a return of their sense of humor.</p>
      <p className="mb-2">By resolving misunderstandings, people become more relaxed and happy in their new setting. At this stage, most people experience growth and may change their old behaviors and adopt manners from their new culture.</p>
      <p>A specific event doesn't cause culture shock. Instead, it can result from encountering different ways of doing things, being cut off from behavioral cues, having your own values brought into question, and feeling you don't know the rules.</p>
    </ReadingSection>

    <ReadingSection title="Strategies to Overcome Culture Shock (E)">
      <p className="mb-2">Time and habit help manage culture shock, but individuals can also reduce its impact:</p>
      <ul className="list-disc pl-5 space-y-1 mb-3">
        <li>Be open-minded and learn about the new country or culture to understand the reasons for cultural differences.</li>
        <li>Avoid constantly comparing your new surroundings to home.</li>
        <li>Write a journal of your experience, including the positive aspects of the new culture.</li>
        <li>Don't seal yourself off—be active and socialize with the locals.</li>
        <li>Be open about feeling disoriented or confused. Ask for advice and help.</li>
        <li>Talk about and share your cultural background—communication runs both ways.</li>
      </ul>
      <p className="font-semibold mt-3 mb-1">What Is the Definition of Culture Shock?</p>
      <p className="mb-2">Culture shock or adjustment occurs when someone is cut off from familiar surroundings and culture after moving or traveling to a new environment. Culture shock can lead to a flurry of emotions, including excitement, anxiety, confusion, and uncertainty.</p>
      <p className="font-semibold mt-3 mb-1">Is Culture Shock Good or Bad?</p>
      <p className="mb-2">Although it may have a seemingly negative connotation, culture shock is a normal experience that many people go through when moving or traveling. While it can be challenging, those who can resolve their feelings and adjust to their new environment often overcome culture shock. As a result, cultural adjustment can lead to personal growth and a favorable experience.</p>
      <p className="font-semibold mt-3 mb-1">What Is an Example of Culture Shock?</p>
      <p className="mb-2">For example, international students who have come to the United States for a study abroad semester can experience culture shock. Language barriers and unfamiliar customs can make it challenging to adjust, leading some students to feel angry and anxious. Over time, students become more familiar with their new surroundings as they make new friends and learn social cues. The result can lead to growth and a new appreciation of the culture.</p>
      <p className="font-semibold mt-3 mb-1">What Are the Types of Culture Shock?</p>
      <p className="mb-2">Culture shock is typically divided into four stages: honeymoon, frustration, adaptation, and acceptance. These periods are characterized by feelings of excitement, anger, homesickness, adjustment, and acceptance. Note that some people might not go through all four phases and might not reach the acceptance phase.</p>
      <p className="font-semibold mt-3 mb-1">The Bottom Line</p>
      <p>Culture shock is the feeling of uncertainty or anxiety when you're adjusting to a new environment. It usually happens in four stages: honeymoon, frustration, adaptation, and acceptance. You may feel homesick or irritable, but over time, you can grow, become more confident, and appreciate your new cultures. Staying open-minded, connecting with local communities, and learning about cultural differences help ease the transition, making the experience more positive and rewarding.</p>
    </ReadingSection>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Match headings to paragraphs</h4>
      <SelectMatchingTask pairs={[{ left: "Paragraph A", right: "" }, { left: "Paragraph B", right: "" }, { left: "Paragraph C", right: "" }, { left: "Paragraph D", right: "" }, { left: "Paragraph E", right: "" }]}
        options={["What Is Culture Shock?", "Insight into the Culture Shock Experience", "Recognizing the Symptoms of Culture Shock", "Navigating the Four Stages of Culture Shock", "Strategies to Overcome Culture Shock"]}
        correctAnswers={{ 0: "What Is Culture Shock?", 1: "Insight into the Culture Shock Experience", 2: "Recognizing the Symptoms of Culture Shock", 3: "Navigating the Four Stages of Culture Shock", 4: "Strategies to Overcome Culture Shock" }} />
    </div>
    <div className="mt-4"><OpenQuestionTask title="Answer the following questions" questions={["What is the main definition of culture shock?", "What are the four stages of culture shock?", "What are some common symptoms?", "How can individuals overcome culture shock?", "Why can experiencing culture shock eventually lead to personal growth?"]} /></div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Match terms with descriptions</h4>
      <SelectMatchingTask pairs={[{ left: "Culture Shock", right: "" }, { left: "Honeymoon Stage", right: "" }, { left: "Frustration Stage", right: "" }, { left: "Adaptation Stage", right: "" }, { left: "Acceptance Stage", right: "" }]}
        options={["A feeling of confusion and anxiety when entering a new cultural environment", "The initial phase filled with excitement and curiosity", "The period when misunderstandings and homesickness cause stress", "The stage where individuals begin to adjust and understand the new culture", "People start to feel comfortable, confident, and accept cultural differences"]}
        correctAnswers={{ 0: "A feeling of confusion and anxiety when entering a new cultural environment", 1: "The initial phase filled with excitement and curiosity", 2: "The period when misunderstandings and homesickness cause stress", 3: "The stage where individuals begin to adjust and understand the new culture", 4: "People start to feel comfortable, confident, and accept cultural differences" }} />
    </div>
  </>);
}

function EtiquetteStep() {
  return (<>
    <img src="/images/webquest5/etiquette_reading.webp" alt="Cross-Cultural Etiquette" loading="lazy" decoding="async" className="w-full max-h-[350px] object-cover rounded-xl shadow-md mx-auto mb-3" />

    <ReadingSection title="Why Cross-Cultural Etiquette Matters">
      These days, when we think about cross-cultural etiquette rules, and which rules work where, our first thought is probably not about our next trip to Paris, or Rome, but rather our next Zoom meeting with global partners.{"\n\n"}
      In these turbulent times of forced electronic connections, we need to be particularly mindful of cultural nuances and customs as we navigate relationships with our colleagues around the world. Why? Well, we all want to be successful and build relationships that create value for everyone.{"\n\n"}
      To be respectful — and get your point across — there are some universal social codes you can learn. These cross all boundaries, and apply no matter what culture, climate or circumstance you find yourself in. These etiquette rules often focus on politeness, kindness and your innate ability to conduct yourself with dignity, integrity, and empathy.{"\n\n"}
      Etiquette is a great way to set yourself apart from your peers. It gives you a subtle but noticeable career advantage. So, what does it take to communicate across cultures effectively and politely? How can you prepare yourself for your next global Zoom meeting and — once the pandemic is over — your next work or personal trip abroad?
    </ReadingSection>

    <ReadingSection title="Do Your Research">
      First, do some research. Research the culture, and learn the most relevant customs, beliefs and nuances so you can have a better understanding of life and work in another place. Making an effort to learn some etiquette rules that are specific to the region you find yourself in most frequently by taking a class or reading some books is the essence of cultural awareness and the first step toward competence.{"\n\n"}
      Pay special attention to the culture's attitude toward time, space, religion, food/dining, dress, hand gestures and body language. Learn what is considered taboo, and which subjects to avoid. If you are physically traveling — and we all will again, someday! — Remember to follow the host country's customs and rules. Be particularly respectful of your surroundings when you're not home because remember, it's the host country's rules that count. Once you're aware of some cultural nuances, it will be easy for you to put them into practice.{"\n\n"}
      For instance, in certain parts of the world it's important to be very punctual; in others — not so much. If you know the difference, you might not be upset if someone is late for a meeting. Once we are all able to travel freely and meet again in-person, you have to understand that in some parts of the world, things are quite different than what you're used to. What's considered personal space varies, as do food preferences, religious beliefs and common gender roles.{"\n\n"}
      When I travel to the Middle East, I know I need to pack a large scarf to cover my hair in certain situations out of respect for the host's country's customs and expectations. You don't have to share beliefs to be knowledgeable and respectful of them, within reason.
    </ReadingSection>

    <ReadingSection title="Cultural Examples & Hand Gestures">
      For example, looking right into someone's eyes is considered rude in Japan. This is directly opposite our more direct American customs. In many parts of Asia it's also important to save face, meaning you never point out an elder or superior is wrong — even when they are — in a group setting. Further, silence can be awkward for some Americans, but for the Japanese it's an expression of respect to the person speaking. Remember that during your next global virtual meeting with Japanese peers.{"\n\n"}
      There are also many hand gestures that Americans commonly use, that we should curtail when traveling or while on virtual meetings. A simple thumbs up might be okay in France, but it's offensive in parts of Africa, Australia and Greece. Making the "okay" sign has very different meanings in other parts of the world, from sexual to representing the evil eye. Waving your hands while talking might help you get your point across, but to others in certain places you may seem insincere and even a bit crazy. So, cool the arm waving on your next trip or global Zoom meeting.
    </ReadingSection>

    <ReadingSection title="Conclusion">
      The beauty of this world is in its diversity, and it can be a lot of fun to learn how to successfully communicate using our common denominators around kindness, curiosity and respect.{"\n\n"}
      So, be curious, do your research — and you will have a leg-up on achieving your global communication goals.{"\n\n"}
      <em className="text-muted-foreground text-sm">Written by Heidi Dulebohn · Apr 14, 2020</em>
    </ReadingSection>
    <div className="mt-4"><OpenQuestionTask title="Reading Comprehension" questions={["Why is cross-cultural etiquette especially important today?", "What advantages can good etiquette give in professional life?", "How does the attitude toward eye contact differ in the USA and Japan?"]} /></div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">True or False</h4>
      <TrueFalseTask statements={[{ text: "Cross-cultural etiquette is more important for tourists than for online meetings.", answer: false }, { text: "Universal etiquette rules are based on politeness and empathy.", answer: true }, { text: "Being late for meetings is unacceptable in all cultures.", answer: false }, { text: "In Japan, silence during communication can be a sign of respect.", answer: true }, { text: "The 'thumbs up' gesture is considered polite everywhere in the world.", answer: false }]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Match words with meanings</h4>
      <SelectMatchingTask pairs={[{ left: "Etiquette", right: "" }, { left: "Nuance", right: "" }, { left: "Taboo", right: "" }, { left: "Empathy", right: "" }, { left: "Competence", right: "" }]}
        options={["Rules of polite behavior", "A small but important difference", "Something socially unacceptable", "Ability to understand others' feelings", "Strong understanding of what is acceptable in a culture"]}
        correctAnswers={{ 0: "Rules of polite behavior", 1: "A small but important difference", 2: "Something socially unacceptable", 3: "Ability to understand others' feelings", 4: "Strong understanding of what is acceptable in a culture" }} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Fill in the blanks</h4>
      <FillBlanksTask wordBank={["respectful", "customs", "punctual", "gestures", "empathy"]}
        sentences={[{ text: "Being ___ helps you build positive international relationships.", blank: "respectful" }, { text: "Cultural ___ differ from country to country.", blank: "customs" }, { text: "In some cultures, being ___ is extremely important.", blank: "punctual" }, { text: "Hand ___ can have different meanings around the world.", blank: "gestures" }, { text: "Showing ___ allows you to communicate politely across cultures.", blank: "empathy" }]} />
    </div>
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Match Culture with Etiquette Rule</h4>
      <SelectMatchingTask pairs={[{ left: "Japan", right: "" }, { left: "USA", right: "" }, { left: "Middle East", right: "" }, { left: "Some Asian cultures", right: "" }, { left: "Parts of Africa & Greece", right: "" }]}
        options={["Direct eye contact is often avoided", "Direct eye contact shows confidence", "Hair covering may be required in certain situations", "Saving face is very important", "Thumbs-up gesture may be offensive"]}
        correctAnswers={{ 0: "Direct eye contact is often avoided", 1: "Direct eye contact shows confidence", 2: "Hair covering may be required in certain situations", 3: "Saving face is very important", 4: "Thumbs-up gesture may be offensive" }} />
    </div>
  </>);
}

function VideoStep() {
  return (<>
    <VideoTask title="Cultural Taboos Around the World" instruction="Watch the video about cultural taboos and etiquette, then complete the tasks below." videoUrl="https://www.youtube.com/watch?v=-7lUYoIiNXU" thumbnail="/images/webquest5/video_thumb.jpg" />
    <div className="mt-4">
      <h4 className="font-display text-xl font-semibold mb-2">Choose the correct answer</h4>
      <MultipleChoiceTask questions={[{ question: "The main purpose of the video is to:", options: ["Entertain tourists", "Explain cultural taboos and etiquette", "Compare national cuisines"], correctIndex: 1 }, { question: "The video mainly focuses on:", options: ["Food etiquette only", "Hand gestures only", "Social behavior, gestures, food, and photography rules"], correctIndex: 2 }]} />
    </div>
    <div className="mt-4"><OpenQuestionTask title="Complete the table while watching" questions={["Name a country from the video and describe one etiquette rule.", "Name another country and its specific cultural taboo.", "What surprised you the most from the video?"]} /></div>
  </>);
}

function CaseStudyStep() {
  return (<>
    <div className="p-3 rounded-xl bg-muted/50 border-l-4 border-accent/40 mb-4"><p className="font-body text-xl text-foreground leading-relaxed"><strong>Situation:</strong> An Uzbek student feels offended because British friends never invite her to their home. The British friends believe they are being polite by respecting privacy.</p></div>
    <OpenQuestionTask title="Answer the questions" questions={["What cultural values are in conflict?", "Is this behaviour unfriendly or culturally normal?", "How does the proverb 'When in Rome, do as the Romans do' apply here?"]} />
    <div className="mt-4"><OpenQuestionTask title="Critical Thinking" questions={["Why can gestures cause misunderstandings in global communication?", "How can cultural awareness reduce conflict in international meetings?", "Why is it not necessary to share beliefs in order to respect them?"]} /></div>
  </>);
}

function ResearchStep() {
  return (<><OpenQuestionTask title="Beginner's Guide Abroad" questions={["Write a short explanation of what culture shock is.", "List the four stages (honeymoon, frustration, adjustment, acceptance).", "Give 5–7 practical tips for newcomers.", "Describe a role-play scenario showing a newcomer facing culture shock and overcoming it."]} /></>);
}

function ReflectionStep() {
  return (<>
    <SelfEvalChecklist items={["I understand what culture shock is and can explain its main stages.", "I can recognize symptoms of culture shock in myself or others.", "I am open-minded toward cultural differences and new customs.", "I can explain why cross-cultural etiquette is important today.", "I can identify cultural differences in behavior.", "I can compare my own culture with other cultures respectfully."]} />
    <Card className="mt-4 border-primary/30 bg-primary/5"><CardContent className="p-4 text-center"><h3 className="font-display text-xl font-bold text-primary mb-1">🎉 Congratulations!</h3><p className="font-body text-lg text-foreground">Culture shock is not a setback but a step toward personal growth and global understanding. Awareness of cross-cultural etiquette encourages respect, empathy, and open-mindedness.</p></CardContent></Card>
  </>);
}

function ReadingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (<div className="mb-3 p-3 rounded-xl bg-muted/50 border-l-4 border-primary/40"><h5 className="font-display font-semibold text-xl mb-1">{title}</h5><p className="font-body text-xl text-foreground leading-relaxed">{children}</p></div>);
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (<div className="space-y-1">{items.map((item, i) => (<label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"><input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" /><span className="font-body text-xl">{item}</span>{checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}</label>))}</div>);
}

export default WebQuest5;
