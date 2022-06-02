import { Entity } from './Entity';
import { getRandomInt } from './helpers';

export class Hero extends Entity {
  constructor(props) {
    super(props);

    this.specialAttackCooldown = 6;
  }
  specialAttack() {
    const powerOfAttack = getRandomInt(100, 300);

    const highestSpec =
      this.combatEfficiency > this.magicKnowledge
        ? this.combatEfficiency
        : this.magicKnowledge;

    const special = Math.round((powerOfAttack * highestSpec) / 100);

    this.calcCooldowns();
    this.specialAttackCooldown = 6;

    console.log(`hit special attack for ${special}`);

    return special;
  }
}
