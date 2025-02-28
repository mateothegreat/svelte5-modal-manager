import type { ModalManager } from ".";
import { ModalConfig } from ".";

export class ModalInstance<T, V = any> {
  // The manager that created the instance.
  manager: ModalManager;

  // The configuration options for the modal.
  config: ModalConfig;

  // The element that the modal was mounted to.
  element?: HTMLElement;

  // The overlay that the modal was mounted to.
  overlay?: any;

  // The index of the modal so we can determine the order of the modals later.
  index = $state(-1);

  // Additional properties to pass to the modal component.
  props?: T;

  // Whether the modal is on top of the stack.
  top = $state(false);

  constructor(config: ModalConfig) {
    this.config = new ModalConfig(config);
    console.log(config);
    this.props = config.props;
  }

  /**
   * Shortcut method to close the modal by calling the manager's close method.
   */
  close() {
    this.manager.close(this.config.id);
  }
}
