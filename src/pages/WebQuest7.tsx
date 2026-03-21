import { useState, useCallback } from "react";
import { useResponseTracker } from "@/hooks/useResponseTracker";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X, BookOpen, Lightbulb, BookText, Search, Award, MessageSquare, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import OpenQuestionTask from "@/components/quest/OpenQuestionTask";
import SelectMatchingTask from "@/components/quest/SelectMatchingTask";
import VideoTask from "@/components/quest/VideoTask";
import SiteHeader from "@/components/SiteHeader";

const steps = [
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "process", label: "Process & Tasks", icon: Lightbulb },
  { id: "reading", label: "Reading", icon: BookText },
  { id: "research", label: "Research", icon: Search },
  { id: "create", label: "Create Product", icon: Award },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const ReadingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-3">
    <h4 className="font-display text-lg font-bold text-primary mb-1">{title}</h4>
    <div className="font-body text-lg leading-relaxed text-foreground whitespace-pre-line">{children}</div>
  </div>
);

const WebQuest7 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useResponseTracker(7, steps, currentStep);
  const goTo = useCallback((idx: number) => { setCurrentStep(idx); setMobileMenuOpen(false); }, []);
  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(200,60%,20%)] via-[hsl(220,50%,30%)] to-[hsl(180,40%,25%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px" style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-lg font-body mb-0.5 transition-colors"><ArrowLeft className="w-3 h-3" /> Orqaga</Link>
              <span className="text-[11px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 6</span>
              <h1 className="font-display text-xl font-bold leading-tight">🏆 WebQuest 7 — Cultural Heroes</h1>
            </div>
            {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
              <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-sm font-body ${active ? "bg-primary text-primary-foreground font-semibold shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                <Icon className="w-4 h-4 shrink-0" /><span className="truncate">{s.label}</span>{active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
              </button>
            ); })}
          </aside>
          <AnimatePresence>
            {mobileMenuOpen && (<>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
              <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 md:hidden overflow-y-auto py-4 px-3">
                <div className="flex items-center justify-between mb-4 px-2"><span className="font-display font-bold text-xl">Steps</span><button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button></div>
                {steps.map((s, i) => { const Icon = s.icon; const active = i === currentStep; return (
                  <button key={s.id} onClick={() => goTo(i)} className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-xl font-body mb-1 ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-muted-foreground"}`}><Icon className="w-4 h-4 shrink-0" /><span>{s.label}</span></button>
                ); })}
              </motion.aside>
            </>)}
          </AnimatePresence>
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
                <span className="text-[11px] font-body font-medium uppercase tracking-widest text-quest-gold">Module 6</span>
                <span className="font-display text-lg font-bold truncate">🏆 WQ 7 — Cultural Heroes</span>
              </div>
              <div className="flex items-center gap-2 px-3 pb-2">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button>
                <span className="font-body text-xl text-primary">{currentStep + 1}/{steps.length}</span>
                <span className="font-display font-semibold text-xl truncate">{steps[currentStep].label}</span>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="p-1 sm:p-1.5 md:px-4 md:py-1">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 shadow-sm border-2 border-transparent hover:shadow-lg transition-all duration-300"
                  style={{ borderImage: 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1', borderRadius: '0.75rem' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1'; }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">{(() => { const Icon = steps[currentStep].icon; return <Icon className="w-3.5 h-3.5" />; })()}</span>
                    <div>
                      <span className="text-[11px] font-body text-primary uppercase tracking-wider">Step {currentStep + 1} / {steps.length}</span>
                      <h3 className="font-display text-xl font-bold leading-none">{steps[currentStep].label}</h3>
                    </div>
                  </div>
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
    case "intro": return <IntroStep />;
    case "process": return <ProcessStep />;
    case "reading": return <ReadingStep />;
    case "research": return <ResearchStep />;
    case "create": return <CreateStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

/* ─── Step 1: Introduction ─── */
function IntroStep() {
  return (<>
    <img
      src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900"
      alt="Cultural Heroes — books and knowledge"
      loading="eager" decoding="async"
      className="w-full max-h-[350px] object-cover rounded-xl shadow-md mx-auto mb-3"
    />

    <ReadingSection title="Objective">
      Students will research the lives, achievements, and contributions of outstanding cultural figures to understand their impact on society, develop critical thinking and digital research skills, and present their findings creatively to demonstrate intercultural awareness and appreciation of cultural diversity.
    </ReadingSection>

    <h4 className="font-display text-lg font-bold mb-2">Learning Outcomes</h4>
    <p className="font-body text-lg text-foreground mb-2">By the end of this WebQuest, students will be able to:</p>
    <div className="grid sm:grid-cols-2 gap-2 mb-3">
      {[
        "Remember key facts about the life and achievements of a selected cultural hero.",
        "Understand the cultural significance and values represented by the cultural hero.",
        "Apply appropriate language (topic-related vocabulary, past tenses, passive voice, reported speech) in interviews and presentations.",
        "Analyze the impact of the cultural hero on national and global culture through comparison and discussion.",
        "Create a role-play interview and a multimedia product (poster or podcast) to present research findings effectively.",
      ].map((o, i) => (
        <Card key={i} className="glass-card hover:shadow-lg transition-shadow"><CardContent className="p-2 flex items-start gap-2">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-lg">{i + 1}</span>
          <p className="font-body text-lg leading-snug">{o}</p>
        </CardContent></Card>
      ))}
    </div>

    <ReadingSection title="Introduction">
      Every culture has its heroes — writers, artists, scientists, musicians, activists — whose ideas and achievements shape national identity and influence the world. In this WebQuest, you will explore the life and legacy of a cultural hero and discover how individual contributions can promote cultural understanding and global dialogue.
    </ReadingSection>

    <ReadingSection title="Your Task">
      Your task is to work in a small group and research a cultural hero from a selected country or culture. A cultural hero may be a writer, artist, scientist, historical leader, or public figure who has made a significant contribution to national culture or global heritage. You will investigate the hero's life, achievements, and cultural impact, and explain why this person is considered a cultural symbol. Based on your research, your group will create a final product (presentation, poster, interview role-play, podcast, or digital story) and present it to the class.
    </ReadingSection>
  </>);
}

/* ─── Step 2: Process & Tasks ─── */
function ProcessStep() {
  return (<>
    <h4 className="font-display text-xl font-semibold mb-2">Match picture with the name</h4>
    <p className="font-body text-lg text-foreground mb-3">Match each cultural hero's picture with their name.</p>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
      {[
        { name: "William Shakespeare", img: "/images/webquest7/shakespeare.webp", num: 1 },
        { name: "Mahatma Gandhi", img: "/images/webquest7/gandhi.webp", num: 2 },
        { name: "Leonardo da Vinci", img: "/images/webquest7/davinci.webp", num: 3 },
        { name: "Confucius", img: "/images/webquest7/confucius.webp", num: 4 },
        { name: "Nelson Mandela", img: "/images/webquest7/mandela.webp", num: 5 },
        { name: "Alisher Navoi", img: "/images/webquest7/navoi.webp", num: 6 },
      ].map((hero) => (
        <Card key={hero.num} className="overflow-hidden">
          <img src={hero.img} alt={hero.name} loading="eager" decoding="async" className="w-full h-48 sm:h-56 object-contain bg-muted/30" />
          <CardContent className="p-2 text-center">
            <span className="font-display font-bold text-primary text-lg mr-1">{hero.num}.</span>
            <span className="font-body text-lg">{hero.name}</span>
          </CardContent>
        </Card>
      ))}
    </div>

    <h4 className="font-display text-xl font-semibold mb-2">Task I: Match each cultural hero (A–F) with the correct description (1–6)</h4>
    <SelectMatchingTask
      pairs={[
        { left: "A. Mahatma Gandhi", right: "" },
        { left: "B. William Shakespeare", right: "" },
        { left: "C. Alisher Navoi", right: "" },
        { left: "D. Nelson Mandela", right: "" },
        { left: "E. Leonardo da Vinci", right: "" },
        { left: "F. Confucius", right: "" },
      ]}
      options={[
        "1. A philosopher whose ideas about respect, harmony, and education strongly influenced East Asian culture.",
        "2. A poet and thinker who made an important contribution to Turkic literature and culture.",
        "3. A political leader who fought against racial discrimination and promoted reconciliation in his country.",
        "4. A writer whose plays and poems greatly influenced the English language and world literature.",
        "5. An artist and scientist famous for combining creativity with scientific thinking during the Renaissance.",
        "6. A leader who promoted non-violent resistance and inspired movements for independence.",
      ]}
      correctAnswers={{
        0: "6. A leader who promoted non-violent resistance and inspired movements for independence.",
        1: "4. A writer whose plays and poems greatly influenced the English language and world literature.",
        2: "2. A poet and thinker who made an important contribution to Turkic literature and culture.",
        3: "3. A political leader who fought against racial discrimination and promoted reconciliation in his country.",
        4: "5. An artist and scientist famous for combining creativity with scientific thinking during the Renaissance.",
        5: "1. A philosopher whose ideas about respect, harmony, and education strongly influenced East Asian culture.",
      }}
    />

    <div className="mt-6">
      <VideoTask
        title="Video Task II"
        instruction="Follow the link and watch the video. Then answer the questions below."
        videoUrl="https://www.youtube.com/watch?v=i0-8S_mWzY8&t=176s"
        thumbnail=""
      />
    </div>

    <div className="mt-4">
      <OpenQuestionTask
        title="Video Questions"
        questions={[
          "Who was Boudicca, and what was her role in British history?",
          "What significant battles did Boudicca win against the Romans, and what ultimately led to her defeat?",
          "How has William Shakespeare influenced literature, and why is he considered one of the greatest playwrights of all time?",
          "What contributions did Abraham Lincoln make during his presidency, particularly concerning slavery?",
          "What commonalities exist between national heroes and heroines across different countries, and how do they reflect cultural values?",
        ]}
      />
    </div>
  </>);
}

/* ─── Step 3: Reading ─── */
function ReadingStep() {
  return (<>
    <OpenQuestionTask
      title="Lead-in Questions"
      questions={[
        "What cultural heroes do you know?",
        "Do societies need cultural heroes?",
      ]}
    />

    <div className="mt-4">
      <img
        src="https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=900"
        alt="Nelson Mandela legacy"
        loading="eager" decoding="async"
        className="w-full max-h-[350px] object-contain rounded-xl shadow-md mx-auto mb-3"
      />
    </div>

    <h3 className="font-display text-xl font-bold mb-2">Seven Ways Nelson Mandela Changed South Africa and The World</h3>

    <ReadingSection title="Introduction">
      Nelson Mandela is renowned as a revolutionary leader with numerous outstanding achievements, who spent his life fighting for equality and a free and fair society. He was determined to fight all forms of discrimination, injustice and inequality. Madiba stands out as a visionary leader who exercised his power with humility and respect for his colleagues and opponents alike.
      {"\n\n"}Madiba achieved many things before, during, and after his presidency. He brought a nation together in the following ways:
    </ReadingSection>

    <ReadingSection title="A — Young Leader, Big Dreams">
      Getting the youth vote is a common practice nowadays, but as far back as 1944, Mandela helped establish the ANC Youth League. By 1950, at just 32, he became its national president, transforming the ANC into a more radical force. He was also a leading opponent of the 1948 apartheid legislation, organising resistance campaigns like the 1952 Defiance Campaign. That same year, he and Oliver Tambo co-founded South Africa's first black legal partnership, providing affordable legal services to black clients routinely denied justice under apartheid.
    </ReadingSection>

    <ReadingSection title="B — Standing Up For What's Right">
      Nelson Mandela's integrity shone through his willingness to admit his actions while standing firm in his convictions. His most powerful moment came during the 1964 Rivonia Trial, when facing the death penalty, he delivered his famous speech concluding with "I am prepared to die for an ideal." As he wrote in his autobiography: "The apartheid regime had put law and order in disrepute… out of my own convictions, I exploited every opportunity to promote respect for law and order and for the judiciary." This moral compass guided him as he played the leading role in ending apartheid through negotiation rather than violence.
    </ReadingSection>

    <ReadingSection title="C — Extraordinary Resilience, 27 Years Behind Bars">
      Being handed a life sentence did not weaken Mandela's resolve. His 27 years in prison demonstrated extraordinary sacrifice and unwavering commitment to justice, transforming him into a global symbol of resistance to oppression. His refusal to accept conditional release in exchange for renouncing his beliefs showed remarkable moral courage. Despite these hardships, Mandela's strength, conviction and great dignity made him a noteworthy leader around the world – qualities that were evident when he became South Africa's first black President in 1994.
    </ReadingSection>

    <ReadingSection title="D — Choosing Forgiveness Always">
      Peace and forgiveness were Mandela's biggest influences on the new South Africa. He was adamant that the way forward should not be clouded by anger over the past. In 1995, he established the Truth and Reconciliation Commission, which investigated human rights violations and gave an outlet to grievances. His focus on national reconciliation rather than revenge became a model for post-conflict societies worldwide.
    </ReadingSection>

    <ReadingSection title="E — The Rugby Moment That United a Country">
      Mandela's iconic moment at the 1995 Rugby World Cup final – presenting the trophy to captain Francois Pienaar while wearing the Springbok jersey – was a masterstroke of reconciliation. This gesture transformed rugby from a symbol of white Afrikaner culture into a unifying force for the entire nation. South Africa has since won the Rugby World Cup a record four times (1995, 2007, 2019, 2023), with rugby becoming a powerful symbol of national unity that transcends racial divides.
    </ReadingSection>

    <ReadingSection title="F — Continued Support For Others">
      Through his foundations, Mandela advocated for educational opportunities, social justice worldwide, and HIV/AIDS crisis management through his 46664 campaign. He served as Secretary-General of the Non-Aligned Movement from 1998 to 1999, positioning himself as a leading voice for developing nations and demonstrating South Africa's return to international respectability.
    </ReadingSection>

    <ReadingSection title="G — A Hero Remembered By The World">
      Mandela received more than 260 honors during his life, including the 1993 Nobel Peace Prize. This unprecedented recognition reflected his global impact on human rights and peaceful conflict resolution, specifically honoring his work in ending apartheid through negotiation rather than violence. His legacy continues to inspire leaders and movements worldwide.
    </ReadingSection>

    <p className="font-body text-sm text-muted-foreground mt-2 mb-4">
      Source: <a href="https://totalrisksa.co.za/seven-ways-nelson-mandela-changed-south-africa-and-the-world/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">totalrisksa.co.za</a>
    </p>

    <h4 className="font-display text-xl font-semibold mb-2">Task II: Match headings to paragraphs A–G</h4>
    <SelectMatchingTask
      pairs={[
        { left: "Paragraph A", right: "" },
        { left: "Paragraph B", right: "" },
        { left: "Paragraph C", right: "" },
        { left: "Paragraph D", right: "" },
        { left: "Paragraph E", right: "" },
        { left: "Paragraph F", right: "" },
        { left: "Paragraph G", right: "" },
      ]}
      options={[
        "Young Leader, Big Dreams",
        "Standing Up For What's Right – No Matter What",
        "Extraordinary Resilience, 27 Years Behind Bars with a Spirit Unbroken",
        "Choosing Forgiveness Always",
        "The Rugby Moment That United a Country",
        "Continued Support For Others",
        "A Hero Remembered By The World",
      ]}
      correctAnswers={{
        0: "Young Leader, Big Dreams",
        1: "Standing Up For What's Right – No Matter What",
        2: "Extraordinary Resilience, 27 Years Behind Bars with a Spirit Unbroken",
        3: "Choosing Forgiveness Always",
        4: "The Rugby Moment That United a Country",
        5: "Continued Support For Others",
        6: "A Hero Remembered By The World",
      }}
    />

    <div className="mt-6 p-3 rounded-xl bg-accent/10 border border-accent/20">
      <h4 className="font-display text-lg font-bold mb-1">📖 Reading 2: Alisher Navoi</h4>
      <p className="font-body text-lg text-foreground">
        Read more about Alisher Navoi at: <a href="https://cabacter.com/more-5.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">cabacter.com/more-5.html</a>
      </p>
    </div>
  </>);
}

/* ─── Step 4: Research ─── */
function ResearchStep() {
  return (<>
    <ReadingSection title="Task III: Fill in the information about a cultural hero you chose">
      Choose one cultural hero from the list below and present it in the class.
    </ReadingSection>

    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
      {["William Shakespeare", "Leonardo da Vinci", "Frida Kahlo", "Alisher Navoi", "Marie Curie", "Rabindranath Tagore", "Steve Jobs", "Pablo Picasso", "Audrey Hepburn", "Nelson Mandela"].map((name) => (
        <Card key={name} className="border-accent/20"><CardContent className="p-2 text-center">
          <span className="font-body text-lg">{name}</span>
        </CardContent></Card>
      ))}
    </div>

    <OpenQuestionTask
      title="A. Basic Information"
      questions={[
        "Name of Cultural Hero:",
        "Country / Culture:",
        "Why is this person considered a cultural hero? (2–3 sentences)",
      ]}
    />

    <div className="mt-4">
      <OpenQuestionTask
        title="B. Biography — Research Notes"
        questions={[
          "Date & place of birth:",
          "Education / background:",
          "Field (art, science, literature, etc.):",
          "Important life events:",
        ]}
      />
    </div>

    <div className="mt-4">
      <OpenQuestionTask
        title="C. Major Contributions — List 3 key achievements"
        questions={[
          "Achievement 1:",
          "Achievement 2:",
          "Achievement 3:",
        ]}
      />
    </div>

    <div className="mt-4">
      <OpenQuestionTask
        title="D. Cultural Impact"
        questions={[
          "How did this person influence their national culture?",
          "Did their work influence the world? How?",
          "Why is their legacy still important today?",
        ]}
      />
    </div>
  </>);
}

/* ─── Step 5: Create Product ─── */
function CreateStep() {
  return (<>
    <ReadingSection title="Task IV: Creative Digital Project">
      Choose ONE final product:
    </ReadingSection>

    <div className="grid sm:grid-cols-2 gap-3 mb-4">
      <Card className="hover:shadow-lg transition-shadow"><CardContent className="p-3">
        <h5 className="font-display font-semibold text-xl mb-1">🖼️ Option A: Multimedia Poster (Canva / Genially)</h5>
        <p className="font-body text-lg text-foreground">Must include: photo/illustration, short biography, key achievements, quotes, cultural impact.</p>
      </CardContent></Card>
      <Card className="hover:shadow-lg transition-shadow"><CardContent className="p-3">
        <h5 className="font-display font-semibold text-xl mb-1">🎙️ Option B: Podcast (Anchor)</h5>
        <p className="font-body text-lg text-foreground">2–4 minutes: introduction, interview-style narration or dialogue, clear audio.</p>
      </CardContent></Card>
    </div>

    <OpenQuestionTask
      title="Project Plan"
      questions={[
        "Key facts to include:",
        "Visuals / audio ideas:",
        "Message to the audience:",
      ]}
    />

    <div className="mt-6">
      <h4 className="font-display text-xl font-semibold mb-2">Task V: Role-play Interview — "Journalist & Hero"</h4>
      <p className="font-body text-lg text-foreground mb-3">
        Prepare and perform an interview in the format: 🎤 "Journalist and Cultural Hero". One student acts as a journalist, one student acts as the cultural hero. The interview should focus on: biography, achievements, cultural impact, personal values, message to future generations.
      </p>

      <OpenQuestionTask
        title="A. Write 8 questions for your interview"
        questions={[
          "Question 1:",
          "Question 2:",
          "Question 3:",
          "Question 4:",
          "Question 5:",
          "Question 6:",
          "Question 7:",
          "Question 8:",
        ]}
      />

      <div className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20">
        <h5 className="font-display text-lg font-bold mb-1">Interview Structure:</h5>
        <ol className="font-body text-lg text-foreground list-decimal list-inside space-y-1">
          <li>Introduction by journalist</li>
          <li>Early life and motivation</li>
          <li>Main achievements</li>
          <li>Challenges and success</li>
          <li>Cultural influence</li>
          <li>Advice to young people</li>
        </ol>
        <p className="font-body text-lg text-foreground mt-2">
          <strong>Use:</strong> Past tenses, Reported Speech (optional), Formal interview language, passive voice, key vocabulary (achievement, legacy, influence, contribution, impact).
        </p>
      </div>
    </div>
  </>);
}

/* ─── Step 6: Reflection ─── */
function ReflectionStep() {
  return (<>
    <h4 className="font-display text-xl font-semibold mb-2">Intercultural Reflection</h4>
    <OpenQuestionTask
      title="Answer in 4–5 sentences"
      questions={[
        "What values does this cultural hero represent?",
        "How does learning about this person help you understand another culture?",
        "What did you learn about the cultural hero and their country?",
        "How can cultural heroes inspire intercultural dialogue?",
      ]}
    />

    <div className="mt-4">
      <SelfEvalChecklist items={[
        "I used vocabulary from Module 6",
        "I used correct grammar structures",
        "I understand my cultural hero's contribution",
        "I participated actively in the interview",
        "Our digital product is clear and creative",
      ]} />
    </div>

    <div className="mt-4 p-3 rounded-xl bg-accent/10 border border-accent/20">
      <h4 className="font-display text-lg font-bold mb-1">📚 Resources</h4>
      <div className="font-body text-lg text-foreground space-y-1">
        <p><strong>Digital tools:</strong> Anchor (podcast), Canva (posters/visuals), Genially (interactive presentations)</p>
        <p><strong>Research sources:</strong> National Geographic, Britannica, UNESCO, Museum/cultural institution websites, <a href="https://cabacter.com/more-5.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cabacter.com</a></p>
      </div>
    </div>

    <Card className="mt-4 border-primary/30 bg-primary/5">
      <CardContent className="p-4 text-center">
        <h3 className="font-display text-xl font-bold text-primary mb-1">🎉 Congratulations!</h3>
        <p className="font-body text-lg text-foreground">In this module, you learned about outstanding cultural figures and their contributions to society. Studying these heroes helped you appreciate creativity, perseverance, and ethical responsibility. The activities encouraged reflection, intercultural awareness, and inspiration to make positive contributions to your own communities.</p>
      </CardContent>
    </Card>
  </>);
}

/* ─── Self-Eval Checklist ─── */
function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (<div className="space-y-1">{items.map((item, i) => (
    <label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
      <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
      <span className="font-body text-xl">{item}</span>{checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
    </label>
  ))}</div>);
}

export default WebQuest7;
