import React from 'react';
import { ShoppingBag, ShieldCheck, Truck, Star, ArrowDown, Moon, Zap, HeartPulse, CheckCircle2, MessageCircle, Clock, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onScrollToOffers: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToOffers,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-indigo-50/20 to-white pt-6 pb-14 sm:pt-10 sm:pb-20 border-b border-slate-200">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-teal-200/15 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Urgency Ribbon */}
        <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-amber-50 text-amber-900 border border-amber-300 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>عرض خاص اليوم: تخفيض يصل إلى 40% + توصيل مجاني لباب المنزل في كل المغرب</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Text & Conversion Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Trust Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>التركيبة الأكثر اكتمالاً وامتصاصاً بالمغرب (2150mg)</span>
              </span>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>مضمون وأصلي 100%</span>
              </span>
            </div>

            {/* Main Headline & Hook */}
            <div>
              <div className="inline-block bg-amber-100 text-amber-900 text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl border border-amber-300/80 mb-3 shadow-xs">
                ⚡ كتعاني من الأرق، الشقيقة، العياء الدائم، وتشنجات العضلات؟
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.25] tracking-tight">
                استرجع <span className="text-blue-700 underline decoration-blue-300">نومك العميق</span> وهدوء أعصابك، وتخلص نهائياً من الشقيقة، التشنجات والإرهاق!
              </h1>
            </div>

            {/* Short punchy subhook - easy to read, low text, high impact */}
            <div className="space-y-2.5">
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-snug">
                كبسولة وحدة فاليوم كتعطيك راحة فورية متكاملة:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-black text-slate-900">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-indigo-600 text-base">🌙</span>
                  <span>نوم عميق وهادئ بدون تقطع فالفراش</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-amber-500 text-base">⚡</span>
                  <span>اختفاء تشنجات الساقين والظهر (Les crampes)</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-emerald-600 text-base">🔋</span>
                  <span>طاقة ونشاط تفيق بيهم الصباح بلا عياء</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-blue-600 text-base">🧠</span>
                  <span>تهدئة الأعصاب والتخلص من الشقيقة والصداع</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-base text-slate-600 font-medium">
              تركيبة أمريكية مخلبية أصلية <strong className="text-blue-900 font-black">(Glycinate + Malate)</strong> أعلى امتصاص حيوي وخفيفة 100% على المعدة بدون إسهال.
            </p>

            {/* Primary Action Buttons (Conversion Triggers) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                id="hero-order-cta-btn"
                onClick={onScrollToOffers}
                className="flex-1 py-4 px-6 rounded-2xl font-black text-base sm:text-lg text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>اطلب الآن (الدفع عند الاستلام)</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href="https://wa.me/212700363949?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B7%D9%84%D8%A8%20%D9%85%D9%83%D9%85%D9%84%20Magnesium%20Complex"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-5 rounded-2xl font-black text-sm sm:text-base text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span>طلب سريع عبر الواتساب</span>
              </a>
            </div>

            {/* Social Proof & Guarantees */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold">توصيل مجاني وسريع لجميع مدن المغرب</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold">الدفع عند الاستلام</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="font-bold text-slate-800">+3,850 زبون راضٍ في المغرب</span>
              </div>
            </div>
          </div>

          {/* Product Bottle Visual & Trust Stamps */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative rounded-3xl overflow-hidden bg-white p-3.5 shadow-2xl border border-blue-100 group">
                <div className="relative rounded-2xl overflow-hidden aspect-square bg-gradient-to-b from-blue-50/50 to-slate-100 flex items-center justify-center">
                  <img
                    id="hero-product-image"
                    src="/images/magnesium_exact_bottle_1789340675597.jpg"
                    alt="مكمل Magnesium Glycinate + Malate 2150mg مع فيتامين D3"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />

                  {/* Corner Badges */}
                  <div className="absolute top-3 right-3 bg-blue-700 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md">
                    2150mg لكل حصة
                  </div>

                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-1.5 rounded-xl shadow-md flex items-center gap-1">
                    <span>مع فيتامين D3 ☀️</span>
                  </div>

                  {/* Guarantee & Specs */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-blue-200 text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>30 كبسولة نباتية نقية (شهر كامل)</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-sm">
                    لطيف على المعدة بدون إسهال
                  </div>
                </div>

                {/* Sub-card guarantees */}
                <div className="mt-3.5 p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>جودة صيدلانية مضمونة</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    صالح للرجال والنساء
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
