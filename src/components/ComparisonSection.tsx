import React from 'react';
import { CheckCircle2, XCircle, ShieldCheck, Zap, AlertTriangle, ArrowLeft } from 'lucide-react';

interface ComparisonSectionProps {
  onScrollToOffers: () => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ onScrollToOffers }) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs mb-3">
            مقارنة صريحة وشفافة ⚖️
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            علاش المغنيسيوم العادي الرخيص ما كيخدمش وكيسبب الإسهال؟
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            أغلب المكملات التجارية تستعمل أرخص أنواع المغنيسيوم (Oxide) الذي لا يمتصه الجسم ويتحول لملين معوي. شوف الفرق بين تركيبة Magnesium Complex المخلبية والأنواع العادية:
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-black text-slate-500 w-1/3">
                    معيار المقارنة
                  </th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-black text-slate-400 bg-slate-100/60 w-1/3">
                    مكملات المغنيسيوم العادية (Oxide)
                  </th>
                  <th className="p-4 sm:p-5 text-xs sm:text-sm font-black text-blue-950 bg-blue-50/80 border-r-2 border-blue-500 w-1/3">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>تركيبة Magnesium Complex المتقدمة</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    نوع ومركب المغنيسيوم
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 bg-slate-50/40">
                    أكسيد المغنيسيوم (Oxide) أو بحري غير مخلبي
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-blue-900 bg-blue-50/40 border-r-2 border-blue-500">
                    جليسينات + مالات مخلبية نقية (2150mg)
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    نسبة الامتصاص الحيوي بالجسم
                  </td>
                  <td className="p-4 sm:p-5 text-rose-600 font-semibold bg-slate-50/40 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>ضعيفة جداً (أقل من 4% فقط)</span>
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-blue-50/40 border-r-2 border-blue-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>فوق 90% امتصاص مباشر للخلايا</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    التأثير على المعدة والهضم
                  </td>
                  <td className="p-4 sm:p-5 text-rose-600 font-semibold bg-slate-50/40 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>يسبب إسهال حاد، انتفاخ، وحرقة معدية</span>
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-blue-50/40 border-r-2 border-blue-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>لطيف تماماً 100% بدون أي إسهال أو غازات</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    الوصول للدماغ وتهدئة الأعصاب والنوم
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 bg-slate-50/40">
                    لا يعبر الحاجز الدماغي، فائدته محدودة
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-blue-950 bg-blue-50/40 border-r-2 border-blue-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                      <span>يعبر للدماغ فوراً لتحفيز مستقبلات GABA المهدئة</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    طاقة العضلات ومنع التشنجات (Les Crampes)
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 bg-slate-50/40">
                    تأثير بطيء وغير ملحوظ
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-blue-950 bg-blue-50/40 border-r-2 border-blue-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600" />
                      <span>مالات تفاحية تدعم دورة كريبس وطاقة العضلات ATP</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    فيتامين D3 وخلاصات الخضار والبذور
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 bg-slate-50/40">
                    غير موجود، يحتوي على مواد حافظة وكيميائية
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-700 bg-blue-50/40 border-r-2 border-blue-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>مدعم بفيتامين D3 + بروكلي وسبانخ وبذور القرع</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900">
                    طريقة الشراء والضمان
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 bg-slate-50/40">
                    دفع مسبق بدون ضمان تجربة
                  </td>
                  <td className="p-4 sm:p-5 font-black text-blue-900 bg-blue-50/40 border-r-2 border-blue-500">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>الدفع عند الاستلام + ضمان 30 يوماً</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-slate-600 font-medium text-center sm:text-right">
              استثمر في صحتك وراحتك العصبية بتركيبة مدروسة علمياً ومجربة من آلاف المغاربة.
            </p>
            <button
              onClick={onScrollToOffers}
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black shadow-md shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              اختر باقتك الآن واطلب التوصيل المجاني
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
