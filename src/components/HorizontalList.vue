<template>
  <div class="horizontal-list">
    <v-btn
      v-if="isPreviousAvailable"
      @click.stop="scrollToPrevious"
      icon="mdi-chevron-left"
      class="horizontal-list-btn horizontal-list-btn-previous"
    >
    </v-btn>
    <v-btn
      v-if="isNextAvailable"
      @click.stop="scrollToNext"
      icon="mdi-chevron-right"
      class="horizontal-list-btn horizontal-list-btn-next"
    >
    </v-btn>

    <div class="items-container" ref="container" @scroll="onScroll">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      currentIndex: -1,
      scrollUpdateTimeout: undefined as number | undefined,
      observer: null as MutationObserver | null,
      isPreviousAvailable: false as boolean,
      isNextAvailable: false as boolean,
    };
  },
  mounted() {
    const observer = new MutationObserver(this.refresh);
    observer.observe(this.$refs.container as Element, {
      childList: true,
      subtree: false,
    });
    this.observer = observer;
    this.onScroll();
  },
  beforeUnmount() {
    this.observer?.disconnect();
    clearTimeout(this.scrollUpdateTimeout);
  },
  methods: {
    onScroll() {
      clearTimeout(this.scrollUpdateTimeout);
      this.scrollUpdateTimeout = setTimeout(this.refresh, 100);
    },
    scrollToX(x = 0): void {
      const element = this.$refs.container as Element;
      element.scrollTo({ left: x, behavior: "smooth" });
    },
    scrollToIndex(i: number): void {
      const container = this.$refs.container as Element;
      const children = container.children;

      if (children[i]) {
        const rect = children[i].getBoundingClientRect();
        const left = rect.left - container.getBoundingClientRect().left;
        this.scrollToX(container.scrollLeft + left);
      }
    },
    refresh(): void {
      this.$nextTick(() => {
        const container = this.$refs.container as Element;
        const currentScroll = container.scrollLeft;
        const children = container.children;
        const singleItemWidth = children[0].scrollWidth;
        const totalWidth = singleItemWidth * children.length;

        this.currentIndex = Math.round(currentScroll / singleItemWidth);

        this.scrollToIndex(this.currentIndex);
        this.isPreviousAvailable = this.currentIndex > 0;
        this.isNextAvailable =
          currentScroll + container.clientWidth < totalWidth;
      });
    },
    scrollToPrevious() {
      this.scrollToIndex(this.currentIndex - 1);
    },
    scrollToNext() {
      this.scrollToIndex(this.currentIndex + 1);
    },
  },
});
</script>

<style lang="scss" scoped>
.horizontal-list {
  position: relative;
  display: flex;

  .items-container {
    @extend .no-scrollbar;
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    box-sizing: content-box;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    > * {
      flex-shrink: 0;
      box-sizing: border-box;
    }
  }

  .horizontal-list-btn {
    position: absolute;
    align-self: center;
    z-index: 1;
    display: flex;
    align-items: center;
    cursor: pointer;

    &.horizontal-list-btn-previous {
      left: 15px;
    }

    &.horizontal-list-btn-next {
      right: 15px;
    }
  }

  .no-scrollbar {
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
