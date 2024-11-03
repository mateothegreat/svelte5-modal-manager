export class ModalConfig<T = any> {
  public id?: string = Math.random().toString(6);
  public classes?: string;
  public component: any;
  public closeIcon?: boolean;
  public closeOnEscape?: boolean = true;
  public closeOnExternalClick?: boolean = true;
  public data?: T;
  public escFn?: () => Promise<void>;

  public constructor(obj: ModalConfig<T>) {
    Object.assign(this, obj);
  }
}
