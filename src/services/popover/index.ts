import { Component } from "vue";
import EventBus from "@/helpers/EventBus";

const popoverServiceEventBus = new EventBus();

/**
 * A service that allows to globally control page popovers.
 * Works in combination with the PopoverRoot component, which mounts
 * any opened popover component to the App page.
 */
const PopoverService = {
  /**
   * Opens a given component as a popover on the page.
   * @param component Component to open as a popover.
   * @param props Props to pass to the component.
   */
  open(component: Component, props: object = {}) {
    return new Promise((resolve) => {
      popoverServiceEventBus.emit("open", component, props, resolve);
    });
  },
  eventBus: popoverServiceEventBus,
};

export default PopoverService;
