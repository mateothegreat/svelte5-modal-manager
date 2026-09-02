import { manager, type ModalInstance } from "@mateothegreat/svelte5-modal-manager";

import Basic from "./basic.svelte";

const prop = $state({
  foo: "bar",
  time: new Date()
});

setInterval(() => {
  prop.time = new Date();
}, 500);

export const openBasic = (): ModalInstance<CustomBasicProps> => {
  return manager.open<CustomBasicProps>({
    id: "basic",
    component: Basic,
    backdrop: true,
    dialog: {
      attributes: {
        "data-where-am-i": "dialog",
        "data-my-component-name": "basic.svelte"
      }
    },
    props: {
      state: prop
    }
  });
};
