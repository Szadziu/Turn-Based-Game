<template>
  <div
    v-if="char.currentHealth"
    class="card"
    :class="{ dead: char.currentHealth <= 0 }"
  >
    <div class="card__image">
      <img :src="char.image" :alt="char.name" />
    </div>
    <div v-if="char.level" class="card__level">level {{ char.level }}</div>
    <div v-else class="card__level">hero</div>
    <div class="card__name">{{ char.name }}</div>
    <HealthBar v-model="percentage" />
    <div class="card__stats">
      <div class="one-third" :class="`one-third--${char.name}`">
        <div class="stat">{{ char.currentHealth }}</div>
        <div class="stat-value">HP</div>
      </div>

      <div class="one-third" :class="`one-third--${char.name}`">
        <div class="stat">{{ char.combatEfficiency }}</div>
        <div class="stat-value">Combat</div>
      </div>

      <div class="one-third" :class="`one-third--${char.name}`">
        <div class="stat">{{ char.magicKnowledge }}</div>
        <div class="stat-value">Magic</div>
      </div>
    </div>
  </div>
</template>

<script>
import HealthBar from './HealthBar';

export default {
  name: 'CharacterCard',
  components: {
    HealthBar,
  },
  props: {
    char: {
      type: Object,
    },
  },
  computed: {
    percentage() {
      if (this.char.isDead()) return 0;
      return (this.char.currentHealth * 100) / this.char.maxHealth;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);

$border-radius-size: 14px;
$barbarian: #ec9b3b;
$wizard: #4facff;
$rogue: #074322;

$imp: #c775e5;
$gnome: #82bb30;
$goblin: #568612;
$dragon: #056856;
$troll: #182c5e;
$ogre: #826c08;

$archer: #ee5487;
$giant: #f6901a;
$goblin: #82bb30;

.dead {
  filter: grayscale(1);
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.card {
  background: white;
  width: 300px;
  display: inline-block;
  margin: auto;
  border-radius: $border-radius-size + 5;
  position: relative;
  text-align: center;
  box-shadow: -1px 15px 30px -12px black;

  &__image {
    position: relative;
    height: 230px;
    margin-bottom: 35px;
    border-top-left-radius: $border-radius-size;
    border-top-right-radius: $border-radius-size;
    img {
      width: 90%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__level {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  &__name {
    font-size: 26px;
    color: black;
    font-weight: 900;
    margin-bottom: 5px;
    text-transform: uppercase;
  }

  &__stats {
    display: flex;
    font-weight: 700;
    border-bottom-left-radius: $border-radius-size;
    border-bottom-right-radius: $border-radius-size;
    overflow: hidden;

    .one-third {
      width: 33%;
      background-color: $barbarian;
      color: white;
      padding: 20px 15px;
      box-sizing: content-box;

      &--viking {
        background-color: $barbarian;
      }

      &--wizard {
        background-color: $wizard;
      }

      &--rogue {
        background-color: $rogue;
      }

      &--imp {
        background-color: $imp;
      }

      &--gnome {
        background-color: $gnome;
      }

      &--goblin {
        background-color: $goblin;
      }

      &--dragon {
        background-color: $dragon;
      }

      &--troll {
        background-color: $troll;
      }

      &--ogre {
        background-color: $ogre;
      }
    }

    .one-third:nth-child(even) {
      border-left: 2px solid rgba(0, 0, 0, 0.3);
      border-right: 2px solid rgba(0, 0, 0, 0.3);
    }
    .stat {
      position: relative;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .stat-value {
      text-transform: uppercase;
      font-weight: 400;
      font-size: 12px;
    }
  }
}
</style>
