import React from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';

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
      {/* WhatsApp Quick Order button */}
      <a
        id="mobile-whatsapp-btn"
        href="https://wa.me/212700363949?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B7%D9%84%D8%A8%20%D9%85%D9%83%D9%85%D9%84%20Magnesium%20Complex"
        target="_blank"
        rel="noopener noreferrer"
        className="px-3.5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-md shadow-emerald-500/20 font-black text-xs"
        title="طلب عبر الواتساب (0700363949)"
      >
        <MessageCircle className="w-5 h-5 fill-white text-white" />
        <span>واتساب</span>
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
