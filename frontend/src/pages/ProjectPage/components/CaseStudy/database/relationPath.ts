// Builds the SVG path of one relationship in ER ("crow's foot") notation:
//
//   parent ─┼──────────<  child
//          one         many
//
// a short bar near the parent (exactly one) and a three-pronged fork touching the child (many).
// It's the standard way database diagrams show 1 → N, so it reads as a real schema, and the
// legend under the diagram says it in words.
//
// Two paths come back: the line, and the marks (bar + fork). They're separate so the graph can
// draw the line in first and fade the marks in when it arrives. They're plain paths rather than
// SVG <marker>s so they always take the line's color and hover state.

export type Point = { x: number; y: number };
export type Direction = { x: number; y: number }; // a unit vector: (1,0) right, (0,1) down...

const BAR_OFFSET = 7; // how far from the parent the "one" bar sits
const MARK_HALF = 5; // half the width of the bar and of the fork
const FORK_LENGTH = 10; // how far the fork reaches back from the child

export function relationPath(
  start: Point, // on the parent's edge
  startDir: Direction, // the direction the line leaves the parent in
  linePoints: Point[], // the corners of the line, ending on the child's edge
  endDir: Direction, // the direction the line enters the child in
): { line: string; marks: string } {
  const end = linePoints[linePoints.length - 1];
  // Perpendicular vectors, to spread the marks across the line
  const startSide = { x: -startDir.y, y: startDir.x };
  const endSide = { x: -endDir.y, y: endDir.x };

  const bar = { x: start.x + startDir.x * BAR_OFFSET, y: start.y + startDir.y * BAR_OFFSET };
  const forkBase = { x: end.x - endDir.x * FORK_LENGTH, y: end.y - endDir.y * FORK_LENGTH };

  const line = [`M ${start.x} ${start.y}`, ...linePoints.map((p) => `L ${p.x} ${p.y}`)].join(" ");
  const marks = [
    // one: the bar
    `M ${bar.x + startSide.x * MARK_HALF} ${bar.y + startSide.y * MARK_HALF}`,
    `L ${bar.x - startSide.x * MARK_HALF} ${bar.y - startSide.y * MARK_HALF}`,
    // many: the fork, two prongs out to the child's edge (the line itself is the middle one)
    `M ${forkBase.x} ${forkBase.y} L ${end.x + endSide.x * MARK_HALF} ${end.y + endSide.y * MARK_HALF}`,
    `M ${forkBase.x} ${forkBase.y} L ${end.x - endSide.x * MARK_HALF} ${end.y - endSide.y * MARK_HALF}`,
  ].join(" ");

  return { line, marks };
}
