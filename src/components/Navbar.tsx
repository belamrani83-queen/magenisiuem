import React from 'react';
import { ShieldCheck, ShoppingBag, MessageCircle, PhoneCall, CheckCircle2, Award, Table } from 'lucide-react';

interface NavbarProps {
  onScrollToOffers: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToOffers }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Urgent Trust Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs sm:text-sm py-2 px-4 text-center font-bold flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>🚚 شحن مجاني وسريع لجميع مدن المغرب • الدفع عند الاستلام 📦</span>
      </div>

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-200 font-black text-xl tracking-tight">
            MG
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight">Magnesium Complex</span>
              <span className="text-[10px] uppercase font-black bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded border border-blue-200">
                2150mg
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Glycinate + Malate • مع فيتامين D3 والخضار والبذور
            </p>
          </div>
        </div>

        {/* Trust Badges & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Trust verification pill */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>منتج أصلي ومضمون 100%</span>
          </div>

          {/* WhatsApp Direct Order link */}
          <a
            id="nav-whatsapp-link"
            href="https://wa.me/212700363949?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B3%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D9%85%D9%83%D9%85%D9%84%20Magnesium%20Complex"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-black text-white bg-[#25D366] hover:bg-[#20bd5a] px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span>طلب عبر WhatsApp</span>
          </a>

          {/* Quick Order CTA Button */}
          <button
            id="nav-order-button"
            onClick={onScrollToOffers}
            className="flex items-center gap-2 text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 active:scale-95 px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>اطلب الآن (الدفع عند الاستلام)</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
