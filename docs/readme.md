# Svelte5 Modal Manager

Manage modals like a boss 💪!

No wrapper components, no extra markup, no dependencies, just modals.

✨ **Why choose this?**

- **NO** crazy abstractions! ✅
- **NO** adding components to the dom! ✅
- **NO** dependencies! ✅

Just lean & mean modals, let's 👏 go 👏

🚀 **Features:**

- Can manage thousands of modals at once 💦
- Components dynamically added and removed from the dom 🔄
- Pass props and get instance references.
- Backdrop overlay included 🔋
- Keyboard shortcuts ready 🎹

## Installation

```bash
npm install @mateothegreat/svelte5-modal-manager
```

## Usage

## `ModalConfig` Properties

The `ModalConfig` object is used to configure a modal when calling the `manager.open()` method.

It's a simple object that has the following properties available as options:

| name          | default      | description                                                         |
| ------------- | ------------ | ------------------------------------------------------------------- |
| `id`          | optional     | A unique identifier for the modal (auto-generated if not provided). |
| `component`   | **required** | The Svelte component to render inside the modal.                    |
| `props`       | optional     | Additional props to pass to the modal component.                    |
| `backdrop`    | optional     | Whether to display a backdrop behind the modal, or backdrop configuration object. |
| `dialog`      | optional     | Configuration object for the dialog element (class, attributes).    |
| `blurrable`   | optional     | Whether to close the modal when clicking outside of it.             |
| `keybindings` | optional     | Array of KeyBinding objects for keyboard interactions.              |

Usage example:

```ts
import { manager } from "@mateothegreat/svelte5-modal-manager";

const modal = manager.open({
  id: "my-modal",
  component: MyModalComponent,
  props: {
    name: "John Doe",
  },
  backdrop: true,
  blurrable: true,
  keybindings: [
    {
      key: Key.Escape,
      fn: (instance) => {
        console.log("Escape key pressed while this modal was open!");
        console.log("inner instance object reference:", instance);
      },
    },
  ],
});
```

## Opening

The `manager.open()` method takes a `ModalConfig` object as an argument (see above):

First, let's create a custom modal component that we can open using the modal manager:

`my-custom-component.svelte`:

```ts
<script lang="ts">
  import type { ModalProps } from "@mateothegreat/svelte5-modal-manager";
  /**
   * This is the reference to the modal instance that is accessible
   * within this custom component.
   *
   * This is passed in automatically by the manager for
   * all modals.
   */
  let { instance }: ModalProps = $props();
</script>

<div>
  <h1>I am a modal with id "{instance.config.id}"</h1>
  <div>Click outside of this modal to close it!</div>
  <button onclick={() => instance.close()}>close manually</button>
</div>
```

> [!NOTE] When the modal manager instantiates your `component`, it will pass in a `ModalInstance` object as a prop
> so you can interact with the manager from within your component.

Now, to open the modal, you can do the following:

`app.svelte`:

```ts
<script lang="ts">
  import { manager } from "@mateothegreat/svelte5-modal-manager";
  import MyCustomComponent from "./my-custom-component.svelte";

  const instance =manager.open({
    component: MyCustomComponent,
    keybindings: [
      {
        key: Key.Escape,
        fn: (instance) => {
          console.log(instance.config.id, "Escape key pressed while this modal was open!");
          console.log("inner instance object reference:", instance);
        }
      }
    ]
  });

  console.log("outer instance object reference:", instance);
</script>
```

## Closing

To close a modal from within the modal component, you can call the `instance.close()` method:

```ts
<script lang="ts">
  import { manager } from "@mateothegreat/svelte5-modal-manager";

  let { instance }: ModalProps = $props();
</script>

<button onclick={() => instance.close()}>close manually</button>
```

To close a modal from outside the modal component, you can call the `manager.close()` method:

```ts
<script lang="ts">
  import { manager } from "@mateothegreat/svelte5-modal-manager";

  manager.close("my-modal");
</script>
```

## Keybindings

The modal manager supports keybindings for modals.

To add a keybinding, you can pass an array of `KeyBinding` objects to the `keybindings` property in the `ModalConfig` object.

```ts
import { Key } from "@mateothegreat/svelte5-modal-manager/keybindings";

const modal = manager.open({
  component: MyModalComponent,
  keybindings: [
    {
      key: Key.Escape,
      fn: (instance) => {
        console.log("Escape key pressed while this modal was open!");
        console.log("inner instance object reference:", instance);
      },
    },
  ],
});
```

## Backdrop

The modal manager includes a backdrop overlay by default.

To enable the backdrop, you can set the `backdrop` property to `true` in the `ModalConfig` object:

```ts
import { manager } from "@mateothegreat/svelte5-modal-manager";

manager.open({
  component: MyModalComponent,
  backdrop: true,
});
```

### Advanced Backdrop Configuration

You can also provide a backdrop configuration object to customize the backdrop element:

```ts
import { manager } from "@mateothegreat/svelte5-modal-manager";

manager.open({
  component: MyModalComponent,
  backdrop: {
    class: "custom-backdrop-class",
    attributes: {
      "data-test": "backdrop",
      "data-backdrop-type": "blur"
    }
  }
});
```

## Dialog Configuration

The modal manager allows you to configure the dialog element that wraps your modal content.

You can customize the dialog element by providing a `dialog` configuration object:

```ts
import { manager } from "@mateothegreat/svelte5-modal-manager";

manager.open({
  component: MyModalComponent,
  dialog: {
    class: "custom-dialog-class",
    attributes: {
      "data-test": "dialog",
      "aria-describedby": "modal-description",
      "aria-labelledby": "modal-title"
    }
  }
});
```

This is particularly useful for:
- Adding custom CSS classes to the dialog element
- Setting accessibility attributes like `aria-describedby` and `aria-labelledby`
- Adding data attributes for testing purposes
- Adding any other HTML attributes you need

## Blurrable

The modal manager includes a blurrable feature out of the box.

> [!NOTE] The blurrable feature is used to close the modal when a click event occurs
> outside of the modal and the target of the click event is not within the modal
> (i.e. not a child of the modal).

To enable the blurrable feature, you can set the `blurrable` property to `true` in the `ModalConfig` object:

```ts
import { manager } from "@mateothegreat/svelte5-modal-manager";

manager.open({
  component: MyModalComponent,
  blurrable: true,
});
```

## Other Customizations

The modal manager is highly customizable through the `backdrop` and `dialog` configuration objects.

For example, you can combine both backdrop and dialog customizations:

```ts
import { manager } from "@mateothegreat/svelte5-modal-manager";

manager.open({
  component: MyModalComponent,
  backdrop: {
    class: "bg-black/80 backdrop-blur-md",
    attributes: {
      "data-test": "backdrop"
    }
  },
  dialog: {
    class: "bg-white rounded-lg shadow-xl p-6",
    attributes: {
      "data-test": "dialog",
      "aria-label": "Custom Modal"
    }
  }
});
