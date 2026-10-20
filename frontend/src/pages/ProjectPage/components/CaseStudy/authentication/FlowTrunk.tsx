// The last stretch into the Session box; on phones it's the only line.
function FlowTrunk() {
  return (
    <div aria-hidden className="flex flex-col items-center">
      <span className="h-6 w-0.5 bg-accent/80 shadow-accent-line" />
      <svg width={12} height={7} viewBox="0 0 12 7" className="-mt-px drop-shadow-accent-line">
        <path d="M1 0 L6 6 L11 0" fill="none" className="stroke-accent" strokeWidth={2} />
      </svg>
    </div>
  );
}

export default FlowTrunk;
