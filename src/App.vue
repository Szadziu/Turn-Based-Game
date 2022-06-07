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
      <div class="battle__characters-container" v-if="isGame">
        <CharacterCard :char="currentHero" />
        <div class="block" v-if="currentTurn === 'hero' && blocked">
          <img class="block__img" src="./assets/shield.png" alt="shield" />
        </div>
        <CharacterCard :char="currentMonster" />
        <div class="block" v-if="currentTurn === 'monster' && blocked">
          <img class="block__img" src="./assets/shield.png" alt="shield" />
        </div>
      </div>
      <div v-if="isGame" class="battle__actions-container">
        <div class="battle__hero-actions">
          <FancyButton
            @click="heroTurn('MELEE')"
            :disabled="blocked"
            :class="'character--attack'"
          >
            attack
          </FancyButton>
          <FancyButton
            @click="heroTurn('MAGIC')"
            :disabled="blocked"
            :class="'character--spell'"
          >
            cast spell
          </FancyButton>
          <FancyButton
            :disabled="currentHero.getCooldown('healing') > 0 || blocked"
            @click="heroTurn('HEAL')"
            :class="'character--heal'"
          >
            heal({{ currentHero.getCooldown('healing') }})
          </FancyButton>
          <FancyButton
            @click="heroTurn('SPECIAL')"
            :disabled="currentHero.getCooldown('special') > 0 || blocked"
            :class="'character--special'"
          >
            special attack({{ currentHero.getCooldown('special') }})
          </FancyButton>
        </div>
        <TransitionGroup name="list" tag="ul" class="battle__actions-list">
          <li v-for="(action, i) in lastActions" :key="i">{{ action }}</li>
        </TransitionGroup>
      </div>
      <FancyButton class="skills" @click="toggleCreditsManager()" v-if="isGame"
        >+</FancyButton
      >

      <div v-if="isCreditsManagerOpen" class="credits-manager">
        <FancyButton class="close" @click="toggleCreditsManager()">
          X
        </FancyButton>
        <p class="credits-manager__feature credits-manager__title">
          Available credits: {{ availableCredits }} points
        </p>
        <div class="credits-manager__feature">
          <span class="credits-manager__feature-item"> Combat Efficiency </span>

          <span class="credits-manager__feature-item"> Magic Knowledge </span>

          <span class="credits-manager__feature-item"> Health </span>
        </div>
        <div class="credits-manager__feature">
          <FancyButton
            class="update-stats"
            @click="updateHeroStats('combatEfficiency')"
          >
            +1
          </FancyButton>

          <FancyButton
            class="update-stats"
            @click="updateHeroStats('magicKnowledge')"
          >
            +1
          </FancyButton>

          <FancyButton
            class="update-stats"
            @click="updateHeroStats('currentHealth')"
          >
            +3
          </FancyButton>
        </div>
      </div>
    </div>

    <div v-if="!isGame && currentHero" class="battle__results">
      Results: Defeated monsters: {{ defeatedMonsters }}
      <p v-if="currentHero.currentHealth > 0">
        Congratulations you defeated all monsters !
      </p>
      <p v-else>Oh no... You lose. Maybe try again ?</p>
    </div>
  </div>
</template>

<script>
import { ACTIONS_ENUM } from './cons/constants';
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
      currentHero: '',
      currentMonster: '',
      heroesPool: Heroes,
      allMonsters: Monsters,
      currentMonsterLevel: 1,
      defeatedMonsters: 0,
      lastActions: [],
      availableCredits: 0,
      isGame: false,
      currentTurn: 'hero',
      blocked: false,
      isCreditsManagerOpen: false,
      actionList: null,
    };
  },

  components: {
    CharacterCard,
    FancyButton,
  },
  computed: {
    monstersPool() {
      return this.allMonsters.filter(
        (monster) => monster.level === this.currentMonsterLevel
      );
    },
  },

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
      this.availableCredits = 0;
      this.lastActions = [];
      this.currentHero = '';
      this.currentMonster = '';
      this.currentMonsterLevel = 1;
      this.allMonsters = Monsters;
      this.isGame = true;
    },

    toggleCreditsManager() {
      this.isCreditsManagerOpen = !this.isCreditsManagerOpen;
    },

    monsterDead() {
      this.defeatedMonsters++;
      this.availableCredits += 5;
      this.currentHero.regenerateInjures();
      this.lastActions.push(`${this.currentMonster.name} died`);
      this.lastActions.push(`Hero regenerated`);
      this.allMonsters = this.allMonsters.filter(
        (monster) => this.currentMonster.name !== monster.name
      );
      if (this.endTurn()) {
        this.createMonster();
      }
    },

    heroDead() {
      this.isGame = false;
    },

    updateHeroStats(stat) {
      if (this.availableCredits > 0) {
        this.availableCredits--;
        if (stat === 'currentHealth') {
          this.currentHero.setHealth(this.currentHero[stat] + 3);
          this.currentHero.setAttribute(
            'maxHealth',
            this.currentHero.maxHealth + 3
          );
        } else {
          this.currentHero.setAttribute(stat, this.currentHero[stat] + 1);
        }
      }
    },

    isAttackBlocked(character, type) {
      const chance = character.blockChance(type);
      const probability = getRandomInt(0, 100 + chance);

      if (probability < chance) {
        this.lastActions.push(`${character.name} blocked attack`);
        console.log(`block chance ${chance}%`);
        this.blocked = true;
        setTimeout(() => (this.blocked = false), 1000);
        return true;
      }
    },

    heroTurn(action) {
      if (action === ACTIONS_ENUM.MELEE) {
        const hit = this.currentHero.executeAttack();

        if (this.isAttackBlocked(this.currentMonster, 'combatEfficiency'))
          this.monsterTurn(this.currentMonster.drawRandomAction());

        this.currentMonster.takeDamage(hit);
        this.lastActions.push(`Hero hit for ${hit}`);
      }

      if (action === ACTIONS_ENUM.MAGIC) {
        const spell = this.currentHero.castSpell();

        if (this.isAttackBlocked(this.currentMonster, 'magicKnowledge'))
          this.monsterTurn(this.currentMonster.drawRandomAction());

        this.currentMonster.takeDamage(spell);
        this.lastActions.push(`Hero casted a spell for ${spell}`);
      }

      if (action === ACTIONS_ENUM.HEAL) {
        const healing = this.currentHero.healSelf();
        this.currentHero.setHealth(healing);
        this.lastActions.push(`Hero healed up`);
        this.currentHero.setCooldown('healing', 3);
      }

      if (action === ACTIONS_ENUM.SPECIAL) {
        const special = this.currentHero.specialAttack();

        if (this.isAttackBlocked(this.currentMonster, 'specialAttack'))
          this.monsterTurn(this.currentMonster.drawRandomAction());

        this.currentMonster.takeDamage(special);
        this.lastActions.push(`Hero use special attack for ${special}`);
        this.currentHero.setCooldown('special', 7);
      }

      if (this.currentMonster.isDead()) {
        this.monsterDead();
      } else {
        this.monsterTurn(this.currentMonster.drawRandomAction());
      }
      this.toggleTurn();
    },

    monsterTurn(rdmAction) {
      const heroCombat = this.currentHero.combatEfficiency;
      const monsterCombat = this.currentMonster.combatEfficiency;
      const heroMagic = this.currentHero.magicKnowledge;
      const monsterMagic = this.currentMonster.magicKnowledge;
      const monsterDualSpecialization = monsterCombat === monsterMagic;
      if (
        rdmAction === ACTIONS_ENUM.MELEE ||
        rdmAction === ACTIONS_ENUM.MAGIC
      ) {
        const hit = this.currentMonster.executeAttack();
        const spell = this.currentHero.castSpell();
        if (monsterDualSpecialization) {
          if (heroCombat > heroMagic) {
            if (this.isAttackBlocked(this.currentHero, 'magicKnowledge')) {
              this.endTurn();
              return;
            }
            this.currentHero.takeDamage(spell);
            this.lastActions.push(`Monster casted a spell for ${spell}`);
          } else {
            if (this.isAttackBlocked(this.currentHero, 'combatEfficiency')) {
              this.endTurn();
              return;
            }
            this.currentHero.takeDamage(hit);
            this.lastActions.push(`Monster hit for ${hit}`);
          }
        } else if (monsterCombat > monsterMagic) {
          this.currentHero.takeDamage(hit);
          if (this.isAttackBlocked(this.currentHero, 'combatEfficiency')) {
            this.endTurn();
            return;
          }
          this.lastActions.push(`Monster hit for ${hit}`);
        } else {
          if (this.isAttackBlocked(this.currentHero, 'magicKnowledge')) {
            this.endTurn();
            return;
          }
          this.currentHero.takeDamage(spell);
          this.lastActions.push(`Monster casted a spell for ${spell}`);
        }
      } else {
        const healing = this.currentMonster.healSelf();
        this.currentMonster.setHealth(healing);
        this.currentMonster.setCooldown('healing', 3);
        this.lastActions.push(`Monster healed up`);
      }

      if (this.currentHero.isDead()) {
        this.isGame = false;
      } else {
        this.endTurn();
      }
    },

    toggleTurn() {
      if (this.currentTurn === 'hero') {
        this.currentTurn = 'monster';
      } else {
        this.currentTurn = 'hero';
      }
    },

    endTurn() {
      if (this.allMonsters.length === 0) {
        this.isGame = false;
        return;
      }

      if (this.monstersPool.length === 0) {
        this.currentMonsterLevel++;
      }

      this.toggleTurn();

      if (this.currentHero.getCooldown('healing') > 0) {
        this.currentHero.setCooldown(
          'healing',
          this.currentHero.getCooldown('healing') - 1
        );
      }

      if (this.currentHero.getCooldown('special') > 0) {
        this.currentHero.setCooldown(
          'special',
          this.currentHero.getCooldown('special') - 1
        );
      }

      if (this.currentMonster.getCooldown('healing') > 0) {
        this.currentMonster.setCooldown(
          'healing',
          this.currentMonster.getCooldown('healing') - 1
        );
      }

      return true;
    },
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

.btn {
  padding: 5px;
}

.credits-manager {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
  position: absolute;
  bottom: 30px;
  left: calc(5% - 20px);
  background-color: orangered;
  border-radius: 14px;
  box-shadow: 0 0 3px 2px black;
  padding: 20px;
  font-size: 24px;
  color: white;
  width: 90%;
  height: 400px;

  &__title {
    font-size: 44px;
  }

  &__feature {
    display: flex;
    justify-content: space-around;
    width: 100%;
    text-align: center;

    &-item {
      width: 30%;
    }
  }
}

.block {
  position: relative;

  &__img {
    position: absolute;
    width: 100px;
    height: 100px;
    right: 50%;
    top: 80%;
    z-index: 999;
  }
}

.battle__container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
}

.battle__actions-list {
  padding: 10px;
  margin: auto 75px;
  width: 300px;
  height: 250px;
  border: 1px solid gray;
  overflow-y: scroll;
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
  padding-top: 50px;
}

.battle__hero-actions {
  width: 300px;
  margin: 0 75px;
}

.battle__results {
  width: 60%;
  padding: 70px 0;
  margin: 100px auto;
  text-align: center;
  font-size: 26px;
  line-height: 24px;
  border: 1px solid gray;
  background-color: rgb(145, 226, 236);
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
