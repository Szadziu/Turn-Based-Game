import { Entity } from './Entity';
import { ACTIONS_ENUM } from './cons/constants';
import { getRandomInt } from './helpers/helpers';

export class Monster extends Entity {
    constructor({ level, ...rest }) {
        super({ ...rest });

        this.level = level;
    }

    drawRandomAction(enemy) {
        const isHealingOnCooldown = !!this.getCooldown('healing');

        const getMainSkill = () => {
            if (enemy.dualSpecialization) {
                return this.mainSkill();
            } else if (enemy.combatEfficiency > enemy.magicKnowledge) {
                return ACTIONS_ENUM.MAGIC;
            } else {
                return ACTIONS_ENUM.MELEE;
            }
        };

        if (isHealingOnCooldown) {
            return getMainSkill();
        }
        const hp = Math.floor((this.currentHealth / this.maxHealth) * 100);
        const actions = {
            [getMainSkill()]: 100,
            [ACTIONS_ENUM.HEAL]: Math.max(
                0,
                10 + Math.floor((75 - hp) / 10) * 10
            ),
        };

        if (enemy.currentHealth <= this.getHighestSpec()) {
            actions.HEAL = actions.HEAL / 5;
        }

        const weighted = [];

        for (const [key, value] of Object.entries(actions)) {
            for (let index = 0; index < value; index++) {
                weighted.push(key);
            }
        }

        const index = getRandomInt(0, weighted.length - 1);

        return weighted[index];
    }
}
