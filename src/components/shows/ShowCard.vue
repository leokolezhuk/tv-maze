<template>
  <v-card width="250" height="250">
    <v-img
      :src="show?.image?.medium"
      class="white--text align-end"
      height="200px"
      cover
      gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(11, 10, 10, 0.9)"
    >
      <v-card-title class="text-white" v-text="show.name"></v-card-title>
      <template v-slot:placeholder>
        <ShowImagePlaceholder />
        <!-- <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5 pa-8"
            width="2"
          >
            <v-icon size="x-large"> mdi-movie </v-icon>
          </v-progress-circular>
        </v-row> -->
      </template>
    </v-img>
    <div class="show-card-actions pa-1 d-flex">
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-dots-vertical"
        size="small"
        color="surface-variant"
        variant="text"
        @click="showDetails"
      >
      </v-btn>
    </div>
  </v-card>
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
      // console.log(detailedShow);
      PopoverService.open(ShowDetailsModalVue, { show: this.show });
    },
  },
});
</script>

<style lang="scss" scoped>
.show-card-actions {
  height: 50px;
}
</style>
