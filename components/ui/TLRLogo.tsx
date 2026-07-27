"use client";

type TLRLogoProps = {
  variant?: "nav" | "splash";
  animated?: boolean;
  className?: string;
};

const variantStyles = {
  nav: "text-[1.625rem] md:text-[1.75rem]",
  splash: "text-[clamp(5rem,18vw,10rem)]",
};

export function TLRLogo({
  variant = "nav",
  animated = false,
  className = "",
}: TLRLogoProps) {
  const letterClass = animated ? "tlr-logo-letter" : "";

  return (
    <div
      className={`tlr-logo flex items-baseline gap-[0.04em] font-bold leading-none tracking-[-0.04em] ${variantStyles[variant]} ${className}`}
      aria-label="The Logic Room"
    >
      <span className={`text-white ${letterClass} tlr-logo-t`}>T</span>
      <span className={`text-[#e8610a] ${letterClass} tlr-logo-l`}>L</span>
      <span className={`text-white ${letterClass} tlr-logo-r`}>R</span>
    </div>
  );
}
