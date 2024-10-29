export class ModalConfig {
    id = Math.random().toString(6);
    classes;
    component;
    closeIcon;
    closeOnEscape;
    closeOnExternalClick;
    data;
    constructor(obj) {
        Object.assign(this, obj);
    }
}
