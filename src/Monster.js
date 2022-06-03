import { Entity } from './Entity';
import { RANDOM_ACTIONS_ENUM } from './cons/constants';
import { getRandomInt } from './helpers/helpers';

export class Monster extends Entity {
  constructor({ level, ...rest }) {
    super({ ...rest });
    this.level = level;
  }

  randomActionAI() {
    const x = getRandomInt(0, !this.healingCooldown ? 3 : 2);

    return Object.values(RANDOM_ACTIONS_ENUM)[x];
  }
}
