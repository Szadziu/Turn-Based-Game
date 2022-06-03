import { getRandomInt } from './helpers';

export class Entity {
  constructor({ name, health, combatEfficiency, magicKnowledge, img }) {
    this.name = name;
    this.currentHealth = health;
    this.combatEfficiency = combatEfficiency;
    this.magicKnowledge = magicKnowledge;
    this.image = img;

    this.maxHealth = health;
    this.healingCooldown = 2;
  }

  executeAttack() {
    const powerOfAttack = getRandomInt(50, 150);
    const hit = Math.round((powerOfAttack * this.combatEfficiency) / 100);
    this.calcCooldowns();

    console.log(`hit for ${hit}`);
    return hit;
  }

  castSpell() {
    const powerOfMagic = getRandomInt(30, 180);
    const spell = Math.round((powerOfMagic * this.magicKnowledge) / 100);
    this.calcCooldowns();

    console.log(`cast a spell for ${spell}`);
    return spell;
  }

  takeDamage(amount) {
    this.currentHealth -= amount;
  }

  healInjures(value) {
    if (value) {
      if (this.currentHealth + value > this.maxHealth) {
        this.currentHealth = this.maxHealth;
      } else {
        this.currentHealth += value;
      }
      console.log('%chealed for', 'color: green', value);
    } else {
      const powerOfHealing = getRandomInt(10, 50);
      const healing = Math.round((powerOfHealing * this.maxHealth) / 100);

      if (this.currentHealth + healing > this.maxHealth) {
        this.currentHealth = this.maxHealth;
      } else {
        this.currentHealth += healing;
      }
      this.calcCooldowns();
      this.healingCooldown = 2;
      console.log('%chealed for', 'color: green', healing);
    }
  }

  isDead() {
    return this.currentHealth <= 0;
  }

  getHighestStat(check) {
    if (this.combatEfficiency > this.magicKnowledge) {
      return this.combatEfficiency;
    } else if (this.combatEfficiency < this.magicKnowledge) {
      return this.magicKnowledge;
    } else {
      return check.combatEfficiency > check.magicKnowledge
        ? check.combatEfficiency
        : check.magicKnowledge;
    }
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
