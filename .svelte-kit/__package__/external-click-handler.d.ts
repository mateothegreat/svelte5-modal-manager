import { ModalInstance } from './modal-instance';
/**
 * A function for detecting clicks outside of a given element and
 * returns an object with a destroy method to remove the event listener
 * when it is no longer needed due to the element being removed from the DOM.
 *
 * @param child The child element to check if clicked outside of.
 * @returns An object with a destroy method to remove the event listener.
 */
export declare const externalClickHandler: (instance: ModalInstance<any>, child: any) => {
    destroy(): void;
};
