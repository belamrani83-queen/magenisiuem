import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert, HeartPulse, Moon, Zap, RefreshCw } from 'lucide-react';

export const BeforeAfterSection: React.FC<{ onScrollToOffers: () => void }> = ({ onScrollToOffers }) => {
  const [activeView, setActiveView] = useState<'both' | 'before' | 'after'>('both');

  const comparisons = [
    {
      title: 'جودة النوم والاستيقاظ الصباحي',
      before: 'أرق، تقلب مستمر فالفراش، استيقاظ مفزوع ومتقطع، وتستيقظ متعباً ومسخسخاً كأنك لم تنم.',
      after: 'استرخاء عضلي وعصبي كامل، نوم عميق متواصل لـ 7-8 ساعات، واستيقاظ حيوي وطاقة متدفقة.',
    },
    {
      title: 'تشنجات الساقين والعضلات (Les Crampes)',
      before: 'تشنج مباغت ومؤلم جداً في عضلة الساق أو الرقبة ليلاً أو أثناء المشي، وتيبس في فقرات الظهر.',
      after: 'ارتخاء فوري ومرونة تامة في الألياف العضلية، واختفاء كلي لتشنجات الساقين والشد العصبي.',
    },
    {
      title: 'المزاج وهدوء الأعصاب والتوتر',
      before: 'عصبية سريعة، ضيق في التنفس، خفقان مفاجئ وتوتر وقلق مستمر من أبسط تفاصيل اليوم.',
      after: 'سكينة وهدوء ذهني، توازن في إفراز هرمونات الضغط (الكورتيزول)، وقدرة ممتازة على التركيز.',
    },
    {
      title: 'تأثير المكمل على المعدة والجهاز الهضمي',
      before: 'المغنيسيوم الرخيص (Oxide) يسبب إسهالاً حاداً، غازات، وآلاماً مزعجة في المعدة دون أي فائدة.',
      after: 'تركيبة Glycinate مخلبية لطيفة 100% على جدار المعدة، تمتص مباشرة في الأمعاء بدون أي إسهال.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>الفرق الحقيقي والملموس في حياتك وصحتك</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            شاهد الفرق بنفسك: حياتك <span className="text-rose-600 underline decoration-rose-300">قبل</span> و <span className="text-emerald-600 underline decoration-emerald-300">بعد</span> استعمال المغنيسيوم المخلبي
          </h2>

          <p className="mt-3 text-base text-slate-600 font-normal">
            صور وتجارب واقعية توضح التحول الجذري من التعب الدائم والأرق وتشنجات الساقين إلى الراحة النفسية والجسدية الكاملة.
          </p>
        </div>

        {/* Real Visual Before & After Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-12">
          {/* Card 1: BEFORE (قبل) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-rose-200/80 shadow-lg shadow-rose-100/50 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Status Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>قبل: معاناة يومية مع نقص المغنيسيوم</span>
              </span>
              <span className="text-[11px] font-bold text-slate-400">اليوم 0</span>
            </div>

            {/* Real Image of Exhaustion/Insomnia */}
            <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-4/3 bg-slate-900 mb-5">
              <img
                src="/src/assets/images/before_fatigue_stress_1789335649943.jpg"
                alt="حالة التعب والأرق والصداع قبل أخذ المغنيسيوم"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs sm:text-sm font-black text-rose-200 leading-snug">
                  "أرق، صداع، عضلات متشنجة، واستيقاظ مفزوع ومتعب كل صباح..."
                </p>
              </div>
            </div>

            {/* Symptoms Bullet points */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50/70 border border-rose-100">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">✗</span>
                <span className="font-semibold text-rose-950">صعوبة في النوم والتقلب لساعات مع تفكير زائد وقلق</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50/70 border border-rose-100">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">✗</span>
                <span className="font-semibold text-rose-950">تشنجات مباغتة مؤلمة في بطة الساق (Les Crampes)</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-rose-50/70 border border-rose-100">
                <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">✗</span>
                <span className="font-semibold text-rose-950">خمول وعياء جسدي طيلة اليوم مع عصبية سريعة</span>
              </div>
            </div>
          </div>

          {/* Card 2: AFTER (بعد) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-300 shadow-xl shadow-emerald-100/60 flex flex-col justify-between relative overflow-hidden group">
            {/* Top Status Tag */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>بعد: راحة تامة وطاقة ونوم عميق</span>
              </span>
              <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                ابتداءً من الأسبوع الأول
              </span>
            </div>

            {/* Real Image of Vitality/Deep Sleep */}
            <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-4/3 bg-slate-900 mb-5">
              <img
                src="/src/assets/images/after_energy_sleep_1789335662790.jpg"
                alt="الاستيقاظ بنشاط وطاقة ونوم هادئ بعد استعمال المغنيسيوم"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs sm:text-sm font-black text-emerald-200 leading-snug">
                  "راحة عميقة، نشاط وحيوية من الصباح، واختفاء تام لتشنجات العضلات!"
                </p>
              </div>
            </div>

            {/* Recovery Bullet points */}
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span className="font-bold text-emerald-950">نوم عميق مسترسل وهادئ بدون تقطع ولا استيقاظ ليلي</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span className="font-bold text-emerald-950">ارتخاء وراحة فورية في أوتار الساقين والرقبة والظهر</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">✓</span>
                <span className="font-bold text-emerald-950">مزاج متزن، هدوء عصبي، وطاقة متدفقة في العمل</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Table of Benefits */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 text-center mb-6">
            مقارنة دقيقة: كيف يتغير جسمك مع المغنيسيوم المخلبي؟
          </h3>

          <div className="divide-y divide-slate-200 text-xs sm:text-sm">
            {comparisons.map((c, i) => (
              <div key={i} className="py-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 font-black text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>{c.title}</span>
                </div>

                <div className="md:col-span-4 p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-rose-950 font-medium">
                  <span className="font-black text-rose-700 block mb-1 text-[11px]">🔴 قبل:</span>
                  {c.before}
                </div>

                <div className="md:col-span-4 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 font-medium">
                  <span className="font-black text-emerald-700 block mb-1 text-[11px]">🟢 بعد:</span>
                  {c.after}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action trigger */}
        <div className="text-center">
          <button
            onClick={onScrollToOffers}
            className="py-4 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>ابدأ تجربتك اليوم واسترجع راحتك ونومك العميق</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
