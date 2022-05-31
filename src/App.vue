<template>
  <div id="app">
    <div class="hero_choice">
      <button @click="chooseHero(1)" class="hero_1">H-1</button>
      <button @click="chooseHero(2)" class="hero_2">H-2</button>
      <button @click="chooseHero(3)" class="hero_3">H-3</button>
      <div>
        Currently chosen hero is:
        <strong
          :style="
            currentHero || {
              color: 'red',
            }
          "
        >
          {{ currentHero.name ? currentHero.name : 'choose a hero' }}
        </strong>
      </div>
      <div class="hero_actions">
        <button @click="performAttack(currentHero, currentMonster, 'MELEE')">
          attack
        </button>
        <button @click="performAttack(currentHero, currentMonster, 'MAGIC')">
          cast spell
        </button>
        <button>heal</button>
        <button @click="currentHero.specialAttack()">special attack</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Heroes, Monsters } from './entities';
import { Hero } from './Hero';
import { Monster } from './Monster';

export default {
  name: 'App',
  data() {
    return {
      currentHero: '',
      currentMonster: '',
      allMonsters: Monsters,
    };
  },

  methods: {
    chooseHero(hero) {
      this.createHero(hero);
      this.setCurrentMonster();
    },

    setCurrentMonster() {
      const random = Math.floor(Math.random() * this.allMonsters.length);
      this.currentMonster = new Monster(this.allMonsters[random]);
    },

    createHero(index) {
      this.currentHero = new Hero(Heroes[index - 1]);
    },

    monsterDead() {
      this.allMonsters = this.allMonsters.filter(
        (monster) => this.currentMonster.name !== monster.name
      );
      if (this.allMonsters.length === 0) {
        console.log('pokonałeś wszystkie potwory');
        return;
      }
      this.setCurrentMonster();
    },

    performAttack(attacker, enemy, type) {
      attacker.executeAttack(enemy, type);
      if (enemy.health <= 0) {
        this.monsterDead();
        console.log('przeciwnik nie żyje');
      }
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
