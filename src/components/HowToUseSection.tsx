import React from 'react';
import { Clock, Droplets, CalendarCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const HowToUseSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'الجرعة اليومية البسيطة',
      desc: 'تناول كبسولتين (2) يومياً مع كأس كبير من الماء. العلبة تحتوي على 90 كبسولة نباتية تكفي لشهر ونصف من الاستعمال المنتظم.',
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
      badge: 'جرعة مدروسة',
    },
    {
      step: '02',
      title: 'أفضل توقيت لأقصى فائدة',
      desc: 'يفضل أخذ الكبسولتين مساءً قبل النوم بـ 30 إلى 45 دقيقة لتهدئة الدماغ والدخول في نوم عميق، أو توزيع حبة صباحاً وحبة مساءً لدعم طاقة العضلات طوال اليوم.',
      icon: <Clock className="w-6 h-6 text-indigo-600" />,
      badge: 'راحة ليلية تامة',
    },
    {
      step: '03',
      title: 'الاستمرارية والنتائج التراكمية',
      desc: 'ستشعر باسترخاء العضلات واختفاء التشنجات من الأيام الأولى. ولإعادة ملء مخازن المغنيسيوم في خلاياك بشكل دائم، ينصح بإتمام كورس شهرين (علبتين).',
      icon: <CalendarCheck className="w-6 h-6 text-emerald-600" />,
      badge: 'نتائج مستدامة',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200 mb-3">
            طريقة الاستعمال السهلة 💊
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            كيفاش تستعمل Magnesium Complex باش تاخد أحسن نتيجة؟
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            خطوات بسيطة تضمن لك امتصاصاً سريعاً دون أي إزعاج للمعدة.
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-xs font-black text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                    {s.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black text-slate-400 font-mono">خطوة {s.step}</span>
                  <h3 className="text-base font-black text-slate-900">{s.title}</h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>لطيف 100% على المعدة</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance pill */}
        <div className="mt-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-emerald-950 font-bold text-center sm:text-right">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>معلومات إضافية أو استشارة مجانية؟ فريقنا رهن إشارتك بالمجان بعد استلام الطرد لمتابعة النتائج معك!</span>
          </div>
          <span className="bg-white text-emerald-800 px-3 py-1 rounded-xl border border-emerald-300 shadow-2xs whitespace-nowrap">
            متابعة مجانية 7/7
          </span>
        </div>
      </div>
    </section>
  );
};
