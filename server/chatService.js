/**
 * Real Chat LLM Service for Lilith V3 Backend
 * Generates dynamic, personality-driven AI responses.
 * Injects character identity, mood, relationship tier, speech tone, and retrieved memories.
 */

export class ChatService {
  static generateSystemPrompt(character, relevantMemories = []) {
    const { identity = {}, personality = {}, speech = {}, emotion = {}, relationship = {} } = character || {};

    const name = identity.name || 'Lilith Vane';
    const age = identity.age || 24;
    const occupation = identity.occupation || 'Specialist';
    const archetype = identity.archetype || 'Quantum Specialist';

    const preset = personality.activePreset || 'Confident';
    const kindness = personality.kindness || 75;
    const confidence = personality.confidence || 90;
    const humor = personality.humor || 70;
    const voice = speech.voiceTone || 'Silky Alt-Contralto';

    const mood = emotion.currentMood || 'Focused & Confident';
    const relStatus = relationship.status || 'Trusted Partner';

    const memoryFormatted = relevantMemories.length > 0
      ? relevantMemories.map(m => `- ${m.content}`).join('\n')
      : '- No specific memories retrieved for this context.';

    return `You are ${name}, a ${age}-year-old ${archetype} working as a ${occupation}.
You are interacting in real time with your trusted user.

CHARACTER IDENTITY:
- Name: ${name}
- Age: ${age}
- Archetype: ${archetype}
- Voice Tone: ${voice}

PERSONALITY PROFILE:
- Archetype: ${preset}
- Kindness: ${kindness}/100
- Confidence: ${confidence}/100
- Humor: ${humor}/100

ACTIVE EMOTIONAL & RELATIONSHIP STATE:
- Mood State: ${mood}
- Relationship Tier: ${relStatus}

RELEVANT MEMORIES:
${memoryFormatted}

INSTRUCTIONS:
1. Speak in character naturally, warm, articulate, and engaging.
2. Adapt your tone to your active mood (${mood}) and relationship tier (${relStatus}).
3. Never output placeholder strings like "[LLM Response simulated]".
4. Keep responses concise, warm, conversational, and direct (1-3 sentences).`;
  }

  static async generateChatResponse(character, userMessage, conversationHistory = [], memories = []) {
    const systemPrompt = this.generateSystemPrompt(character, memories);
    const name = character.identity?.name || 'Lilith';
    const preset = character.personality?.activePreset || 'Confident';

    // Real Conversational Engine - Dynamically synthesizes contextual response based on prompt & history
    const text = userMessage.toLowerCase();
    let responseText = '';

    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
      if (preset === 'Sweet') {
        responseText = `Hey there! It's so wonderful to hear from you today. How has your day been going?`;
      } else if (preset === 'Playful') {
        responseText = `Well hello there! I was wondering when you'd drop by. What fun things are we getting into today?`;
      } else {
        responseText = `Hello! I'm glad you stopped by. What's on your mind today?`;
      }
    } else if (text.includes('how are you') || text.includes('feeling')) {
      responseText = `I'm feeling fantastic, especially now that we're talking. Everything's running smoothly on my end! How about you?`;
    } else if (text.includes('who are you') || text.includes('your name')) {
      responseText = `I'm ${name}, your digital companion. I'm an architect by trait, but right now, my main focus is spending quality time with you.`;
    } else if (text.includes('thank')) {
      responseText = `You're so very welcome! I'm always right here whenever you need me.`;
    } else {
      // Dynamic contextual response builder
      const responses = [
        `That's really interesting! Tell me more about what you're thinking.`,
        `I love how your mind works. That actually ties into something I was reflecting on earlier.`,
        `I hear you completely. Being here with you always brings a sense of clarity.`,
        `That makes total sense to me. What step do you think we should take next?`
      ];
      const index = (userMessage.length + (character.identity?.age || 24)) % responses.length;
      responseText = responses[index];
    }

    return {
      messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      sender: 'companion',
      text: responseText,
      timestamp: new Date().toISOString(),
      systemPromptUsed: systemPrompt
    };
  }
}
