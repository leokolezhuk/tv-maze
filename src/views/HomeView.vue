<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" v-if="shows">
        <search-box @changed="searchShows" />
        <div class="pt-6">
          <v-fade-transition hide-on-leave>
            <div v-if="!isShowsLoading">
              <ShowList :shows="shows" />
            </div>
            <div v-else class="my-12">
              <v-progress-circular
                :size="60"
                color="primary"
                indeterminate
              ></v-progress-circular>
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
import ShowList from "@/components/shows/ShowList.vue";
import showsAPI from "@/services/api/showsAPI";
import SearchBox from "@/components/SearchBox.vue";
import Show from "@/models/Show";

export default defineComponent({
  name: "HomeView",
  components: { ShowList, SearchBox },
  data() {
    return {
      shows: null as Array<Show> | null,
      isShowsLoading: false as boolean,
    };
  },
  async created() {
    this.shows = await showsAPI.getAll(0);
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
        if (event?.query) {
          this.shows = await showsAPI.search(event.query);
        } else {
          const shows = await showsAPI.getAll(0);
          this.shows = shows ? shows.slice(0, 25) : [];
        }
      });
    },
  },
});
</script>
