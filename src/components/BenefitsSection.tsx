import React from 'react';
import { Check, Clock, TrendingUp, Sparkles, Moon, Zap, ShieldCheck } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  return (
    <section id="benefits-section" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 mb-3">
            رحلة التغيير واستعادة الطاقة خطوة بخطوة
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            ماذا تتوقع عند الاستعمال اليومي لمكمل Magnesium Complex؟
          </h2>
          <p className="mt-3 text-base text-slate-600">
            مفعول علمي تراكمي يغذي الخلايا بالمعادن الحيوية لتهدئة الجهاز العصبي واستعادة طاقة العضلات الطبيعية.
          </p>
        </div>

        {/* 3 Step Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stage 1 */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-black mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>الأيام الأولى (1 - 7 أيام)</span>
              </span>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                استرخاء فوري واختفاء التشنجات
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>تلاشي تشنجات الساقين والبطات المزعجة (les crampes) أثناء الليل.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>الشعور بالهدوء وانخفاض التوتر العصبي وتشنجات القولون.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-blue-50/70 rounded-2xl p-6 border-2 border-blue-300 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/40 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-black mb-4">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>الأسابيع 2 - 3</span>
              </span>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                نوم عميق ونشاط بدني متجدد
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-700 font-bold shrink-0 mt-0.5" />
                  <span>الدخول في نوم عميق دون استيقاظ متكرر أو قلق منتصف الليل.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-700 font-bold shrink-0 mt-0.5" />
                  <span>الاستيقاظ الصباحي بنشاط وخفة تامة دون الإحساس بـ "الفشل" والإرهاق.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-100/50 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-black mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>الشهر الأول فما فوق</span>
              </span>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                توازن هرموني وصحة قلب وعظام قوية
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>تثبيت الكالسيوم في العظام بفضل تناغم فيتامين D3 مع المغنيسيوم.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>استقرار نبضات القلب وضغط الدم وصفاء التركيز الذهني طوال اليوم.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Who is it for banner */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                لمن ينصح بـ Magnesium Glycinate + Malate؟
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                مناسب للرجال والنساء: لكل من يبحث عن راحة الأعصاب وطاقة العضلات
              </h3>
              <p className="text-sm text-blue-100/90 leading-relaxed pt-1">
                مثالي لمن يعانون من ضغط العمل والتوتر، الرياضيين لتسريع استشفاء العضلات، كبار السن لدعم كثافة العظام، وكل من يبحث عن التخلص من الأرق والاستمتاع بنوم طبيعي مريح.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <div className="bg-blue-900/60 border border-blue-700/60 rounded-2xl p-4 w-full text-center">
                <p className="text-xs text-blue-200">العلبة تحتوي على:</p>
                <p className="text-lg font-black text-white mt-0.5">90 كبسولة نباتية نقية</p>
                <p className="text-[11px] text-blue-300/80 mt-1">2 إلى 3 كبسولات يومياً مع كأس ماء</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
