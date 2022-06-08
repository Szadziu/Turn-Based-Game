import { getRandomInt } from './helpers/helpers';

export class Entity {
  constructor({ name, health, combatEfficiency, magicKnowledge, img }) {
    this.name = name;
    this.currentHealth = health;
    this.combatEfficiency = combatEfficiency;
    this.magicKnowledge = magicKnowledge;
    this.image = img;
    this.blocked = false;

    this.maxHealth = health;

    this.cooldows = {
      healing: 2,
    };
  }

  executeAttack() {
    const powerOfAttack = getRandomInt(50, 150);
    const hit = Math.round((powerOfAttack * this.combatEfficiency) / 100);

    return hit;
  }

  castSpell() {
    const powerOfMagic = getRandomInt(30, 180);
    const spell = Math.round((powerOfMagic * this.magicKnowledge) / 100);

    return spell;
  }

  healSelf() {
    const powerOfHealing = getRandomInt(10, 50);
    const healing = Math.round((powerOfHealing * this.maxHealth) / 100);

    if (this.currentHealth + healing > this.maxHealth) {
      return this.maxHealth;
    } else {
      return this.currentHealth + healing;
    }
  }

  setAttribute(attr, value) {
    this[attr] = value;
  }

  getAttribute(attr) {
    return this[attr];
  }

  setHealth(value) {
    this.currentHealth = value;
  }

  takeDamage(amount) {
    this.currentHealth -= amount;
  }

  isDead() {
    return this.currentHealth <= 0;
  }

  getHighestSpec() {
    return Math.max(this.combatEfficiency, this.magicKnowledge);
  }

  setCooldown(name, value = 0) {
    this.cooldows[name] = value;
  }

  getCooldown(name) {
    return this.cooldows[name];
  }

  blockChance(type) {
    return this.getAttribute(type) / 4;
  }
}
