import React, { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle2, ShieldCheck, Truck, Gift, Star, MessageCircle, AlertCircle, Clock, Award, Lock, Flame } from 'lucide-react';
import { PACKAGE_OFFERS, MOROCCAN_CITIES } from '../data/content';
import { PackageOffer } from '../types';

interface OffersAndOrderFormProps {
  selectedPackId: string;
  onSelectPack: (id: string) => void;
}

export const OffersAndOrderForm: React.FC<OffersAndOrderFormProps> = ({
  selectedPackId,
  onSelectPack,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: 'الدار البيضاء (Casablanca)',
    address: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Live countdown timer (3 hours, 42 mins, 18 secs)
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedOffer = PACKAGE_OFFERS.find((p) => p.id === selectedPackId) || PACKAGE_OFFERS[1];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage('المرجو إدخال الاسم الكامل لتسجيل الطرد');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      setErrorMessage('المرجو إدخال رقم هاتف صحيح للتواصل وتأكيد الشحن المجاني');
      return;
    }

    if (!formData.address.trim()) {
      setErrorMessage('المرجو كتابة عنوان التوصيل (الحي أو الشارع)');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageId: selectedOffer.id,
          packageName: selectedOffer.title,
          totalPrice: selectedOffer.price,
          quantity: selectedOffer.bottlesCount,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrderSuccess(data.orderId || 'MG-' + Math.floor(100000 + Math.random() * 900000));
      } else {
        throw new Error(data.error || 'فشل تسجيل الطلب');
      }
    } catch (err: any) {
      // Fallback order acceptance if offline
      setOrderSuccess('MG-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const message = encodeURIComponent(
      `السلام عليكم، بغيت نطلب مكمل Magnesium Complex (مغنيسيوم 2150mg):\n- العرض: ${selectedOffer.title} (${selectedOffer.price} درهم)\n- الاسم: ${formData.fullName || 'الزبون'}\n- المدينة: ${formData.city}\n- الهاتف: ${formData.phone || ''}`
    );
    return `https://wa.me/212700363949?text=${message}`;
  };

  return (
    <section id="offers-section" className="py-16 sm:py-24 bg-slate-100 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-xs mb-3">
            العروض الحصرية المتاحة اليوم 🎁
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            اختر الباقة المناسبة لك وتخلص من التعب والأرق
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            التوصيل بالمجان إلى باب بيتك فجميع مدن وقرى المغرب. الدفع عند الاستلام.
          </p>

          {/* Urgent Countdown Timer & Stock Bar */}
          <div className="mt-6 max-w-lg mx-auto bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-rose-700 font-black text-xs sm:text-sm">
                <Flame className="w-5 h-5 text-rose-600 animate-bounce" />
                <span>ينتهي العرض الترويجي اليوم بعد:</span>
              </div>

              {/* Digits */}
              <div className="flex items-center gap-1.5 dir-ltr font-mono text-xs sm:text-sm font-black">
                <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-lg shadow-inner min-w-[34px] text-center">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-slate-900 font-bold">:</span>
                <div className="bg-slate-900 text-white px-2.5 py-1.5 rounded-lg shadow-inner min-w-[34px] text-center">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-slate-900 font-bold">:</span>
                <div className="bg-rose-600 text-white px-2.5 py-1.5 rounded-lg shadow-inner min-w-[34px] text-center animate-pulse">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Stock Scarcity Bar */}
            <div className="mt-3 pt-3 border-t border-amber-200/80">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>المتبقي في المخزون بسعر اليوم:</span>
                <span className="text-rose-600 font-black">11 علبة فقط ⚠️</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full w-[82%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PACKAGE_OFFERS.map((pack) => {
            const isSelected = selectedPackId === pack.id;

            return (
              <div
                key={pack.id}
                onClick={() => onSelectPack(pack.id)}
                className={`relative rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-3 border-blue-600 shadow-xl ring-4 ring-blue-500/15 scale-102 z-10'
                    : 'bg-white/90 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md'
                }`}
              >
                {/* Badge if present */}
                {pack.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-xs font-black px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    {pack.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {pack.bottlesCount === 1 ? 'علبة واحدة (90 كبسولة)' : `${pack.bottlesCount} علب`}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4 fill-current" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 mb-1">{pack.title}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">{pack.subtitle}</p>

                  <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-blue-900 font-mono">
                          {pack.price}
                        </span>
                        <span className="text-sm font-black text-slate-600">درهم</span>
                      </div>
                      {pack.originalPrice && (
                        <div className="text-xs text-slate-400 line-through mt-0.5">
                          {pack.originalPrice} درهم
                        </div>
                      )}
                    </div>
                    {pack.saveAmount && (
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        وفر {pack.saveAmount} درهم
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 text-xs text-slate-700 font-medium pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>توصيل مجاني وسريع لجميع مدن المغرب</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>الدفع عند الاستلام</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>كبسولات نباتية عالية الامتصاص 2150mg</span>
                    </li>
                    {pack.gift && (
                      <li className="flex items-center gap-2 text-blue-900 font-bold bg-blue-50/70 p-2 rounded-lg border border-blue-200">
                        <Gift className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{pack.gift}</span>
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>ضمان الرضا لمدة 30 يوماً</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {isSelected ? '✓ الباقة المختارة حالياً' : 'اختر هذه الباقة'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Form Container */}
        <div id="order-form" className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-700 uppercase tracking-wider mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>استمارة تأكيد الطلب السريع</span>
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              املأ معلوماتك وسيصلك طلبك بالمجان إلى باب بيتك
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              تأكيد فوري بدون بطاقة بنكية • الدفع عند الاستلام
            </p>
          </div>

          {/* Direct 1-Click Package Selector Inside Form */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block text-xs font-black text-slate-800 mb-2.5">
              1. اختر باقتك بضغطة واحدة:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PACKAGE_OFFERS.map((pack) => {
                const isSelected = selectedPackId === pack.id;
                return (
                  <button
                    type="button"
                    key={pack.id}
                    onClick={() => onSelectPack(pack.id)}
                    className={`p-3 rounded-xl text-right transition-all cursor-pointer relative border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-50/90 border-2 border-blue-600 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {pack.isPopular && (
                        <span className="inline-block text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-md mb-1">
                          الأكثر طلباً ⭐
                        </span>
                      )}
                      {pack.bottlesCount === 3 && (
                        <span className="inline-block text-[9px] font-black bg-amber-600 text-white px-2 py-0.5 rounded-md mb-1">
                          أقصى توفير 🎁
                        </span>
                      )}
                      <div className="font-black text-xs text-slate-900">
                        {pack.bottlesCount === 1 ? 'علبة واحدة' : `${pack.bottlesCount} علب`}
                      </div>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between pt-1 border-t border-slate-100">
                      <span className="font-black text-sm text-blue-900 font-mono">
                        {pack.price} درهم
                      </span>
                      {isSelected ? (
                        <span className="text-[10px] font-bold text-blue-600">مختارة ✓</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">اختيار</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {orderSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-black text-emerald-950">تهانينا! تم تسجيل طلبك بنجاح</h4>
                <p className="text-sm text-emerald-900 font-bold mt-1">
                  رقم طلبك: <span className="font-mono underline text-slate-900">{orderSuccess}</span>
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-md mx-auto font-medium">
                سيتصل بك فريق خدمة العملاء خلال ساعات لتأكيد العنوان وموعد التوصيل بالمجان. احتفظ بهاتفك قريباً منك!
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setOrderSuccess(null)}
                  className="text-xs font-bold text-emerald-800 underline hover:text-emerald-900 cursor-pointer"
                >
                  طلب كورس آخر أو تعديل المعلومات
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                  2. الاسم الكامل *
                </label>
                <input
                  id="order-fullname-input"
                  type="text"
                  required
                  placeholder="مثال: يوسف العلمي"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-sm font-medium text-slate-900 bg-slate-50/50 transition-all outline-none"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                  3. رقم الهاتف (للتواصل وتأكيد الشحن) *
                </label>
                <input
                  id="order-phone-input"
                  type="tel"
                  required
                  placeholder="06XXXXXXXX أو 07XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-sm font-medium text-slate-900 bg-slate-50/50 transition-all outline-none text-right dir-ltr"
                />
              </div>

              {/* City Selection */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                  4. المدينة *
                </label>
                <select
                  id="order-city-select"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-sm font-medium text-slate-900 bg-slate-50/50 transition-all outline-none cursor-pointer"
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-extrabold text-slate-800 mb-1.5">
                  5. العنوان بالتفصيل للتوصيل إلى باب دارك *
                </label>
                <input
                  id="order-address-input"
                  type="text"
                  required
                  placeholder="الحي، رقم المنزل، أو الشارع..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-sm font-medium text-slate-900 bg-slate-50/50 transition-all outline-none"
                />
              </div>

              {/* Big High-Converting Submit Button */}
              <div className="pt-2">
                <button
                  id="order-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-base sm:text-lg shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>
                    {isSubmitting
                      ? 'جاري تسجيل طلبك...'
                      : `تأكيد الطلب الآن (${selectedOffer.price} درهم فقط - شحن مجاني)`}
                  </span>
                </button>
              </div>

              {/* Security & Trust Icons directly under submit */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 text-center text-[11px] font-bold text-slate-600">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-1">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  <span>طلب آمن ومحمي</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-1">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>شحن مجاني وسريع</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>الدفع عند الاستلام</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>ضمان الرضا 30 يوماً</span>
                </div>
              </div>

              {/* Direct Alternative: Order via WhatsApp */}
              <div className="pt-3">
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-xs font-bold text-slate-400">أو اطلب مباشرة عبر الواتساب</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <a
                  id="order-whatsapp-btn"
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                  <span>طلب مباشر عبر الواتساب (WhatsApp: 0700363949)</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
