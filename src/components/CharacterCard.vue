<template>
  <div v-if="char.currentHealth" class="card">
    <h3 class="card__name">{{ char.name }}</h3>
    <div class="card__stats">
      <p>HP: {{ char.currentHealth }}</p>
      <div class="loading-bar">
        <div
          class="percentage"
          :style="{
            width: percentage + '%',
            backgroundColor: percentage > 50 ? '#42B782' : '#CC0000',
          }"
        ></div>
      </div>
      <p>power of combat: {{ char.combatEfficiency }}</p>
      <p>power of magic: {{ char.magicKnowledge }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    char: {
      type: Object,
    },
  },
  computed: {
    percentage() {
      return (this.char.currentHealth * 100) / this.char.maxHealth;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-bar {
  position: relative;
  width: 140px;
  height: 10px;
  border-radius: 15px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4) 0 -1px 1px #fff, 0 1px 0 #fff;

  .percentage {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    display: block;
    height: 100%;
    border-radius: 15px;

    transition: 0.3s;
  }
}

.card {
  width: 150px;
  height: 200px;
  border: 1px solid gray;
  justify-content: center;

  &__name {
    text-align: center;
    text-transform: uppercase;
  }

  &__stats {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
    padding-left: 5px;
  }
}
</style>
