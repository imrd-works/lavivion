import { config } from "@vue/test-utils";
import { i18n } from "@/app/i18n";

config.global.plugins = [i18n];

// The test DOM implements neither the observer the reveal animation needs nor
// the dialog methods the modal calls, so the minimum is supplied here.
if (!("IntersectionObserver" in globalThis)) {
  class IntersectionObserverStub {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): [] {
      return [];
    }
  }

  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverStub,
  });
}

if (typeof HTMLDialogElement !== "undefined") {
  const dialog = HTMLDialogElement.prototype as HTMLDialogElement & {
    showModal?: () => void;
    close?: () => void;
  };

  if (!dialog.showModal) {
    dialog.showModal = function showModal(this: HTMLDialogElement) {
      this.open = true;
    };
  }

  if (!dialog.close) {
    dialog.close = function close(this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event("close"));
    };
  }
}
