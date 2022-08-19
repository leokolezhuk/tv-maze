<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card width="250px" height="250px" v-bind="props" @click="showDetails">
        <v-img
          :src="show?.image?.medium"
          class="white--text align-end"
          height="250px"
          cover
          gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(11, 10, 10, 0.9)"
        >
          <v-card-title class="text-white" v-text="show.name"></v-card-title>
          <template v-slot:placeholder>
            <ShowImagePlaceholder />
          </template>
        </v-img>
        <v-overlay
          :model-value="isHovering"
          contained
          scrim="grey"
          class="show-card-overlay align-center justify-center"
        >
          <v-chip
            variant="outlined"
            color="white"
            text-color="grey"
            @click.stop="showDetails"
          >
            Show details</v-chip
          >
        </v-overlay>
      </v-card>
    </v-hover>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PopoverService from "@/services/popover";
import ShowDetailsModalVue from "../modals/ShowDetailsModal.vue";
import Show from "@/models/Show";
import ShowImagePlaceholder from "@/components/shows/ShowImagePlaceholder.vue";
import showsAPI from "@/services/api/showsAPI";

export default defineComponent({
  components: { ShowImagePlaceholder },

  props: {
    show: {
      type: Object as PropType<Show>,
      required: true,
    },
  },

  methods: {
    showDetails() {
      // const detailedShow = await showsAPI.getShow(this.show.id);
      PopoverService.open(ShowDetailsModalVue, { show: this.show });
    },
  },
});
</script>

<style lang="scss" scoped>
.show-card-overlay {
  cursor: crosshair;
}
</style>
