type FlowLinesProps = {
  index: number; // the card's place in the list
  total: number;
};

// One card's lines into the session: an arm into the middle gap, plus the trunk on the left column.
// No measuring: the grid keeps cells aligned. Relies on AuthFlows' gap-x-8 and gap-y-4.
const LINE = "absolute bg-accent/80 shadow-accent-line";

function FlowLines({ index, total }: FlowLinesProps) {
  const isLeft = index % 2 === 0;
  const isFirstRow = index < 2;
  const isLastRow = index >= total - 2;

  return (
    <span aria-hidden className="hidden @xl:block">
      {/* the arm: from the card's inner side, halfway across the gap */}
      <span className={`${LINE} top-1/2 h-0.5 w-4 -translate-y-1/2 ${isLeft ? "left-full" : "right-full"}`} />

      {/* the trunk, drawn by the left column: 1rem past the card's right edge = the gap's middle */}
      {isLeft && (
        <span
          className={`${LINE} left-[calc(100%+1rem)] w-0.5 -translate-x-1/2 ${isFirstRow ? "top-1/2" : "-top-px"} ${
            isLastRow ? "bottom-0" : "-bottom-4"
          }`}
        />
      )}
    </span>
  );
}

export default FlowLines;
