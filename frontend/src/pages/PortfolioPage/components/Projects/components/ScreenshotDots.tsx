type ScreenshotDotsProps = {
  count: number;
  index: number;
  // When given, the dots are buttons that jump to a screenshot. Without it they're
  // a read-only indicator (used in the hover window, which can't be clicked).
  onSelect?: (index: number) => void;
  label?: string; // e.g. the project name, for screen readers
};

// Shows how many screenshots there are and which one is on screen.
function ScreenshotDots({ count, index, onSelect, label = "screenshot" }: ScreenshotDotsProps) {
  if (count < 2) return null;

  const dot = (i: number) => (
    <span
      className={`block h-1.5 rounded-full transition-all duration-300 ${
        i === index ? "w-4 bg-accent" : "w-1.5 bg-text/40"
      }`}
    />
  );

  if (!onSelect) {
    return (
      <div aria-hidden className="flex items-center justify-center gap-1.5">
        {Array.from({ length: count }, (_, i) => (
          <span key={i}>{dot(i)}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Show ${label} ${i + 1} of ${count}`}
          aria-current={i === index}
          // The dot is small, but the button around it is a comfortable tap target
          className="grid size-7 place-items-center"
        >
          {dot(i)}
        </button>
      ))}
    </div>
  );
}

export default ScreenshotDots;
