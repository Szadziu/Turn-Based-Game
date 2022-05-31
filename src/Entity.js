export class Entity {
  constructor({ name, health, combatEfficiency, magicKnowledge }) {
    this.name = name;
    this.currentHealth = health;
    this.maxHealth = health;
    this.combatEfficiency = combatEfficiency;
    this.magicKnowledge = magicKnowledge;
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
    if (this.currentHealth + amount > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    } else {
      this.currentHealth += amount;
    }
    console.log(
      `wyleczono za ${amount} pkt. pozostało ${this.currentHealth} pkt. życia`
    );
  }

  isDead() {
    return this.currentHealth <= 0;
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