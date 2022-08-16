<template>
    <div id="app">
        <div
            class="menu__choose-hero animate__animated animate__slideInDown"
            v-if="!isGame"
        >
            <FancyButton
                v-for="(hero, i) in heroesPool"
                :key="i"
                @click="startGame(i + 1)"
                :class="`hero--${hero.name}`"
            >
                {{ hero.name }}
            </FancyButton>
        </div>
        <div class="battle__container">
            <div class="battle__characters-container" v-if="isGame">
                <CharacterCard :char="currentMonster" />
                <CharacterCard :char="currentHero" />
            </div>
            <div v-if="isCreditsManagerOpen" class="credits-manager">
                <FancyButton class="close" @click="toggleCreditsManager()">
                    X
                </FancyButton>
                <p class="credits-manager__feature credits-manager__title">
                    Available credits: {{ availableCredits }} points
                </p>
                <div class="credits-manager__feature">
                    <span class="credits-manager__feature-item">
                        Combat Efficiency
                    </span>

                    <span class="credits-manager__feature-item">
                        Magic Knowledge
                    </span>

                    <span class="credits-manager__feature-item">
                        Maximum Health
                    </span>
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
                <a
                    href="https://www.flaticon.com/free-icons/knight"
                    title="knight icons"
                    class="icon-link"
                    >All icons created by Freepik - Flaticon</a
                >
            </div>
            <div v-if="isGame" class="battle__actions-container">
                <div class="battle__hero-actions">
                    <FancyButton
                        @click="heroTurn(ACTIONS_ENUM.MELEE)"
                        :disabled="
                            currentHero.getAnimationsFlag('blocked') ||
                            currentMonster.getAnimationsFlag('blocked')
                        "
                        :class="'character--attack'"
                    >
                        attack
                    </FancyButton>
                    <FancyButton
                        @click="heroTurn(ACTIONS_ENUM.MAGIC)"
                        :disabled="
                            currentHero.getAnimationsFlag('blocked') ||
                            currentMonster.getAnimationsFlag('blocked')
                        "
                        :class="'character--spell'"
                    >
                        cast spell
                    </FancyButton>
                    <FancyButton
                        :disabled="
                            currentHero.getCooldown('healing') > 0 ||
                            currentHero.getAnimationsFlag('blocked') ||
                            currentMonster.getAnimationsFlag('blocked')
                        "
                        @click="heroTurn(ACTIONS_ENUM.HEAL)"
                        :class="'character--heal'"
                    >
                        heal
                        {{
                            currentHero.getCooldown('healing')
                                ? '(' + currentHero.getCooldown('healing') + ')'
                                : ''
                        }}
                    </FancyButton>
                    <FancyButton
                        @click="heroTurn('SPECIAL')"
                        :disabled="
                            currentHero.getCooldown('special') > 0 ||
                            currentHero.getAnimationsFlag('blocked') ||
                            currentMonster.getAnimationsFlag('blocked')
                        "
                        :class="'character--special'"
                    >
                        special attack
                        {{
                            currentHero.getCooldown('special')
                                ? '(' + currentHero.getCooldown('special') + ')'
                                : ''
                        }}
                    </FancyButton>
                </div>
                <ul class="battle__actions-list">
                    <li
                        class="animate__animated animate__fadeInUp"
                        v-for="(action, i) in lastActions"
                        :key="i"
                    >
                        {{ action }}
                    </li>
                </ul>
                <FancyButton
                    :disabled="!availableCredits"
                    class="skills"
                    @click="toggleCreditsManager()"
                    v-if="isGame"
                >
                    {{
                        `${
                            availableCredits
                                ? `Skill Points +${availableCredits}`
                                : `Skill Points ${availableCredits}`
                        }`
                    }}
                </FancyButton>
            </div>
        </div>

        <div
            v-if="!isGame && currentHero"
            class="battle__results animate__animated animate__rubberBand"
        >
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
            monstersPool: [],
            currentMonsterLevel: 1,
            defeatedMonsters: 0,
            lastActions: [],
            availableCredits: 0,
            isGame: false,
            currentTurn: 'hero',
            isCreditsManagerOpen: false,
            actionList: null,
            publicPath: process.env.BASE_URL,
            allMonsters: Monsters,
            ACTIONS_ENUM: ACTIONS_ENUM,
            activeTurn: false,
        };
    },

    components: {
        CharacterCard,
        FancyButton,
    },

    methods: {
        createHero(index) {
            this.currentHero = new Hero(Heroes[index - 1]);
        },

        createMonster() {
            if (this.monstersPool.length === 0) {
                this.isGame = false;
                return;
            }
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
            this.monstersPool = this.allMonsters.filter(
                (monster) => monster.level === this.currentMonsterLevel
            );
            this.isGame = true;
        },

        toggleCreditsManager() {
            this.isCreditsManagerOpen = !this.isCreditsManagerOpen;
        },

        monsterDead() {
            new Audio(this.currentMonster.sounds.dead).play();
            this.availableCredits += 5;
            this.currentHero.regenerateInjures();
            this.addActionToLog({
                type: 'monster',
                msg: 'died',
            });
            this.addActionToLog({
                type: 'hero',
                msg: 'regenerated',
            });
            this.monstersPool = this.allMonsters.filter(
                (monster) =>
                    monster.level === this.currentMonsterLevel &&
                    monster.id !== this.currentMonster.id
            );

            this.createMonster();
        },

        //* AWANS - funkcja powinna przyjąć podnoszoną statystykę oraz uaktualnić stan bohatera
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
                    this.currentHero.setAttribute(
                        stat,
                        this.currentHero[stat] + 1
                    );
                }
            }
        },

        addActionToLog(action) {
            this.lastActions.unshift(`${action.type} ${action.msg}`);
        },

        //* TURA BOHATERA - przyjmuje akcje, którą wybrał bohater i ją wykonuje. Na koniec wywołuje endTurn()
        heroTurn(action) {
            let hit = 0,
                heal = 0,
                attack_type = 'combatEfficiency';

            //* 1. Obsługa wszystkich przypadków, które generują obrażenia przeciwnikowi
            if (action === ACTIONS_ENUM.MELEE) {
                hit = this.currentHero.executeAttack();
                attack_type = 'combatEfficiency';
                this.addActionToLog({
                    type: 'hero',
                    msg: `attacked for ${hit}`,
                });
            } else if (action === ACTIONS_ENUM.MAGIC) {
                hit = this.currentHero.castSpell();
                attack_type = 'magicKnowledge';
                this.addActionToLog({
                    type: 'hero',
                    msg: `casted a spell for ${hit} damage`,
                });
            } else if (action === ACTIONS_ENUM.SPECIAL) {
                hit = this.currentHero.specialAttack();
                attack_type =
                    this.currentHero.mainSkill() === ACTIONS_ENUM.MELEE
                        ? 'combatEfficiency'
                        : 'magicKnowledge';
                this.addActionToLog({
                    type: 'hero',
                    msg: `dealt ${hit} damage with special attack`,
                });
            }

            //* 2. Obsługa wszystkich przypadków, które powodują leczenie bohatera
            if (action === ACTIONS_ENUM.HEAL) {
                heal = this.currentHero.healSelf();
                this.addActionToLog({
                    type: 'hero',
                    msg: `healed to ${heal} HP`,
                });
            }

            //* 3. Bez względu na to jaka była akcja, jeżeli przeciwnik ma oberwać, to próbujemy do tego doprowadzić
            if (hit > 0 && !this.currentMonster.isAttackBlocked(attack_type)) {
                this.currentMonster.takeDamage(hit);
            }

            //* 4. Bez względu na to jaka była akcja, jeżeli bohater ma się uleczyć to to robimy
            if (heal > 0) {
                this.currentHero.setHealth(heal);
            }

            //* 5. Co mieliśmy wykonać dla bohatera to jest wykonane, więc koniec tury, funkcja endTurn powinna sprawdzić czy wszyscy żyją i zrobić ew. sprzątanie + oddać turę przeciwnikowi do wykonania
            this.endTurn();
        },

        //* TURA POTWORA - przyjmuje losową akcje, i ją wykonuje. Na koniec wywołuje endTurn()
        monsterTurn(action) {
            let hit = 0,
                heal = 0,
                attack_type = 'combatEfficiency';

            //* 1. Obsługa wszystkich przypadków, które generują obrażenia przeciwnikowi
            if (action === ACTIONS_ENUM.MELEE) {
                hit = this.currentMonster.executeAttack();
                attack_type = 'combatEfficiency';
                this.addActionToLog({
                    type: 'monster',
                    msg: `attacked for ${hit}`,
                });
            } else if (action === ACTIONS_ENUM.MAGIC) {
                hit = this.currentMonster.castSpell();
                attack_type = 'magicKnowledge';
                this.addActionToLog({
                    type: 'monster',
                    msg: `casted a spell for ${hit} damage`,
                });
            }

            //* 2. Obsługa wszystkich przypadków, które powodują leczenie bohatera
            if (action === ACTIONS_ENUM.HEAL) {
                heal = this.currentMonster.healSelf();
                this.addActionToLog({
                    type: 'monster',
                    msg: `healed to ${heal} HP`,
                });
            }

            //* 3. Bez względu na to jaka była akcja, jeżeli przeciwnik ma oberwać, to próbujemy do tego doprowadzić
            if (hit > 0 && !this.currentHero.isAttackBlocked(attack_type)) {
                this.currentHero.takeDamage(hit);
            }

            //* 4. Bez względu na to jaka była akcja, jeżeli bohater ma się uleczyć to to robimy
            if (heal > 0) {
                this.currentMonster.setHealth(heal);
            }

            //* 5. Co mieliśmy wykonać dla bohatera to jest wykonane, więc koniec tury, funkcja endTurn powinna sprawdzić czy wszyscy żyją i zrobić ew. sprzątanie + oddać turę przeciwnikowi do wykonania
            this.endTurn();
        },

        //* CLEANER - funkcja sprzątająca, kończąca turę. Powinna sprawdzać czy potwór/bohater padł.
        async endTurn() {
            this.activeTurn = true;

            if (this.currentHero.isDead()) {
                new Audio(this.currentHero.sounds.dead).play();
                this.isGame = false;
            }

            //* obniżenie cd's umiejętności dodatkowych
            if (this.currentTurn === 'hero') {
                this.currentHero.setCooldown(
                    'healing',
                    this.currentHero.getCooldown('healing') - 1
                );
                this.currentHero.setCooldown(
                    'special',
                    this.currentHero.getCooldown('special') - 1
                );
            } else {
                this.currentMonster.setCooldown(
                    'healing',
                    this.currentMonster.getCooldown('healing') - 1
                );
            }

            //* zmiana tury gracza
            this.currentTurn === 'hero'
                ? (this.currentTurn = 'monster')
                : (this.currentTurn = 'hero');

            if (this.currentTurn === 'monster') {
                this.monsterTurn(
                    this.currentMonster.drawRandomAction(this.currentHero)
                );
            }

            if (this.currentMonster.isDead()) {
                this.defeatedMonsters++;

                //* jeśli pula potworów się skończyła => podnieść level kolejnych potworów
                if (
                    this.defeatedMonsters % 2 === 0 &&
                    this.defeatedMonsters > 0
                ) {
                    this.currentMonsterLevel++;
                }
                await this.currentMonster.animationsEnded();
                this.monsterDead();
            }

            this.activeTurn = false;
        },
    },
};
</script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);
@import 'animate.css';

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'MedievalSharp', cursive;
}

body {
    background-color: rgba(204, 216, 97, 0.2);
    margin: 0 auto;
}

#app {
    height: 100vh;
    max-width: 1000px;
    margin: 0 auto;
}

.menu__choose-hero {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.btn {
    padding: 5px;
}

.battle__container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.battle__characters-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    width: 100%;
    row-gap: 50px;

    @media (min-width: 468px) {
        flex-direction: row;
        justify-content: center;
        column-gap: 50px;
    }
}

.battle__actions-container {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    column-gap: 20px;
}

.battle__hero-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
}

.battle__actions-list {
    display: none;
    @media (min-width: 468px) {
        display: flex;
        flex-direction: column-reverse;

        min-width: 300px;
        height: 200px;
        padding: 10px;
        margin-top: 10px;
        border: 1px solid gray;
        border-radius: 8px;

        overflow-y: scroll;
        list-style-type: none;
        user-select: none;

        &::-webkit-scrollbar {
            width: 12px;
        }

        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 14px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 14px;
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        & li {
            margin: 20px 0;
            font-size: 16px;
        }
    }
}

.credits-manager {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 10px;

    width: 100%;
    max-width: 400px;
    height: 300px;
    padding: 20px;
    box-shadow: 0 0 3px 2px black;

    background-color: orangered;
    color: white;

    font-size: 14px;
    user-select: none;

    @media (min-width: 468px) {
        top: 335px;
        transform: transalte(-50%, -50%);
    }

    &__title {
        font-size: 24px;
    }

    &__feature {
        display: flex;
        justify-content: space-around;
        width: 100%;
        text-align: center;

        &-item {
            width: 30%;
            font-size: 14px;
        }
    }
}

.battle__results {
    width: 220px;
    padding: 10px 5px;
    margin: 0 auto;
    margin-top: 50px;
    border: 1px solid gray;

    background-color: rgb(145, 226, 236);
    text-align: center;
    font-size: 18px;
    line-height: 20px;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
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

.icon-link {
    all: unset;
}
</style>
