import { HomePageClient } from "@/components/pages/HomePageClient";
import { CorridorSection } from "@/components/sections/CorridorSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <HomePageClient
      servicesSection={
        <div className="bg-black/70 backdrop-blur-sm">
          <ServicesSection />
        </div>
      }
      corridorSection={<CorridorSection />}
      projectsSection={
        <div className="bg-black/60 backdrop-blur-md">
          <ProjectsSection />
        </div>
      }
      teamSection={
        <div className="bg-black/65 backdrop-blur-sm">
          <TeamSection />
        </div>
      }
    />
  );
}
