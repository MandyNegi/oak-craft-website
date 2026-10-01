"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { clamp } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  label?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  label,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50); // 0-100 percent
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    setPosition(pct);
  }, []);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    updatePosition(e.clientX);
  };
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging.current) updatePosition(e.clientX);
    },
    [updatePosition]
  );
  const onMouseUp = () => { dragging.current = false; };

  // Touch events
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  // Keyboard support
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => clamp(p - 5, 0, 100));
    if (e.key === "ArrowRight") setPosition((p) => clamp(p + 5, 0, 100));
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  const transition = prefersReduced ? "none" : "clip-path 0ms";

  return (
    <div className="w-full">
      {label && (
        <p className="text-xs text-[var(--text-muted)] tracking-wide uppercase mb-3">
          {label}
        </p>
      )}
      <div
        ref={containerRef}
        className="before-after-slider relative w-full aspect-[4/3] select-none"
        onMouseDown={onMouseDown}
        onTouchMove={onTouchMove}
        onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* After image (base) */}
        <div className="absolute inset-0">
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute bottom-3 right-3 text-white text-xs font-medium bg-black/40 px-2 py-1 select-none">
            After
          </span>
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition,
          }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-black/40 px-2 py-1 select-none">
            Before
          </span>
        </div>

        {/* Divider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          {/* Handle circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--charcoal)" strokeWidth="2" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 15 12 9 6" transform="translate(6,0)" />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] text-center mt-2" aria-hidden="true">
        Drag or use arrow keys to compare
      </p>
    </div>
  );
}
