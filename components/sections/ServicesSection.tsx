import { supabase } from "@/lib/supabase";
import type { Service } from "@/types";
import { ServicesClient } from "./ServicesClient";

const FALLBACK_SERVICES: Service[] = [
  {
    id: 1,
    number: "01",
    title: "Web Development",
    subtitle: "Frontend & Backend",
    description:
      "We craft bleeding-edge web applications with Next.js, React, and Node.js. Pixel-perfect UIs, performant APIs, and robust architectures that scale from launch to millions of users.",
    features: [
      "Next.js App Router & Server Components",
      "RESTful & GraphQL API Design",
      "Supabase / PostgreSQL / Redis",
      "Performance budgets & Core Web Vitals",
      "CI/CD pipelines & DevOps",
      "Design systems & component libraries",
    ],
    accent: "#FF6B00",
    order_index: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    number: "02",
    title: "AI Agents & Bots",
    subtitle: "Intelligent Automation",
    description:
      "We design and deploy AI systems that work for you around the clock. From customer support bots to fully autonomous agents that orchestrate complex multi-step workflows.",
    features: [
      "LLM-powered conversational agents",
      "LangChain / LangGraph orchestration",
      "RAG pipelines & vector databases",
      "Multi-agent collaboration systems",
      "Tool use & function calling",
      "Fine-tuning & model evaluation",
    ],
    accent: "#FF6B00",
    order_index: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    number: "03",
    title: "Mobile Development",
    subtitle: "Cross-Platform Apps",
    description:
      "We build stunning, native-feeling mobile experiences with Flutter. One codebase, two platforms — iOS and Android — without compromising on performance, animations, or feel.",
    features: [
      "Flutter & Dart for iOS & Android",
      "Custom animations & gesture systems",
      "Offline-first architecture",
      "Push notifications & deep linking",
      "App Store & Play Store deployment",
      "BLoC / Riverpod state management",
    ],
    accent: "#FF6B00",
    order_index: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    number: "04",
    title: "Brand & Design",
    subtitle: "Identity & Experience",
    description:
      "We shape how the world sees your product. From visual identity systems to motion design and interactive prototypes — we make sure your brand is impossible to ignore.",
    features: [
      "Logo & visual identity systems",
      "UI/UX design & wireframing",
      "Figma design systems & tokens",
      "Motion design & micro-interactions",
      "Brand guidelines & asset libraries",
      "Usability testing & user research",
    ],
    accent: "#FF6B00",
    order_index: 4,
    created_at: new Date().toISOString(),
  },
];

export async function ServicesSection() {
  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !services?.length) {
    console.error("Error fetching services:", error);
    return <ServicesClient services={FALLBACK_SERVICES} />;
  }

  return <ServicesClient services={services as Service[]} />;
}
