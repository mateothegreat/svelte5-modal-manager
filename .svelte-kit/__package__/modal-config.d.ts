export declare class ModalConfig<T> {
    id?: string;
    classes?: string;
    component: any;
    closeIcon?: boolean;
    closeOnEscape?: boolean;
    closeOnExternalClick?: boolean;
    data?: T;
    constructor(obj: ModalConfig<T>);
}
