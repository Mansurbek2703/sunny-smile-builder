import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, GripHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface DragMatchingTaskProps {
  items: { label: string; image: string }[];
  descriptions: { letter: string; text: string }[];
  correctAnswers: Record<number, number>;
}

const DragMatchingTask = ({ items, descriptions, correctAnswers }: DragMatchingTaskProps) => {
  const [assignments, setAssignments] = useState<Record<number, number>>({});
  const [dragging, setDragging] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const isMobile = useIsMobile();

  const handleDragStart = (itemIndex: number) => { setDragging(itemIndex); };

  const handleDrop = (descIndex: number) => {
    if (dragging === null || showResults) return;
    const newAssignments = { ...assignments };
    Object.entries(newAssignments).forEach(([key, val]) => { if (val === dragging) delete newAssignments[Number(key)]; });
    newAssignments[descIndex] = dragging;
    setAssignments(newAssignments);
    setDragging(null);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const removeAssignment = (descIndex: number) => {
    if (showResults) return;
    const newAssignments = { ...assignments };
    delete newAssignments[descIndex];
    setAssignments(newAssignments);
  };

  const handleItemTap = (itemIndex: number) => {
    if (showResults || !isMobile) return;
    if (usedItems.has(itemIndex)) return;
    setSelected(prev => prev === itemIndex ? null : itemIndex);
  };

  const handleDropZoneTap = (descIndex: number) => {
    if (!isMobile || showResults) return;
    if (selected === null) { if (assignments[descIndex] !== undefined) { removeAssignment(descIndex); } return; }
    const newAssignments = { ...assignments };
    Object.entries(newAssignments).forEach(([key, val]) => { if (val === selected) delete newAssignments[Number(key)]; });
    newAssignments[descIndex] = selected;
    setAssignments(newAssignments);
    setSelected(null);
  };

  const usedItems = new Set(Object.values(assignments));

  const reset = () => { setAssignments({}); setShowResults(false); setDragging(null); setSelected(null); };

  return (
    <div className="space-y-2">
      {isMobile && !showResults && (
        <p className="text-sm font-body text-foreground text-center italic">
          Bayroqni bosing, keyin joylashtirish uchun qatorni bosing
        </p>
      )}

      <div className="flex flex-wrap gap-2 justify-center p-2 rounded-xl bg-muted/30 border-2 border-dashed border-border">
        {items.map((item, i) => (
          <motion.div
            key={i}
            draggable={!isMobile && !showResults && !usedItems.has(i)}
            onDragStart={() => handleDragStart(i)}
            onDragEnd={() => setDragging(null)}
            onClick={() => handleItemTap(i)}
            whileHover={!usedItems.has(i) ? { scale: 1.08, y: -4 } : {}}
            whileTap={!usedItems.has(i) ? { scale: 0.95 } : {}}
            className={`relative transition-all rounded-xl overflow-hidden shadow-md border-2 ${
              isMobile ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
            } ${
              usedItems.has(i) ? "opacity-30 cursor-not-allowed border-muted"
                : selected === i ? "ring-4 ring-quest-gold shadow-lg border-quest-gold scale-105"
                : dragging === i ? "ring-4 ring-accent shadow-lg border-accent"
                : "border-border hover:border-accent hover:shadow-xl"
            }`}
          >
            <img src={item.image} alt={item.label} className="w-20 h-14 sm:w-28 sm:h-18 object-contain p-0.5 pointer-events-none" draggable={false} />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent px-2 py-1">
              <span className="text-[12px] font-body font-semibold text-background">{item.label}</span>
            </div>
            {!usedItems.has(i) && !showResults && !isMobile && (
              <div className="absolute top-1 right-1 bg-background/70 rounded p-0.5"><GripHorizontal className="w-3 h-3 text-muted-foreground" /></div>
            )}
            {selected === i && (
              <div className="absolute inset-0 bg-quest-gold/20 flex items-center justify-center">
                <span className="text-sm font-body font-bold text-foreground bg-background/80 px-2 py-0.5 rounded">✓ Tanlangan</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-1.5">
        {descriptions.map((desc, di) => {
          const assignedItem = assignments[di] !== undefined ? items[assignments[di]] : null;
          const isCorrect = showResults && assignments[di] === correctAnswers[di];
          const isWrong = showResults && assignments[di] !== undefined && assignments[di] !== correctAnswers[di];
          const isDropTarget = isMobile && selected !== null && !assignedItem;

          return (
            <motion.div
              key={di}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: di * 0.05 }}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(di)}
              onClick={() => handleDropZoneTap(di)}
              className={`flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
                isMobile && selected !== null ? "cursor-pointer" : ""
              } ${
                showResults
                  ? isCorrect ? "bg-primary/10 border-primary/40" : isWrong ? "bg-destructive/10 border-destructive/40" : "bg-muted/20 border-border"
                  : isDropTarget ? "border-quest-gold/60 bg-quest-gold/10" : dragging !== null ? "border-accent/50 bg-accent/5" : "bg-card border-border"
              }`}
            >
              <span className="font-display font-bold text-sm text-foreground min-w-[24px]">{di + 1}.</span>

              <div
                className={`flex-shrink-0 w-14 h-10 sm:w-16 sm:h-11 rounded-md border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${
                  assignedItem ? "border-solid border-accent/50"
                    : isDropTarget ? "border-quest-gold bg-quest-gold/15 animate-pulse"
                    : dragging !== null ? "border-accent bg-accent/10 animate-pulse"
                    : "border-muted-foreground/20"
                }`}
                onClick={(e) => { if (assignedItem && !isMobile) { e.stopPropagation(); removeAssignment(di); } }}
                title={assignedItem ? "Click to remove" : "Drop flag here"}
              >
                {assignedItem ? (
                  <div className="relative w-full h-full group cursor-pointer">
                    <img src={assignedItem.image} alt={assignedItem.label} className="w-full h-full object-cover" />
                    {!showResults && (
                      <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-background" />
                      </div>
                    )}
                  </div>
                ) : isDropTarget ? (
                  <span className="text-sm text-quest-gold font-body font-medium">👆</span>
                ) : (
                  <span className="text-sm text-muted-foreground/50 font-body">🏳️</span>
                )}
              </div>

              <span className="font-body text-sm flex-1">
                <span className="font-semibold text-accent mr-1">{desc.letter}.</span>
                {desc.text}
              </span>

              {showResults && (
                isCorrect ? <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  : isWrong ? <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  : null
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-2 pt-1">
        <Button onClick={() => setShowResults(true)} disabled={showResults || Object.keys(assignments).length === 0} size="sm" className="font-body">
          <CheckCircle2 className="w-4 h-4 mr-1" /> Check Answers
        </Button>
        {showResults && (
          <Button onClick={reset} variant="outline" size="sm" className="font-body">
            <RotateCcw className="w-4 h-4 mr-1" /> Try Again
          </Button>
        )}
      </div>
      {showResults && (
        <p className="font-body text-sm font-medium text-primary">
          {Object.entries(assignments).filter(([di]) => assignments[Number(di)] === correctAnswers[Number(di)]).length} / {descriptions.length} correct!
        </p>
      )}
    </div>
  );
};

export default DragMatchingTask;
