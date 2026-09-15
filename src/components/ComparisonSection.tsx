import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ComparisonSectionProps {
  onScrollToOffers: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onScrollToOffers }) => {
  return (
    <section className="py-14 sm:py-18 bg-slate-100 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs mb-3">
            مقارنة صريحة وشفافة ⚖️
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            المغنيسيوم العادي لم يعد كافياً!
          </h2>
          <p className="mt-2 text-base sm:text-lg text-blue-900 font-extrabold">
            لماذا تشتري عدة عبوات مختلفة بينما يمكنك الحصول على تركيبة متكاملة في عبوة واحدة؟
          </p>
        </div>

        {/* High-Impact Visual Comparison Card (Inspired by Pro E-Commerce Ad style) */}
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white shadow-2xl border border-blue-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual Side */}
            <div className="lg:col-span-6 relative p-6 sm:p-8 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border border-blue-500/30 bg-white">
                <img
                  src="/images/magnesium_exact_bottle_1789340675597.jpg"
                  alt="مكمل Magnesium Glycinate + Malate 2150mg"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-[11px] font-black">
                  <span className="bg-rose-600/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg">
                    ❌ عبوات عادية رخيصة (أكسيد)
                  </span>
                  <span className="bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-lg shadow-md">
                    ✓ Magnesium Glycinate + Malate الأصلي
                  </span>
                </div>
              </div>
            </div>

            {/* Bullet Points Side */}
            <div className="lg:col-span-6 p-6 sm:p-8 sm:pr-2 space-y-5 text-right">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  الفرق العلمي الواضح
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  تركيبة متطورة تعوضك عن مكملات منفصلة
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Point 1 */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-all flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm sm:text-base">استشفاء عضلي سريع ومباشر</h4>
                    <p className="text-slate-300 font-medium text-xs mt-1 leading-relaxed">
                      تركيبة متطورة تجمع بين جليسينات ومالات المغنيسيوم تمنع تشنجات الساقين والظهر (Les crampes) في أقل من أسبوع.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/40 transition-all flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm sm:text-base">نوم عميق وهادئ بدون تقطع</h4>
                    <p className="text-slate-300 font-medium text-xs mt-1 leading-relaxed">
                      يعبر حاجز الدماغ الدموي فوراً لتهدئة الجهاز العصبي ومستقبلات GABA والتخلص من قلق النوم والأرق المزعج.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-white text-sm sm:text-base">امتصاص فائق بدون أي إسهال</h4>
                    <p className="text-slate-300 font-medium text-xs mt-1 leading-relaxed">
                      عكس مكملات الصيدليات الرخيصة (Oxide) التي تسبب مغصاً وإسهالاً، تركيبتنا المخلبية لطيفة بنسبة 100% على المعدة.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to action inside visual */}
              <div className="pt-2">
                <button
                  onClick={onScrollToOffers}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>اكتشف العرض الحالي - الدفع عند الاستلام 🚚</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
