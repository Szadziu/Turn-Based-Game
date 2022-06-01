import { Entity } from './Entity';
import { RANDOM_ACTIONS_ENUM } from './constants';

export class Monster extends Entity {
  constructor({ level, ...rest }) {
    super({ ...rest });
    this.level = level;
  }

  randomActionAI() {
    console.log(
      "%cmonster's move",
      'background-color: coral; color: white; padding: 3px'
    );
    if (this.healingCooldown === 0) {
      const rdm = Math.floor(Math.random() * 3);
      return Object.values(RANDOM_ACTIONS_ENUM)[rdm];
    } else {
      const rdm = Math.floor(Math.random() * 2);
      return Object.values(RANDOM_ACTIONS_ENUM)[rdm];
    }
  }
}
