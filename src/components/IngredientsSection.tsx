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
      </div>
    </section>
  );
};
