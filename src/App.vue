<template>
  <div id="app">
    <div class="hero_choice">
      <button @click="chooseHero(1)" class="hero_1">Warrior</button>
      <button @click="chooseHero(2)" class="hero_2">Mage</button>
      <button @click="chooseHero(3)" class="hero_3">Rogue</button>
      <div v-if="isGame">
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
      <div class="hero_actions" v-if="isGame">
        <button @click="performAttack(currentHero, currentMonster, 'MELEE')">
          attack
        </button>
        <button @click="performAttack(currentHero, currentMonster, 'MAGIC')">
          cast spell
        </button>
        <button
          :disabled="currentHero.healingCooldown || false"
          @click="currentHero.healInjures(10)"
        >
          heal{{
            currentHero.healingCooldown
              ? '(' + currentHero.healingCooldown + ')'
              : ''
          }}
        </button>
        <button
          @click="currentHero.specialAttack()"
          :disabled="currentHero.specialAttackCooldown || false"
        >
          special attack{{
            currentHero.specialAttackCooldown
              ? '(' + currentHero.specialAttackCooldown + ')'
              : ''
          }}
        </button>
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

  computed: {
    isGame() {
      return !!this.allMonsters.length;
    },
  },

  methods: {
    chooseHero(hero) {
      this.allMonsters = Monsters;
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
      if (!this.isGame) {
        console.log('pokonałeś wszystkie potwory');
        return;
      }
      this.setCurrentMonster();
    },

    performAttack(attacker, enemy, type) {
      attacker.executeAttack(enemy, type);
      attacker.endTurn();
      if (enemy.isDead()) {
        this.monsterDead();
        console.log('przeciwnik poległ');
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
