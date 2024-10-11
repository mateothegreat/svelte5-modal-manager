export class ModalConfig<T> {
  public id: string = Math.random().toString(6);
  public classes?: string;
  public component: any;
  public closeIcon?: boolean;
  public closeOnEscape?: boolean;
  public closeOnExternalClick?: boolean;
  public data?: T;
  public constructor(obj: ModalConfig<T>) {
    Object.assign(this, obj);
  }
}
