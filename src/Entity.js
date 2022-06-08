import { getRandomInt } from './helpers/helpers';

export class Entity {
  constructor({ name, health, combatEfficiency, magicKnowledge, img }) {
    this.name = name;
    this.currentHealth = health;
    this.combatEfficiency = combatEfficiency;
    this.magicKnowledge = magicKnowledge;
    this.image = img;

    this.maxHealth = health;

    this.cooldows = {
      healing: 2,
    };

    this.animationsFlags = {
      blocked: false,
      smallHit: false,
      bigHit: false,
      castSpell: false,
      heal: false,
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

  takeDamage(amount, type) {
    this.currentHealth -= amount;

    this.setAnimationsFlag(type, true);
    setTimeout(() => this.setAnimationsFlag(type, false), 1000);
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

  setAnimationsFlag(name, value = false) {
    this.animationsFlags[name] = value;
  }

  getAnimationsFlag(name) {
    return this.animationsFlags[name];
  }

  getCooldown(name) {
    return this.cooldows[name];
  }

  isAttackBlocked(type) {
    const chance = this.getAttribute(type) / 4;
    const probability = getRandomInt(0, 100 + chance);

    if (probability < chance) {
      // this.addActionToLog(`${this.name} blocked attack`);
      console.log(`block chance ${chance}%`);

      this.setAnimationsFlag('blocked', true);
      setTimeout(() => this.setAnimationsFlag('blocked', false), 1000);

      return true;
    } else {
      return false;
    }
  }
}
