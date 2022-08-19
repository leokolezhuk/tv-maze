<template>
  <v-dialog v-model="visible">
    <v-card class="mx-auto">
      <div class="d-flex flex-column flex-md-row">
        <v-img
          min-width="200"
          min-height="200"
          cover
          class="white--text align-end"
          gradient="to bottom, rgba(0, 0, 0, 0.1), rgba(11, 10, 10, 0.9)"
          :src="show?.image.original"
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

          <v-card-actions class="d-flex flex-column flex-sm-row">
            <v-btn prepend-icon="mdi-earth" @click="goToOfficialWebsite"
              >Official website</v-btn
            >
            <v-btn prepend-icon="mdi-heart">Add to favourites</v-btn>
            <v-btn prepend-icon="mdi-share">Share</v-btn>
          </v-card-actions>
        </div>
      </div>
      <v-btn
        position="absolute"
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
import ShowRuntimeChip from "@/components/ShowRuntimeChip.vue";
import ShowStatusChip from "@/components/ShowStatusChip.vue";
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