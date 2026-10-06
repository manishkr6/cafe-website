/**
 * Café Zéro — Static & Dev Server
 * Zero backend database required.
 * Contact and inquiries are handled directly via Web3Forms (https://web3forms.com).
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Informative health endpoint confirming serverless Web3Forms status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    contactProvider: 'Web3Forms (https://web3forms.com)',
    backendRequired: false,
    environment: isProd ? 'production' : 'development'
  });
});

// Optional AI Concierge Assistant (Gemini API)
let geminiClient = null;
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'gemini-2.5-flash', role = 'concierge' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
      });
    }

    const roleInstructions = {
      concierge: `You are the AI Concierge & Host at Café Zéro in Gangtok, Sikkim (located on the 4th Floor of Ridge View Arcade overlooking the Kanchenjunga mountain range at 5,800 ft elevation). You are warm, courteous, and knowledgeable about our specialty Himalayan coffee, breakfasts, reservations, and mountain atmosphere. Answer concisely with quiet luxury and elegance.`,
      sommelier: `You are the Coffee Sommelier at Café Zéro in Gangtok. You specialize in high-altitude coffee extraction (calibrated for 5,800 ft), Himalayan micro-lots, and pour-over rituals. Answer with enthusiasm and craftsmanship.`,
      guide: `You are the Gangtok Mountain Guide for Café Zéro guests. You provide serene travel tips around Gangtok and pairing local viewpoints with moments at Café Zéro.`
    };

    const systemInstruction = roleInstructions[role] || roleInstructions.concierge;

    const contents = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text || m.content || '' }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.status(200).json({
      success: true,
      text: response.text || '',
    });
  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate response.',
    });
  }
});

// -------------------------------------------------------------
// Vite Dev Integration & Production Static Serving
// -------------------------------------------------------------
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Café Zéro server running on http://0.0.0.0:${PORT} (Contact: Web3Forms)`);
  });
}

startServer();
