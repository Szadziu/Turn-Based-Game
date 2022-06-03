<template>
  <div class="healthbar">
    <div class="healthbar-percentage" :style="healthBarStyles"></div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
    },
    color: {
      type: String,
    },
  },
  computed: {
    healthBarStyles() {
      return {
        width: this.value + '%',
        backgroundColor: this.value > 50 ? this.color : '#CC0000',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.healthbar {
  position: relative;
  width: 100%;
  height: 20px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4) 0 -1px 1px #fff, 0 1px 0 #fff;

  &-percentage {
    height: 100%;

    transition: 0.3s;
  }
}
</style>
