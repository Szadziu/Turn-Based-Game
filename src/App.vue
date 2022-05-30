<template>
  <div id="app"></div>
</template>

<script>
import { Heroes, Monsters } from './entities';

class Entity {
  constructor({ name, health, combatEfficiency, magicKnowledge }) {
    (this.name = name),
      (this.health = health),
      (this.combatEfficiency = combatEfficiency),
      (this.magicKnowledge = magicKnowledge);
  }

  executeAttack(enemy) {
    enemy.takeDamage(this.combatEfficiency);
  }

  castSpell(enemy) {
    enemy.takeDamage(this.magicKnowledge);
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(
      `uderzono za ${amount} pkt. pozostało ${this.health} pkt. życia`
    );
  }
}

// for (const hero of Heroes) {
//   Heroes[hero.name] = new Entity(hero);
// }

const heros = new Entity(Heroes[1]);
const monster = new Entity(Monsters[0]);

console.log(heros, monster);

monster.castSpell(heros);

export default {
  name: 'App',
};
</script>
