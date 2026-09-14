import React from 'react';
import { Clock, Droplets, CalendarCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const HowToUseSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'الجرعة اليومية البسيطة',
      desc: 'تناول كبسولة واحدة (1) فقط يومياً مع كأس كبير من الماء. العلبة تحتوي على 30 كبسولة نباتية مركزة تكفي لشهر كامل من الاستعمال المنتظم.',
      icon: <Droplets className="w-5 h-5 text-blue-600" />,
      image: '/images/open_bottle_capsules_1789339349497.jpg',
      badge: 'كبسولة يومياً (30 كبسولة)',
    },
    {
      step: '02',
      title: 'أفضل توقيت لأقصى فائدة',
      desc: 'يفضل أخذ الكبسولة مساءً قبل النوم بـ 30 إلى 45 دقيقة لتهدئة الجهاز العصبي والدخول في نوم عميق، أو بعد وجبة الإفطار لدعم طاقة العضلات طوال اليوم.',
      icon: <Clock className="w-5 h-5 text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&w=600&q=80',
      badge: 'راحة ونوم عميق',
    },
    {
      step: '03',
      title: 'الاستمرارية والنتائج التراكمية',
      desc: 'ستشعر باسترخاء العضلات واختفاء التشنجات من الأيام الأولى. ولإعادة ملء مخازن المغنيسيوم في خلاياك بشكل دائم، ينصح بإتمام كورس شهرين (علبتين).',
      icon: <CalendarCheck className="w-5 h-5 text-emerald-600" />,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
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
              className="relative p-5 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Visual Step Illustration Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-video mb-4 bg-slate-200 border border-slate-200 shadow-xs">
                  <img
                    src={s.image}
                    alt={s.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 text-blue-900 text-xs font-black">
                    {s.icon}
                    <span>{s.badge}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 text-white font-mono text-xs font-black px-2 py-0.5 rounded-md">
                    خطوة {s.step}
                  </div>
                </div>

                <h3 className="text-base font-black text-slate-900 mb-1.5">{s.title}</h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {s.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>لطيف 100% على المعدة وسهل البلع</span>
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
