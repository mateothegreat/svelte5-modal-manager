import type { ModalManager } from '.';
import { ModalConfig } from '.';
export declare class ModalInstance<T> {
    manager: ModalManager;
    config: ModalConfig<T>;
    element?: HTMLElement;
    overlay?: any;
    index?: number;
    props?: T;
    constructor(config: ModalConfig<T>);
    close(): void;
}
