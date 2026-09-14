import React from 'react';
import { ShieldCheck, Activity, Zap, HeartPulse, Sun, Leaf, CheckCircle2 } from 'lucide-react';
import { INGREDIENTS } from '../data/content';

export const IngredientsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-500" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-600" />;
      case 'Sparkles':
        return <Leaf className="w-6 h-6 text-emerald-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-rose-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-blue-700" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="ingredients-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200 mb-3">
            تركيبة علمية طبيعية متكاملة (2150mg) 🧪
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            ما هو السر العلمي وراء تركيبة Magnesium Glycinate + Malate؟
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            مكونات دقيقة مخلبية مع خلاصات نباتية حية لضمان أقصى امتصاص خلوي، تهدئة الدماغ، وتجديد طاقة العضلات ومرونة العظام بدون إسهال.
          </p>
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-center">
                    {getIcon(ing.icon)}
                  </div>
                  <span className="text-[11px] font-black text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                    {ing.role}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {ing.nameAr}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {ing.nameEn}
                </p>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                  {ing.benefit}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-blue-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>أعلى امتصاص حيوي</span>
                </span>
                <span className="text-slate-500 font-medium">نباتي 100% بدون إسهال</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stomach safety and pure vegetal capsules banner without any salad photo */}
        <div className="mt-10 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-right">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-base sm:text-lg">
                كبسولات نباتية 100% نقية وسريعة الامتصاص
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                خالية تماماً من الغلوتين، السكر، والمواد الحافظة. تركيبة لطيفة 100% على المعدة والأمعاء بدون أي إسهال.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-black text-emerald-800 shrink-0">
            <span className="bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              ✓ 0% إسهال أو حموضة
            </span>
            <span className="bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              ✓ خفيف وسهل البلع
            </span>
            <span className="bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
              ✓ مناسب لمرضى السكري
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
