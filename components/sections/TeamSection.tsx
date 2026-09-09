import { supabase } from "@/lib/supabase";
import type { TeamMember } from "@/types";
import { TeamSectionClient } from "./TeamSectionClient";

const FALLBACK_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Shayan Khan",
    role: "Founder & CEO",
    image: "/shayanjpeg.jpeg",
    desc: "Turns wildly ambitious ideas into actual roadmaps and still finds time to ask, 'what if we made it even cooler?' five minutes before launch. Somehow chaos listens to him.",
    order_index: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Talha Asif",
    role: "Chief Operations Officer (COO)",
    image: "/talha.jpeg",
    desc: "Keeps the machine running smoothly, the timelines realistic, and the team from accidentally turning one task into a full-blown side quest.",
    order_index: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Abdul Sami",
    role: "Chief Technology Officer (CTO)",
    image: "/sami.jpeg",
    desc: "Architect of complex systems, hunter of mysterious bugs, and the reason production survives our 'small quick changes' that are never small or quick.",
    order_index: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Ibtisam",
    role: "Chief Business Development Officer (CBDO)",
    image: "/ibtesammain.png",
    desc: "Can turn a casual conversation into a partnership, a handshake into a pipeline, and a vague client brief into a very confident 'leave it with us.'",
    order_index: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Mubeen",
    role: "Chief Marketing Officer (CMO)",
    image: "/mubeen.jpeg",
    desc: "Makes brands louder, campaigns sharper, and analytics prettier. If conversions drop, he stares at dashboards until they feel personally responsible.",
    order_index: 5,
    created_at: new Date().toISOString(),
  },
];

export async function TeamSection() {
  const { data: members, error } = await supabase
    .from("team_members")
    .select("id, name, role, image, desc, order_index, created_at")
    .order("order_index", { ascending: true });

  if (error || !members?.length) {
    console.error("Error fetching team members:", error);
    return <TeamSectionClient members={FALLBACK_MEMBERS} />;
  }

  return <TeamSectionClient members={members as TeamMember[]} />;
}
