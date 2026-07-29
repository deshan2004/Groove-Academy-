import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedClassesPreview from "@/components/FeaturedClassesPreview";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <div className="bg-academy-black text-academy-white">
      <Hero />
      <FeaturesSection />
      <FeaturedClassesPreview />
      <CtaBanner />
    </div>
  );
}
