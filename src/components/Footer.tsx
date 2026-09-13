import React from 'react';
import { ShieldCheck, Truck, Phone, MessageSquare, Heart, ArrowUp, Moon } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onScrollToOffers: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onScrollToOffers }) => {
  return (
    <footer className="bg-slate-950 text-white pt-14 pb-24 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                MG
              </div>
              <span className="text-2xl font-black tracking-tight text-white">Magnesium Complex المغرب</span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              مكمل غذائي متطور يجمع بين المغنيسيوم جليسينات والمالات (2150mg) مع فيتامين D3 النشط وخلاصات الخضار والبذور الطبيعية. تم تطويره لدعم الاسترخاء العصبي، النوم العميق، ومنع تشنجات العضلات بدون أي إسهال أو اضطراب هضمي.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>توصيل مجاني وسريع بالمغرب</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>الدفع عند الاستلام</span>
              </span>
            </div>
          </div>

          {/* Quick links & support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase text-slate-300 tracking-wider">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onScrollToOffers}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  عروض الكورس والأسعار
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('story-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  قصة التحسن والتخلص من الأرق
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('ingredients-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  المكونات والامتصاص الفائق
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('faq-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer"
                >
                  الأسئلة الشائعة
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service & WhatsApp */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-extrabold uppercase text-slate-300 tracking-wider">
              خدمة الزبناء والمساعدة
            </h4>
            <p className="text-xs text-slate-400">
              فريقنا في خدمتكم يومياً من 9:00 صباحاً إلى 20:00 مساءً للرد على تساؤلاتكم.
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-xs font-bold text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-blue-300" />
                <span>تواصل معنا عبر WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-right">
            جميع الحقوق محفوظة © {new Date().getFullYear()} Magnesium Complex. مكمل غذائي مرخص لدعم العضلات، الأعصاب، وجودة النوم.
          </p>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>الرجوع للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
