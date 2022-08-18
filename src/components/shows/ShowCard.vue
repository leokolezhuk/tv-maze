<template>
  <v-card width="250" height="250">
    <v-img
      :src="show?.image?.medium"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      cover
    >
      <v-card-title class="text-white" v-text="show.name"></v-card-title>
    </v-img>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        size="small"
        color="surface-variant"
        variant="text"
        icon="mdi-heart"
      ></v-btn>

      <v-btn
        size="small"
        color="surface-variant"
        variant="text"
        icon="mdi-bookmark"
      ></v-btn>

      <v-btn
        size="small"
        color="surface-variant"
        variant="text"
        icon="mdi-share-variant"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    show: {
      type: Object,
      required: true,
    },
  },
});
</script>
