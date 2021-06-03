import { capitalize } from "./untils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((event) => {
      const method = getMethodName(event);
      if (!this[method]) {
        throw new Error(
          `Sorry, ${method} is not implemented in ${this.name} Component`
        );
      }
      this[method] = this[method].bind(this); // привязываем метод

      this.$root.on(event, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((event) => {
      const method = getMethodName(event);      
      this.$root.off(event, this[method]);
    });
  }
}

function getMethodName(EventName) {
  return "on" + capitalize(EventName);
}
