import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));

// Persistent storage setup
const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf8");
  }
  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(
      SETTINGS_FILE,
      JSON.stringify(
        {
          googleSheetsWebhookUrl: "",
          adminPin: "1234",
        },
        null,
        2
      ),
      "utf8"
    );
  }
}

initStorage();

function getOrders(): any[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    const content = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    console.error("Error reading orders:", err);
    return [];
  }
}

function saveOrders(orders: any[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving orders:", err);
  }
}

function getSettings(): { googleSheetsWebhookUrl: string; adminPin: string } {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) {
      return { googleSheetsWebhookUrl: "", adminPin: "1234" };
    }
    const content = fs.readFileSync(SETTINGS_FILE, "utf8");
    return JSON.parse(content || "{}");
  } catch (err) {
    console.error("Error reading settings:", err);
    return { googleSheetsWebhookUrl: "", adminPin: "1234" };
  }
}

function saveSettings(settings: any) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf8");
  } catch (err) {
    console.error("Error saving settings:", err);
  }
}

async function sendToGoogleSheetsWebhook(order: any, webhookUrl: string): Promise<boolean> {
  if (!webhookUrl || typeof webhookUrl !== "string" || !webhookUrl.startsWith("http")) {
    return false;
  }
  try {
    const formattedDate = new Date(order.createdAt).toLocaleString("fr-FR", {
      timeZone: "Africa/Casablanca",
    });

    const payload = {
      orderId: order.orderNumber,
      date: formattedDate,
      fullName: order.fullName,
      phone: order.phone,
      city: order.city,
      address: order.address || "غير محدد",
      packageName: order.packageName,
      price: `${order.price} DH`,
      quantity: order.quantity || 1,
      status:
        order.status === "confirmed"
          ? "مؤكد"
          : order.status === "shipped"
          ? "قيد الشحن"
          : order.status === "delivered"
          ? "تم التوصيل"
          : "جديد",
      notes: order.notes || "",
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.ok;
  } catch (err) {
    console.error("Google Sheets webhook dispatch failed:", err);
    return false;
  }
}

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Convert 16-bit PCM buffer into standard WAV buffer
function pcmToWav(pcmData: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmData.length;
  const header = Buffer.alloc(44);

  // "RIFF" chunk descriptor
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);

  // "fmt " sub-chunk
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  header.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);

  // "data" sub-chunk
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmData]);
}

// In-memory cache for audio snippets to ensure blazing speed on repeated plays
const audioCache = new Map<string, { wavBase64: string; sampleRate: number }>();

// API routes FIRST
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "magnesium-complex-tts" });
});

// Text-to-speech route using gemini-3.1-flash-tts-preview
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voice = "Kore" } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "نص القراءة مطلوب (Text is required)" });
    }

    const trimmedText = text.trim();
    const cacheKey = `${voice}:${trimmedText}`;
    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      return res.json({
        success: true,
        cached: true,
        wavBase64: cached.wavBase64,
        sampleRate: cached.sampleRate,
        audioUrl: `data:audio/wav;base64,${cached.wavBase64}`,
      });
    }

    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: trimmedText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voice,
            },
          },
        },
      },
    });

    const candidate = response.candidates?.[0];
    const part = candidate?.content?.parts?.[0];
    const base64Audio = part?.inlineData?.data;

    if (!base64Audio) {
      return res.status(500).json({ error: "لم يتم استلام مقطع صوتي من النموذج (No audio data returned)" });
    }

    const pcmBuffer = Buffer.from(base64Audio, "base64");
    const wavBuffer = pcmToWav(pcmBuffer, 24000, 1, 16);
    const wavBase64 = wavBuffer.toString("base64");

    // Cache the result
    audioCache.set(cacheKey, { wavBase64, sampleRate: 24000 });

    return res.json({
      success: true,
      cached: false,
      wavBase64,
      sampleRate: 24000,
      audioUrl: `data:audio/wav;base64,${wavBase64}`,
    });
  } catch (error: any) {
    console.error("TTS Generation Error:", error);
    return res.status(500).json({
      error: error.message || "حدث خطأ أثناء تحويل النص إلى صوت",
      details: error.toString(),
    });
  }
});

// Orders and Dashboard API Routes
app.get("/api/orders", (req, res) => {
  const orders = getOrders();
  // Sort latest first
  orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json({ success: true, orders });
});

app.post("/api/orders", async (req, res) => {
  try {
    const { fullName, phone, city, address, packageId, packageName, totalPrice, quantity, notes } = req.body;
    if (!fullName || !phone || !city) {
      return res.status(400).json({ error: "المرجو ملء جميع الحقول المطلوبة (الاسم، الهاتف، المدينة)" });
    }

    const orderNumber = "MG-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: "ord_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      orderNumber,
      createdAt: new Date().toISOString(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      city: city.trim(),
      address: (address || "").trim(),
      packageId: packageId || "pack-2",
      packageName: packageName || "مكمل المغنيسيوم 2150mg",
      price: Number(totalPrice) || 249,
      quantity: Number(quantity) || 1,
      status: "new",
      notes: notes || "",
      syncedToSheets: false,
    };

    // Save to persistent file
    const orders = getOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    console.log(`[Order Saved]: #${orderNumber} for ${fullName} (${city}) - ${newOrder.price} DH`);

    // Asynchronously dispatch to Google Sheets webhook if configured
    const settings = getSettings();
    if (settings.googleSheetsWebhookUrl) {
      sendToGoogleSheetsWebhook(newOrder, settings.googleSheetsWebhookUrl).then((synced) => {
        if (synced) {
          const currentOrders = getOrders();
          const target = currentOrders.find((o) => o.id === newOrder.id);
          if (target) {
            target.syncedToSheets = true;
            saveOrders(currentOrders);
            console.log(`[Order #${orderNumber} synced to Google Sheets successfully]`);
          }
        }
      });
    }

    return res.json({
      success: true,
      orderId: orderNumber,
      order: newOrder,
      message: "تم تسجيل طلبك بنجاح! سيتصل بك فريقنا لتأكيد العنوان وموعد التوصيل بالمجان.",
    });
  } catch (err: any) {
    console.error("Error creating order:", err);
    return res.status(500).json({ error: "حدث خطأ أثناء حفظ الطلب" });
  }
});

app.patch("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const orders = getOrders();
  const orderIndex = orders.findIndex((o) => o.id === id || o.orderNumber === id);

  if (orderIndex === -1) {
    return res.status(404).json({ error: "الطلب غير موجود" });
  }

  if (status) orders[orderIndex].status = status;
  if (notes !== undefined) orders[orderIndex].notes = notes;

  saveOrders(orders);
  return res.json({ success: true, order: orders[orderIndex] });
});

app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const orders = getOrders();
  const filtered = orders.filter((o) => o.id !== id && o.orderNumber !== id);

  if (filtered.length === orders.length) {
    return res.status(404).json({ error: "الطلب غير موجود" });
  }

  saveOrders(filtered);
  return res.json({ success: true, message: "تم حذف الطلب بنجاح" });
});

// Admin Settings & Webhook Routes
app.get("/api/admin/settings", (req, res) => {
  const settings = getSettings();
  res.json({
    success: true,
    googleSheetsWebhookUrl: settings.googleSheetsWebhookUrl || "",
    hasWebhook: !!settings.googleSheetsWebhookUrl,
  });
});

app.post("/api/admin/settings", (req, res) => {
  const { googleSheetsWebhookUrl, adminPin } = req.body;
  const settings = getSettings();

  if (googleSheetsWebhookUrl !== undefined) {
    settings.googleSheetsWebhookUrl = (googleSheetsWebhookUrl || "").trim();
  }
  if (adminPin) {
    settings.adminPin = String(adminPin).trim();
  }

  saveSettings(settings);
  res.json({ success: true, settings });
});

app.post("/api/admin/test-webhook", async (req, res) => {
  const { webhookUrl } = req.body;
  const targetUrl = webhookUrl || getSettings().googleSheetsWebhookUrl;

  if (!targetUrl) {
    return res.status(400).json({ error: "رابط Google Sheets Webhook غير محدد" });
  }

  const dummyOrder = {
    orderNumber: "MG-TEST-" + Math.floor(100 + Math.random() * 900),
    createdAt: new Date().toISOString(),
    fullName: "تجربة ربط الشيت (Test Lead)",
    phone: "0700363949",
    city: "الدار البيضاء (Casablanca)",
    address: "شارع المسيرة الخضراء، تجربة",
    packageName: "باقة شهرين (علبتين) - تجربة",
    price: 349,
    quantity: 2,
    status: "new",
    notes: "هذا سطر تجريبي للتأكد من اتصال الموقع بجدول Google Sheets بنجاح!",
  };

  const ok = await sendToGoogleSheetsWebhook(dummyOrder, targetUrl);
  if (ok) {
    return res.json({ success: true, message: "تم إرسال سطر التجربة إلى جدول Google Sheets بنجاح! تفقد الجدول الآن." });
  } else {
    return res.status(500).json({ error: "تعذر الاتصال بالرابط، تأكد من صلاحيات النشر (Anyone) في Apps Script" });
  }
});

app.post("/api/admin/verify-pin", (req, res) => {
  const { pin } = req.body;
  const settings = getSettings();
  const valid = String(pin).trim() === String(settings.adminPin).trim();
  res.json({ success: true, valid });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Magnesium Complex server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
