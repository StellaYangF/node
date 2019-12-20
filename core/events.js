module.exports =  class Events {
  constructor() {
    this.events = Object.create(null);
  }
  on(type, callback) {
    this.events || (this.events = Object.create(null));
    const fns = this.events[type] || [];
    fns.push(callback);
    this.events[type] = fns;
  }
  emit(type, ...args) {
    this.events[type] && this.events[type].forEach(callback => callback(...args));
  }
  once(type, callback) {
    const once = (...args) => {
      callback(...args);
      this.off(type, callback);
    }
    once.listener = callback;
    this.on(type, once);
  }
  off(type, callback) {
    let fns = this.events[type];
    // 区分p.once(type, once) p.on(type, callback)中callback不一致
    // once切片包装了callback-
    fns = fns.filter(fn => (fn !== callback && fn.listener !== callback));
    this.events[type] = fns;
  }
}
