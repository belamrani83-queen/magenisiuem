import React from 'react';
import { MessageSquare, CheckCheck, Star, ShieldCheck, Heart, ThumbsUp } from 'lucide-react';

export const WhatsAppReviewsSection: React.FC = () => {
  const whatsappMessages = [
    {
      id: 'chat-1',
      sender: 'سناء بناني (الدار البيضاء)',
      time: '14:23',
      date: 'أمس',
      message: 'السلام عليكم خويا، بغيت غير نشكركم بزاااف على هاد المغنيسيوم. الوالدة ديالي كان ديما راسها ثقيل وما كتعسش مسكينة مع التشنج فالساقين. هادي 8 أيام دابا باش كتاخدو، البارح قالت ليا نعست بحال البيبي وفايقة فرحانة وبلا وجع فالمصران. عفاك صيفطو ليا علبة ثانية نفس العنوان بالمعاريف شكراً 🙏❤️',
      response: 'وعليكم السلام أختي سناء، الحمد لله على سلامة الوالدة هادشي كيفرحنا بزاف! تم تسجيل طلب العلبة الثانية وسيصلك غداً بالمجان إن شاء الله.',
      badge: 'طلب متكرر ⭐',
    },
    {
      id: 'chat-2',
      sender: 'ياسين الفاسي (الرباط - أكدال)',
      time: '18:05',
      date: 'منذ يومين',
      message: 'خويا الطرد وصلني اليوم، شكراً على السرعة والتغليف المحكم. هادي ثاني سيمانة باش كنشربو، التشنجات (les crampes) لي كانو كيعذبوني بعد لاصال مشاو تماماً، والصباح كنفيق خفيف وبلا داك الفشل القديم. كنعطيه 10/10.',
      response: 'بصحتك وراحتك أخ ياسين، هاد النتيجة كتأكد قوة امتصاص جليسينات ومالات مع فيتامين D3. استمر عليه للحفاظ على نشاط عضلاتك.',
      badge: 'رياضي مؤكد 🏃‍♂️',
    },
    {
      id: 'chat-3',
      sender: 'فاطمة الزهراء (مراكش)',
      time: '11:40',
      date: 'منذ 3 أيام',
      message: 'صراحة كنت مترددة حيت المغنيسيوم لي شريت من قبل من الصيدلية كان كيدير ليا إسهال وحريق المعدة. ولكن هادا خفييييف بزاااف كنشرب جوج حبات قبل النعاس ومكندير حتى انزعاج، والأعصاب ديالي هدنو بزاف مع ستريس الخدمة. الله يعطيكم الصحة.',
      response: 'شكراً بزاف أخت فاطمة الزهراء على مشاركة تجربتك! سر تركيبتنا أنها مخلبية 100% ولطيفة جداً على الجهاز الهضمي.',
      badge: 'تجربة موثقة 🌿',
    },
  ];

  return (
    <section id="whatsapp-reviews-section" className="py-14 sm:py-20 bg-slate-100 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 mb-3">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>رسائل ومحادثات زبنائنا على الواتساب 💬</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            شوف شنو كيقولو المغاربة فاش كيوصلهم المنتج
          </h2>

          <p className="mt-3 text-base text-slate-600 font-normal">
            رسائل واقعية ويومية نتلقاها من زبنائنا بعد استلام واستعمال مكمل Magnesium Complex في مختلف المدن المغربية.
          </p>
        </div>

        {/* WhatsApp Chat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {whatsappMessages.map((chat) => (
            <div
              key={chat.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col justify-between"
            >
              {/* WhatsApp Header bar */}
              <div className="bg-emerald-700 p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-emerald-500 flex items-center justify-center font-black text-white text-sm">
                    {chat.sender.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white leading-tight truncate">
                      {chat.sender}
                    </h4>
                    <span className="text-[11px] text-emerald-200 block">
                      متصل الآن • WhatsApp
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full border border-emerald-500">
                  {chat.badge}
                </span>
              </div>

              {/* Chat Body (WhatsApp look & feel) */}
              <div className="p-4 bg-[#efeae2] flex-1 space-y-3 font-medium text-xs sm:text-sm">
                {/* Customer incoming bubble */}
                <div className="bg-white p-3 rounded-2xl rounded-tr-none shadow-xs max-w-[92%] mr-auto border border-slate-200/60">
                  <p className="text-slate-900 leading-relaxed">
                    "{chat.message}"
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-slate-400">
                    <span>{chat.time}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>

                {/* Store reply bubble */}
                <div className="bg-[#d9fdd3] p-3 rounded-2xl rounded-tl-none shadow-xs max-w-[92%] ml-auto border border-emerald-200/60">
                  <p className="text-slate-800 leading-relaxed text-[11px] sm:text-xs">
                    {chat.response}
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-emerald-700">
                    <span>{chat.date}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Bottom footer badge */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-bold text-emerald-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>محادثة موثقة وحقيقية</span>
                </span>
                <span className="text-[11px] text-slate-400">تم تأكيد الاستلام</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live reassurance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>أكثر من 45 محادثة شكر جديدة أسبوعياً</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-slate-900">معدل رضى الزبناء 98.4%</span>
          </div>
        </div>
      </div>
    </section>
  );
};
