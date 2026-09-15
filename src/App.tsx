import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PainPointsSection } from './components/PainPointsSection';
import { ComparisonSection } from './components/ComparisonSection';
import { BenefitsSection } from './components/BenefitsSection';
import { HowToUseSection } from './components/HowToUseSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { RealProofSection } from './components/RealProofSection';
import { GuaranteesSection } from './components/GuaranteesSection';
import { WhatsAppReviewsSection } from './components/WhatsAppReviewsSection';
import { OffersAndOrderForm } from './components/OffersAndOrderForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { LiveOrderToast } from './components/LiveOrderToast';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { PACKAGE_OFFERS } from './data/content';
import { trackTikTokViewContent } from './lib/tiktokPixel';

export default function App() {
  const [selectedPackId, setSelectedPackId] = useState<string>('pack-2'); // Best seller pack default (2 bottles)
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Track TikTok ViewContent on initial page load
  useEffect(() => {
    trackTikTokViewContent('Magnesium Glycinate + Malate 2150mg', 229, 'magnesium-glycinate');
  }, []);

  // Allow admin access via URL hash (#admin) or keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const checkAdminHash = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setIsAdminOpen(true);
      }
    };
    checkAdminHash();
    window.addEventListener('hashchange', checkAdminHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const selectedOffer = PACKAGE_OFFERS.find((p) => p.id === selectedPackId) || PACKAGE_OFFERS[1];

  const scrollToOffers = () => {
    const el = document.getElementById('offers-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900 font-['Tajawal',sans-serif]">
      {/* Top Header Navigation (Clean for customers, no admin icon) */}
      <Navbar
        onScrollToOffers={scrollToOffers}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with high-converting value proposition and bottle visual */}
        <HeroSection
          onScrollToOffers={scrollToOffers}
        />

        {/* 2. Pain Points & Symptoms Agitation (Insomnia, Cramps, Fatigue) */}
        <PainPointsSection onScrollToOffers={scrollToOffers} />

        {/* 3. Definitive comparison against cheap supermarket/pharmacy oxide magnesium */}
        <ComparisonSection onScrollToOffers={scrollToOffers} />

        {/* 4. Clear recovery timeline & physical progression */}
        <BenefitsSection />

        {/* 5. Real Visual Before & After Transformation Section */}
        <BeforeAfterSection onScrollToOffers={scrollToOffers} />

        {/* 6. Certificate of Quality & Authentic Social Proof Banners */}
        <RealProofSection onScrollToOffers={scrollToOffers} />

        {/* 7. Step-by-step How-To-Use guide for friction-free adoption */}
        <HowToUseSection />

        {/* 8. Rigorous guarantees (Cash on delivery, 30-day money back, free shipping) */}
        <GuaranteesSection />

        {/* 9. WhatsApp Conversations & Visual Social Proof */}
        <WhatsAppReviewsSection />

        {/* 10. Packaging tiers & streamlined Cash on Delivery order form with 1-click selector */}
        <OffersAndOrderForm
          selectedPackId={selectedPackId}
          onSelectPack={(id) => setSelectedPackId(id)}
        />

        {/* 11. Frequently asked questions tackling buyer hesitation */}
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
