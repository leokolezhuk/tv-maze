<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" v-if="shows">
        <search-box @changed="searchShows" />
        <div class="pt-6">
          <v-fade-transition hide-on-leave>
            <div v-if="!isShowsLoading">
              <div
                v-for="(groupShows, genreName, group_i) in groupedShows"
                :key="group_i"
              >
                <ShowGenreGroup
                  class="mb-12"
                  :genre="genreName"
                  :shows="groupShows"
                ></ShowGenreGroup>
              </div>
            </div>
            <div v-else class="my-12">
              <v-progress-circular :size="60" color="primary" indeterminate />
              <div class="text-h6 mt-6 text-medium-emphasis">
                Loading, please wait...
              </div>
            </div>
          </v-fade-transition>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import showsAPI from "@/services/api/showsAPI";
import SearchBox from "@/components/SearchBox.vue";
import ShowGenreGroup from "@/components/shows/ShowGenreGroup.vue";

import Show from "@/models/Show";

export default defineComponent({
  name: "HomeView",

  components: { SearchBox, ShowGenreGroup },

  data() {
    return {
      shows: null as Array<Show> | null,
      groupedShows: null as Partial<Record<string, Array<Show>>> | null,
      isShowsLoading: false as boolean,
    };
  },

  async created() {
    this.searchShows({ query: "" });
  },

  methods: {
    async withShowsLoading(callback: () => Promise<void>) {
      this.isShowsLoading = true;
      await callback().finally(() => {
        this.isShowsLoading = false;
      });
    },
    async searchShows(event: { query: string }) {
      await this.withShowsLoading(async () => {
        let shows = null;
        if (event?.query) {
          shows = await showsAPI.search(event.query);
        } else {
          shows = await showsAPI.getAll(0);
        }
        this.groupedShows = this.groupShowsByGenre(shows);
        this.shows = shows ? shows.slice(0, 25) : [];
      });
    },
    groupShowsByGenre(shows: Array<Show>) {
      const genreGroups: Record<string, Array<Show>> = {};

      shows.forEach((show: Show) => {
        const genre = show.genres?.[0];
        if (!genre) return;
        if (genreGroups[genre] !== undefined) {
          genreGroups[genre].push(show);
        } else {
          genreGroups[genre] = [show];
        }
      });

      return genreGroups;
    },
  },
});
</script>
