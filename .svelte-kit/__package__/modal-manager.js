import { mount, unmount } from 'svelte';
import DefaultOverlay from './default-overlay.svelte';
import { ModalInstance } from './modal-instance';
import { visible } from './store';
export class ModalManager {
    modals = {};
    open(config, props) {
        const instance = new ModalInstance(config);
        this.modals[instance.config.id] = instance;
        this.modals[instance.config.id].manager = this;
        this.modals[instance.config.id].overlay = mount(DefaultOverlay, {
            target: document.body,
            props: {
                instance: this.modals[instance.config.id],
                ...props
            }
        });
        this.modals[instance.config.id].index = Object.keys(this.modals).length - 1;
    }
    close(id) {
        if (!this.modals[id]) {
            console.error(`Modal with id ${id} not found`, this.modals);
            return;
        }
        unmount(this.modals[id].overlay);
        delete this.modals[id];
    }
    show(id) {
        visible.set(true);
    }
    hide(id) {
        visible.set(false);
    }
    getIndex(id) {
        return this.modals[id].index;
    }
    isOnTop(id) {
        return this.getIndex(id) === Object.keys(this.modals).length - 1;
    }
}
