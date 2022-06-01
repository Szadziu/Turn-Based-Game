import { getRandomNumFromRange } from './helpers';

export class Entity {
  constructor({ name, health, combatEfficiency, magicKnowledge }) {
    this.name = name;
    this.currentHealth = health;
    this.combatEfficiency = combatEfficiency;
    this.magicKnowledge = magicKnowledge;

    this.maxHealth = health;
    this.healingCooldown = 2;
  }

  executeAttack(enemy, type) {
    const powerOfAttack = getRandomNumFromRange(50, 150);
    const powerOfMagic = getRandomNumFromRange(30, 180);

    // const powerOfAttack = +(Math.random() * (1 - 0.5) + 0.5).toFixed(2);
    // const powerOfMagic = +(Math.random() * (1.8 - 0.3) + 0.3).toFixed(2);

    console.log(powerOfAttack, powerOfMagic);

    if (type === ATTACK_TYPES_ENUM.MAGIC) {
      enemy.takeDamage(this.magicKnowledge);
    } else if (type === ATTACK_TYPES_ENUM.MELEE) {
      enemy.takeDamage(this.combatEfficiency);
    }
  }
  // executeAttack(enemy, type) {
  //   const powerOfAttack = +(Math.random() * (1 - 0.5) + 0.5).toFixed(2);
  //   const powerOfMagic = +(Math.random() * (1.8 - 0.3) + 0.3).toFixed(2);

  //   console.log(powerOfAttack, powerOfMagic);

  //   if (enemy.currentHealth > 0) {
  //     if (!type) {
  //       if (enemy.combatEfficiency > enemy.magicKnowledge) {
  //         enemy.takeDamage(this.magicKnowledge);
  //       } else {
  //         enemy.takeDamage(this.combatEfficiency);
  //       }
  //     } else if (type === ATTACK_TYPES_ENUM.MAGIC) {
  //       enemy.takeDamage(this.magicKnowledge);
  //     } else if (type === ATTACK_TYPES_ENUM.MELEE) {
  //       enemy.takeDamage(this.combatEfficiency);
  //     }
  //   }
  // }

  takeDamage(amount, type = ATTACK_TYPES_ENUM.MELEE) {
    this.currentHealth -= amount;
    console.log(
      `uderzono za ${amount} pkt. ${
        type === 'MELEE' ? 'wręcz' : 'zaklęciem'
      } przeciwnikowi pozostało ${this.currentHealth} pkt. życia`
    );
  }

  healInjures(amount) {
    if (this.currentHealth + amount > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    } else {
      this.currentHealth += amount;
    }
    this.endTurn();
    this.healingCooldown = 2;
    console.log(
      `wyleczono za ${this.maxHealth - this.currentHealth} pkt. pozostało ${
        this.currentHealth
      } pkt. życia`
    );
  }

  isDead() {
    return this.currentHealth <= 0;
  }

  endTurn() {
    if (this.healingCooldown > 0) {
      this.healingCooldown--;
    }
    if (this.specialAttackCooldown > 0) {
      this.specialAttackCooldown--;
    }
    console.log(
      `obecny cooldown na leczenie wynosi: ${this.healingCooldown} tury`
    );
    console.log(
      `obecny cooldown na atak specjalny wynosi: ${this.specialAttackCooldown} tury`
    );
  }
}

const ATTACK_TYPES_ENUM = {
  MELEE: 'MELEE',
  MAGIC: 'MAGIC',
};

//* guard instance
// _isTypeofEntity(x) {
//   if (!(x instanceof Entity)) {
//     throw new Error('Invalid class passed, expected Entity');
//   }
// }
