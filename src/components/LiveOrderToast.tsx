import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, X } from 'lucide-react';

const RECENT_ORDERS = [
  { name: 'محمد ب.', city: 'الدار البيضاء', pack: 'باقة علبتين (الأكثر طلباً)', time: 'منذ دقيقتين' },
  { name: 'سعاد ع.', city: 'الرباط (أكدال)', pack: 'باقة 3 علب (عرض العائلة)', time: 'منذ 5 دقائق' },
  { name: 'عمر م.', city: 'مراكش (جيليز)', pack: 'باقة علبتين (الأكثر طلباً)', time: 'منذ 9 دقائق' },
  { name: 'فاطمة الزهراء', city: 'طنجة', pack: 'باقة علبة واحدة', time: 'منذ 14 دقيقة' },
  { name: 'ياسين ك.', city: 'فاس', pack: 'باقة علبتين (الأكثر طلباً)', time: 'منذ 18 دقيقة' },
  { name: 'حنان د.', city: 'أكادير', pack: 'باقة 3 علب (عرض العائلة)', time: 'منذ 22 دقيقة' },
  { name: 'رشيد ت.', city: 'القنيطرة', pack: 'باقة علبتين (الأكثر طلباً)', time: 'منذ 27 دقيقة' },
];

export const LiveOrderToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after 4 seconds initially
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Loop interval
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_ORDERS.length);
        setIsVisible(true);
      }, 1000);
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const currentOrder = RECENT_ORDERS[currentIndex];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-sm hidden sm:block animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-200/90 flex items-center gap-3 relative">
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
          title="إغلاق"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <ShoppingBag className="w-5 h-5" />
        </div>

        <div className="min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-slate-900 truncate">
              {currentOrder.name}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">من {currentOrder.city}</span>
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          </div>

          <p className="text-[11px] text-blue-800 font-bold truncate mt-0.5">
            طلب للتو: {currentOrder.pack}
          </p>

          <span className="text-[10px] text-slate-400 font-medium">
            {currentOrder.time} • شحن مجاني
          </span>
        </div>
      </div>
    </div>
  );
};
