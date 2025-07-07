import { describe, expect, it, vi } from "vitest";
import { ModalConfig } from "./config";

/**
 * Mock Svelte component for testing purposes.
 */
const mockComponent = vi.fn();

describe("ModalConfig", () => {
  describe("Constructor", () => {
    it("should create a config with dialog attributes", () => {
      const config = new ModalConfig({
        component: mockComponent,
        dialog: {
          class: "test-dialog-class",
          attributes: {
            "data-test": "dialog",
            "data-modal-id": "test-modal"
          }
        }
      });

      expect(config.dialog?.class).toBe("test-dialog-class");
      expect(config.dialog?.attributes).toEqual({
        "data-test": "dialog",
        "data-modal-id": "test-modal"
      });
    });

    it("should create a config with backdrop attributes", () => {
      const config = new ModalConfig({
        component: mockComponent,
        backdrop: {
          class: "test-backdrop-class",
          attributes: {
            "data-test": "backdrop",
            "data-backdrop": "custom"
          }
        }
      });

      expect(typeof config.backdrop).toBe("object");
      if (typeof config.backdrop === "object") {
        expect(config.backdrop.class).toBe("test-backdrop-class");
        expect(config.backdrop.attributes).toEqual({
          "data-test": "backdrop",
          "data-backdrop": "custom"
        });
      }
    });

    it("should create a config with both dialog and backdrop attributes", () => {
      const config = new ModalConfig({
        component: mockComponent,
        dialog: {
          class: "test-dialog-class",
          attributes: {
            "data-test": "dialog",
            "aria-label": "Test Dialog"
          }
        },
        backdrop: {
          class: "test-backdrop-class",
          attributes: {
            "data-test": "backdrop"
          }
        }
      });

      expect(config.dialog?.class).toBe("test-dialog-class");
      expect(config.dialog?.attributes).toEqual({
        "data-test": "dialog",
        "aria-label": "Test Dialog"
      });

      expect(typeof config.backdrop).toBe("object");
      if (typeof config.backdrop === "object") {
        expect(config.backdrop.class).toBe("test-backdrop-class");
        expect(config.backdrop.attributes).toEqual({
          "data-test": "backdrop"
        });
      }
    });

    it("should handle undefined dialog attributes gracefully", () => {
      const config = new ModalConfig({
        component: mockComponent,
        dialog: {
          class: "test-dialog-class"
        }
      });

      expect(config.dialog?.class).toBe("test-dialog-class");
      expect(config.dialog?.attributes).toBeUndefined();
    });

    it("should handle undefined dialog config gracefully", () => {
      const config = new ModalConfig({
        component: mockComponent
      });

      expect(config.dialog).toBeUndefined();
    });

    it("should generate a unique id when not provided", () => {
      const config1 = new ModalConfig({
        component: mockComponent
      });
      const config2 = new ModalConfig({
        component: mockComponent
      });

      expect(config1.id).toBeTruthy();
      expect(config2.id).toBeTruthy();
      expect(config1.id).not.toBe(config2.id);
    });

    it("should use provided id when specified", () => {
      const config = new ModalConfig({
        component: mockComponent,
        id: "custom-modal-id"
      });

      expect(config.id).toBe("custom-modal-id");
    });
  });

  describe("Complex attribute configurations", () => {
    it("should handle multiple dialog attributes", () => {
      const config = new ModalConfig({
        component: mockComponent,
        dialog: {
          class: "test-dialog-class",
          attributes: {
            "data-test": "dialog",
            "data-modal-id": "test-modal",
            "aria-describedby": "modal-description",
            "aria-labelledby": "modal-title",
            tabindex: "-1"
          }
        }
      });

      expect(config.dialog?.attributes).toEqual({
        "data-test": "dialog",
        "data-modal-id": "test-modal",
        "aria-describedby": "modal-description",
        "aria-labelledby": "modal-title",
        tabindex: "-1"
      });
    });

    it("should handle complex backdrop and dialog configurations", () => {
      const config = new ModalConfig({
        component: mockComponent,
        backdrop: {
          class: "custom-backdrop test-backdrop",
          attributes: {
            "data-test": "backdrop",
            "data-backdrop-type": "blur"
          }
        },
        dialog: {
          class: "custom-dialog test-dialog",
          attributes: {
            "data-test": "dialog",
            "data-dialog-type": "modal"
          }
        }
      });

      expect(typeof config.backdrop).toBe("object");
      if (typeof config.backdrop === "object") {
        expect(config.backdrop.class).toBe("custom-backdrop test-backdrop");
        expect(config.backdrop.attributes).toEqual({
          "data-test": "backdrop",
          "data-backdrop-type": "blur"
        });
      }

      expect(config.dialog?.class).toBe("custom-dialog test-dialog");
      expect(config.dialog?.attributes).toEqual({
        "data-test": "dialog",
        "data-dialog-type": "modal"
      });
    });
  });
});
