import { useState } from "react";

interface VennDiagramProps {
  leftLabel: string;
  rightLabel: string;
}

const VennDiagram = ({ leftLabel, rightLabel }: VennDiagramProps) => {
  const [leftItems, setLeftItems] = useState("");
  const [centerItems, setCenterItems] = useState("");
  const [rightItems, setRightItems] = useState("");

  return (
    <div className="space-y-4">
      <div className="relative flex items-center justify-center min-h-[300px]">
        {/* Left circle */}
        <div className="absolute left-0 md:left-[10%] w-[55%] md:w-[45%] h-[280px] rounded-full border-2 border-primary/30 bg-primary/5 flex flex-col items-start justify-center p-8 pl-6">
          <h5 className="font-display font-semibold text-sm text-primary mb-2">{leftLabel}</h5>
          <textarea
            value={leftItems}
            onChange={(e) => setLeftItems(e.target.value)}
            placeholder="Differences..."
            className="w-[70%] bg-transparent font-body text-xs resize-none focus:outline-none min-h-[100px] placeholder:text-muted-foreground/40"
          />
        </div>
        {/* Right circle */}
        <div className="absolute right-0 md:right-[10%] w-[55%] md:w-[45%] h-[280px] rounded-full border-2 border-secondary/30 bg-secondary/5 flex flex-col items-end justify-center p-8 pr-6">
          <h5 className="font-display font-semibold text-sm text-secondary mb-2">{rightLabel}</h5>
          <textarea
            value={rightItems}
            onChange={(e) => setRightItems(e.target.value)}
            placeholder="Differences..."
            className="w-[70%] bg-transparent font-body text-xs resize-none focus:outline-none min-h-[100px] text-right placeholder:text-muted-foreground/40"
          />
        </div>
        {/* Center overlap */}
        <div className="relative z-10 w-[30%] md:w-[20%] flex flex-col items-center justify-center">
          <h5 className="font-display font-semibold text-xs text-muted-foreground mb-1">Both</h5>
          <textarea
            value={centerItems}
            onChange={(e) => setCenterItems(e.target.value)}
            placeholder="Similarities..."
            className="w-full bg-background/80 backdrop-blur-sm font-body text-xs resize-none focus:outline-none min-h-[100px] text-center rounded-lg p-2 border placeholder:text-muted-foreground/40"
          />
        </div>
      </div>
    </div>
  );
};

export default VennDiagram;
