import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Home, PartyPopper } from "lucide-react";

const congratsData: Record<number, { title: string; text: string }> = {
  1: {
    title: "WebQuest 1 Completed!",
    text: "You have compared two important traditions and discovered how people in different cultures celebrate gratitude, renewal, and family. Remember: learning about other cultures is the first step toward becoming a global citizen.",
  },
  2: {
    title: "WebQuest 2 Completed!",
    text: "Through this WebQuest, you discovered how holidays and traditions reflect cultural values. By comparing your own holidays with those of other countries, you gained deeper intercultural understanding.",
  },
  3: {
    title: "WebQuest 3 Completed!",
    text: "You have learned that stereotypes are not always true — they are generalizations that can hide the diversity within cultures. Understanding the difference between truth and myth helps us become more open-minded and globally aware citizens.",
  },
  4: {
    title: "WebQuest 4 Completed!",
    text: "Through this WebQuest, you explored a city from a tourist's perspective and discovered its cultural, historical, and social attractions.",
  },
  5: {
    title: "WebQuest 5 Completed!",
    text: "Culture shock is not a setback but a step toward personal growth and global understanding. Awareness of cross-cultural etiquette encourages respect, empathy, and open-mindedness.",
  },
  6: {
    title: "WebQuest 6 Completed!",
    text: "Through this WebQuest, you explored traditional dishes, food etiquette and cultures from different countries. Understanding the meaning of food helps avoid misunderstandings and shows respect for other cultures.",
  },
  7: {
    title: "WebQuest 7 Completed!",
    text: "In this module, you learned about outstanding cultural figures and their contributions to society. Studying these heroes helped you appreciate creativity, perseverance, and ethical responsibility. The activities encouraged reflection, intercultural awareness, and inspiration to make positive contributions to your own communities.",
  },
};

export default function QuestCompletePage() {
  const { id } = useParams<{ id: string }>();
  const questNumber = Number(id);
  const data = congratsData[questNumber];
  const [confetti, setConfetti] = useState(true);

  const respondentId = localStorage.getItem("respondent_id");

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!respondentId) return <Navigate to="/" replace />;
  if (!data) return <Navigate to="/" replace />;

  const nextQuest = questNumber < 7 ? questNumber + 1 : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <Card className="max-w-lg w-full border-primary/30 shadow-2xl relative overflow-hidden">
        {confetti && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className="absolute animate-bounce text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              >
                {["🎉", "🎊", "⭐", "✨", "🏆"][i % 5]}
              </span>
            ))}
          </div>
        )}
        <CardContent className="p-8 text-center relative z-20">
          <PartyPopper className="w-16 h-16 mx-auto text-primary mb-4" />
          <h1 className="font-display text-3xl font-bold text-primary mb-2">
            🎉 Congratulations!
          </h1>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            {data.title}
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
            {data.text}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {nextQuest ? (
              <Button asChild size="lg" className="gap-2">
                <Link to={`/quest/${nextQuest}`}>
                  Next Module <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" /> Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
