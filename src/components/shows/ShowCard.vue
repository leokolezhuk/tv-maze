<template>
  <div
    @mouseover="isHovering = true"
    @mouseout="isHovering = false"
    data-test-id="showCardContainer"
  >
    <v-card
      width="250px"
      height="250px"
      @click="showDetails"
      data-test-id="showCard"
    >
      <v-img
        :src="show.image?.medium"
        class="white--text align-end"
        height="250px"
        cover
        gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(11, 10, 10, 0.9)"
        data-test-id="showCardImage"
      >
        <v-card-title class="text-white" v-text="show.name"></v-card-title>
        <template v-slot:placeholder>
          <ShowImagePlaceholder />
        </template>
      </v-img>

      <ShowCardOverlay v-show="isHovering" data-test-id="showCardOverlay">
        <v-chip
          class="white-text"
          variant="outlined"
          color="grey-lighten-1"
          @click="showDetails"
        >
          Show details
        </v-chip>
      </ShowCardOverlay>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PopoverService from "@/services/popover";
import ShowDetailsModalVue from "../modals/ShowDetailsModal.vue";
import Show from "@/models/Show";
import ShowImagePlaceholder from "@/components/shows/ShowImagePlaceholder.vue";
import ShowCardOverlay from "@/components/shows/ShowCardOverlay.vue";

export default defineComponent({
  name: "ShowCard",

  components: { ShowImagePlaceholder, ShowCardOverlay },

  props: {
    show: {
      type: Object as PropType<Show>,
      required: true,
    },
  },

  data() {
    return {
      isHovering: false as boolean,
    };
  },

  methods: {
    showDetails() {
      PopoverService.open(ShowDetailsModalVue, { show: this.show });
    },
  },
});
</script>
