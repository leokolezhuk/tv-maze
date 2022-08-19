import { Component } from "vue";
import EventBus from "@/helpers/EventBus";

const popoverServiceEventBus = new EventBus();

const PopoverService = {
  open(component: Component, props: object = {}) {
    return new Promise((resolve) => {
      popoverServiceEventBus.emit("open", component, props, resolve);
    });
  },
  eventBus: popoverServiceEventBus,
};

export default PopoverService;
