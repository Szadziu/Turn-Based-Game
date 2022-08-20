<template>
    <transition name="slide" mode="out-in" appear>
        <div
            class="card animate__animated"
            :class="{
                animate__headShake: char.getAnimationsFlag('smallHit'),
                animate__wobble: char.getAnimationsFlag('bigHit'),
                animate__slideOutUp: char.getAnimationsFlag('dead'),
            }"
        >
            <div class="card__image" :class="{ dead: heroDead }">
                <img :src="char.image" :alt="char.name" />
            </div>

            <div v-if="char.level" class="card__level">
                level {{ char.level }}
            </div>
            <div v-else class="card__level">hero</div>

            <div class="card__name">{{ char.name }}</div>

            <div class="block" v-if="char.getAnimationsFlag('blocked')">
                <img
                    class="block__img animate__animated animate__flash"
                    src="assets/items/shield.png"
                    alt="shield"
                />
            </div>
            <div class="heal" v-if="char.getAnimationsFlag('heal')">
                <img
                    class="heal__img animate__animated animate__flash"
                    src="assets/items/plus.png"
                    alt="heal"
                />
            </div>

            <HealthBar color="#42B782" v-model="percentageValue" />

            <div class="card__stats">
                <div class="one-third" :class="`one-third--${char.name}`">
                    <div class="stat">HP</div>
                    <div class="stat-value">{{ char.currentHealth }}</div>
                </div>

                <div class="one-third" :class="`one-third--${char.name}`">
                    <div class="stat">Combat</div>
                    <div class="stat-value">{{ char.combatEfficiency }}</div>
                </div>

                <div class="one-third" :class="`one-third--${char.name}`">
                    <div class="stat">Magic</div>
                    <div class="stat-value">{{ char.magicKnowledge }}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import HealthBar from './HealthBar';

export default {
    name: 'CharacterCard',
    components: {
        HealthBar,
    },
    props: ['char'],
    computed: {
        percentageValue() {
            if (this.heroDead) return 0;
            return (this.char.currentHealth * 100) / this.char.maxHealth;
        },
        heroDead() {
            return this.char.currentHealth <= 0;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';

.card {
    position: relative;

    min-width: 120px;
    width: 40%;
    max-width: 170px;
    border-radius: $border-radius-size;
    box-shadow: 0 0 0 1px black;

    background: rgb(255, 255, 255);

    text-align: center;

    &__image {
        position: relative;

        height: 100px;
        margin-bottom: 35px;
        border-top-left-radius: $border-radius-size;
        border-top-right-radius: $border-radius-size;

        img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            width: 90%;
        }
    }

    &__level {
        margin-bottom: 3px;

        text-transform: uppercase;
        font-size: 12px;
        font-weight: 700;
    }

    &__name {
        margin-bottom: 5px;

        color: black;

        font-size: 20px;
        text-transform: uppercase;
        font-weight: 900;
    }

    &__stats {
        display: flex;
        overflow: hidden;

        border-bottom-left-radius: $border-radius-size;
        border-bottom-right-radius: $border-radius-size;

        font-weight: 700;

        .one-third {
            width: 33%;
            padding: 5px 2px;
            box-sizing: content-box;

            background-color: $barbarian;

            color: rgb(255, 255, 255);

            &--viking {
                background-color: $barbarian;
            }

            &--wizard {
                background-color: $wizard;
            }

            &--rogue {
                background-color: $rogue;
            }
            &--knight {
                background-color: $knight;
            }
            &--druid {
                background-color: $druid;
            }

            &--imp {
                background-color: $imp;
            }
            &--giant {
                background-color: $giant;
            }
            &--harpy {
                background-color: $harpy;
            }
            &--reaper {
                background-color: $reaper;
            }
            &--vampire {
                background-color: $vampire;
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
            text-transform: uppercase;
            margin-bottom: 10px;

            font-weight: 400;
            font-size: 8px;

            @media (min-width: 768px) {
                font-size: 12px;
            }
        }

        .stat-value {
            position: relative;
            font-size: 18px;

            @media (min-width: 768px) {
                font-size: 24px;
            }
        }
    }
}
.block,
.heal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &__img {
        width: 80px;
        height: 80px;
    }
}

.dead {
    filter: grayscale(1);
}

.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
