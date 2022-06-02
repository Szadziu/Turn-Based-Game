import { Entity } from './Entity';
import { getRandomFloat } from './helpers';

export class Hero extends Entity {
  constructor(props) {
    super(props);

    this.specialAttackCooldown = 6;
  }
  specialAttack() {
    const powerOfAttack = getRandomFloat(100, 300);
    const highestSpec =
      this.combatEfficiency > this.magicKnowledge
        ? this.combatEfficiency
        : this.magicKnowledge;

    this.calcCooldowns();
    this.specialAttackCooldown = 6;

    console.log(`hit special attack for ${powerOfAttack * highestSpec}`);

    return powerOfAttack * this.combatEfficiency;
  }
}
