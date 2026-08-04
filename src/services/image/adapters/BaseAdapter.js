/**
 * Abstract Base Provider Adapter Interface for Lilith V3
 * All provider adapters (Fal.ai, SDXL, Flux, Pollinations, Local Procedural) implement this contract interface.
 */

export class BaseAdapter {
  constructor(providerName = 'BaseProvider') {
    this.providerName = providerName;
  }

  async generate(promptObj, options = {}) {
    throw new Error(`generate() method must be implemented by adapter ${this.providerName}`);
  }
}
