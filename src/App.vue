<template>
  <div id="app">
    <div v-if="!isGame">
      <FancyButton @click="chooseHero(1)" :class="'hero--viking'"
        >Viking</FancyButton
      >
      <FancyButton @click="chooseHero(2)" :class="'hero--wizard'"
        >Wizard</FancyButton
      >
      <FancyButton @click="chooseHero(3)" :class="'hero--rogue'"
        >Rogue</FancyButton
      >
    </div>

    <div class="battle__content" v-if="isGame">
      <div class="hero__container">
        <CharacterCard :char="currentHero" />
        <CharacterCard :char="currentMonster" />
      </div>
      <FancyButton
        @click="performAttack(currentHero.executeAttack())"
        :class="'character--attack'"
      >
        attack
      </FancyButton>
      <FancyButton
        @click="performAttack(currentHero.castSpell())"
        :class="'character--spell'"
      >
        cast spell
      </FancyButton>
      <FancyButton
        :disabled="currentHero.healingCooldown || false"
        @click="healSelf()"
        :class="'character--heal'"
      >
        heal{{
          currentHero.healingCooldown
            ? '(' + currentHero.healingCooldown + ')'
            : ''
        }}
      </FancyButton>
      <FancyButton
        @click="performAttack(currentHero.specialAttack())"
        :disabled="currentHero.specialAttackCooldown || false"
        :class="'character--special'"
      >
        special attack{{
          currentHero.specialAttackCooldown
            ? '(' + currentHero.specialAttackCooldown + ')'
            : ''
        }}
      </FancyButton>
    </div>
  </div>
</template>

<script>
import { RANDOM_ACTIONS_ENUM } from './constants';
import { Heroes, Monsters } from './entities';
import { Hero } from './Hero';
import { Monster } from './Monster';
import CharacterCard from './components/CharacterCard.vue';
import FancyButton from './components/FancyButton.vue';

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
    FancyButton,
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
          // this.currentMonster.getHighestStat()
          this.currentMonster.combatEfficiency >
          this.currentMonster.magicKnowledge
        ) {
          this.currentHero.takeDamage(this.currentMonster.executeAttack());
        } else {
          this.currentHero.takeDamage(this.currentMonster.castSpell());
        }
      } else {
        this.currentMonster.healInjures();
      }
      if (this.currentHero.isDead()) {
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
  font-family: 'MedievalSharp', cursive;
}

#app {
  max-width: 1000px;
  margin: 0 auto;
}

.battle__content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  padding: 50px 0;
  border: 1px solid gray;
}

.hero__container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
