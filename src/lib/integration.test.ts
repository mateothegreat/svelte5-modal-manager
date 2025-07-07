import { describe, expect, it } from "vitest";
import { ModalConfig } from "./config";

/**
 * Integration test for dialog attributes functionality.
 * This test verifies that the ModalConfig properly stores and provides
 * access to dialog attributes that should be rendered in the modal.
 */
describe("Dialog Attributes Integration", () => {
  it("should properly configure dialog attributes for rendering", () => {
    const dialogAttributes = {
      "data-test": "dialog",
      "data-modal-id": "test-modal",
      "aria-describedby": "modal-description",
      "aria-labelledby": "modal-title",
      tabindex: "-1"
    };

    const config = new ModalConfig({
      component: () => ({}),
      dialog: {
        class: "test-dialog-class",
        attributes: dialogAttributes
      }
    });

    // Verify the config stores the attributes correctly
    expect(config.dialog?.attributes).toEqual(dialogAttributes);

    // Verify individual attributes are accessible
    expect(config.dialog?.attributes?.["data-test"]).toBe("dialog");
    expect(config.dialog?.attributes?.["data-modal-id"]).toBe("test-modal");
    expect(config.dialog?.attributes?.["aria-describedby"]).toBe("modal-description");
    expect(config.dialog?.attributes?.["aria-labelledby"]).toBe("modal-title");
    expect(config.dialog?.attributes?.["tabindex"]).toBe("-1");
  });

  it("should handle scenarios where dialog attributes are undefined", () => {
    const config = new ModalConfig({
      component: () => ({}),
      dialog: {
        class: "test-dialog-class"
      }
    });

    // Should not throw when attributes are undefined
    expect(() => config.dialog?.attributes).not.toThrow();
    expect(config.dialog?.attributes).toBeUndefined();
  });

  it("should handle scenarios where backdrop is false and dialog has attributes", () => {
    const config = new ModalConfig({
      component: () => ({}),
      backdrop: false,
      dialog: {
        class: "test-dialog-class",
        attributes: {
          "data-test": "dialog",
          "data-modal-type": "no-backdrop"
        }
      }
    });

    // This scenario should work - backdrop false with dialog attributes
    expect(config.backdrop).toBe(false);
    expect(config.dialog?.attributes?.["data-test"]).toBe("dialog");
    expect(config.dialog?.attributes?.["data-modal-type"]).toBe("no-backdrop");
  });

  it("should handle scenarios where backdrop is true and dialog has attributes", () => {
    const config = new ModalConfig({
      component: () => ({}),
      backdrop: true,
      dialog: {
        class: "test-dialog-class",
        attributes: {
          "data-test": "dialog",
          "data-modal-type": "with-backdrop"
        }
      }
    });

    // This scenario should work - backdrop true with dialog attributes
    expect(config.backdrop).toBe(true);
    expect(config.dialog?.attributes?.["data-test"]).toBe("dialog");
    expect(config.dialog?.attributes?.["data-modal-type"]).toBe("with-backdrop");
  });

  it("should handle scenarios where backdrop is an object and dialog has attributes", () => {
    const config = new ModalConfig({
      component: () => ({}),
      backdrop: {
        class: "custom-backdrop",
        attributes: {
          "data-backdrop": "custom"
        }
      },
      dialog: {
        class: "test-dialog-class",
        attributes: {
          "data-test": "dialog",
          "data-modal-type": "custom-backdrop"
        }
      }
    });

    // This scenario should work - backdrop object with dialog attributes
    expect(typeof config.backdrop).toBe("object");
    if (typeof config.backdrop === "object") {
      expect(config.backdrop.attributes?.["data-backdrop"]).toBe("custom");
    }
    expect(config.dialog?.attributes?.["data-test"]).toBe("dialog");
    expect(config.dialog?.attributes?.["data-modal-type"]).toBe("custom-backdrop");
  });
});
