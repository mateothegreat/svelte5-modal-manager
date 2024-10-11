import { ModalInstance } from './modal-instance';
const findAncestor = (el: any, sel: any) => {
  while ((el = el.parentElement) && !(el.matches || el.matchesSelector).call(el, sel));
  return el;
};
/**
 * A function for detecting clicks outside of a given element and
 * returns an object with a destroy method to remove the event listener
 * when it is no longer needed due to the element being removed from the DOM.
 *
 * @param child The child element to check if clicked outside of.
 * @returns An object with a destroy method to remove the event listener.
 */
export const externalClickHandler = (instance: ModalInstance<any>, child: any) => {
  // Determine if clicked element is outside the passed node or not.
  console.log(instance, child);
  const clicked = (event: any) => {
    const overlay = document.querySelector(`#${instance.config.id} .modal-overlay`);
    // const overlay = instance.overlay;
    console.log(overlay);

    // if (event.target.ownerDocument.constructor.name === "HTMLDocument" && !child.contains(event.target)) {
    // 	console.log(child);
    // 	console.log(event.target);
    // 	child.dispatchEvent(new CustomEvent("blur", { detail: event }));
    // }
  };

  // Listen for click events in the capture phase, so that we
  // can cancel them without interfering with other click
  // handlers on the same element.
  document.addEventListener('click', clicked, true);

  // Return a function that removes the event listener.
  return {
    destroy() {
      document.removeEventListener('click', clicked, true);
    }
  };
};
