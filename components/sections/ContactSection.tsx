"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission — replace with your API route / Supabase insert
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="section-divider mb-20" />

      {/* Big orange glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-DEFAULT/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="w-8 h-px bg-orange-DEFAULT" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-orange-DEFAULT">
              Start a Conversation
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(3.5rem,10vw,9rem)] text-white leading-none tracking-tight"
              initial={{ y: "100%" }}
              animate={isHeaderInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              LET&apos;S BUILD
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(3.5rem,10vw,9rem)] text-orange-DEFAULT leading-none tracking-tight glow-text-orange"
              initial={{ y: "110%" }}
              animate={isHeaderInView ? { y: "0%" } : {}}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              TOGETHER.
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-lg text-white/50 leading-relaxed mb-12 max-w-md">
              Ready to build something remarkable? Drop us a line and tell us
              about your project. We respond within 24 hours, always.
            </p>

            <div className="flex flex-col gap-8">
              {[
                {
                  label: "Email Us",
                  value: "hello@thelogicroom.dev",
                  href: "mailto:hello@thelogicroom.dev",
                },
                {
                  label: "Book a Call",
                  value: "cal.com/thelogicroom",
                  href: "#",
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-xs tracking-widest uppercase text-white/30 mb-1">
                    {item.label}
                  </p>
                  <a
                    href={item.href}
                    className="font-body text-base text-white hover:text-orange-DEFAULT transition-colors duration-300 orange-line"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div className="mt-14 flex items-center gap-3">
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="font-mono text-xs tracking-widest uppercase text-white/40">
                Currently Accepting Projects — Q3 2025
              </span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {submitted ? (
              <motion.div
                className="border border-orange-DEFAULT/30 bg-orange-DEFAULT/5 p-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-4xl mb-4">✦</div>
                <h3 className="font-display text-3xl text-orange-DEFAULT mb-3">
                  Message Received
                </h3>
                <p className="font-body text-sm text-white/50">
                  We&apos;ll be in touch within 24 hours. Exciting things ahead.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Name */}
                <div className="group">
                  <label className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 focus:border-orange-DEFAULT outline-none py-3 font-body text-base text-white placeholder:text-white/20 transition-colors duration-300"
                    placeholder="Jane Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 focus:border-orange-DEFAULT outline-none py-3 font-body text-base text-white placeholder:text-white/20 transition-colors duration-300"
                    placeholder="jane@company.com"
                  />
                </div>

                {/* Project type */}
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-2">
                    Project Type
                  </label>
                  <select
                    value={formState.project}
                    onChange={(e) =>
                      setFormState({ ...formState, project: e.target.value })
                    }
                    className="w-full bg-black border-b border-white/10 focus:border-orange-DEFAULT outline-none py-3 font-body text-base text-white/60 transition-colors duration-300"
                  >
                    <option value="">Select a service</option>
                    <option value="web-dev">Web Development</option>
                    <option value="ai-agent">AI Agent / Bot</option>
                    <option value="both">Both</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formState.budget}
                    onChange={(e) =>
                      setFormState({ ...formState, budget: e.target.value })
                    }
                    className="w-full bg-black border-b border-white/10 focus:border-orange-DEFAULT outline-none py-3 font-body text-base text-white/60 transition-colors duration-300"
                  >
                    <option value="">Select a range</option>
                    <option value="5-15k">$5,000 – $15,000</option>
                    <option value="15-50k">$15,000 – $50,000</option>
                    <option value="50k+">$50,000+</option>
                    <option value="tbd">Not sure yet</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase text-white/30 block mb-2">
                    Tell Us About It *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 focus:border-orange-DEFAULT outline-none py-3 font-body text-base text-white placeholder:text-white/20 resize-none transition-colors duration-300"
                    placeholder="Describe your project, goals, and timeline..."
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="relative mt-4 font-mono text-sm tracking-widest uppercase px-8 py-5 bg-orange-DEFAULT text-black overflow-hidden disabled:opacity-60"
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                >
                  <AnimatedButtonContent submitting={submitting} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AnimatedButtonContent({ submitting }: { submitting: boolean }) {
  return submitting ? (
    <span className="flex items-center justify-center gap-3">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="inline-block w-4 h-4 border-2 border-black/40 border-t-black rounded-full"
      />
      Sending...
    </span>
  ) : (
    <span>Send Message →</span>
  );
}
