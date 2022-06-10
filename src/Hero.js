import { Entity } from './Entity';
import { getRandomInt } from './helpers/helpers';

export class Hero extends Entity {
  constructor(props) {
    super(props);

    this.setCooldown('special', 6);
  }

  specialAttack() {
    const powerOfAttack = getRandomInt(100, 300);
    const special = Math.round((powerOfAttack * this.getHighestSpec()) / 100);

    new Audio(this.sounds.attack).play();

    this.cooldows.special = 7;

    return special;
  }

  regenerateInjures() {
    //* zapis połowy max hp można napewno lepiej zapisać
    if (this.currentHealth + this.maxHealth * 0.5 > this.maxHealth) {
      this.setHealth(this.maxHealth);
    } else {
      this.setHealth(this.currentHealth + this.maxHealth * 0.5);
    }
  }
}
