import React, { useState } from 'react';
import { Sparkles, Eye, ShieldCheck, Truck, Package, Leaf, Award, HeartHandshake } from 'lucide-react';

export const VisualGallerySection: React.FC<{ onScrollToOffers: () => void }> = ({ onScrollToOffers }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const galleryItems = [
    {
      id: 'bottle-real',
      tag: 'صورة المنتج الرسمية',
      title: 'العلبة الأصلية Magnesium Complex 2150mg',
      description: 'تصميم صيدلاني معتمد بتركيز قوي 2150mg مع 30 كبسولة نباتية مركزة تكفي لشهر كامل، تجمع بين Glycinate و Malate مع فيتامين D3 وخلاصات الخضار والبذور الحية.',
      image: '/src/assets/images/magnesium_exact_bottle_1789340675597.jpg',
      badge: 'الأصلي 2150mg',
    },
    {
      id: 'capsules-open',
      tag: 'كبسولات نباتية نقية',
      title: 'مكمل طبيعي بمكونات مختارة بعناية (30 كبسولة)',
      description: 'كبسولات نباتية سريعة التحلل والامتصاص، بدون كائنات معدلة وراثياً، خالية من الغلوتين، ولطيفة بنسبة 100% على المعدة دون أي إسهال.',
      image: '/src/assets/images/open_bottle_capsules_1789339349497.jpg',
      badge: '30 كبسولة نباتية',
    },
    {
      id: 'ingredients',
      tag: 'المكونات والأغذية الفائقة',
      title: 'مكونات طبيعية مرافقة للعلبة الأصلية',
      description: 'تركيبة غذائية متوازنة تجمع بين السبانخ، البروكلي وبذور اليقطين الطبيعية إلى جانب فيتامين D3 لتعزيز امتصاص كبسولات المغنيسيوم في الجسم بشكل طبيعي.',
      image: '/src/assets/images/prod_ingredients_display_1789340878650.jpg',
      badge: 'طبيعي 100%',
    },
    {
      id: 'delivery',
      tag: 'التغليف والتوصيل بالمغرب',
      title: 'علبة المنتج الأصلية داخل طرد التوصيل المحمي',
      description: 'تصلك علبة المغنيسيوم الأصلية داخل كرتون شحن محكم ومغلف بطبقات حماية هوائية لضمان سلامتها حتى باب منزلك مع فحص الطلبية قبل الدفع.',
      image: '/src/assets/images/prod_packaging_box_1789340865379.jpg',
      badge: 'توصيل مجاني لجميع المدن',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span>معرض الصور الحقيقية والتفاصيل الواقعية للمنتج</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
            تعرف على منتجك بكل شفافية وثقة قبل الطلب
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-400 font-normal">
            صور حقيقية عالية الدقة للمنتج، مكوناته الطبيعية، طريقة التغليف السري، والنتائج اليومية لزبنائنا الكرام بالمغرب.
          </p>
        </div>

        {/* Gallery Interactive Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-102'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span>{item.tag}</span>
            </button>
          ))}
        </div>

        {/* Active Featured Image & Details Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-800/80 rounded-3xl p-5 sm:p-8 border border-slate-700 shadow-2xl mb-10">
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-4/3 bg-slate-950 border border-slate-700/80 shadow-inner group">
              <img
                src={galleryItems[activeTab].image}
                alt={galleryItems[activeTab].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute top-3 right-3 bg-blue-600 text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-md">
                {galleryItems[activeTab].badge}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 text-right">
            <span className="text-xs font-black text-blue-400 tracking-wide uppercase">
              {galleryItems[activeTab].tag}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {galleryItems[activeTab].title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {galleryItems[activeTab].description}
            </p>

            {/* Guarantees Mini-cards */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>مكونات أصلية 100% مطابقة لأعلى المعايير الصحية</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>توصيل مجاني لجميع المدن من طنجة للكويرة</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Package className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تغليف محكم ومحمي ضد الكسر والتلف</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onScrollToOffers}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm shadow-md transition-all cursor-pointer"
              >
                استفد من عرض التخفيض اليوم 🛒
              </button>
            </div>
          </div>
        </div>

        {/* 4 Thumbnails Mini-grid for quick scan */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {galleryItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`p-2 rounded-2xl bg-slate-800/60 border text-right transition-all cursor-pointer overflow-hidden ${
                activeTab === idx
                  ? 'border-blue-500 ring-2 ring-blue-500/50 bg-slate-800'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-black text-xs text-slate-200 truncate">{item.tag}</div>
              <div className="text-[10px] text-slate-400 truncate">{item.title}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
