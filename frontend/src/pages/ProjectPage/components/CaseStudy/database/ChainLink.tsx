import { relationPath } from "./relationPath";

const HEIGHT = 32;
const X = 6;
const { line, marks } = relationPath({ x: X, y: 0 }, { x: 0, y: 1 }, [{ x: X, y: HEIGHT }], { x: 0, y: 1 });

// The short vertical link between two cards of a chain: the same "one" bar and "many" fork as
// the lines of the wide graph, so both views read the same way (and the same legend explains them).
function ChainLink() {
  return (
    <svg aria-hidden width={12} height={HEIGHT} className="ml-5 block overflow-visible">
      <path d={`${line} ${marks}`} fill="none" className="stroke-text/35" strokeWidth={1.25} />
    </svg>
  );
}

export default ChainLink;
