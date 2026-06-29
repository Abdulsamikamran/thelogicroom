"use client";
import { useEffect, useRef } from "react";

export default function TLRIntro({ onComplete, duration = 3350 }) {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      onCompleteRef.current?.();
    }, duration);

    return () => window.clearTimeout(id);
  }, [duration]);

  return (
    <>
      <div className="tlr-intro" aria-hidden="true">
        <div className="tlr-logo">
          <span className="tlr-letter tlr-t">T</span>
          <span className="tlr-letter tlr-l">L</span>
          <span className="tlr-letter tlr-r">R</span>
          <div className="tlr-underline" />
        </div>

        <div className="tlr-wipe" />
      </div>

      <style jsx global>{`
        .tlr-intro {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          background: #0a0a0a;
          pointer-events: none;
        }

        .tlr-logo {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 0.06em;
          font-family:
            Inter,
            Helvetica Neue,
            Arial,
            sans-serif;
          font-size: clamp(72px, 18vw, 180px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          animation: tlrLogoHide 120ms linear forwards 2520ms;
        }

        .tlr-letter {
          opacity: 0;
          transform: translateY(24px);
          will-change: transform, opacity;
          animation: tlrIn 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .tlr-t {
          color: #fff;
          text-shadow: 0 0 14px rgba(255, 255, 255, 0.16);
          animation-delay: 0ms;
        }

        .tlr-l {
          color: #e8610a;
          text-shadow: 0 0 14px rgba(232, 97, 10, 0.22);
          animation-delay: 220ms;
        }

        .tlr-r {
          color: #fff;
          text-shadow: 0 0 14px rgba(255, 255, 255, 0.16);
          animation-delay: 440ms;
        }

        .tlr-underline {
          position: absolute;
          left: -12%;
          right: -12%;
          bottom: -0.14em;
          height: 2px;
          background: rgba(232, 97, 10, 0.12);
          opacity: 0;
          transform-origin: center;
          animation:
            tlrLineIn 300ms ease forwards 1300ms,
            tlrLinePulse 900ms ease-in-out infinite 1600ms;
        }

        .tlr-wipe {
          position: absolute;
          top: -35vh;
          left: -60vw;
          width: 42vw;
          height: 170vh;
          background: #0a0a0a;
          transform: rotate(-10deg);
          will-change: transform;
          animation: tlrWipe 850ms cubic-bezier(0.55, 0.055, 0.675, 0.19)
            forwards 2500ms;
        }

        .tlr-wipe::after {
          content: "";
          position: absolute;
          top: 0;
          right: -2px;
          width: 2px;
          height: 100%;
          background: #e8610a;
          box-shadow: 0 0 16px rgba(232, 97, 10, 0.7);
        }

        @keyframes tlrIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tlrLineIn {
          to {
            opacity: 1;
          }
        }

        @keyframes tlrLinePulse {
          0%,
          100% {
            opacity: 0.07;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.12;
            transform: scaleX(1.03);
          }
        }

        @keyframes tlrWipe {
          to {
            transform: translateX(190vw) rotate(-10deg);
          }
        }

        @keyframes tlrLogoHide {
          to {
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
