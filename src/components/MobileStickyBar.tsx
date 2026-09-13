import React from 'react';
import { ShoppingBag, MessageSquare, Phone } from 'lucide-react';

interface MobileStickyBarProps {
  onScrollToOffers: () => void;
  selectedPrice: number;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onScrollToOffers,
  selectedPrice,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl flex items-center gap-2">
      {/* Phone Call button */}
      <a
        id="mobile-call-btn"
        href="tel:+212600000000"
        className="p-3 rounded-xl bg-slate-100 text-slate-800 border border-slate-300 flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
        title="اتصال هاتفي مباشر"
      >
        <Phone className="w-4 h-4 text-blue-600" />
      </a>

      {/* WhatsApp Quick Order button */}
      <a
        id="mobile-whatsapp-btn"
        href="https://wa.me/212600000000?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B7%D9%84%D8%A8%20%D9%85%D9%83%D9%85%D9%84%20Magnesium%20Complex"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
        title="طلب عبر الواتساب"
      >
        <MessageSquare className="w-4 h-4 text-emerald-600" />
      </a>

      {/* Main Order Button */}
      <button
        id="mobile-sticky-order-btn"
        onClick={onScrollToOffers}
        className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm flex items-center justify-between shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-1.5 truncate">
          <ShoppingBag className="w-4 h-4 shrink-0" />
          <span className="truncate">اطلب الآن (الدفع عند الاستلام)</span>
        </div>
        <span className="font-black text-xs bg-blue-700/90 px-2 py-0.5 rounded shrink-0 mr-1">
          {selectedPrice} DH
        </span>
      </button>
    </div>
  );
};
