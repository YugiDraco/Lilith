/**
 * Production Memory Service for Lilith V3 Backend
 * Manages memory storage (Facts, Preferences, Milestones, Pinned Memories)
 * and contextual keyword retrieval for system prompt injection.
 */

class MemoryServiceManager {
  constructor() {
    this.memoryStore = new Map(); // Keyed by characterId
  }

  getCharacterMemories(characterId) {
    if (!this.memoryStore.has(characterId)) {
      this.memoryStore.set(characterId, [
        { id: 'mem_init_1', category: 'preference', content: 'Prefers articulate, intellectually engaging conversation.', pinned: true },
        { id: 'mem_init_2', category: 'fact', content: 'Met companion in the virtual penthouse studio.', pinned: true }
      ]);
    }
    return this.memoryStore.get(characterId);
  }

  saveMemory(characterId, memoryObj) {
    const memories = this.getCharacterMemories(characterId);
    const newEntry = {
      id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      category: memoryObj.category || 'fact',
      content: memoryObj.content,
      pinned: memoryObj.pinned || false
    };
    memories.unshift(newEntry);
    return newEntry;
  }

  retrieveRelevantMemories(characterId, userQuery, limit = 5) {
    const memories = this.getCharacterMemories(characterId);
    if (!userQuery) return memories.slice(0, limit);

    const queryTerms = userQuery.toLowerCase().split(/\s+/);
    const scored = memories.map(mem => {
      let score = mem.pinned ? 5 : 0;
      const content = mem.content.toLowerCase();
      queryTerms.forEach(term => {
        if (term.length > 2 && content.includes(term)) {
          score += 2;
        }
      });
      return { mem, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.filter(s => s.score > 0).map(s => s.mem).slice(0, limit);
  }
}

export const memoryService = new MemoryServiceManager();
