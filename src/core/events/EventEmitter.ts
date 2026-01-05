type Handler<A extends unknown[] = unknown[]> = (...args: A) => void;

export class EventEmitter<TEvents extends Record<string, unknown[]> = Record<string, unknown[]>> {
  private handlers: { [K in keyof TEvents]?: Handler<TEvents[K]>[] } = {};

  on<K extends keyof TEvents>(event: K, handler: Handler<TEvents[K]>) {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event]?.push(handler);
  }

  emit<K extends keyof TEvents>(event: K, ...args: TEvents[K]) {
    (this.handlers[event] || []).forEach((h) => h(...args));
  }

  off<K extends keyof TEvents>(event: K, handler: Handler<TEvents[K]>) {
    this.handlers[event] = (this.handlers[event] || []).filter((h) => h !== handler);
  }
}
