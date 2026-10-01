"use client";

import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
}

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const initialStyles: Record<string, React.CSSProperties> = {
    "fade-up": { opacity: 0, transform: "translateY(24px)" },
    "fade-in": { opacity: 0, transform: "none" },
    "slide-left": { opacity: 0, transform: "translateX(-24px)" },
    "slide-right": { opacity: 0, transform: "translateX(24px)" },
  };

  const style: React.CSSProperties = prefersReduced
    ? {}
    : {
        ...(visible ? {} : initialStyles[animation]),
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initialStyles[animation].transform,
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
