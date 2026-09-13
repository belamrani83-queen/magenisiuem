import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  Ban,
  MessageCircle,
  Phone,
  Trash2,
  RefreshCw,
  Plus,
  Table,
  Sliders,
  ExternalLink,
  Copy,
  Check,
  FileSpreadsheet,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Percent,
  Calculator,
  Wallet,
  Coins,
  PackageX,
  ArrowUpRight,
  HelpCircle,
  Save
} from 'lucide-react';
import { OrderRecord, OrderStatus, CodUnitCosts } from '../types';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APPS_SCRIPT_TEMPLATE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // إذا كان السطر الأول فارغاً، نضع العناوين
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "رقم الطلب", "التاريخ والوقت", "اسم الزبون", "رقم الهاتف", 
        "المدينة", "العنوان", "الباقة", "المبلغ الإجمالي", "الحالة", "ملاحظات"
      ]);
    }
    
    sheet.appendRow([
      data.orderId || "",
      data.date || new Date().toLocaleString(),
      data.fullName || "",
      "'" + (data.phone || ""),
      data.city || "",
      data.address || "",
      data.packageName || "",
      data.price || "",
      data.status || "جديد",
      data.notes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

const DEFAULT_COD_COSTS: CodUnitCosts = {
  productUnitCost: 45,       // تكلفة شراء/صنع العلبة
  shippingCostDelivered: 35, // مصاريف الشحن للطلبات المستلمة
  shippingCostReturned: 15,  // مصاريف الروتور عند الرفض أو الإلغاء بعد الشحن
  confirmationCallCost: 5,   // تكلفة المكالمة والتأكيد لكل طلب
  packagingCost: 4,          // كرتونة وتعليب
  adSpendPerLead: 25,        // تكلفة الإشهار لكل ليد مسجل (CPL في فيسبوك/تيك توك)
};

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('cod_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'cod-analytics' | 'sheets' | 'new-order'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // COD Costs and Expenses State
  const [codCosts, setCodCosts] = useState<CodUnitCosts>(DEFAULT_COD_COSTS);
  const [isSavingCosts, setIsSavingCosts] = useState(false);
  const [costsSavedNotice, setCostsSavedNotice] = useState(false);

  // Google Sheets settings state
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [testStatus, setTestStatus] = useState<{ loading: boolean; success?: boolean; message?: string }>({
    loading: false,
  });
  const [copiedCode, setCopiedCode] = useState(false);

  // New manual order state
  const [manualOrder, setManualOrder] = useState({
    fullName: '',
    phone: '',
    city: 'الدار البيضاء',
    address: '',
    packageName: 'باقة شهرين (علبتين) - الأكثر طلباً',
    price: 349,
    quantity: 2,
    status: 'confirmed' as OrderStatus,
    notes: 'طلب يدوي',
  });

  // Verify PIN
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    try {
      const res = await fetch('/api/admin/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }),
      });
      const data = await res.json();
      if (data.valid || pinInput === '1234') {
        setIsAuthenticated(true);
        localStorage.setItem('cod_admin_auth', 'true');
        setPinError('');
        loadOrders();
        loadSettings();
      } else {
        setPinError('رمز المرور غير صحيح (الرمز الافتراضي هو: 1234)');
      }
    } catch (err) {
      if (pinInput === '1234') {
        setIsAuthenticated(true);
        localStorage.setItem('cod_admin_auth', 'true');
        loadOrders();
      } else {
        setPinError('رمز غير صحيح');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('cod_admin_auth');
    setIsAuthenticated(false);
    setPinInput('');
  };

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.success) {
        if (data.googleSheetsWebhookUrl) {
          setWebhookUrl(data.googleSheetsWebhookUrl);
        }
        if (data.codCosts) {
          setCodCosts({
            productUnitCost: data.codCosts.productUnitCost ?? DEFAULT_COD_COSTS.productUnitCost,
            shippingCostDelivered: data.codCosts.shippingCostDelivered ?? DEFAULT_COD_COSTS.shippingCostDelivered,
            shippingCostReturned: data.codCosts.shippingCostReturned ?? DEFAULT_COD_COSTS.shippingCostReturned,
            confirmationCallCost: data.codCosts.confirmationCallCost ?? DEFAULT_COD_COSTS.confirmationCallCost,
            packagingCost: data.codCosts.packagingCost ?? DEFAULT_COD_COSTS.packagingCost,
            adSpendPerLead: data.codCosts.adSpendPerLead ?? DEFAULT_COD_COSTS.adSpendPerLead,
          });
        }
      }
    } catch (err) {
      console.error('Failed to load settings', err);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadOrders();
      loadSettings();
    }
  }, [isOpen, isAuthenticated]);

  const handleSaveCodCosts = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCosts(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codCosts }),
      });
      const data = await res.json();
      if (data.success) {
        setCostsSavedNotice(true);
        setTimeout(() => setCostsSavedNotice(false), 3000);
      }
    } catch (err) {
      alert('فشل حفظ إعدادات المصاريف');
    } finally {
      setIsSavingCosts(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );

      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error('Failed to update status', err);
      loadOrders();
    }
  };

  const handleDeleteOrder = async (orderId: string, orderNumber: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف الطلب #${orderNumber}؟`)) return;

    try {
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
      await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to delete order', err);
      loadOrders();
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleSheetsWebhookUrl: webhookUrl }),
      });
      const data = await res.json();
      if (data.success) {
        alert('تم حفظ رابط Google Sheets بنجاح! سيتم إرسال جميع الطلبات الجديدة إليه أوتوماتيكياً.');
      }
    } catch (err) {
      alert('فشل حفظ الإعدادات');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleTestWebhook = async () => {
    setTestStatus({ loading: true });
    try {
      const res = await fetch('/api/admin/test-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestStatus({ loading: false, success: true, message: data.message });
      } else {
        setTestStatus({ loading: false, success: false, message: data.error || 'فشل الاتصال' });
      }
    } catch (err: any) {
      setTestStatus({ loading: false, success: false, message: 'تعذر الاتصال بـ Google Sheets' });
    }
  };

  const handleCreateManualOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualOrder.fullName || !manualOrder.phone) {
      alert('المرجو إدخال الاسم ورقم الهاتف');
      return;
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: manualOrder.fullName,
          phone: manualOrder.phone,
          city: manualOrder.city,
          address: manualOrder.address,
          packageName: manualOrder.packageName,
          totalPrice: manualOrder.price,
          quantity: manualOrder.quantity,
          notes: manualOrder.notes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`تم تسجيل الطلب #${data.orderId} بنجاح!`);
        setManualOrder({
          fullName: '',
          phone: '',
          city: 'الدار البيضاء',
          address: '',
          packageName: 'باقة شهرين (علبتين) - الأكثر طلباً',
          price: 349,
          quantity: 2,
          status: 'confirmed',
          notes: 'طلب يدوي',
        });
        setActiveTab('orders');
        loadOrders();
      }
    } catch (err) {
      alert('فشل حفظ الطلب');
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('لا توجد طلبات لتصديرها حالياً');
      return;
    }

    const headers = [
      'رقم الطلب',
      'التاريخ والوقت',
      'اسم الزبون',
      'رقم الهاتف',
      'المدينة',
      'العنوان',
      'الباقة المطلوبة',
      'المبلغ (درهم)',
      'الكمية',
      'الحالة',
      'ملاحظات',
    ];

    const statusMap: Record<string, string> = {
      new: 'جديد',
      confirmed: 'مؤكد',
      shipped: 'قيد الشحن',
      delivered: 'تم التوصيل',
      cancelled: 'ملغي',
    };

    const rows = orders.map((o) => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' }),
      `"${o.fullName.replace(/"/g, '""')}"`,
      `'${o.phone}`,
      `"${o.city.replace(/"/g, '""')}"`,
      `"${(o.address || '').replace(/"/g, '""')}"`,
      `"${(o.packageName || '').replace(/"/g, '""')}"`,
      o.price,
      o.quantity || 1,
      statusMap[o.status] || o.status,
      `"${(o.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `طلبات_COD_المغنيسيوم_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyAppsScript = () => {
    navigator.clipboard.writeText(APPS_SCRIPT_TEMPLATE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // ==========================================
  // COD FINANCIAL ANALYTICS & PROFIT METRICS
  // ==========================================
  const totalLeads = orders.length; // كل من عبأ الاستمارة
  const newOrders = orders.filter((o) => o.status === 'new');
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed');
  const shippedOrders = orders.filter((o) => o.status === 'shipped');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');
  const cancelledOrders = orders.filter((o) => o.status === 'cancelled');

  // Rate of Confirmation (نسبة التأكيد)
  const nonNewOrdersCount = orders.filter((o) => o.status !== 'new').length;
  const processedConfirmedCount = confirmedOrders.length + shippedOrders.length + deliveredOrders.length;
  const confirmationRate = totalLeads > 0 ? Math.round((processedConfirmedCount / totalLeads) * 100) : 0;

  // Rate of Delivery (نسبة التوصيل من الطلبات التي تم شحنها وتوصيلها)
  const shippedTotal = deliveredOrders.length + shippedOrders.length;
  const deliveryRate = shippedTotal > 0 ? Math.round((deliveredOrders.length / shippedTotal) * 100) : (deliveredOrders.length > 0 ? 100 : 0);

  // Revenue Realized (المداخيل المحصلة من التوصيل الفعلي + المتوقع تسليمها من قيد الشحن)
  const realizedRevenue = deliveredOrders.reduce((acc, o) => acc + (o.price || 0), 0);
  const inTransitRevenue = shippedOrders.reduce((acc, o) => acc + (o.price || 0), 0);
  const potentialTotalRevenue = realizedRevenue + inTransitRevenue + confirmedOrders.reduce((acc, o) => acc + (o.price || 0), 0);

  // Delivered product boxes count
  const deliveredBoxesCount = deliveredOrders.reduce((acc, o) => acc + (o.quantity || (o.price > 300 ? 2 : 1)), 0);

  // Total Costs Breakdown
  // 1. تكلفة المنتج للطلبات المستلمة (Cost of Goods Sold)
  const totalProductCost = deliveredBoxesCount * codCosts.productUnitCost;

  // 2. مصاريف الشحن للطلبات المستلمة
  const totalDeliveredShippingCost = deliveredOrders.length * codCosts.shippingCostDelivered;

  // 3. مصاريف الروتور للطلبات الملغاة التي خرجت للشحن
  // (نعتبر الملغي الذي له روتور أو نسبة تقديرية)
  const returnedCount = cancelledOrders.length;
  const totalReturnedShippingCost = returnedCount * codCosts.shippingCostReturned;

  // 4. مصاريف التعليب والتغليف (كرتون، لاصق، هدايا)
  const totalPackagingCost = (deliveredOrders.length + shippedOrders.length) * codCosts.packagingCost;

  // 5. مصاريف التأكيد والمكالمات لجميع الليدات المعالجة
  const totalCallCenterCost = totalLeads * codCosts.confirmationCallCost;

  // 6. مصاريف الإعلانات المقدرة (Ad Spend = Leads * CPL)
  const totalEstimatedAdSpend = totalLeads * codCosts.adSpendPerLead;

  // Total All Expenses
  const totalAllExpenses =
    totalProductCost +
    totalDeliveredShippingCost +
    totalReturnedShippingCost +
    totalPackagingCost +
    totalCallCenterCost +
    totalEstimatedAdSpend;

  // NET PROFIT (صافي الربح الصافي في الجيب)
  const netDeliveredProfit = realizedRevenue - (
    totalProductCost +
    totalDeliveredShippingCost +
    totalReturnedShippingCost +
    (deliveredOrders.length * codCosts.packagingCost) +
    (deliveredOrders.length * codCosts.confirmationCallCost) +
    (deliveredOrders.length * codCosts.adSpendPerLead)
  );

  // Full Business Net Profit (شامل كل تكاليف الإشهار والمكالمات حتى للطلبات غير المستلمة)
  const overallNetProfit = realizedRevenue - totalAllExpenses;
  const profitMarginPercent = realizedRevenue > 0 ? Math.round((overallNetProfit / realizedRevenue) * 100) : 0;
  const avgProfitPerOrder = deliveredOrders.length > 0 ? Math.round(overallNetProfit / deliveredOrders.length) : 0;

  // Filtered orders for table
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      order.fullName.toLowerCase().includes(q) ||
      order.phone.includes(q) ||
      order.city.toLowerCase().includes(q) ||
      order.orderNumber.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center font-black shadow-inner">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg flex items-center gap-2">
                <span>لوحة تحكم التجارة الإلكترونية (COD Dashboard)</span>
                <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  حساب المصاريف والربح الصافي
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                تتبع الطلبيات، نسبة التوصيل (Delivery Rate)، حساب الروتور والإشهار والبروفيا بدقة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 text-xs font-bold transition-colors cursor-pointer"
                title="تسجيل الخروج"
              >
                خروج
              </button>
            )}
            <button
              id="admin-close-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-4 shadow-xs">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-slate-900 mb-2">تسجيل الدخول للوحة التحكم</h4>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              المرجو إدخال رمز المرور الخاص بك للاطلاع على الطلبات وحسابات الأرباح.
              <br />
              <span className="text-blue-600 font-bold mt-1 inline-block">الرمز الافتراضي: 1234</span>
            </p>

            <form onSubmit={handleVerifyPin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="أدخل الرمز (مثال: 1234)"
                  className="w-full text-center text-lg tracking-widest font-black py-3 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  autoFocus
                />
                {pinError && (
                  <p className="mt-2 text-xs text-rose-600 font-bold flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                دخول إلى لوحة التحكم 🔓
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Body */
          <div className="flex-1 overflow-y-auto flex flex-col bg-slate-50">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  قائمة الطلبات ({orders.length})
                </button>

                <button
                  onClick={() => setActiveTab('cod-analytics')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'cod-analytics'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 text-emerald-600" />
                  <span>حساب المصاريف والأرباح (COD)</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded font-black">
                    Profit
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('sheets')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'sheets'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ربط Google Sheets</span>
                  {webhookUrl && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                </button>

                <button
                  onClick={() => setActiveTab('new-order')}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                    activeTab === 'new-order'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة طلب يدوي</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={loadOrders}
                  disabled={isLoading}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="تحديث البيانات"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
                </button>

                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  title="تنزيل ملف إكسل بجميع الطلبات"
                >
                  <Download className="w-4 h-4" />
                  <span>تصدير Excel (CSV)</span>
                </button>
              </div>
            </div>

            {/* TAB 1: ORDERS LIST */}
            {activeTab === 'orders' && (
              <div className="p-4 sm:p-6 space-y-5 flex-1 flex flex-col">
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-1">
                      <span className="text-xs font-bold">إجمالي الطلبات (Leads)</span>
                      <Table className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900">{totalLeads}</div>
                    <span className="text-[10px] text-slate-400">من جميع الإعلانات والاستمارات</span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
                    <div className="flex items-center justify-between text-amber-800 mb-1">
                      <span className="text-xs font-black">جديدة (Pending)</span>
                      <Clock className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-amber-900">{newOrders.length}</div>
                    <span className="text-[10px] text-amber-700">تحتاج اتصال فوري لتأكيد العنوان</span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-xs">
                    <div className="flex items-center justify-between text-blue-800 mb-1">
                      <span className="text-xs font-black">قيد الشحن (Shipped)</span>
                      <Truck className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-blue-900">{shippedOrders.length}</div>
                    <span className="text-[10px] text-blue-700">مع موزع التوصيل (Livreur)</span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                    <div className="flex items-center justify-between text-emerald-800 mb-1">
                      <span className="text-xs font-black">تم التوصيل (Livré)</span>
                      <PackageCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-900">{deliveredOrders.length}</div>
                    <span className="text-[10px] text-emerald-700">تحصل المبلغ نقداً {realizedRevenue} DH</span>
                  </div>
                </div>

                {/* Filters & Search Row */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="بحث بالاسم، المدينة، أو الهاتف..."
                      className="w-full text-xs font-medium py-2 pr-9 pl-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
                    {[
                      { key: 'all', label: 'الكل' },
                      { key: 'new', label: 'جديد (Pending)' },
                      { key: 'confirmed', label: 'مؤكد (Confirmé)' },
                      { key: 'shipped', label: 'قيد الشحن (Expédié)' },
                      { key: 'delivered', label: 'تم التوصيل (Livré)' },
                      { key: 'cancelled', label: 'ملغي / روتور (Annulé)' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setStatusFilter(item.key)}
                        className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all cursor-pointer ${
                          statusFilter === item.key
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col">
                  {filteredOrders.length === 0 ? (
                    <div className="p-12 text-center my-auto">
                      <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                        <Table className="w-6 h-6" />
                      </div>
                      <h5 className="font-bold text-slate-800 text-sm mb-1">لا توجد طلبات مطابقة</h5>
                      <p className="text-xs text-slate-500">
                        {orders.length === 0
                          ? 'أي طلب جديد يملأه الزبون في استمارة الموقع سيظهر هنا فورياً وسيرسل إلى Google Sheets!'
                          : 'جرب تغيير معايير البحث أو الفلتر.'}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs">
                        <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-extrabold">
                          <tr>
                            <th className="p-3.5">الطلب & التاريخ</th>
                            <th className="p-3.5">الزبون & العنوان</th>
                            <th className="p-3.5">الهاتف والتواصل</th>
                            <th className="p-3.5">الباقة والمبلغ</th>
                            <th className="p-3.5">الحالة</th>
                            <th className="p-3.5 text-center">إجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {filteredOrders.map((order) => {
                            const waMessage = encodeURIComponent(
                              `السلام عليكم ورحمة الله أخي/أختي ${order.fullName}، شكراً على طلبك لمكمل Magnesium Complex.\nالطلبية ديالك: ${order.packageName} (${order.price} درهم).\nكنتواصلو معاك باش نأكدو عنوان الشحن ديالك فمدينة ${order.city}. واش العنوان سليم ومستعد للاستلام؟`
                            );
                            const waUrl = `https://wa.me/212${order.phone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=${waMessage}`;

                            return (
                              <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="p-3.5 align-top">
                                  <div className="font-black text-slate-900 text-sm">
                                    #{order.orderNumber}
                                  </div>
                                  <div className="text-[11px] text-slate-400 mt-0.5">
                                    {new Date(order.createdAt).toLocaleDateString('fr-FR')} •{' '}
                                    {new Date(order.createdAt).toLocaleTimeString('fr-FR', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </div>
                                  {order.syncedToSheets && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-1">
                                      <Check className="w-3 h-3" /> تم الإرسال للشيت
                                    </span>
                                  )}
                                </td>

                                <td className="p-3.5 align-top">
                                  <div className="font-black text-slate-900">{order.fullName}</div>
                                  <div className="text-slate-600 font-bold text-[11px] mt-0.5">
                                    📍 {order.city}
                                  </div>
                                  {order.address && (
                                    <div className="text-slate-500 text-[11px] mt-0.5 max-w-[200px] truncate" title={order.address}>
                                      {order.address}
                                    </div>
                                  )}
                                </td>

                                <td className="p-3.5 align-top">
                                  <div className="font-mono font-black text-slate-800 dir-ltr text-left">
                                    {order.phone}
                                  </div>
                                  <div className="flex items-center gap-1.5 mt-2">
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-[10px] shadow-xs cursor-pointer transition-all"
                                      title="محادثة واتساب سريعة لتأكيد الطلب"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                                      <span>واتساب</span>
                                    </a>
                                    <a
                                      href={`tel:${order.phone}`}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] cursor-pointer transition-all"
                                      title="اتصال هاتفي مباشر"
                                    >
                                      <Phone className="w-3 h-3 text-blue-600" />
                                      <span>اتصال</span>
                                    </a>
                                  </div>
                                </td>

                                <td className="p-3.5 align-top">
                                  <div className="font-bold text-slate-900">{order.packageName}</div>
                                  <div className="text-blue-600 font-black text-sm mt-0.5">
                                    {order.price} DH
                                  </div>
                                  <div className="text-[10px] text-slate-400">
                                    الكمية: {order.quantity || 1} علبة
                                  </div>
                                </td>

                                <td className="p-3.5 align-top">
                                  <select
                                    value={order.status}
                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                                    className={`text-xs font-black rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                                      order.status === 'new'
                                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                                        : order.status === 'confirmed'
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                        : order.status === 'shipped'
                                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                                        : order.status === 'delivered'
                                        ? 'bg-purple-50 text-purple-800 border-purple-300'
                                        : 'bg-rose-50 text-rose-800 border-rose-300'
                                    }`}
                                  >
                                    <option value="new">🟡 جديد (Pending)</option>
                                    <option value="confirmed">🟢 تم التأكيد (Confirmé)</option>
                                    <option value="shipped">🔵 قيد الشحن (Expédié)</option>
                                    <option value="delivered">🟣 تم التوصيل (Livré)</option>
                                    <option value="cancelled">🔴 ملغي / روتور (Annulé)</option>
                                  </select>
                                </td>

                                <td className="p-3.5 align-top text-center">
                                  <button
                                    onClick={() => handleDeleteOrder(order.id, order.orderNumber)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                    title="حذف الطلب"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: COD FINANCIAL ANALYTICS & PROFIT CALCULATOR */}
            {activeTab === 'cod-analytics' && (
              <div className="p-4 sm:p-6 space-y-6 flex-1 max-w-6xl mx-auto w-full">
                {/* Hero Profit Banner */}
                <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-7 border border-emerald-800/50 shadow-xl relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          حساب البروفيا الصافي (Net Profit)
                        </span>
                        <span className="text-xs text-slate-300">
                          بعد خصم السلعة، الشحن، الروتور، الإشهار والتأكيد
                        </span>
                      </div>
                      <div className="text-3xl sm:text-5xl font-black tracking-tight text-white flex items-baseline gap-2">
                        <span>{overallNetProfit.toLocaleString()}</span>
                        <span className="text-2xl font-bold text-emerald-400">درهم (DH)</span>
                      </div>
                      <p className="text-xs text-emerald-200 mt-2">
                        مداخيل مستلمة: <strong className="text-white">{realizedRevenue} DH</strong> | إجمالي المصاريف: <strong className="text-rose-300">{totalAllExpenses} DH</strong>
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-center min-w-[110px]">
                        <div className="text-xs text-slate-300 font-bold mb-0.5">نسبة الربح (Marge)</div>
                        <div className="text-2xl font-black text-emerald-400">
                          {profitMarginPercent}%
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-center min-w-[110px]">
                        <div className="text-xs text-slate-300 font-bold mb-0.5">نسبة التوصيل</div>
                        <div className="text-2xl font-black text-blue-400">
                          {deliveryRate}%
                        </div>
                      </div>

                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-center min-w-[110px]">
                        <div className="text-xs text-slate-300 font-bold mb-0.5">ربح الطلب المسلم</div>
                        <div className="text-2xl font-black text-amber-300">
                          +{avgProfitPerOrder} DH
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2 Columns: Costs Settings vs Detailed Financial Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Unit Costs Configurator (تعديل مصاريفك) */}
                  <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-black text-base text-slate-900 flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-blue-600" />
                          <span>إعدادات تكاليفك (Unit Costs)</span>
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          عدل هذه الأرقام حسب تكاليفك الحقيقية ليتم حساب البروفيا بدقة
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSaveCodCosts} className="space-y-3.5 text-xs">
                      {/* Cost 1: Product Unit Cost */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <div className="flex justify-between items-center mb-1">
                          <label className="font-black text-slate-800">
                            تكلفة شراء العلبة (Product Cost):
                          </label>
                          <span className="text-[10px] text-slate-400 font-bold">للحبة الواحدة</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={codCosts.productUnitCost}
                            onChange={(e) =>
                              setCodCosts({ ...codCosts, productUnitCost: Number(e.target.value) })
                            }
                            className="w-full py-2 px-3 pl-10 rounded-lg bg-white border border-slate-300 font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-slate-400">
                            DH
                          </span>
                        </div>
                      </div>

                      {/* Cost 2: Delivery Cost */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <div className="flex justify-between items-center mb-1">
                          <label className="font-black text-slate-800">
                            تكلفة الشحن والتوصيل (Frais de Livraison):
                          </label>
                          <span className="text-[10px] text-slate-400 font-bold">للطلب المسلم</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={codCosts.shippingCostDelivered}
                            onChange={(e) =>
                              setCodCosts({ ...codCosts, shippingCostDelivered: Number(e.target.value) })
                            }
                            className="w-full py-2 px-3 pl-10 rounded-lg bg-white border border-slate-300 font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-slate-400">
                            DH
                          </span>
                        </div>
                      </div>

                      {/* Cost 3: Return (Retour) Cost */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <div className="flex justify-between items-center mb-1">
                          <label className="font-black text-slate-800">
                            تكلفة الروتور (Frais de Retour):
                          </label>
                          <span className="text-[10px] text-slate-400 font-bold">لكل كولي رجع</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={codCosts.shippingCostReturned}
                            onChange={(e) =>
                              setCodCosts({ ...codCosts, shippingCostReturned: Number(e.target.value) })
                            }
                            className="w-full py-2 px-3 pl-10 rounded-lg bg-white border border-slate-300 font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-slate-400">
                            DH
                          </span>
                        </div>
                      </div>

                      {/* Cost 4: Ad Spend Per Lead (CPL) */}
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <div className="flex justify-between items-center mb-1">
                          <label className="font-black text-slate-800">
                            تكلفة الإشهار لكل ليد (Cost Per Lead - CPL):
                          </label>
                          <span className="text-[10px] text-slate-400 font-bold">Facebook / TikTok Ads</span>
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            value={codCosts.adSpendPerLead}
                            onChange={(e) =>
                              setCodCosts({ ...codCosts, adSpendPerLead: Number(e.target.value) })
                            }
                            className="w-full py-2 px-3 pl-10 rounded-lg bg-white border border-slate-300 font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-slate-400">
                            DH
                          </span>
                        </div>
                      </div>

                      {/* Cost 5: Call Center & Packaging */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                          <label className="font-black text-slate-800 block mb-1">
                            التأكيد والمكالمات:
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              value={codCosts.confirmationCallCost}
                              onChange={(e) =>
                                setCodCosts({ ...codCosts, confirmationCallCost: Number(e.target.value) })
                              }
                              className="w-full py-1.5 px-2.5 pl-8 rounded-lg bg-white border border-slate-300 font-black text-slate-900 text-xs"
                            />
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-[10px] text-slate-400">
                              DH
                            </span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                          <label className="font-black text-slate-800 block mb-1">
                            الكرتون والتغليف:
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              value={codCosts.packagingCost}
                              onChange={(e) =>
                                setCodCosts({ ...codCosts, packagingCost: Number(e.target.value) })
                              }
                              className="w-full py-1.5 px-2.5 pl-8 rounded-lg bg-white border border-slate-300 font-black text-slate-900 text-xs"
                            />
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-[10px] text-slate-400">
                              DH
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSavingCosts}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isSavingCosts ? 'جاري الحفظ...' : 'حفظ التكاليف وتحديث الحسابات'}</span>
                      </button>

                      {costsSavedNotice && (
                        <p className="text-center text-xs font-bold text-emerald-600 bg-emerald-50 py-1.5 rounded-lg">
                          ✓ تم حفظ إعدادات التكاليف بنجاح!
                        </p>
                      )}
                    </form>
                  </div>

                  {/* Right Column: Detailed Full Breakdown Table & Funnel */}
                  <div className="lg:col-span-7 space-y-4">
                    {/* The Full Financial Statement Card */}
                    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs">
                      <h4 className="font-black text-base text-slate-900 mb-4 flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-emerald-600" />
                        <span>كشف الحساب التفصيلي (Financial Statement)</span>
                      </h4>

                      <div className="space-y-3 text-xs">
                        {/* 1. Revenue */}
                        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                          <div>
                            <div className="font-black text-emerald-950 text-sm">
                              إجمالي المداخيل المحصلة (Chiffre d'Affaires)
                            </div>
                            <div className="text-[11px] text-emerald-700">
                              من {deliveredOrders.length} طلبات تم تسليمها بنجاح للزبناء
                            </div>
                          </div>
                          <div className="text-base font-black text-emerald-700">
                            +{realizedRevenue.toLocaleString()} DH
                          </div>
                        </div>

                        {/* 2. Costs Breakdown List */}
                        <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2.5">
                          <div className="font-black text-slate-700 text-xs border-b border-slate-200 pb-2">
                            تفصيل المصاريف المخصومة:
                          </div>

                          <div className="flex justify-between items-center text-slate-600">
                            <span>📦 تكلفة السلعة المباعة ({deliveredBoxesCount} علب × {codCosts.productUnitCost} DH)</span>
                            <span className="font-bold text-rose-600">-{totalProductCost} DH</span>
                          </div>

                          <div className="flex justify-between items-center text-slate-600">
                            <span>🚚 مصاريف الشحن للطلبات المستلمة ({deliveredOrders.length} × {codCosts.shippingCostDelivered} DH)</span>
                            <span className="font-bold text-rose-600">-{totalDeliveredShippingCost} DH</span>
                          </div>

                          <div className="flex justify-between items-center text-slate-600">
                            <span>🔄 مصاريف الروتور ({returnedCount} طلبيات ملغاة × {codCosts.shippingCostReturned} DH)</span>
                            <span className="font-bold text-rose-600">-{totalReturnedShippingCost} DH</span>
                          </div>

                          <div className="flex justify-between items-center text-slate-600">
                            <span>📢 ميزانية الإعلانات المقدرة ({totalLeads} ليدات × {codCosts.adSpendPerLead} DH)</span>
                            <span className="font-bold text-rose-600">-{totalEstimatedAdSpend} DH</span>
                          </div>

                          <div className="flex justify-between items-center text-slate-600">
                            <span>📞 مركز الاتصال والتأكيد ({totalLeads} ليد × {codCosts.confirmationCallCost} DH)</span>
                            <span className="font-bold text-rose-600">-{totalCallCenterCost} DH</span>
                          </div>

                          <div className="flex justify-between items-center text-slate-600">
                            <span>📦 الكرتون والتغليف ({deliveredOrders.length} طلبات × {codCosts.packagingCost} DH)</span>
                            <span className="font-bold text-rose-600">-{totalPackagingCost} DH</span>
                          </div>

                          <div className="border-t border-slate-200 pt-2 flex justify-between items-center font-black text-slate-900">
                            <span>مجموع المصاريف الإجمالية:</span>
                            <span className="text-rose-700">-{totalAllExpenses} DH</span>
                          </div>
                        </div>

                        {/* 3. Final Net Profit */}
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md">
                          <div>
                            <div className="font-black text-base">الربح الصافي في الجيب (Net Profit)</div>
                            <div className="text-[11px] text-emerald-100">
                              هامش ربح حقيقي {profitMarginPercent}%
                            </div>
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-white">
                            {overallNetProfit > 0 ? `+${overallNetProfit.toLocaleString()}` : overallNetProfit.toLocaleString()} DH
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Funnel & Conversion Rates Card */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs">
                      <h5 className="font-black text-xs text-slate-800 mb-3 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span>مؤشرات أداء مسار التجارة (COD Funnel & Conversion)</span>
                      </h5>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-[10px] text-slate-500 font-bold">نسبة التأكيد</div>
                          <div className="text-lg font-black text-slate-900 mt-0.5">{confirmationRate}%</div>
                          <div className="text-[9px] text-slate-400">من الليد إلى مؤكد</div>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-[10px] text-slate-500 font-bold">نسبة التوصيل</div>
                          <div className="text-lg font-black text-emerald-600 mt-0.5">{deliveryRate}%</div>
                          <div className="text-[9px] text-slate-400">من المشحون إلى مستلم</div>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-[10px] text-slate-500 font-bold">نسبة الروتور</div>
                          <div className="text-lg font-black text-rose-600 mt-0.5">
                            {shippedTotal > 0 ? Math.round((returnedCount / shippedTotal) * 100) : 0}%
                          </div>
                          <div className="text-[9px] text-slate-400">طلبات راجعة</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: GOOGLE SHEETS SETUP */}
            {activeTab === 'sheets' && (
              <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 flex-1">
                <div className="bg-emerald-900 text-white rounded-3xl p-5 sm:p-6 shadow-md relative overflow-hidden">
                  <div className="relative z-10 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-800 text-emerald-200 mb-3 border border-emerald-700">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
                      الربط التلقائي مع Google Sheets
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white leading-snug">
                      تسجيل كل طلب جديد في جدول Google Sheets فالحين!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
                      بمجرد ربط الرابط هنا، أي زبون يضغط على "تأكيد الطلب" في الموقع، سيتم إضافة سطر جديد فورياً في جدول إكسل ديالك على Google Drive بالاسم والهاتف والمدينة والباقة.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
                  <h5 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span>1. رابط الويب هوك (Google Webhook URL)</span>
                  </h5>

                  <form onSubmit={handleSaveSettings} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5">
                        ألصق رابط نشر الويب هوك (Web App URL) من Apps Script هنا:
                      </label>
                      <input
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                        className="w-full text-xs font-mono py-3 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        dir="ltr"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSavingSettings}
                        className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        {isSavingSettings ? 'جاري الحفظ...' : 'حفظ رابط Google Sheets'}
                      </button>

                      <button
                        type="button"
                        onClick={handleTestWebhook}
                        disabled={!webhookUrl || testStatus.loading}
                        className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${testStatus.loading ? 'animate-spin text-emerald-600' : ''}`} />
                        <span>إرسال سطر تجريبي للشيت للتأكد</span>
                      </button>
                    </div>

                    {testStatus.message && (
                      <div
                        className={`p-3 rounded-xl text-xs font-bold mt-2 flex items-center gap-2 ${
                          testStatus.success
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {testStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                        <span>{testStatus.message}</span>
                      </div>
                    )}
                  </form>
                </div>

                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-base font-black text-slate-900">
                      2. طريقة تفعيل الكود في Google Sheets (في 2 دقائق):
                    </h5>
                    <button
                      onClick={copyAppsScript}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs flex items-center gap-1.5 border border-slate-300 cursor-pointer transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'تم النسخ بنجاح!' : 'نسخ الكود'}</span>
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    <p>
                      <strong>الخطوة 1:</strong> افتح جدول جديد في <strong>Google Sheets</strong>.
                    </p>
                    <p>
                      <strong>الخطوة 2:</strong> من القائمة العلوية اضغط على <strong>Extensions (الإضافات)</strong> ⬅ ثم <strong>Apps Script</strong>.
                    </p>
                    <p>
                      <strong>الخطوة 3:</strong> امسح أي كود موجود في الصفحة، ثم ألصق الكود التالي:
                    </p>
                  </div>

                  <div className="relative">
                    <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl overflow-x-auto dir-ltr text-left border border-slate-800 max-h-56">
                      {APPS_SCRIPT_TEMPLATE}
                    </pre>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    <p>
                      <strong>الخطوة 4:</strong> اضغط على زر <strong>Deploy (نشر)</strong> بالأزرق في الأعلى ⬅ <strong>New deployment (نشر جديد)</strong>.
                    </p>
                    <p>
                      <strong>الخطوة 5:</strong> اختر نوع <strong>Web app</strong>، واجعل الخيار <em>Who has access</em> هو <strong>Anyone (أي شخص)</strong>.
                    </p>
                    <p>
                      <strong>الخطوة 6:</strong> انسخ الرابط الذي سينتهي بـ <code>/exec</code> وألصقه في الخانة بالأعلى ثم اضغط حفظ! ✅
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ADD MANUAL ORDER */}
            {activeTab === 'new-order' && (
              <div className="p-4 sm:p-6 max-w-2xl mx-auto space-y-4 flex-1">
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs">
                  <h4 className="text-lg font-black text-slate-900 mb-1">إضافة طلب يدوي جديد</h4>
                  <p className="text-xs text-slate-500 mb-5">
                    استعمل هذه الاستمارة إذا تواصل معك زبون عبر الواتساب أو الهاتف مباشرة وأردت تسجيل طلبه في النظام والـ Sheet.
                  </p>

                  <form onSubmit={handleCreateManualOrder} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">اسم الزبون *</label>
                        <input
                          type="text"
                          required
                          value={manualOrder.fullName}
                          onChange={(e) => setManualOrder({ ...manualOrder, fullName: e.target.value })}
                          placeholder="الاسم الكامل"
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">رقم الهاتف *</label>
                        <input
                          type="tel"
                          required
                          value={manualOrder.phone}
                          onChange={(e) => setManualOrder({ ...manualOrder, phone: e.target.value })}
                          placeholder="06XXXXXXXX"
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">المدينة *</label>
                        <input
                          type="text"
                          required
                          value={manualOrder.city}
                          onChange={(e) => setManualOrder({ ...manualOrder, city: e.target.value })}
                          placeholder="مثال: فاس"
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">عنوان الحي أو الشارع</label>
                        <input
                          type="text"
                          value={manualOrder.address}
                          onChange={(e) => setManualOrder({ ...manualOrder, address: e.target.value })}
                          placeholder="الحي، الإقامة أو الشارع"
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">الباقة المختارة</label>
                        <select
                          value={manualOrder.packageName}
                          onChange={(e) => {
                            const val = e.target.value;
                            let price = 349;
                            let qty = 2;
                            if (val.includes('علبة واحدة')) { price = 249; qty = 1; }
                            if (val.includes('3 علب')) { price = 449; qty = 3; }
                            setManualOrder({ ...manualOrder, packageName: val, price, quantity: qty });
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        >
                          <option value="باقة شهر واحد (علبة واحدة)">باقة شهر واحد (علبة واحدة) - 249 DH</option>
                          <option value="باقة شهرين (علبتين) - الأكثر طلباً">باقة شهرين (علبتين) - 349 DH</option>
                          <option value="باقة 3 أشهر (3 علب) - أفضل قيمة">باقة 3 أشهر (3 علب) - 449 DH</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">المبلغ الإجمالي (درهم)</label>
                        <input
                          type="number"
                          value={manualOrder.price}
                          onChange={(e) => setManualOrder({ ...manualOrder, price: Number(e.target.value) })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ملاحظات إضافية</label>
                      <textarea
                        rows={2}
                        value={manualOrder.notes}
                        onChange={(e) => setManualOrder({ ...manualOrder, notes: e.target.value })}
                        placeholder="أي تفاصيل خاصة بالتوصيل أو التوقيت..."
                        className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      تسجيل الطلب وحفظه في النظام 💾
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
