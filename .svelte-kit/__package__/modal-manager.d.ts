import type { ModalConfig } from './modal-config';
import { ModalInstance } from './modal-instance';
export declare class ModalManager {
    modals: {
        [name: string]: ModalInstance<any>;
    };
    open(config: ModalConfig<any>, props?: any): void;
    close(id: string | undefined): void;
    show(id: string): void;
    hide(id: string): void;
    getIndex(id: string): number;
    isOnTop(id: string): boolean;
}
