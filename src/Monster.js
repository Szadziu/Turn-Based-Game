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
    const isHealingOnCooldown =
      getRandomInt(0, !this.getCooldown('healing') ? 3 : 2) < 2;

    const x = () => {
      if (enemy.dualSpecialization) {
        return this.mainSkill();
      } else if (enemy.combatEfficiency > enemy.magicKnowledge) {
        return ACTIONS_ENUM.MAGIC;
      } else {
        return ACTIONS_ENUM.MELEE;
      }
    };

    // const y = () => {
    //   return 10 *

    //   // 10 + Math.floor(((75 - obecny % życia) / 100) * 10)

    //   if(this.currentHealth < this.maxHealth * 0.76 && !isHealingOnCooldown) {
    //     return 30;
    //   }
    // }

    console.log(isHealingOnCooldown);
    console.log(
      `MONSTER HEALTH: ${Math.floor(
        (this.currentHealth / this.maxHealth) * 100
      )} %`
    );
    const h = Math.floor((this.currentHealth / this.maxHealth) * 100);

    console.log(Math.max(0, 10 + Math.floor((75 - h) / 10) * 10));
    const actions = {
      [x()]: 100,
      [ACTIONS_ENUM.HEAL]: Math.max(
        0,
        10 +
          Math.floor(
            ((75 - Math.floor((this.currentHealth / this.maxHealth) * 100)) /
              100) *
              10
          )
      ),
    };

    // if () {
    // const multiplier = Math.floor(
    //   (this.currentHealth * 100) / this.maxHealth / 10
    // );
    // console.log(multiplier * 10);
    // }
    // actions.heal = 30;

    return chance.weighted(Object.keys(actions), Object.values(actions));

    //if !isHealingOnCooldown -> get

    // hero nie monster
    //  {attack: 20, spell: 30}

    // hero: viking
    // combat: 10 magic: 8

    // monster: goblin
    // combat: 8 magic: 12

    // if (isHealingOnCooldown) {
    //   action =
    //     this.mainSkill() === 'combatEfficiency'
    //       ? ACTIONS_ENUM.MELEE
    //       : ACTIONS_ENUM.MAGIC;

    //   if (this.dualSpecialization) {
    //     action =
    //       enemy.weakSkill() === 'combatEfficiency'
    //         ? ACTIONS_ENUM.MELEE
    //         : ACTIONS_ENUM.MAGIC;
    //   }
    // } else {
    //   action = ACTIONS_ENUM.HEAL;
    // }
    // return random;
  }
}
