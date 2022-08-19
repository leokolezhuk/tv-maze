<template>
  <component
    v-if="modal"
    :is="modal.component"
    v-bind:approve="modal.approve"
    v-bind:dismiss="modal.dismiss"
    v-bind="modal.props"
  />
</template>

<script setup lang="ts">
import { shallowRef, onBeforeMount, nextTick } from "vue";
import PopoverService from "@/services/popover";
import BaseModal from "@/components/modals/BaseModal.vue";

interface IModal {
  component: typeof BaseModal;
  dismiss: () => void;
  props: object;
}

const modal = shallowRef(null as IModal | null);

const open = function (
  component: typeof BaseModal,
  props: object,
  resolve: (value: unknown) => void
) {
  modal.value?.dismiss();

  // Wait before the previos modal is properly dismissed.
  nextTick(() => {
    modal.value = {
      component,
      props,
      dismiss: () => {
        close();
        resolve("modal-dismissed");
      },
    };
  });
};

const close = function () {
  modal.value = null;
};

onBeforeMount(() => {
  PopoverService.eventBus.on(
    "open",
    (
      component: typeof BaseModal,
      props: object,
      resolve: (value: unknown) => void
    ) => open(component, props, resolve)
  );
});
</script>
