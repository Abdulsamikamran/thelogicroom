import { supabase } from "@/lib/supabase";
import type { NotableProduct } from "@/types";
import { CorridorClient } from "./CorridorClient";

const FALLBACK_PRODUCTS: NotableProduct[] = [
  {
    id: 1,
    tag: "VOICE_BOT_v1.0",
    title: [
      { text: "Voice", orange: true },
      { text: "Calling", orange: false },
      { text: "Bot", orange: true },
    ],
    description:
      "An automated voice agent that orchestrates natural, human-like voice communication workflows with intelligent decision routing.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    stats: ["Latency < 1.2s", "98% Accuracy", "Autonomous Dialing"],
    order_index: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    tag: "API_WHATSAPP_SECURE",
    title: [
      { text: "WhatsApp", orange: true },
      { text: "Inventory", orange: false },
      { text: "Management", orange: true },
    ],
    description:
      "Streamline logistics and warehouse operations instantly. Access stocks, place orders, and update logs directly via WhatsApp.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    stats: ["Instant Sync", "Multi-warehouse", "Zero-App Setup"],
    order_index: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    tag: "MAIL_AGENT_PROD",
    title: [
      { text: "Email", orange: true },
      { text: "Automation", orange: false },
    ],
    description:
      "Highly automated contextual email pipelines driven by custom LLM engines that read, draft, categorize, and answer complex queries.",
    image:
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1200&auto=format&fit=crop",
    stats: ["Context Aware", "Auto-Drafting", "CRM Integration"],
    order_index: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    tag: "OUTREACH_LINKEDIN",
    title: [
      { text: "LinkedIn", orange: true },
      { text: "Automation", orange: false },
    ],
    description:
      "Bespoke relational social campaigns engineered to source leads, initialize human conversations, and expand visual networks automatically.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    stats: ["Anti-Ban Logic", "Natural Delays", "AI Personalizer"],
    order_index: 4,
    created_at: new Date().toISOString(),
  },
];

export async function CorridorSection() {
  const { data: products, error } = await supabase
    .from("notable_products")
    .select("*")
    .order("order_index", { ascending: true });

  if (error || !products?.length) {
    console.error("Error fetching notable products:", error);
    return <CorridorClient products={FALLBACK_PRODUCTS} />;
  }

  return <CorridorClient products={products as NotableProduct[]} />;
}
