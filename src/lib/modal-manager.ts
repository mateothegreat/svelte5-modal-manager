import { mount, unmount } from 'svelte';
import DefaultOverlay from './default-overlay.svelte';
import type { ModalConfig } from './modal-config';
import { ModalInstance } from './modal-instance';
import { visible } from './store';
export class ModalManager {
  public modals: { [name: string]: ModalInstance<any> } = {};

  public open(config: ModalConfig<any>, props?: any) {
    this.modals[config.id] = new ModalInstance(config);
    this.modals[config.id].manager = this;
    this.modals[config.id].overlay = mount(DefaultOverlay, {
      target: document.body,
      props: {
        instance: this.modals[config.id]
      }
    });
  }

  public close(id: string) {
    unmount(this.modals[id].overlay);
    delete this.modals[id];
  }

  public show(id: string) {
    visible.set(true);
  }

  public hide(id: string) {
    visible.set(false);
  }
}
