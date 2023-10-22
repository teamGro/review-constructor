<template>
  <v-arrow ref="arr" :config="computedArrow"></v-arrow>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
    },
  },
  computed: {
    computedArrow() {
      return this.config;
    },
  },
};
</script>
