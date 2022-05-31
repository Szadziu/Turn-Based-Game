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
    if (enemy.currentHealth > 0) {
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
  }

  takeDamage(amount, type = ATTACK_TYPES_ENUM.MELEE) {
    this.currentHealth -= amount;
    console.log(
      `uderzono za ${amount} pkt. ${
        type === 'MELEE' ? 'wręcz' : 'zaklęciem'
      }, przeciwnikowi pozostało ${this.currentHealth} pkt. życia`
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
