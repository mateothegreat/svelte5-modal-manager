import { mount, unmount } from 'svelte';
import DefaultOverlay from './default-overlay.svelte';
import type { ModalConfig } from './modal-config';
import { ModalInstance } from './modal-instance';
import { visible } from './store';
export class ModalManager {
  public modals: { [name: string]: ModalInstance<any> } = {};

  public open(config: ModalConfig<any>, props?: any): void {
    const instance = new ModalInstance(config);

    this.modals[instance.config.id] = instance;
    this.modals[instance.config.id].manager = this;
    this.modals[instance.config.id].overlay = mount(DefaultOverlay, {
      target: document.body,
      props: {
        instance: this.modals[instance.config.id]
      }
    });
    this.modals[instance.config.id].index = Object.keys(this.modals).length - 1
  }

  public close(id: string): void {
    if (!this.modals[id]) {
      console.error(`Modal with id ${id} not found`, this.modals);
      return;
    }

    unmount(this.modals[id].overlay);
    delete this.modals[id];
  }

  public show(id: string): void {
    visible.set(true);
  }

  public hide(id: string): void {
    visible.set(false);
  }

  public getIndex(id: string): number {
    return this.modals[id].index;
  }

  public isOnTop(id: string): boolean {
    return this.getIndex(id) === Object.keys(this.modals).length - 1;
  }
}
