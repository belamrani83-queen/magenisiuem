import React from 'react';
import { Moon, Zap, BatteryLow, AlertCircle, ArrowDown } from 'lucide-react';

interface PainPointsSectionProps {
  onScrollToOffers: () => void;
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({ onScrollToOffers }) => {
  const painPoints = [
    {
      id: 'insomnia',
      icon: <Moon className="w-8 h-8 text-indigo-600" />,
      tag: 'الأرق وتقلب الفراش',
      title: 'كترمي راسك فالسرير وكتجلس تدور ساعتين وما كيجيكش النعاس؟',
      description: 'كتغمض عينيك ولكن عقلك باقي شغال بالتفكير، كتفيق مفزوع فأنصاص الليالي، والصباح كتفيق عيان كثر من فاش نعستي.',
      stat: '78% من المغاربة',
      statLabel: 'يعانون من اضطراب النوم بسبب نقص المغنيسيوم',
      bgColor: 'bg-indigo-50/70',
      borderColor: 'border-indigo-200',
    },
    {
      id: 'cramps',
      icon: <Zap className="w-8 h-8 text-amber-600" />,
      tag: 'تشنجات العضلات (Les Crampes)',
      title: 'كيجيك داك التشنج المفاجئ فالساق أو الكتف كيوقفك قفزة؟',
      description: 'تقلصات عضلية مؤلمة بلا سابق إنذار بالليل أو بعد مجهود بسيط، مع تيبس فالرقبة والظهر بسبب حرمان الألياف العضلية من الاسترخاء.',
      stat: 'أكثر من 300 تفاعل',
      statLabel: 'حيوي يتوقف في عضلاتك عند نقص المغنيسيوم',
      bgColor: 'bg-amber-50/70',
      borderColor: 'border-amber-200',
    },
    {
      id: 'fatigue',
      icon: <BatteryLow className="w-8 h-8 text-rose-600" />,
      tag: 'العياء المزمن وفقدان الطاقة',
      title: 'كتفيق الصباح مسخسخ وعظامك فاشلين وبلا خاطر؟',
      description: 'إحساس مستمر بالإرهاق، عصبية سريعة وتوتر على أبسط الأشياء، وصعوبة فالتركيز فالخدمة بحال يلا طاقتك مسالية من أول النهار.',
      stat: 'نقص حاد في ATP',
      statLabel: 'المسؤول عن إنتاج الطاقة في كل خلية بجسمك',
      bgColor: 'bg-rose-50/70',
      borderColor: 'border-rose-200',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-900 border border-rose-200 mb-3">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>واش كتحس بواحد من هاد الأعراض يومياً؟ ⚠️</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            هاد العلامات ماشي عادية... بل هي إنذار صريح من جسمك!
          </h2>

          <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
            أكثر من 80% من الناس كيعانيو من هاد المشاكل وكيظنو أنها فقط "عياء الخدمة"، فاش الحقيقة هي نقص حاد في معدن المغنيسيوم الحيوي.
          </p>
        </div>

        {/* 3 Pain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {painPoints.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border ${item.borderColor} ${item.bgColor} flex flex-col justify-between hover:shadow-md transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-black text-slate-700 bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-200/60 bg-white/60 p-3 rounded-xl">
                <span className="block text-xs font-black text-slate-900">{item.stat}</span>
                <span className="text-[11px] text-slate-500 font-medium">{item.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="max-w-2xl mx-auto text-center bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6">
          <p className="text-sm sm:text-base font-bold text-blue-950 mb-3">
            💡 الحل ماشي هو المنومات الكيميائية ولا مسكنات الألم المؤقتة... الحل هو تزويد جسمك بـ Magnesium Glycinate + Malate النقي وسريع الامتصاص.
          </p>
          <button
            onClick={onScrollToOffers}
            className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <span>شاهد العروض المتوفرة دابا وتخلص من التعب</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
