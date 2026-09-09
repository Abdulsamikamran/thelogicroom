import { supabase } from "@/lib/supabase";
import type { Project } from "@/types";
import { ProjectsClient } from "./ProjectsClient";

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Aetheris AI",
    description:
      "Next-generation cognitive search layer and vector database orchestration tool for enterprise knowledge graphs.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    link: "https://aetheris-preview.vercel.app",
    category: "AI Agent",
    tags: ["Next.js", "LangChain", "Pinecone", "FastAPI"],
    order_index: 1,
    year: "2024",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Nova Genesis",
    description:
      "Immersive real-time Web3 portfolio tracking portal featuring procedural visualization nodes built on Three.js.",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop",
    link: "https://nova-genesis.vercel.app",
    category: "Web Development",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind"],
    order_index: 2,
    year: "2024",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Helios OS",
    description:
      "Autonomous operations control plane for smart energy grids and distributed hardware networks.",
    image:
      "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?q=80&w=1000&auto=format&fit=crop",
    link: "https://helios-control.vercel.app",
    category: "Web Development",
    tags: ["Vue 3", "Go", "InfluxDB", "WebSockets"],
    order_index: 3,
    year: "2023",
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Pulse Metrics",
    description:
      "Contextual real-time transaction monitoring engine utilizing machine learning models to detect fraud vectors.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    link: "https://pulse-analytics.vercel.app",
    category: "AI Agent",
    tags: ["Python", "PyTorch", "Next.js", "GraphQL"],
    order_index: 4,
    year: "2024",
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Synapse Chat",
    description:
      "Multi-modal automated agent managing global customer pipelines across WhatsApp, Slack, and Discord.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    link: "https://synapse-bot.vercel.app",
    category: "AI Agent",
    tags: ["Node.js", "OpenAI API", "Redis", "Twilio"],
    order_index: 5,
    year: "2023",
    created_at: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Orion Logistics",
    description:
      "E-commerce enterprise platform automating multi-warehouse inventories through a headless WhatsApp client API.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop",
    link: "https://orion-fleet.vercel.app",
    category: "Web Development",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Docker"],
    order_index: 6,
    year: "2024",
    created_at: new Date().toISOString(),
  },
];

export async function ProjectsSection() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !projects?.length) {
    console.error("Error fetching projects:", error);
    return <ProjectsClient projects={FALLBACK_PROJECTS} />;
  }

  return <ProjectsClient projects={projects as Project[]} />;
}
