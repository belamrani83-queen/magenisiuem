import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { StorySection } from './components/StorySection';
import { ComparisonSection } from './components/ComparisonSection';
import { IngredientsSection } from './components/IngredientsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { HowToUseSection } from './components/HowToUseSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { VisualGallerySection } from './components/VisualGallerySection';
import { RealProofSection } from './components/RealProofSection';
import { GuaranteesSection } from './components/GuaranteesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WhatsAppReviewsSection } from './components/WhatsAppReviewsSection';
import { OffersAndOrderForm } from './components/OffersAndOrderForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { LiveOrderToast } from './components/LiveOrderToast';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { PACKAGE_OFFERS } from './data/content';

export default function App() {
  const [selectedPackId, setSelectedPackId] = useState<string>('pack-2'); // Best seller pack default (2 bottles)
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const selectedOffer = PACKAGE_OFFERS.find((p) => p.id === selectedPackId) || PACKAGE_OFFERS[1];

  const scrollToOffers = () => {
    const el = document.getElementById('offers-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('story-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900 font-['Tajawal',sans-serif]">
      {/* Top Header Navigation */}
      <Navbar
        onScrollToOffers={scrollToOffers}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with high-converting value proposition and bottle visual */}
        <HeroSection
          onScrollToOffers={scrollToOffers}
          onScrollToStory={scrollToStory}
        />

        {/* 2. Pain Points & Symptoms Agitation (Insomnia, Cramps, Fatigue) */}
        <PainPointsSection onScrollToOffers={scrollToOffers} />

        {/* 3. Emotional and relatable customer story (Insomnia, Cramps, Stress) */}
        <StorySection onScrollToOffers={scrollToOffers} />

        {/* 4. Definitive comparison against cheap supermarket/pharmacy oxide magnesium */}
        <ComparisonSection onScrollToOffers={scrollToOffers} />

        {/* 5. Scientific formulation: Pure chelated glycinate + malate + D3 */}
        <IngredientsSection />

        {/* 6. Clear recovery timeline & physical progression */}
        <BenefitsSection />

        {/* 6.1 Real Visual Before & After Transformation Section */}
        <BeforeAfterSection onScrollToOffers={scrollToOffers} />

        {/* 6.2 Real Product & Natural Ingredients Visual Gallery Showcase */}
        <VisualGallerySection onScrollToOffers={scrollToOffers} />

        {/* 6.3 Certificate of Quality & Authentic Social Proof Banners */}
        <RealProofSection onScrollToOffers={scrollToOffers} />

        {/* 7. Step-by-step How-To-Use guide for friction-free adoption */}
        <HowToUseSection />

        {/* 8. Rigorous guarantees (Cash on delivery, 30-day money back, free shipping) */}
        <GuaranteesSection />

        {/* 9. Real verified customer reviews from Moroccan cities */}
        <ReviewsSection />

        {/* 10. WhatsApp Conversations & Visual Social Proof */}
        <WhatsAppReviewsSection />

        {/* 11. Packaging tiers & streamlined Cash on Delivery order form with 1-click selector */}
        <OffersAndOrderForm
          selectedPackId={selectedPackId}
          onSelectPack={(id) => setSelectedPackId(id)}
        />

        {/* 12. Frequently asked questions tackling buyer hesitation */}
        <FaqSection />
      </main>

      {/* Trust-rich Footer */}
      <Footer
        onScrollToTop={scrollToTop}
        onScrollToOffers={scrollToOffers}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Mobile Sticky Bar for quick conversions */}
      <MobileStickyBar
        onScrollToOffers={scrollToOffers}
        selectedPrice={selectedOffer.price}
      />

      {/* Real-time social proof toast for recent orders in Morocco */}
      <LiveOrderToast />

      {/* Admin CRM and Google Sheets Sync Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
