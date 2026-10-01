interface QuoteProgressProps {
  currentStep: number; // 1-4
  totalSteps?: number;
}

const stepLabels = ["Project", "Space", "Details", "Contact"];

export function QuoteProgress({
  currentStep,
  totalSteps = 4,
}: QuoteProgressProps) {
  return (
    <div className="w-full mb-10" aria-label="Form progress">
      {/* Step labels + circles */}
      <div className="flex items-start justify-between relative">
        {/* Background line */}
        <div
          className="absolute top-4 left-0 right-0 h-px bg-[var(--border)]"
          aria-hidden="true"
        />
        {/* Progress fill */}
        <div
          className="absolute top-4 left-0 h-px bg-[var(--charcoal)] transition-all duration-500"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
          aria-hidden="true"
        />

        {stepLabels.slice(0, totalSteps).map((label, i) => {
          const stepNum = i + 1;
          const done = stepNum < currentStep;
          const active = stepNum === currentStep;

          return (
            <div
              key={label}
              className="relative flex flex-col items-center gap-2 z-10"
              style={{ width: `${100 / totalSteps}%` }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  done
                    ? "bg-[var(--charcoal)] border-[var(--charcoal)] text-white"
                    : active
                    ? "bg-white border-[var(--charcoal)] text-[var(--charcoal)]"
                    : "bg-white border-[var(--border)] text-[var(--text-muted)]"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? (
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  active
                    ? "text-[var(--charcoal)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: current step label */}
      <p className="sm:hidden text-center text-sm font-medium text-[var(--charcoal)] mt-3">
        Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
      </p>
    </div>
  );
}
