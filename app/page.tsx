import { NavBar } from '@/components/NavBar';
import { BenefitsSection } from '@/sections/BenefitsSection';
import { CategoriesSection } from '@/sections/CategoriesSection';
import { DemoSection } from '@/sections/DemoSection';
import { FinalCtaSection } from '@/sections/FinalCtaSection';
import { HowItWorksSection } from '@/sections/HowItWorksSection';
import { HeroSection } from '@/sections/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <NavBar />
      <main className="overflow-hidden">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <CategoriesSection />
        <BenefitsSection />
        <FinalCtaSection />
      </main>
    </div>
  );
}
