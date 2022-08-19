<template>
  <v-card>
    <v-text-field
      clearable
      single-line
      hide-details
      v-model="query"
      prepend-inner-icon="mdi-magnify"
      @change="notifyChange"
      @click:clear="notifyChange"
    ></v-text-field>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBox",

  emits: {
    changed: ({ query: String }) => true,
  },

  data() {
    return {
      query: "" as string,
    };
  },

  methods: {
    notifyChange() {
      this.$emit("changed", { query: this.query });
    },
  },
});
</script>
