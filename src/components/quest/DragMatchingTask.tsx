import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, GripHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DragMatchingTaskProps {
  items: { label: string; image: string }[];
  descriptions: { letter: string; text: string }[];
  correctAnswers: Record<number, number>; // descIndex -> itemIndex
}

const DragMatchingTask = ({ items, descriptions, correctAnswers }: DragMatchingTaskProps) => {
  const [assignments, setAssignments] = useState<Record<number, number>>({}); // descIndex -> itemIndex
  const [dragging, setDragging] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleDragStart = (itemIndex: number) => {
    setDragging(itemIndex);
  };

  const handleDrop = (descIndex: number) => {
    if (dragging === null || showResults) return;
    // Remove this item from any other assignment
    const newAssignments = { ...assignments };
    Object.entries(newAssignments).forEach(([key, val]) => {
      if (val === dragging) delete newAssignments[Number(key)];
    });
    newAssignments[descIndex] = dragging;
    setAssignments(newAssignments);
    setDragging(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeAssignment = (descIndex: number) => {
    if (showResults) return;
    const newAssignments = { ...assignments };
    delete newAssignments[descIndex];
    setAssignments(newAssignments);
  };

  const usedItems = new Set(Object.values(assignments));

  const reset = () => {
    setAssignments({});
    setShowResults(false);
    setDragging(null);
  };

  return (
    <div className="space-y-5">
      {/* Flag images on top - draggable */}
      <div className="flex flex-wrap gap-3 justify-center p-4 rounded-xl bg-muted/30 border-2 border-dashed border-border">
        {items.map((item, i) => (
          <motion.div
            key={i}
            draggable={!showResults && !usedItems.has(i)}
            onDragStart={() => handleDragStart(i)}
            onDragEnd={() => setDragging(null)}
            whileHover={!usedItems.has(i) ? { scale: 1.08, y: -4 } : {}}
            whileTap={!usedItems.has(i) ? { scale: 0.95 } : {}}
            className={`relative cursor-grab active:cursor-grabbing transition-all rounded-xl overflow-hidden shadow-md border-2 ${
              usedItems.has(i)
                ? "opacity-30 cursor-not-allowed border-muted"
                : dragging === i
                ? "ring-4 ring-accent shadow-lg border-accent"
                : "border-border hover:border-accent hover:shadow-xl"
            }`}
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-24 h-16 sm:w-28 sm:h-18 object-cover pointer-events-none"
              draggable={false}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent px-2 py-1">
              <span className="text-[10px] font-body font-semibold text-background">{item.label}</span>
            </div>
            {!usedItems.has(i) && !showResults && (
              <div className="absolute top-1 right-1 bg-background/70 rounded p-0.5">
                <GripHorizontal className="w-3 h-3 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Description rows with drop zones */}
      <div className="space-y-2">
        {descriptions.map((desc, di) => {
          const assignedItem = assignments[di] !== undefined ? items[assignments[di]] : null;
          const isCorrect = showResults && assignments[di] === correctAnswers[di];
          const isWrong = showResults && assignments[di] !== undefined && assignments[di] !== correctAnswers[di];

          return (
            <motion.div
              key={di}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: di * 0.05 }}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(di)}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                showResults
                  ? isCorrect
                    ? "bg-primary/10 border-primary/40"
                    : isWrong
                    ? "bg-destructive/10 border-destructive/40"
                    : "bg-muted/20 border-border"
                  : dragging !== null
                  ? "border-accent/50 bg-accent/5"
                  : "bg-card border-border"
              }`}
            >
              <span className="font-display font-bold text-sm text-muted-foreground min-w-[24px]">
                {di + 1}.
              </span>

              {/* Drop zone for flag */}
              <div
                className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${
                  assignedItem
                    ? "border-solid border-accent/50"
                    : dragging !== null
                    ? "border-accent bg-accent/10 animate-pulse"
                    : "border-muted-foreground/20"
                }`}
                onClick={() => assignedItem && removeAssignment(di)}
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
                ) : (
                  <span className="text-xs text-muted-foreground/50 font-body">🏳️</span>
                )}
              </div>

              <span className="font-body text-sm flex-1">
                <span className="font-semibold text-accent mr-1">{desc.letter}.</span>
                {desc.text}
              </span>

              {showResults && (
                isCorrect
                  ? <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  : isWrong
                  ? <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  : null
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
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
