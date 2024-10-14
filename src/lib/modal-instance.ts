import type { ModalManager } from '.';
import { ModalConfig } from '.';

export class ModalInstance<T> {
  public manager: ModalManager;
  public config: ModalConfig<T>;
  public element?: HTMLElement;
  public overlay?: any;
  public index?: number;
  public props?: T;

  public constructor(config: ModalConfig<T>) {
    this.config = new ModalConfig<T>(config);
  }

  public close() {
    this.manager.close(this.config.id);
  }
}
