<template>
  <div id="app">
    <transition name="slide" mode="out-in" appear>
      <div class="menu__choose-hero" v-if="!isGame">
        <FancyButton
          v-for="(hero, i) in heroesPool"
          :key="i"
          @click="startGame(i + 1)"
          :class="`hero--${hero.name}`"
          >{{ hero.name }}</FancyButton
        >
      </div>
    </transition>
    <div class="battle__container">
      <div class="battle__characters-container">
        <CharacterCard :char="currentHero" />
        <CharacterCard :char="currentMonster" />
      </div>
      <div v-if="isGame" class="battle__actions-container">
        <div class="battle__hero-actions">
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
            heal{{ healCooldown }}
          </FancyButton>
          <FancyButton
            @click="performAttack(currentHero.specialAttack())"
            :disabled="currentHero.specialAttackCooldown || false"
            :class="'character--special'"
          >
            special attack{{ specialCooldown }}
          </FancyButton>
        </div>
        <TransitionGroup name="list" tag="ul" class="battle__actions-list">
          <li v-for="(action, i) in lastActions" :key="i">{{ action }}</li>
        </TransitionGroup>
      </div>
      <div v-if="isResults" class="battle__results">
        Results: Defeated monsters: {{ defeated }}
        <p v-if="currentHero.currentHealth > 0">
          Congratulations you defeated all monsters !
        </p>
        <p v-else>Oh no... You lose. Maybe try again ?</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ACTIONS_ENUM,
  HALF_OF_MAX_HERO_HEALTH,
  RANDOM_ACTIONS_ENUM,
} from './cons/constants';
import { Heroes, Monsters } from './cons/entities';
import { Hero } from './Hero';
import { Monster } from './Monster';
import CharacterCard from './components/CharacterCard.vue';
import FancyButton from './components/FancyButton.vue';
import { getRandomInt } from './helpers/helpers';

export default {
  name: 'App',
  data() {
    return {
      currentHero: null,
      currentMonster: null,
      heroesPool: Heroes,
      currentMonsterLevel: 1,
      // monstersPool: [''],
      defeatedMonsters: 0,
      lastActions: [],
      availableCredits: 0,
      isGame: false,
      currentTurn: '', //* hero/monster
    };
  },
  // watch: {
  //   lastActions() {
  //     if (this.lastActions.length > 5) {
  //       this.lastActions.shift();
  //     }
  //   },
  // },
  components: {
    CharacterCard,
    FancyButton,
  },
  computed: {
    monstersPool() {
      return Monsters.filter(
        (monster) => monster.level === this.currentMonsterLevel
      );
    },
  },

  //   isGame() {
  //     return !!this.allMonsters.length && this.currentHero.currentHealth >= 0;
  //   },
  //   isResults() {
  //     return (
  //       this.currentHero.currentHealth <= 0 || this.allMonsters.length === 0
  //     );
  //   },
  //   healCooldown() {
  //     return this.currentHero.healingCooldown
  //       ? '(' + this.currentHero.healingCooldown + ')'
  //       : '';
  //   },
  //   specialCooldown() {
  //     return this.currentHero.specialAttackCooldown
  //       ? '(' + this.currentHero.specialAttackCooldown + ')'
  //       : '';
  //   },
  methods: {
    createHero(index) {
      this.currentHero = new Hero(Heroes[index - 1]);
    },

    createMonster() {
      const rdm = getRandomInt(0, this.monstersPool.length);
      this.currentMonster = new Monster(this.monstersPool[rdm]);
    },

    startGame(i) {
      this.resetGame();
      this.createHero(i);
      this.createMonster();
    },

    resetGame() {
      this.defeatedMonsters = 0;
      this.lastActions = [];
      this.currentHero = null;
      this.currentMonster = null;
      this.currentMonsterLevel = 1;
      this.isGame = true;
    },

    // chooseHero(hero) {
    //   this.allMonsters = Monsters;
    //   this.createHero(hero);
    //   this.setCurrentMonster();
    //   this.resetStats();
    // },

    monsterDead() {
      this.defeatedMonsters++;
      this.availableCredits += 5;
      this.currentHero.regenerateInjures();
      this.lastActions.push(`${this.currentMonster.name} died`);
      this.lastActions.push(
        `Hero healed up for ${this.currentHero.regenerateInjures()}`
      );
      // this.allMonsters = this.allMonsters.filter(
      //   (monster) => this.currentMonster.name !== monster.name
      // );
      return true;
    },

    heroDead() {
      this.isGame = false;
    },

    updateHeroStats(stat) {
      this.availableCredits--;
      if (stat === 'currentHealth') {
        this.setAttribute(stat, this[stat] + 3);
      } else {
        this.setAttribute(stat, this[stat] + 1);
      }
    },

    heroTurn(action) {
      if (action === ACTIONS_ENUM.MELEE) {
        const hit = this.currentHero.executeAttack();
        this.currentMonster.takeDamage(hit);
        this.lastActions.push(`Hero hit for ${hit}`);
      }
      if (action === ACTIONS_ENUM.MAGIC) {
        const spell = this.currentHero.castSpell();
        this.currentMonster.takeDamage(spell);
        this.lastActions.push(`Hero casted a spell for ${spell}`);
      }
      if (action === ACTIONS_ENUM.HEAL) {
        const healing = this.healSelf();
        this.currentHero.setHealth(healing);
        this.lastActions.push(`Hero healed up for ${healing}`);
      }

      if (this.currentMonster.isDead()) {
        this.monsterDead();
      } else {
        this.endTurn();
      }
    },

    monsterTurn(rdmAction) {
      if (rdmAction === ACTIONS_ENUM.MELEE) {
        const hit = this.currentMonster.executeAttack();
        this.currentHero.takeDamage(hit);
        this.lastActions.push(`Monster hit for ${hit}`);
      }
      if (rdmAction === ACTIONS_ENUM.MAGIC) {
        const spell = this.currentHero.castSpell();
        this.currentHero.takeDamage(spell);
        this.lastActions.push(`Monster casted a spell for ${spell}`);
      }
      if (rdmAction === ACTIONS_ENUM.HEAL) {
        const healing = this.healSelf();
        this.currentMonster.setHealth(healing);
        this.lastActions.push(`Monster healed up for ${healing}`);
      }

      if (this.currentHero.isDead()) {
        this.isGame = false;
      } else {
        this.endTurn();
      }
    },

    // performAttack(attackValue) {
    //   this.currentMonster.takeDamage(attackValue);
    //   this.lastActions.push(`attack for ${attackValue}`);
    //   if (this.currentMonster.isDead()) {
    //     this.monsterDead();
    //   } else {
    //     this.endTurn();
    //   }
    // },

    healSelf() {
      const powerOfHealing = getRandomInt(10, 50);
      const healing = Math.round((powerOfHealing * this.maxHealth) / 100);

      if (this.currentHealth + healing > this.maxHealth) {
        return this.maxHealth;
      } else {
        return this.currentHealth + healing;
      }
    },

    endTurn() {
      if (this.monstersPool.length === 0) {
        this.currentMonsterLevel++;
      }

      if (this.currentTurn === 'hero') {
        this.currentTurn = 'monster';
      } else {
        this.currentTurn = 'hero';
      }
    },

    // endTurn() {
    //   const rdmAction =
    //     RANDOM_ACTIONS_ENUM[this.currentMonster.randomActionAI()];
    //   this.lastActions.push(`random AI action is: ${rdmAction.toLowerCase()}`);

    //   const heroCombat = this.currentHero.combatEfficiency;
    //   const monsterCombat = this.currentMonster.combatEfficiency;
    //   const heroMagic = this.currentHero.magicKnowledge;
    //   const monsterMagic = this.currentMonster.magicKnowledge;

    //   if (
    //     rdmAction === RANDOM_ACTIONS_ENUM.MELEE ||
    //     rdmAction === RANDOM_ACTIONS_ENUM.MAGIC
    //   ) {
    //     if (monsterCombat === monsterMagic) {
    //       if (heroCombat > heroMagic) {
    //         this.currentHero.takeDamage(this.currentMonster.castSpell());
    //       } else {
    //         this.currentHero.takeDamage(this.currentMonster.executeAttack());
    //       }
    //     } else if (monsterCombat > monsterMagic) {
    //       this.currentHero.takeDamage(this.currentMonster.executeAttack());
    //     } else {
    //       this.currentHero.takeDamage(this.currentMonster.castSpell());
    //     }
    //   } else {
    //     this.currentMonster.healInjures();
    //   }
    // },
  },
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);

* {
  padding: 0;
  margin: 0;
  font-family: 'MedievalSharp', cursive;
}

body {
  background-color: rgba(204, 216, 97, 0.2);
}

#app {
  max-width: 1000px;
  margin: 0 auto;
}

.battle__container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding: 50px 0;
  gap: 20px;
}

.battle__actions-list {
  margin: auto 75px;
  width: 300px;
  list-style-type: none;
  & li {
    font-size: 20px;
    margin: 20px 0;
  }
}

.battle__characters-container,
.battle__actions-container {
  display: flex;
  width: 90%;
  padding: 50px 0;
}

.battle__hero-actions {
  width: 300px;
  margin: 0 75px;
}

.battle__results {
  width: 100%;
  text-align: center;
  font-size: 20px;
  line-height: 24px;
}

.slide-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
