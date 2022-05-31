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
    console.log(type);
    this.currentHealth -= amount;
    console.log(
      `uderzono za ${amount} pkt. pozostało ${this.currentHealth} pkt. życia`
    );
  }

  healInjures(amount) {
    this.healingCooldown = 2;
    if (this.currentHealth + amount > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    } else {
      this.currentHealth += amount;
    }
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
    console.log(
      `obecny cooldown na leczenie wynosi: ${this.healingCooldown} tury`
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
