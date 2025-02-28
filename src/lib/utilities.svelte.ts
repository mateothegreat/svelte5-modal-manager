/**
 * A reactive map that can be observed for changes using `$state()`.
 *
 * @category utilities
 */
export class ReactiveMap<K, V> extends Map<K, V> {
  #state = $state(false);

  get size() {
    this.#state;
    return super.size;
  }

  #trig() {
    this.#state = !this.#state;
  }

  get(key: K) {
    this.#state;
    return super.get(key);
  }

  set(key: K, value: V) {
    const result = super.set(key, value);
    this.#trig();
    return result;
  }

  delete(key: K) {
    const result = super.delete(key);
    if (result) this.#trig();
    return result;
  }

  clear() {
    const result = super.clear();
    this.#trig();
    return result;
  }

  keys() {
    this.#state;
    return super.keys();
  }
  values() {
    this.#state;
    return super.values();
  }
  entries() {
    this.#state;
    return super.entries();
  }
  forEach(fn: (value: V, key: K, map: Map<K, V>) => void) {
    this.#state;
    return super.forEach(fn);
  }

  [Symbol.iterator]() {
    this.#state;
    return super[Symbol.iterator]();
  }
}
