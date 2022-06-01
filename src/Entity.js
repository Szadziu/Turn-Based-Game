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

  executeAttack() {
    const powerOfAttack = getRandomNumFromRange(50, 150);
    this.calcCooldowns();
    console.log(`hit for ${powerOfAttack * this.combatEfficiency}`);
    return powerOfAttack * this.combatEfficiency;
  }

  castSpell() {
    const powerOfMagic = getRandomNumFromRange(30, 180);
    this.calcCooldowns();
    console.log(`cast a spell for ${powerOfMagic * this.magicKnowledge}`);
    return powerOfMagic * this.magicKnowledge;
  }

  takeDamage(amount) {
    this.currentHealth -= amount;
  }

  healInjures(amount) {
    if (this.currentHealth + amount > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    } else {
      this.currentHealth += amount;
    }
    this.calcCooldowns();
    this.healingCooldown = 2;
    console.log('%chealed', 'color: green');
  }

  isDead() {
    return this.currentHealth <= 0;
  }

  calcCooldowns() {
    if (this.healingCooldown > 0) {
      this.healingCooldown--;
    }
    if (this.specialAttackCooldown > 0) {
      this.specialAttackCooldown--;
    }
  }
}
