export function ProgressBar({ value, max, className = "" }: { value: number; max: number; className?: string }) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);
  return (
    <div className={className}>
      <div className="flex items-center justify-between text-xs font-medium text-muted">
        <span>
          {value} sur {max} terminée{value > 1 ? "s" : ""}
        </span>
        <span>{percent} %</span>
      </div>
      <div
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-brand-50"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label="Progression"
      >
        <div className="h-full rounded-full bg-accent-400 transition-[width] duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
