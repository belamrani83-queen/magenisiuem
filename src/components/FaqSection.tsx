import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ShieldCheck } from 'lucide-react';
import { FAQS } from '../data/content';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>إجابات لكل تساؤلاتك 💬</span>
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            الأسئلة الأكثر شيوعاً عن Magnesium Complex
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
            كل ما تود معرفته عن طريقة الاستعمال، تأثيره على المعدة، التوصيل المجاني، والضمان قبل تأكيد طلبك.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <div
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <h3 className="font-black text-sm sm:text-base text-slate-900 flex-1">
                    {faq.question}
                  </h3>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-slate-50/40 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Help Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 text-center text-xs sm:text-sm text-slate-600">
          <span>عندك سؤال آخر؟ تواصل مباشرة مع فريق خدمة العملاء عبر الواتساب (0700363949): </span>
          <a
            href="https://wa.me/212700363949"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 font-bold underline hover:text-emerald-800 mr-1"
          >
            اضغط هنا للتحدث معنا عبر الواتساب
          </a>
        </div>
      </div>
    </section>
  );
};
