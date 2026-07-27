"use client";
import { useEffect, useState } from "react";
import { TLRLogo } from "@/components/ui/TLRLogo";

export default function TLRIntro({ visible = true }) {
  const [isExiting, setIsExiting] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!visible) {
      // Step 1 & 2: Instantly start filling the bar and triggering the slide-up
      setIsExiting(true);

      // Step 3: Completely unmount after the 900ms CSS slide animation finishes
      const unmountTimer = setTimeout(() => {
        setMounted(false);
      }, 950); // Matches your 0.9s transition + a small buffer

      return () => clearTimeout(unmountTimer);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`tlr-intro ${isExiting ? "tlr-intro--exit" : ""}`}
        aria-hidden={isExiting}
      >
        <TLRLogo variant="splash" animated />

        <div className={`tlr-bar-wrap ${isExiting ? "tlr-filling" : ""}`}>
          <span className="tlr-bar-sweep" />
          <span
            className="tlr-bar-fill"
            style={{
              width: isExiting ? "100%" : "0%",
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        .tlr-intro {
          position: fixed;
          inset: 0;
          z-index: 10050;
          background: #080808;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          will-change: transform, opacity;
          pointer-events: auto;
          transform: translateY(0);
          opacity: 1;

          /* The transition is baked right into the component base */
          transition:
            transform 0.9s cubic-bezier(0.76, 0, 0.24, 1),
            opacity 0.9s ease;
        }

        /* When this class is appended, it smoothly transitions */
        .tlr-intro--exit {
          transform: translateY(-100%);
          opacity: 0;
          pointer-events: none;
        }

        .tlr-bar-wrap {
          position: relative;
          width: 120px;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
          opacity: 0;
          animation: tlrFadeIn 300ms ease forwards 900ms;
        }

        .tlr-bar-sweep {
          display: block;
          position: absolute;
          inset: 0;
          width: 50%;
          background: linear-gradient(90deg, transparent, #e8610a, transparent);
          animation: tlrSweep 1.4s ease-in-out infinite;
          transition: opacity 0.3s ease;
          opacity: 1;
        }

        .tlr-bar-fill {
          display: block;
          position: absolute;
          inset: 0;
          width: 0%;
          background: #e8610a;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
        }

        .tlr-filling .tlr-bar-sweep {
          opacity: 0;
          animation: none;
        }

        .tlr-filling .tlr-bar-fill {
          opacity: 1;
        }

        @keyframes tlrFadeIn {
          to {
            opacity: 1;
          }
        }
        @keyframes tlrSweep {
          0% {
            transform: translateX(-140%);
          }
          100% {
            transform: translateX(320%);
          }
        }
      `}</style>
    </>
  );
}
