import React from 'react';
import { Star, CheckCircle2, User, ThumbsUp, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/content';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>تجارب حقيقية موثقة من زبنائنا في المغرب ⭐</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            "واللي زاد طمّنّا هو أن بزاف ديال الناس تبدلات حياتهم ونومهم للأفضل..."
          </h2>

          <p className="mt-3 text-base text-slate-600 font-normal">
            تجارب حقيقية لمغاربة من مختلف المدن تخلصوا من الأرق، العياء المزمن، وتشنجات العضلات اليومية مع تركيبة Magnesium Glycinate + Malate.
          </p>

          {/* Aggregate Rating Stat Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 py-3 px-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-800">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="text-slate-900 font-black text-base">4.9 / 5</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600">بناءً على أكثر من 3,850 تقييم مؤكد في المغرب</span>
            <span className="text-slate-400">|</span>
            <span className="text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>مشتريات حقيقية 100%</span>
            </span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-900 font-bold">
                      <User className="w-6 h-6 text-blue-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-base text-slate-900">
                          {rev.name}
                        </h4>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>مشتري مؤكد</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {rev.city} • <span className="text-blue-700 font-semibold">{rev.userType}</span>
                      </p>
                    </div>
                  </div>

                  {/* Verified Delivery pill */}
                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                    {rev.date}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                  <span className="text-xs text-slate-500 mr-2 font-bold">تجربة ممتازة</span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
                  <span>وجد هذا التقييم مفيداً (28)</span>
                </span>
                <span className="text-emerald-700 font-bold">تم استلام الطرد وتأكيد الطلب</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
