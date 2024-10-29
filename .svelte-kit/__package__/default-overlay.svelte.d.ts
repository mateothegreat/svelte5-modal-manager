import type { ModalInstance } from './modal-instance';
interface $$__sveltets_2_IsomorphicComponent<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any, Exports = {}, Bindings = string> {
    new (options: import('svelte').ComponentConstructorOptions<Props>): import('svelte').SvelteComponent<Props, Events, Slots> & {
        $$bindings?: Bindings;
    } & Exports;
    (internal: unknown, props: Props & {
        $$events?: Events;
        $$slots?: Slots;
    }): Exports & {
        $set?: any;
        $on?: any;
    };
    z_$$bindings?: Bindings;
}
declare const DefaultOverlay: $$__sveltets_2_IsomorphicComponent<{
    instance: ModalInstance<any>;
}, {
    close: CustomEvent<string>;
    externalClickEvent: (e: PointerEvent) => void;
}, {}, {}, "instance">;
type DefaultOverlay = InstanceType<typeof DefaultOverlay>;
export default DefaultOverlay;
