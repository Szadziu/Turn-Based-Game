export class Entity {
  constructor({ name, health, combatEfficiency, magicKnowledge }) {
    this.name = name;
    this.health = health;
    this.combatEfficiency = combatEfficiency;
    this.magicKnowledge = magicKnowledge;
  }

  // get name() {
  //   return this.name;
  // }

  // set name(value) {
  //   this.name = value.toLowerCase()
  // }

  // _isTypeofEntity(x) {
  //   if (!(x instanceof Entity)) {
  //     throw new Error('Invalid class passed, expected Entity');
  //   }
  // }

  // castSpell(enemy) {
  //   // type guard
  //   this._isTypeofEntity(enemy);

  //   enemy.takeDamage(this.magicKnowledge);
  // }
  executeAttack(enemy, type) {
    // type guard
    // this._isTypeofEntity(enemy);

    if (!type) {
      // max - monster
      if (enemy.combatEfficiency > enemy.magicKnowledge) {
        // spell?
      } else {
        // combat?
      }
    } else if (type === ATTACK_TYPES_ENUM.MAGIC) {
      //magic
      enemy.takeDamage(this.magicKnowledge);
    } else if (type === ATTACK_TYPES_ENUM.MELEE) {
      // melee
      enemy.takeDamage(this.combatEfficiency);
    }
  }

  takeDamage(amount, type = ATTACK_TYPES_ENUM.MELEE) {
    console.log(type);
    this.health -= amount;
    console.log(
      `uderzono za ${amount} pkt. pozostało ${this.health} pkt. życia`
    );
  }
}

const ATTACK_TYPES_ENUM = {
  MELEE: 'MELEE',
  MAGIC: 'MAGIC',
};
