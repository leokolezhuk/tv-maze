<template>
  <v-dialog v-model="visible" transition="scale-transition">
    <v-card
      class="show-modal-card mx-auto"
      :class="display.smAndDown ? 'modal-full-width' : 'modal-fixed-width'"
    >
      <div class="d-flex flex-column flex-md-row">
        <v-img
          max-height="70vh"
          class="white--text align-end"
          gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(11, 10, 10, 0.9)"
          :src="show.image?.original"
        >
          <v-card-title class="text-white">{{ show.name }} </v-card-title>
          <v-card-subtitle class="text-white pb-3">
            <v-chip
              v-for="(genre, genre_i) in show.genres"
              :key="genre_i"
              variant="outlined"
              class="mr-1"
              >{{ genre }}</v-chip
            >
          </v-card-subtitle>
          <template v-slot:placeholder>
            <ShowImagePlaceholder />
          </template>
        </v-img>
        <div>
          <v-card-text class="text--primary">
            <show-status-chip :show="show" class="mr-1"></show-status-chip>
            <show-runtime-chip :show="show"></show-runtime-chip>
          </v-card-text>
          <v-card-text>
            {{ loremIpsum }}
          </v-card-text>
          <v-card-actions class="d-flex flex-column flex-sm-row align-start">
            <v-btn
              class="mx-0 mr-sm-2"
              prepend-icon="mdi-earth"
              @click="goToOfficialWebsite"
            >
              Official website
            </v-btn>
            <v-btn class="mx-0 mr-sm-2" prepend-icon="mdi-heart">
              Add to favourites
            </v-btn>
            <v-btn class="mx-0 mr-sm-2" prepend-icon="mdi-share"> Share </v-btn>
          </v-card-actions>
        </div>
      </div>
      <v-btn
        position="fixed"
        location="top right"
        icon="mdi-close"
        class="ma-2"
        :variant="display.smAndDown ? 'elevated' : 'outlined'"
        @click="dismiss()"
      ></v-btn>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Show from "@/models/Show";
import { defineComponent, PropType } from "vue";
import { useDisplay } from "vuetify";
import BaseModal from "./BaseModal.vue";
import ShowRuntimeChip from "@/components/shows/ShowRuntimeChip.vue";
import ShowStatusChip from "@/components/shows/ShowStatusChip.vue";
import ShowImagePlaceholder from "@/components/shows/ShowImagePlaceholder.vue";
import loremIpsum from "@/helpers/loremIpsum";

export default defineComponent({
  name: "ShowDetailsModal",

  components: { ShowRuntimeChip, ShowStatusChip, ShowImagePlaceholder },

  extends: BaseModal,

  props: {
    show: {
      type: Object as PropType<Show>,
      required: true,
    },
  },

  data() {
    return {
      display: useDisplay(),
      visible: true,
      loremIpsum,
    };
  },

  methods: {
    goToOfficialWebsite() {
      const websiteLink = this.show.url;
      if (!websiteLink) return;
      window.open(websiteLink);
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-full-width {
  width: 100%;
}

.modal-fixed-width {
  width: 900px;
}
</style>
