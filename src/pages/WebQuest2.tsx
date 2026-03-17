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
import MatchingTask from "@/components/quest/MatchingTask";

const steps = [
  { id: "infographic", label: "Infographic", icon: BookOpen },
  { id: "intro", label: "Introduction", icon: BookOpen },
  { id: "match-holidays", label: "Match Holidays", icon: PenTool },
  { id: "discussion", label: "Discussion & Vocabulary", icon: Users },
  { id: "video", label: "Video Tasks", icon: Video },
  { id: "reading", label: "Reading — 6 Tips", icon: BookOpen },
  { id: "research", label: "Research", icon: Search },
  { id: "reflection", label: "Reflection", icon: MessageSquare },
];

const WebQuest2 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goTo = useCallback((idx: number) => {
    setCurrentStep(idx);
    setMobileMenuOpen(false);
  }, []);

  const prev = () => currentStep > 0 && goTo(currentStep - 1);
  const next = () => currentStep < steps.length - 1 && goTo(currentStep + 1);

  return (
    <div className="h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,60%,25%)] via-[hsl(200,50%,35%)] to-[hsl(45,80%,50%)]" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="shrink-0"><SiteHeader /></div>

        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden md:flex flex-col w-56 shrink-0 border-r-2 bg-card/70 backdrop-blur-md h-full overflow-y-auto py-1 px-1 gap-px"
            style={{ borderImage: 'linear-gradient(to bottom, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1' }}>
            <div className="px-1.5 pb-1 mb-0.5 border-b border-border/50">
              <Link to="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm font-body mb-0.5 transition-colors">
                <ArrowLeft className="w-3 h-3" /> Orqaga
              </Link>
              <span className="text-xs font-body font-medium uppercase tracking-widest text-quest-gold">Module 1</span>
              <h1 className="font-display text-base font-bold leading-tight">🌍 WebQuest 2 — Holidays Around the World</h1>
            </div>
            {steps.map((s, i) => {
              const Icon = s.icon;
              const active = i === currentStep;
              return (
                <button key={s.id} onClick={() => goTo(i)}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg text-left transition-all text-sm font-body ${active ? "bg-primary text-primary-foreground font-semibold shadow-md" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{s.label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                </button>
              );
            })}
          </aside>

          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
                <motion.aside initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 md:hidden overflow-y-auto py-4 px-3">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <span className="font-display font-bold text-base">Steps</span>
                    <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
                  </div>
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    const active = i === currentStep;
                    return (
                      <button key={s.id} onClick={() => goTo(i)}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-colors text-sm font-body mb-1 ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-muted-foreground"}`}>
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="md:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-md border-b border-border/50">
              <div className="flex items-center gap-2 px-3 pt-2 pb-1">
                <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /></Link>
                <span className="text-xs font-body font-medium uppercase tracking-widest text-quest-gold">Module 1</span>
                <span className="font-display text-sm font-bold truncate">🌍 WQ 2 — Holidays Around the World</span>
              </div>
              <div className="flex items-center gap-2 px-3 pb-2">
                <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg hover:bg-muted"><Menu className="w-5 h-5" /></button>
                <span className="font-body text-sm text-primary">{currentStep + 1}/{steps.length}</span>
                <span className="font-display font-semibold text-sm truncate">{steps[currentStep].label}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                className="p-1 sm:p-1.5 md:px-4 md:py-1">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 shadow-sm border-2 border-transparent hover:shadow-lg transition-all duration-300"
                  style={{ borderImage: 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1', borderRadius: '0.75rem' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)), hsl(var(--quest-gold)), hsl(var(--quest-emerald))) 1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderImage = 'linear-gradient(135deg, hsl(var(--quest-sky)/0.4), hsl(var(--quest-gold)/0.4), hsl(var(--quest-emerald)/0.4)) 1'; }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      {(() => { const Icon = steps[currentStep].icon; return <Icon className="w-3.5 h-3.5" />; })()}
                    </span>
                    <div>
                      <span className="text-xs font-body text-primary uppercase tracking-wider">Step {currentStep + 1} / {steps.length}</span>
                      <h3 className="font-display text-base font-bold leading-none">{steps[currentStep].label}</h3>
                    </div>
                  </div>
                  <StepContent stepId={steps[currentStep].id} />
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

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

function StepContent({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "infographic": return <InfographicStep />;
    case "intro": return <IntroStep />;
    case "match-holidays": return <MatchHolidaysStep />;
    case "discussion": return <DiscussionStep />;
    case "video": return <VideoStep />;
    case "reading": return <ReadingStep />;
    case "research": return <ResearchStep />;
    case "reflection": return <ReflectionStep />;
    default: return null;
  }
}

function InfographicStep() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-2xl border border-border shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
        <img src="/images/webquest2/infographic1.jpg" alt="WebQuest 2 Infographic — Holidays Around the World" loading="lazy" className="w-full h-auto object-contain" />
      </div>
    </div>
  );
}

function IntroStep() {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-2 mb-2">
        {["Explore and describe traditional holidays from different countries.",
          "Compare cultural traditions across nations.",
          "Create a group product (poster, presentation, role-play, or blog).",
          "Develop teamwork, research, and intercultural communication skills.",
        ].map((outcome, i) => (
          <Card key={i} className="glass-card hover:shadow-lg transition-shadow">
            <CardContent className="p-2 flex items-start gap-2">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-bold text-sm">{i + 1}</span>
              <p className="font-body text-sm leading-relaxed">{outcome}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <img src="/images/webquest2/hero1.jpg" alt="World holiday celebrations" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
        <img src="/images/webquest2/hero2.jpg" alt="International celebrations" loading="lazy" className="rounded-xl w-full h-auto object-cover shadow-md" />
      </div>
      <p className="font-body text-foreground text-lg leading-relaxed mb-2">
        Holidays and festivals play a significant role in shaping national identity and cultural values. They reflect a country's history, beliefs, traditions, and social practices.
      </p>
      <p className="font-body text-foreground text-lg leading-relaxed mb-4">
        This WebQuest invites students to explore traditional holidays from various countries around the world. By researching and comparing international celebrations, students will expand their cultural knowledge and develop critical thinking, teamwork, and communication skills in English.
      </p>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border border-border shadow-xl transition-transform duration-300 hover:scale-[1.01]">
          <img src="/images/webquest2/holidays_intro_infographic.png" alt="Holidays Around the World — Infographic" loading="lazy" className="w-full h-auto object-contain" />
        </div>
      </div>
    </>
  );
}

function MatchHolidaysStep() {
  return (
    <>
      <p className="font-body text-foreground text-base mb-2">
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
      <div className="mt-4">
        <OpenQuestionTask title="Answer the following questions" questions={[
          "Which holidays are national, and which are religious or cultural?",
          "Which of these holidays represent identity and unity for the nation? Give examples.",
          "Compare Heritage Day (South Africa) and Bastille Day (France): how do they reflect historical memory?",
          "Why is \"Thanksgiving\" marked as an extra holiday in this activity?",
        ]} />
      </div>
    </>
  );
}

function DiscussionStep() {
  return (
    <>
      <OpenQuestionTask title="Discuss in pairs or small groups" questions={[
        "What is the most important holiday in your country?",
        "How do you usually celebrate it?",
        "Why is it important for your culture?",
        "Are holidays in your country more influenced by religion, culture, or history?",
        "Do global celebrations help people understand other cultures? Explain your view.",
      ]} />
      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Give definitions to the words</h4>
        <VocabularyMatchTask words={[
          { word: "festival", definition: "A large public celebration or event" },
          { word: "tradition", definition: "A custom passed from generation to generation" },
          { word: "custom", definition: "A traditional way of behaving" },
          { word: "parade", definition: "A public march or procession to celebrate" },
          { word: "celebration", definition: "An act of marking a special event" },
          { word: "commemoration", definition: "Remembering and honoring a person or event" },
          { word: "heritage", definition: "Cultural traditions inherited from the past" },
          { word: "ritual", definition: "A ceremony or series of prescribed actions" },
        ]} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        <img src="/images/webquest2/carnival.jpg" alt="Carnival" className="rounded-xl w-full h-28 sm:h-36 object-cover shadow-md" />
        <img src="/images/webquest2/tomatina.jpg" alt="La Tomatina" className="rounded-xl w-full h-28 sm:h-36 object-cover shadow-md" />
        <img src="/images/webquest2/cherry_blossom.jpg" alt="Cherry Blossom" className="rounded-xl w-full h-28 sm:h-36 object-cover shadow-md" />
        <img src="/images/webquest2/day_of_dead.jpg" alt="Day of the Dead" className="rounded-xl w-full h-28 sm:h-36 object-cover shadow-md" />
      </div>
    </>
  );
}

function VideoStep() {
  return (
    <>
      <VideoTask title="Holidays Around the World" instruction="Watch the video about holidays around the world and complete the tasks below." videoUrl="https://www.youtube.com/watch?v=6sdCUbe0s7E" thumbnail="/images/webquest2/video_thumb.jpg" />
      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Task A: Match holidays with descriptions</h4>
        <SelectMatchingTask
          pairs={[
            { left: "1. Christmas", right: "" }, { left: "2. Hanukkah", right: "" },
            { left: "3. Eid al-Fitr", right: "" }, { left: "4. Chinese New Year", right: "" },
            { left: "5. Cinco de Mayo", right: "" }, { left: "6. Thanksgiving", right: "" },
          ]}
          options={["Commemorates the birth of a religious figure", "Remembers a miracle involving oil", "Celebrates the end of a fasting period", "Focuses on a new beginning and family reunions", "Celebrates military victory over foreign forces", "Marks gratitude for harvest and blessings"]}
          correctAnswers={{ 0: "Commemorates the birth of a religious figure", 1: "Remembers a miracle involving oil", 2: "Celebrates the end of a fasting period", 3: "Focuses on a new beginning and family reunions", 4: "Celebrates military victory over foreign forces", 5: "Marks gratitude for harvest and blessings" }}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Task B: True or False</h4>
        <TrueFalseTask statements={[
          { text: "All holidays mentioned in the video are religious in origin.", answer: false },
          { text: "Some holiday traditions are thousands of years old.", answer: true },
          { text: "Diwali is celebrated in the same way in every country.", answer: false },
          { text: "Chinese New Year includes parades and traditional food.", answer: true },
          { text: "Thanksgiving is celebrated worldwide.", answer: false },
        ]} />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Task C: Choose the correct answer</h4>
        <MultipleChoiceTask questions={[
          { question: "According to the video, holidays may be based on:", options: ["Religion only", "Culture, religion, or history", "Climate and geography", "Age groups"], correctIndex: 1 },
          { question: "Which activity is NOT mentioned as part of Christmas celebrations?", options: ["Decorating homes", "Exchanging gifts", "Lighting oil lamps", "Attending church services"], correctIndex: 2 },
          { question: "Cinco de Mayo commemorates:", options: ["Mexico's independence", "A religious celebration", "A historical military victory", "The end of a harvest season"], correctIndex: 2 },
        ]} />
      </div>
      <div className="mt-4">
        <OpenQuestionTask title="Task D: Answer in 1-2 sentences" questions={[
          "Why does the video emphasize that holidays are celebrated by different faiths and cultures?",
          "How does the video connect holidays with family and community values?",
        ]} />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Task E: Match words with meanings</h4>
        <VocabularyMatchTask words={[
          { word: "Tradition", definition: "Long-established custom" },
          { word: "Gratitude", definition: "Feeling of thankfulness" },
          { word: "Parade", definition: "Public celebration or march" },
          { word: "Unity", definition: "Being joined together" },
        ]} />
      </div>
    </>
  );
}

function ReadingStep() {
  return (
    <>
      <div className="max-w-3xl mx-auto mb-4">
        <img src="/images/webquest2/reading_hero.jpg" alt="6 Tips for Celebrating Holidays Abroad" loading="lazy" className="rounded-2xl w-full object-cover shadow-xl" />
      </div>

      <ReadingSection title="">
        Ahh, the holidays! No matter what time of year, your first holiday as an expat marks a milestone in your international life. It's a chance to learn about local culture, share your own traditions, and create lasting connections. But it's not always easy.
      </ReadingSection>

      <ReadingSection title="">
        Balancing your customs with those of your new country can be both rewarding and challenging. Holidays are intensely personal events for everyone involved. Expats often miss home traditions and holiday gatherings as they carry deep cultural and emotional significance. Adjusting to a new country's way of celebrating can add to the complexity of adapting to a new culture.
      </ReadingSection>

      <ReadingSection title="">
        But it's undeniable: embracing new ways of celebrating can be a powerful way to connect with your new country's culture and add a touch of "home." Whether you're attending a local holiday for the first time or re-creating a beloved home tradition, a culturally sensitive approach helps make your celebration more meaningful. We've gathered our top six tips to enjoy holiday celebrations abroad in a practical and respectful way. Let's talk about how to create new memories while honoring both your roots and your new country.
      </ReadingSection>

      <ReadingSection title="1. Find a Local Guide">
        <p className="mb-2">One of the best ways to feel comfortable celebrating a new (to you) holiday abroad is to connect with someone who's native to the country. Having a friend, colleague, or neighbor who knows local customs can be invaluable—and can make new holidays immediately feel familiar.</p>
        <p className="mb-2">A "local guide" can offer insights into the meaning behind traditions, explain local etiquette, and let you know about cultural practices. They can help you understand parts of the holiday or expectations you otherwise might not know. These include things like the flow of events at a holiday gathering, or how to express gratitude in a way that feels natural in the culture.</p>
        <p>It's also a great way to show your enthusiasm for your new country's culture! People often love sharing their customs and it's a great way to bond with people in the community. It can take courage to knock on a neighbor's door or approach a colleague—but it could lead to lasting friendship.</p>
      </ReadingSection>

      <ReadingSection title="2. Do Your Homework">
        <p className="mb-2">Taking the time to understand the cultural background of a holiday can make the experience much richer. Research the holiday's history, meaning, and rituals or symbols associated with it. Having this context can help you feel more connected to the celebration—and avoid any accidental misunderstandings.</p>
        <p className="mb-2">An interesting example of a potential mishap is fireworks. In some cultures, fireworks mark only religious celebrations, while in others, they're used for general festivity. A little research ahead of time can prevent mix-ups and make sure that your excitement and respect for tradition come through clearly.</p>
        <p className="mb-2">When starting your research, there are a couple of questions to consider asking:</p>
        <ul className="list-disc list-inside mb-2 space-y-1">
          <li>What values or beliefs does this holiday represent?</li>
          <li>Are there particular activities, foods, or music associated with the celebration?</li>
          <li>Is the holiday more family-centered, or is it celebrated publicly with the community?</li>
        </ul>
        <p>The goal is always to engage meaningfully and show your genuine interest in learning. Preparation is the key to success and a little background knowledge can make all the difference.</p>
      </ReadingSection>

      <ReadingSection title="3. Dress for the Occasion" image="/images/webquest2/tip_dress.png">
        <p className="mb-2">In many places, how you dress for a holiday can carry special meaning. For some religious holidays, there may be guidelines on modesty or other considerations. If you're unsure, it's completely okay to ask someone you trust, or do a quick online search to learn about appropriate attire. Even if there's no strict dress code, dressing with respect for the tradition can help you feel more connected to the occasion.</p>
        <p>Some considerations include color, materials, style, and where the clothes are made. An excellent way to make sure you're outfitted appropriately is to go with a friend, colleague, or neighbor to a local shop. You'll not only hear various points of view regarding proper dress, but you'll get to know your new home a little better, too.</p>
      </ReadingSection>

      <ReadingSection title="4. Be Thoughtful with Gifts" image="/images/webquest2/tip_gifts.png">
        <p className="mb-2">Gift-giving customs vary widely across cultures. In some countries, small, thoughtful gifts are ideal, while in others, an extravagant gift might be more typical. If you're invited to a gathering, ask if bringing something is customary. If it is, consider the cultural or religious background of the person to whom you're gifting, as certain items could have specific connotations. Common examples of "controversial gifts" include alcohol, food, or types of flowers.</p>
        <p>In some cultures, giving a donation to a charity that's meaningful to the recipient is more appreciated than a material gift. In others, money in specially-designed envelopes is given directly to the host. Regardless, a little bit of consideration goes a long way and can make your gesture even more meaningful.</p>
      </ReadingSection>

      <ReadingSection title="5. Clarify Food Preferences or Restrictions" image="/images/webquest2/tip_food.png">
        <p className="mb-2">Food is often central to holiday celebrations and every culture has its own dietary customs. If you're bringing a dish or helping with the meal, check first about local dietary needs and religious food restrictions. These can include kosher, halal, or vegetarian. Even within these categories, specific foods may be welcomed or avoided on certain days. Showing awareness of these details and interest in them demonstrates thoughtfulness and helps everyone feel comfortable during the celebration.</p>
        <p>When in doubt, ask the host. They'll let you know what dishes can be enjoyed by everyone (vegetarian options with culturally-appropriate preparation are often safe bets, dietary restrictions aside). Find out ingredient restrictions and be mindful of choices that are never appropriate for the culture. Pork and beef are two of the most widely avoided foods.</p>
      </ReadingSection>

      <ReadingSection title="6. Keep an Open Mind">
        <p className="mb-2">When participating in an unfamiliar celebration, it's helpful to come to it with curiosity rather than comparison. Watch how others interact, listen to the stories they share, and just try to absorb the experience. You might notice different ways of connecting, or a different pace than you're used to. Keeping an open mind lets you immerse yourself in the moment and embrace it without preconceived ideas. It can also lead to unexpected friendships or insights into your own cultural values.</p>
        <p className="mb-2">This approach is also helpful when you're in a position where your favorite holiday isn't observed. It can be one of the most challenging parts of the expat life. The key to handling this, and so many other expat challenges, is kindness. Be a little extra kind to yourself and acknowledge your feelings. Remind yourself that homesickness is a natural part of international living and use your open mind to appreciate the new customs even while missing the old.</p>
        <p>One of the biggest TKC superpowers is our ability to adapt to other cultures and embrace their traditions. You can also embrace your flexibility to make your own holidays special in a different way, evolving with you. Celebrating with a new schedule, different people, and local elements can become a cherished tradition!</p>
      </ReadingSection>

      <div className="text-right mb-3">
        <a href="https://www.expatkidsclub.com/blog/6-tips-for-celebrating-your-first-holidays-abroad" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-primary/70 hover:text-primary underline">Source: Expat Kids Club</a>
      </div>

      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Task III: Match tips with purposes</h4>
        <SelectMatchingTask
          pairs={[
            { left: "1. Find a Local Guide", right: "" }, { left: "2. Do Your Homework", right: "" },
            { left: "3. Dress for the Occasion", right: "" }, { left: "4. Be Thoughtful with Gifts", right: "" },
            { left: "5. Clarify Food Preferences", right: "" }, { left: "6. Keep an Open Mind", right: "" },
          ]}
          options={["Builds trust and community connections", "Helps avoid misunderstandings", "Shows respect for religious and cultural norms", "Prevents cultural offense", "Ensures inclusivity and comfort", "Encourages cultural adaptation"]}
          correctAnswers={{ 0: "Builds trust and community connections", 1: "Helps avoid misunderstandings", 2: "Shows respect for religious and cultural norms", 3: "Prevents cultural offense", 4: "Ensures inclusivity and comfort", 5: "Encourages cultural adaptation" }}
        />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Task V: Match words with definitions</h4>
        <VocabularyMatchTask words={[
          { word: "milestone", definition: "A significant stage or achievement" },
          { word: "expat", definition: "Living outside one's home country" },
          { word: "etiquette", definition: "Accepted social behavior" },
          { word: "cultural significance", definition: "Traditional actions or ceremonies" },
          { word: "adaptability", definition: "Ability to change behavior in new situations" },
        ]} />
      </div>
      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Task VI: Fill in the blanks</h4>
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
      <div className="mt-4">
        <h4 className="font-display text-base font-semibold mb-2">Task VII: Match situations with advice</h4>
        <SelectMatchingTask
          pairs={[
            { left: "You are invited to a religious holiday", right: "" },
            { left: "You don't understand local traditions", right: "" },
            { left: "You feel homesick during a holiday", right: "" },
            { left: "You want to bring a present", right: "" },
            { left: "You are unsure what to wear", right: "" },
          ]}
          options={["Clarify food restrictions", "Find a local guide", "Keep an open mind", "Be thoughtful with gifts", "Dress for the occasion"]}
          correctAnswers={{ 0: "Clarify food restrictions", 1: "Find a local guide", 2: "Keep an open mind", 3: "Be thoughtful with gifts", 4: "Dress for the occasion" }}
        />
      </div>
    </>
  );
}

function ResearchStep() {
  return (
    <>
      <p className="font-body text-foreground text-base mb-3">Work in groups of 3–4. Each group investigates one country's holiday:</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {["🇯🇵 Japan — Hanami", "🇧🇷 Brazil — Carnival", "🇪🇸 Spain — La Tomatina", "🇪🇬 Egypt — Sham El-Nessim", "🇨🇦 Canada — Canada Day", "🇦🇺 Australia — ANZAC Day"].map((c, i) => (
          <Card key={i} className="glass-card"><CardContent className="p-3 font-body text-base font-medium">{c}</CardContent></Card>
        ))}
      </div>
      <OpenQuestionTask title="Research Questions" questions={[
        "When is the holiday celebrated?",
        "What is its historical or cultural background?",
        "What traditions, foods, or activities are typical?",
        "How is it similar or different from holidays in your country?",
      ]} />
    </>
  );
}

function ReflectionStep() {
  return (
    <>
      <OpenQuestionTask title="Reflect on your experience" questions={[
        "Which holiday did you find most interesting and why?",
        "What similarities/differences did you notice between this holiday and your own traditions?",
        "What does this tell us about the role of holidays in cultural identity?",
        "How did you contribute to your group? What skills did you develop?",
      ]} />
      <div className="mt-4">
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
      <Card className="mt-4 border-primary/30 bg-primary/5">
        <CardContent className="p-4 text-center">
          <h3 className="font-display text-xl font-bold text-primary mb-1">🎉 Congratulations!</h3>
          <p className="font-body text-sm text-foreground">
            Through this WebQuest, you discovered how holidays and traditions reflect cultural values. By comparing your own holidays with those of other countries, you gained deeper intercultural understanding.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

function ReadingSection({ title, children, image }: { title: string; children: React.ReactNode; image?: string }) {
  return (
    <div className="mb-3 p-3 rounded-xl bg-muted/50 border-l-4 border-primary/40 overflow-hidden">
      <h5 className="font-display font-semibold text-base mb-1">{title}</h5>
      <div className="font-body text-base text-foreground leading-relaxed">
        {image && <img src={image} alt={title} className="w-14 h-14 float-left mr-3 mb-1 rounded-lg object-contain" />}
        {children}
      </div>
    </div>
  );
}

function SelfEvalChecklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <div className="space-y-1">
      {items.map((item, i) => (
        <label key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
          <input type="checkbox" checked={checked[i] || false} onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))} className="mt-0.5 w-4 h-4 rounded border-primary text-primary focus:ring-primary" />
          <span className="font-body text-base">{item}</span>
          {checked[i] && <CheckCircle2 className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
        </label>
      ))}
    </div>
  );
}

export default WebQuest2;
