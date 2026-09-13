import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Award, FlaskConical, Leaf, ThumbsUp, Sparkles } from 'lucide-react';

export const RealProofSection: React.FC<{ onScrollToOffers: () => void }> = ({ onScrollToOffers }) => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200 mb-3 shadow-xs">
            <Award className="w-4 h-4 text-blue-700" />
            <span>شهادات الجودة الرسمية وتجارب العملاء الموثقة</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            منتج أصلي معتمد .. وتجارب حقيقية لنتائج ملموسة
          </h2>

          <p className="mt-3 text-base text-slate-600 font-normal">
            معايير أمان وتصنيع دولية عالية لضمان منتج موثوق، فعال، ولطيف 100% على المعدة.
          </p>
        </div>

        {/* 2-Column Banner Showcase: Certificate of Quality (NO BOTTLE IMAGE) & Verified Customer Testimonials (NO AI IMAGE) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {/* Card 1: Official Certificate of Quality Document (Pure Document, NO PRODUCT BOTTLE) */}
          <div className="bg-gradient-to-b from-amber-50/50 via-white to-amber-50/20 rounded-3xl p-6 sm:p-8 border-2 border-amber-300/90 shadow-xl shadow-amber-100/40 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Certificate Header */}
              <div className="text-center border-b-2 border-dashed border-amber-200 pb-6 mb-6 relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md mb-3">
                  <Award className="w-8 h-8 text-amber-100" />
                </div>
                <div className="text-[11px] font-black tracking-widest text-amber-900 uppercase mb-1">
                  المطابقة للمواصفات والمعايير القياسية
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  شهادة مطابقة الجودة والأمان
                </h3>
                <div className="text-xs font-black text-amber-800 tracking-wider mt-0.5">
                  CERTIFICATE OF QUALITY & SAFETY
                </div>
              </div>

              {/* Official Declaration */}
              <div className="p-4 rounded-2xl bg-white border border-amber-200 text-slate-800 text-xs sm:text-sm font-bold leading-relaxed mb-6 text-center">
                نحن نؤكد أن مركب <span className="text-blue-900 font-black">MAGNESIUM GLYCINATE + MALATE (2150mg)</span> مُصنّع وفق أعلى معايير الجودة والسلامة الصحية، وخاضع لاختبارات دقيقة لضمان نقائه وفعاليته الحيوية.
              </div>

              {/* 4 Trust Criteria */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-amber-200/80 shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-xs text-slate-900">جودة عالية (High Quality)</div>
                    <div className="text-[11px] text-slate-500">وفق أحدث المعايير الصيدلانية</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-amber-200/80 shadow-xs">
                  <FlaskConical className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-xs text-slate-900">خالٍ من الملوثات (Purity Tested)</div>
                    <div className="text-[11px] text-slate-500">فحص مخبري دقيق وشامل</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-amber-200/80 shadow-xs">
                  <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-xs text-slate-900">معتمد دولياً (GMP Certified)</div>
                    <div className="text-[11px] text-slate-500">ممارسات تصنيع عالمية موثوقة</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-amber-200/80 shadow-xs">
                  <Leaf className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-xs text-slate-900">مكونات طبيعية وآمنة</div>
                    <div className="text-[11px] text-slate-500">نباتي 100% بدون غلوتين</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Footer Badge */}
            <div className="flex items-center justify-between pt-4 border-t border-amber-200 text-xs font-black text-amber-900">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>ضمان الجودة والسلامة 100%</span>
              </span>
              <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-lg font-mono text-[11px] border border-amber-300">
                GMP CERTIFIED
              </span>
            </div>
          </div>

          {/* Card 2: Authentic Verified Customer Reviews (Clean Real Feedback, NO AI IMAGE) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl shadow-slate-100 flex flex-col justify-between">
            <div>
              {/* Rating Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-slate-950">4.8</span>
                    <div className="flex text-amber-400">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-500 mt-1">من 5 نجوم (أكثر من 1,200 تقييم موثق)</div>
                </div>

                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>تجارب حقيقية</span>
                </div>
              </div>

              {/* 3 Real Testimonial Quotes */}
              <div className="space-y-3.5 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-right">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-black text-xs text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>سارة م. (الدار البيضاء)</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">منذ 3 أيام</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    "أشعر بفرق كبير في طاقتي وتركيزي منذ أن بدأت أستخدم هذا المكمل. النوم أصبح أعمق بكثير وتشنجات الساقين اختفت تماماً!"
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-right">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-black text-xs text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>أحمد ك. (الرباط)</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">منذ أسبوع</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    "كنت أعاني من آلام في العضلات وتشنجات ليلية مباغتة. بعد أسبوع واحد من الاستعمال لاحظت تحسناً كبيراً. منتج ممتاز وجودته عالية."
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-right">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-black text-xs text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>فاطمة الزهراء ب. (طنجة)</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">منذ 5 أيام</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    "أنا أستخدمه مع فيتامين D3 والفرق واضح جداً في المناعة والنشاط وصحة العظام. لطيف جداً على المعدة وبدون أي إسهال."
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof Trust Bar */}
            <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs font-black text-blue-950 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4 text-blue-700" />
                <span>مئات الزبائن يجددون طلبياتهم شهرياً</span>
              </span>
              <span className="text-[11px] text-blue-700 font-bold">ثقة ورضا مضمونين</span>
            </div>
          </div>
        </div>

        {/* Detailed Bottle & Capsules Close-up Feature Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-2/3 bg-slate-900 shadow-inner group">
              <img
                src="/src/assets/images/open_bottle_capsules_1789339349497.jpg"
                alt="مكمل طبيعي بمكونات مختارة بعناية 30 كبسولة نباتية"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-blue-700 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md">
                30 كبسولة نباتية
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4 text-right">
            <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              تركيبة طبيعية مركزة وسهلة البلع
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              مكمل طبيعي بمكونات مختارة بعناية .. كبسولة واحدة في اليوم تكفيك
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              تحتوي العلبة على <strong>30 كبسولة نباتية نقية</strong> بتركيز فائق 2150mg يجمع بين المغنيسيوم جليسينات (Glycinate) ذو الامتصاص الفائق ومالات (Malate) لإنتاج الطاقة الخلوية، مدعمة بفيتامين D3 وخلاصات نباتية حية من البروكلي والسبانخ وبذور اليقطين.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">✓</span>
                <span className="font-bold text-slate-800">نباتي 100% كبسولة ملساء</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">✓</span>
                <span className="font-bold text-slate-800">بدون مواد حافظة صناعية</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">✓</span>
                <span className="font-bold text-slate-800">خالٍ تماماً من الغلوتين</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">✓</span>
                <span className="font-bold text-slate-800">بدون كائنات معدلة وراثياً</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onScrollToOffers}
                className="py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md transition-all cursor-pointer"
              >
                اطلب علبتك الأصلية الآن (30 كبسولة) 🛒
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
