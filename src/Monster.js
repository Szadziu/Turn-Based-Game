import { Entity } from './Entity';
import { ACTIONS_ENUM } from './cons/constants';
import { getRandomInt } from './helpers/helpers';

const Chance = require('chance');

const chance = new Chance();

export class Monster extends Entity {
  constructor({ level, ...rest }) {
    super({ ...rest });

    this.level = level;
  }

  drawRandomAction(enemy) {
    const rdm = getRandomInt(0, !this.getCooldown('healing') ? 3 : 2);

    //TODO przeniesc cala logike

    const actions = {
      attack: 100,
      spell: 100,
      heal: 0,
    };

    const random = chance.weighted(
      Object.keys(actions),
      Object.values(actions)
    );

    console.log(random);

    if (this.currentHealth < this.maxHealth * 0.75) {
      const multiplier = Math.floor(
        (this.currentHealth * 100) / this.maxHealth / 10
      );
      console.log(multiplier * 10);
      // actions.heal = 10;
    }

    console.log(enemy);
    return Object.values(ACTIONS_ENUM)[rdm];
  }
}
