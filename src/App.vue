<template>
  <div id="app">
    <div class="hero_choice" v-if="!isGame">
      <button @click="chooseHero(1)" class="hero_1">Warrior</button>
      <button @click="chooseHero(2)" class="hero_2">Mage</button>
      <button @click="chooseHero(3)" class="hero_3">Rogue</button>
    </div>
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
      <button @click="performAttack(currentHero.executeAttack())">
        attack
      </button>
      <button @click="performAttack(currentHero.castSpell())">
        cast spell
      </button>
      <button
        :disabled="currentHero.healingCooldown || false"
        @click="healSelf()"
      >
        heal{{
          currentHero.healingCooldown
            ? '(' + currentHero.healingCooldown + ')'
            : ''
        }}
      </button>
      <button
        @click="performAttack(currentHero.specialAttack())"
        :disabled="currentHero.specialAttackCooldown || false"
      >
        special attack{{
          currentHero.specialAttackCooldown
            ? '(' + currentHero.specialAttackCooldown + ')'
            : ''
        }}
      </button>
      <div class="battle__content">
        <CharacterCard :char="currentHero" />
        <CharacterCard :char="currentMonster" />
      </div>
    </div>
  </div>
</template>

<script>
import { RANDOM_ACTIONS_ENUM } from './constants';
import { Heroes, Monsters } from './entities';
import { Hero } from './Hero';
import { Monster } from './Monster';
import CharacterCard from './components/CharacterCard.vue';

export default {
  name: 'App',
  data() {
    return {
      currentHero: '',
      currentMonster: '',
      allMonsters: [],
    };
  },
  components: {
    CharacterCard,
  },
  computed: {
    isGame() {
      return !!this.allMonsters.length && this.currentHero.currentHealth >= 0;
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
      this.currentHero.healInjures(this.currentHero.maxHealth / 2);
      console.log('%cmonster died', 'color: red');
      this.allMonsters = this.allMonsters.filter(
        (monster) => this.currentMonster.name !== monster.name
      );
      if (!this.isGame) {
        console.log(
          '%cYOU DID IT !',
          'color: blue; font-weight: 700',
          'the world was cleared'
        );
        return;
      }
      this.setCurrentMonster();
    },
    performAttack(attackValue) {
      this.currentMonster.takeDamage(attackValue);
      if (this.currentMonster.isDead()) {
        this.monsterDead();
      } else {
        this.endTurn();
      }
    },
    healSelf() {
      this.currentHero.healInjures();
      this.endTurn();
    },
    endTurn() {
      const rdmAction =
        RANDOM_ACTIONS_ENUM[this.currentMonster.randomActionAI()];
      console.log(`random action is: ${rdmAction}`);
      if (
        rdmAction === RANDOM_ACTIONS_ENUM.MELEE ||
        rdmAction === RANDOM_ACTIONS_ENUM.MAGIC
      ) {
        if (
          this.currentMonster.combatEfficiency ===
          this.currentMonster.magicKnowledge
        ) {
          if (
            this.currentHero.combatEfficiency > this.currentHero.magicKnowledge
          ) {
            this.currentHero.takeDamage(this.currentMonster.castSpell());
          } else {
            this.currentHero.takeDamage(this.currentMonster.executeAttack());
          }
        } else if (
          this.currentMonster.combatEfficiency >
          this.currentMonster.magicKnowledge
        ) {
          this.currentHero.takeDamage(this.currentMonster.executeAttack());
        } else {
          this.currentHero.takeDamage(this.currentMonster.castSpell());
        }
      } else if (rdmAction === RANDOM_ACTIONS_ENUM.HEAL) {
        this.currentMonster.healInjures();
      }
      if (this.currentHero.currentHealth <= 0) {
        console.log(
          '%cYOU LOST !',
          'color: red; font-weight: 700',
          'the world was destroyed'
        );
      }
    },
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.battle__content {
  display: flex;
  justify-content: space-around;
}

button {
  cursor: pointer;
  margin: 10px;
}
</style>
