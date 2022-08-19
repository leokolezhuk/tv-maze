<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    dismiss: {
      type: Function,
      required: true,
    },
  },
});
</script>
