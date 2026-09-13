import React from 'react';
import { Quote, Heart, CheckCircle2, ChevronLeft, Moon, Zap, ShieldCheck } from 'lucide-react';
import { STORY_PARAGRAPHS } from '../data/content';

interface StorySectionProps {
  onScrollToOffers: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onScrollToOffers }) => {
  return (
    <section id="story-section" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200 mb-3">
            <Moon className="w-3.5 h-3.5 text-blue-700" />
            <span>قصة وتجربة حقيقية مع التعب والتوتر اليومي</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            "شحال من واحد فينا كيفيق كل صباح عيان ومسخسخ، مع تشنجات فالعضلات وتوتر كيعذب البال..."
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal">
            شهادة واقعية تشرح كيف أحدثت تركيبة Magnesium Glycinate + Malate فارقاً حقيقياً في جودة النوم، هدوء الأعصاب، واختفاء آلام وتشنجات العضلات بدون أي إسهال أو اضطراب هضمي.
          </p>
        </div>

        {/* Grid: Story breakdown + visual proof */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Visual image & emotional quote banner (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 group">
              <img
                id="story-vitality-image"
                src="/src/assets/images/after_energy_sleep_1789335662790.jpg"
                alt="الاستيقاظ بنشاط وحيوية ونوم عميق بفضل المغنيسيوم"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-4/3 object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wide">الراحة والنشاط المستعاد</span>
                <p className="text-base font-bold text-white mt-1 leading-snug">
                  "كتفيق الصباح خفيف، الأعصاب هادئة، والجسم كلو طاقة وحيوية لمواجهة نهارك براحة تامة."
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  <span>بدون أرق، وبدون تشنجات الساقين المؤلمة</span>
                </div>
              </div>
            </div>

            {/* Scientific Fact Box */}
            <div className="bg-blue-50/80 border border-blue-200/90 rounded-2xl p-5 text-slate-800">
              <div className="flex items-center gap-2 mb-2 text-blue-900 font-black text-sm">
                <Zap className="w-4 h-4 text-blue-700" />
                <span>علاش المغنيسيوم ضروري لكل إنسان؟</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                المغنيسيوم يشارك في أكثر من <strong>300 تفاعل كيميائي حيوي</strong> داخل جسمك يومياً. نقصه هو السبب الأول وراء التوتر المستمر، التشنج العضلي (les crampes)، والصداع النصفي، وصعوبة الاسترخاء ليلاً.
              </p>
            </div>

            {/* Quick reassurance */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <h4 className="font-bold text-slate-900">0% إسهال، 0% حموضة</h4>
                <p className="text-slate-500 mt-0.5">تركيبة جليسينات مخلبية لطيفة على المعدة وتتحملها الأمعاء بكل سهولة.</p>
              </div>
            </div>
          </div>

          {/* Timeline & Paragraphs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {STORY_PARAGRAPHS.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-7 h-7 rounded-xl bg-blue-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                    {idx + 1}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {item.text}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>{item.highlight}</span>
                </div>
              </div>
            ))}

            {/* Call to action below story */}
            <div className="pt-4 flex items-center justify-between">
              <button
                id="story-to-offers-btn"
                onClick={onScrollToOffers}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <span>ابدأ كورس المغنيسيوم دابا وشوف العروض المتاحة</span>
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
