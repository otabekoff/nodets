type Handler = (...args: unknown[]) => void;

export class EventEmitter {
  private handlers: Record<string, Handler[]> = {};

  on(event: string, handler: Handler) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event].push(handler);
  }

  emit(event: string, ...args: unknown[]) {
    (this.handlers[event] || []).forEach((h) => h(...args));
  }

  off(event: string, handler: Handler) {
    this.handlers[event] = (this.handlers[event] || []).filter((h) => h !== handler);
  }
}
