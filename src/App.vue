<template>
  <div id="app">
    <div class="hero_choice">
      <button @click="chooseHero(1)" class="hero_1">H-1</button>
      <button @click="chooseHero(2)" class="hero_2">H-2</button>
      <button @click="chooseHero(3)" class="hero_3">H-3</button>
      <div>
        Currently chosen hero is:
        {{ currentHero.name ? currentHero.name : 'choose a hero' }}
      </div>
      <div class="hero_actions">
        <button @click="currentHero.castSpell(monster)">attack</button>
        <button>cast spell</button>
        <button>heal</button>
        <button @click="currentHero.specialAttack()">special attack</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Heroes } from './entities';
import { Hero } from './Hero';

export default {
  name: 'App',
  data() {
    return {
      currentHero: '',
    };
  },
  methods: {
    chooseHero(hero) {
      this.createHero(hero);
    },

    createHero(index) {
      this.currentHero = new Hero(Heroes[index - 1]);
    },
  },
};
// for (const hero of Heroes) {
//   Heroes[hero.name] = new Entity(hero);
// }
</script>

<style>
button {
  cursor: pointer;
  margin: 10px;
}
</style>
