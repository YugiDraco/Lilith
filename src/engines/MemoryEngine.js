/**
 * Dedicated Memory Engine for Lilith V2
 * Supports tiers: Permanent, Long-Term, Pinned, Recent, Conversation.
 * Enables efficient search, tagging, pinning, and memory creation.
 */

export class MemoryEngine {
  constructor(memoriesModule = {}) {
    this.permanent = memoriesModule.permanent || [];
    this.longTerm = memoriesModule.longTerm || [];
    this.pinned = memoriesModule.pinned || [];
    this.recent = memoriesModule.recent || [];
    this.conversationHistory = memoriesModule.conversationHistory || [];
  }

  /**
   * Search all memories across tiers
   */
  search(query = '', tier = 'all') {
    if (!query && tier === 'all') {
      return {
        permanent: this.permanent,
        longTerm: this.longTerm,
        pinned: this.pinned,
        recent: this.recent
      };
    }

    const filterList = (list) =>
      list.filter(m => m.content.toLowerCase().includes(query.toLowerCase()));

    return {
      permanent: (tier === 'all' || tier === 'permanent') ? filterList(this.permanent) : [],
      longTerm: (tier === 'all' || tier === 'longTerm') ? filterList(this.longTerm) : [],
      pinned: (tier === 'all' || tier === 'pinned') ? filterList(this.pinned) : [],
      recent: (tier === 'all' || tier === 'recent') ? filterList(this.recent) : []
    };
  }

  /**
   * Add a new memory entry to a tier
   */
  addMemory(content, tier = 'recent') {
    const newEntry = {
      id: `mem_${tier}_${Date.now()}`,
      content,
      timestamp: new Date().toISOString().split('T')[0]
    };

    if (tier === 'permanent') this.permanent.unshift(newEntry);
    else if (tier === 'longTerm') this.longTerm.unshift(newEntry);
    else if (tier === 'pinned') this.pinned.unshift(newEntry);
    else this.recent.unshift(newEntry);

    return this.toModule();
  }

  /**
   * Return updated JSON module
   */
  toModule() {
    return {
      permanent: this.permanent,
      longTerm: this.longTerm,
      pinned: this.pinned,
      recent: this.recent,
      conversationHistory: this.conversationHistory
    };
  }
}
