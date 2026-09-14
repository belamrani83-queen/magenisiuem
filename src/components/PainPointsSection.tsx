import React from 'react';
import { Moon, Zap, BatteryLow, AlertCircle, ArrowDown } from 'lucide-react';

interface PainPointsSectionProps {
  onScrollToOffers: () => void;
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({ onScrollToOffers }) => {
  const painPoints = [
    {
      id: 'insomnia',
      icon: <Moon className="w-6 h-6 text-indigo-600" />,
      image: '/images/person_insomnia_bed_1789414618998.jpg',
      tag: 'الأرق وصعوبة النوم',
      title: 'كترمي راسك فالسرير وكتجلس تدور ساعتين وعقلك شغال بالتفكير؟',
      description: 'كتغمض عينيك والعقل ما كايرتاحش، كتفيق مفزوع بالليل والصباح كتفيق عيان ومسخسخ كأنك ما نعستيش.',
      stat: '78% من المغاربة',
      statLabel: 'يعانون من اضطراب النوم بسبب نقص المغنيسيوم',
      bgColor: 'bg-indigo-50/70',
      borderColor: 'border-indigo-200',
    },
    {
      id: 'cramps',
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      image: '/images/person_leg_cramp_1789414634861.jpg',
      tag: 'تشنجات العضلات (Les Crampes)',
      title: 'داك التشنج المباغت فالساق أو الكتف كيوقفك قفزة بالليل؟',
      description: 'ألم حاد ومفاجئ يخلي عضلاتك مصلبة مع تيبس بالرقبة والظهر بسبب حرمان العضلات من معدن الاسترخاء.',
      stat: 'أكثر من 300 وظيفة حيوية',
      statLabel: 'تتوقف في عضلاتك بمجرد نقص المغنيسيوم',
      bgColor: 'bg-amber-50/70',
      borderColor: 'border-amber-200',
    },
    {
      id: 'fatigue',
      icon: <BatteryLow className="w-6 h-6 text-slate-700" />,
      image: '/images/person_fatigue_drain_1789414650138.jpg',
      tag: 'العياء المزمن وفقدان الطاقة',
      title: 'كتفيق الصباح فاشل ومسخسخ وبلا خاطر لأبسط حاجة؟',
      description: 'عصبية سريعة، دوخة خفيفة، وصعوبة فالتركيز بحال طاقتك سالات من أول النهار قبل ما تبدا.',
      stat: 'انخفاض مباشر في إنتاج طاقة ATP',
      statLabel: 'المسؤولة عن حيوية ونشاط كل خلية في جسمك',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
    },
    {
      id: 'migraine',
      icon: <AlertCircle className="w-6 h-6 text-rose-600" />,
      image: '/images/person_migraine_head_1789414662889.jpg',
      tag: 'الشقيقة والصداع العصبي',
      title: 'ألم نابض فجهة من راسك كيخليك ما قادرش حتى تحل عينيك؟',
      description: 'حساسية مفرطة من الضوء والصوت، وغثيان كيوقفك على نهارك وما كينفع معاه حتى مسكن مؤقت.',
      stat: 'نقص المغنيسيوم يسبب تشنج شرايين المخ',
      statLabel: 'المسبب الرئيسي لنوبات الصداع والشقيقة الحادة',
      bgColor: 'bg-rose-50/80',
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

        {/* 4 Pain Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {painPoints.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border ${item.borderColor} ${item.bgColor} flex flex-col justify-between hover:shadow-md transition-all overflow-hidden`}
            >
              <div>
                {/* Photo preview for quick visual understanding */}
                <div className="relative rounded-2xl overflow-hidden aspect-video mb-4 bg-slate-200 border border-slate-200 shadow-xs">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 text-slate-800 text-xs font-black">
                    {item.icon}
                    <span>{item.tag}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-2">
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
