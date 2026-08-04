import express from 'express';
import cors from 'cors';
import { AIServiceManager } from './aiServiceManager.js';
import { memoryService } from './memoryService.js';
import { ImageService } from '../src/services/image/ImageService.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/**
 * REST Endpoint: POST /api/chat
 * Real AI Chat LLM & Intent Router (Chat, Image, Memory, Video, Voice)
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { character, message, history } = req.body;
    if (!character || !message) {
      return res.status(400).json({ success: false, error: 'Character payload and user message required' });
    }

    const responsePayload = await AIServiceManager.processUserMessage(character, message, history || []);
    return res.json({
      success: true,
      ...responsePayload
    });
  } catch (err) {
    console.error('Error in /api/chat endpoint:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * REST Endpoint: POST /api/memory
 */
app.post('/api/memory', (req, res) => {
  try {
    const { characterId, action, memory } = req.body;
    if (action === 'get') {
      const memories = memoryService.getCharacterMemories(characterId || 'char_default');
      return res.json({ success: true, memories });
    } else if (action === 'save') {
      const saved = memoryService.saveMemory(characterId || 'char_default', memory);
      return res.json({ success: true, memory: saved });
    }
    return res.status(400).json({ success: false, error: 'Invalid action' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * REST Endpoint: POST /api/images/preview
 */
app.post('/api/images/preview', async (req, res) => {
  const startTime = Date.now();
  try {
    const { character } = req.body;
    if (!character) {
      return res.status(400).json({ success: false, error: 'Character payload required' });
    }

    const result = await ImageService.generatePreview(character);
    const generationTimeMs = Date.now() - startTime;

    return res.json({
      success: true,
      url: result.url,
      generationId: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      isCached: result.isCached,
      generationTimeMs,
      prompt: result.prompt,
      seed: result.seed
    });
  } catch (err) {
    console.error('Error generating preview:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * REST Endpoint: POST /api/images/fullbody
 */
app.post('/api/images/fullbody', async (req, res) => {
  const startTime = Date.now();
  try {
    const { character } = req.body;
    if (!character) {
      return res.status(400).json({ success: false, error: 'Character payload required' });
    }

    const result = await ImageService.generateFullBody(character);
    const generationTimeMs = Date.now() - startTime;

    return res.json({
      success: true,
      url: result.url,
      generationId: `gen_fb_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      isCached: result.isCached,
      generationTimeMs,
      prompt: result.prompt,
      seed: result.seed
    });
  } catch (err) {
    console.error('Error generating fullbody:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * REST Endpoint: POST /api/images/selfie
 */
app.post('/api/images/selfie', async (req, res) => {
  const startTime = Date.now();
  try {
    const { character } = req.body;
    if (!character) {
      return res.status(400).json({ success: false, error: 'Character payload required' });
    }

    const result = await ImageService.generateSelfie(character);
    const generationTimeMs = Date.now() - startTime;

    return res.json({
      success: true,
      url: result.url,
      generationId: `gen_selfie_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      isCached: result.isCached,
      generationTimeMs,
      prompt: result.prompt,
      seed: result.seed
    });
  } catch (err) {
    console.error('Error generating selfie:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * REST Endpoint: POST /api/images/gallery
 */
app.post('/api/images/gallery', async (req, res) => {
  const startTime = Date.now();
  try {
    const { character } = req.body;
    if (!character) {
      return res.status(400).json({ success: false, error: 'Character payload required' });
    }

    const results = await ImageService.generateGallery(character);
    const generationTimeMs = Date.now() - startTime;

    return res.json({
      success: true,
      gallery: results.map(r => ({
        url: r.url,
        isCached: r.isCached,
        prompt: r.prompt,
        seed: r.seed
      })),
      generationId: `gen_gal_${Date.now()}`,
      generationTimeMs
    });
  } catch (err) {
    console.error('Error generating gallery:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Lilith V3 AI Platform Server', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Lilith V3 Express AI REST Backend Server running on http://localhost:${PORT}`);
});
