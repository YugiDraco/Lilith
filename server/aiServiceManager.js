import { ChatService } from './chatService.js';
import { memoryService } from './memoryService.js';
import { ImageService } from '../src/services/image/ImageService.js';

/**
 * Master AIServiceManager for Lilith V3 Backend
 * Classifies user intent (CHAT, IMAGE, MEMORY, VIDEO, VOICE)
 * and routes to respective services.
 */

export class AIServiceManager {
  static classifyIntent(messageText) {
    if (!messageText || typeof messageText !== 'string') return 'CHAT';
    const text = messageText.toLowerCase();

    // 1. Image Intent
    if (
      text.includes('picture') ||
      text.includes('selfie') ||
      text.includes('photo') ||
      text.includes('outfit') ||
      text.includes('image') ||
      text.includes('show me') ||
      text.includes('look like') ||
      text.includes('smile') ||
      text.includes('pose')
    ) {
      return 'IMAGE';
    }

    // 2. Memory Intent
    if (
      text.includes('remember') ||
      text.includes('my favorite') ||
      text.includes('my birthday') ||
      text.includes('keep in mind') ||
      text.includes('dont forget')
    ) {
      return 'MEMORY';
    }

    // 3. Video Intent
    if (text.includes('video') || text.includes('clip') || text.includes('movie') || text.includes('waving')) {
      return 'VIDEO';
    }

    // 4. Voice Intent
    if (text.includes('speak') || text.includes('voice') || text.includes('audio') || text.includes('say aloud')) {
      return 'VOICE';
    }

    return 'CHAT';
  }

  static async processUserMessage(character, userMessage, conversationHistory = []) {
    const characterId = character.identity?.id || 'char_default';
    const intent = this.classifyIntent(userMessage);

    // Retrieve contextual memories
    const memories = memoryService.retrieveRelevantMemories(characterId, userMessage);

    if (intent === 'IMAGE') {
      // Route to ImageService
      let shotType = 'portrait';
      if (userMessage.toLowerCase().includes('selfie')) shotType = 'selfie';
      else if (userMessage.toLowerCase().includes('full body') || userMessage.toLowerCase().includes('outfit')) shotType = 'fullbody';

      const imgResult = await ImageService.generateShot(character, shotType);

      return {
        intent: 'IMAGE',
        sender: 'companion',
        text: `Here is a custom ${shotType} photo I just captured for you!`,
        imageAttachment: imgResult.url,
        messageId: `msg_img_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }

    if (intent === 'MEMORY') {
      // Route to MemoryService
      const newMem = memoryService.saveMemory(characterId, {
        category: 'fact',
        content: `User requested to remember: "${userMessage}"`,
        pinned: true
      });

      return {
        intent: 'MEMORY',
        sender: 'companion',
        text: `I've stored that memory in my permanent memory bank! I won't forget: "${userMessage}"`,
        memorySaved: newMem,
        messageId: `msg_mem_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
    }

    // Default: Route to ChatService LLM
    const chatResult = await ChatService.generateChatResponse(character, userMessage, conversationHistory, memories);
    return {
      intent: 'CHAT',
      ...chatResult
    };
  }
}
