import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const PORT = 3000;
const app = express();

app.use(express.json({ limit: "10mb" }));

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

// Mock order submission API for customer orders (Moroccan Cash on Delivery / الدفع عند الاستلام)
app.post("/api/orders", (req, res) => {
  const { fullName, phone, city, address, packageId, quantity } = req.body;
  if (!fullName || !phone || !city) {
    return res.status(400).json({ error: "المرجو ملء جميع الحقول المطلوبة" });
  }

  const orderId = "MG-" + Math.floor(100000 + Math.random() * 900000);
  console.log(`[New Order Received]: #${orderId} - ${fullName} (${city}) - Tel: ${phone} - Pack: ${packageId} x ${quantity}`);

  return res.json({
    success: true,
    orderId,
    message: "تم تسجيل طلبك بنجاح! سيتصل بك فريقنا لتأكيد العنوان وموعد التوصيل بالمجان.",
  });
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
