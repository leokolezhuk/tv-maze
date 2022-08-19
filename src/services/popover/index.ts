import { Component } from "vue";
import eventBus from "@/services/eventBus";

const PopoverService = {
  open(component: Component, props: object = {}) {
    return new Promise((resolve) => {
      eventBus.emit("open", component, props, resolve);
    });
  },
};

export default PopoverService;
