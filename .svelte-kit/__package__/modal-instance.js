import { ModalConfig } from '.';
export class ModalInstance {
    manager;
    config;
    element;
    overlay;
    index;
    props;
    constructor(config) {
        this.config = new ModalConfig(config);
    }
    close() {
        this.manager.close(this.config.id);
    }
}
