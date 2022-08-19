<template>
  <component
    v-if="modal"
    :is="modal.component"
    v-bind:approve="modal.approve"
    v-bind:dismiss="modal.dismiss"
    v-bind="modal.props"
  />
</template>

<script lang="ts">
import { defineComponent, ShallowRef, shallowRef } from "vue";
import PopoverService from "@/services/popover";
import BaseModal from "@/components/modals/BaseModal.vue";
import eventBus from "@/services/eventBus";

interface IModal {
  component: typeof BaseModal;
  dismiss: () => void;
  props: object;
}

export default defineComponent({
  data() {
    return {
      modal: null as ShallowRef<IModal> | null,
    };
  },
  created() {
    eventBus.on(
      "open",
      (
        component: typeof BaseModal,
        props: object,
        resolve: (value: unknown) => void
      ) => this.open(component, props, resolve)
    );
  },
  methods: {
    close() {
      this.modal = null;
    },
    open(
      component: typeof BaseModal,
      props: object,
      resolve: (value: unknown) => void
    ) {
      this.modal?.dismiss();

      // Wait for the previously mounted component to be destroyed correctly.
      this.$nextTick(() => {
        this.modal = {
          component,
          props,
          dismiss: () => {
            this.close();
            resolve("modal-approved");
          },
        };
      });
    },
  },
});
</script>
