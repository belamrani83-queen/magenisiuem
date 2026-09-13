import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Headphones, Award, CheckCircle2 } from 'lucide-react';

export const GuaranteesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>تسوق وأنت مرتاح البال 100%</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            التزاماتنا وضماناتنا الصارمة لحمايتك ورضاك
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            نحن واثقون تماماً من جودة وفعالية مكمل Magnesium Complex، ولهذا نقدم لك أعلى معايير الأمان والثقة في التجارة الإلكترونية بالمغرب.
          </p>
        </div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Cash on delivery after check */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                الدفع عند الاستلام
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                لا تدفع أي درهم مسبقاً! يصلك الطرد إلى باب منزلك، وتدفع مباشرة عند استلام طلبك بكل سهولة وأمان.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-bold text-blue-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>أمان تام وبدون أي مخاطرة</span>
            </div>
          </div>

          {/* Pillar 2: 30 Days Money Back */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                ضمان الرضا لمدة 30 يوماً
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                إذا التزمت بتعليمات الاستعمال ولم تلاحظ أي تحسن في نومك أو اختفاء لتشنجات عضلاتك، نوفر لك إمكانية استرجاع ثمن المنتج بكل سهولة.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ثقتك وراحتك أولويتنا</span>
            </div>
          </div>

          {/* Pillar 3: Free Express Shipping */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5 shadow-xs">
                <Truck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                توصيل مجاني وسريع
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                الشحن مجاني 100% لجميع المدن والمراكز المغربية (كازا، الرباط، فاس، طنجة، مراكش، أكادير، وجدة، وكافة الأقاليم) بدون أي رسوم خفية.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>تغليف محكم وعناية فائقة</span>
            </div>
          </div>

          {/* Pillar 4: Continuous Support */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-13 h-13 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5 shadow-xs">
                <Headphones className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                متابعة وخدمة عملاء مغربية
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                فريقنا المختص رهن إشارتك طوال الأسبوع عبر الواتساب والهاتف للإجابة على تساؤلاتك وتقديم نصائح الاستعمال الأمثل لنتائج سريعة.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] font-bold text-indigo-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>دعم متواصل 7 أيام / 7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
