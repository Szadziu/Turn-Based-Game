import { ACTIONS_ENUM } from './cons/constants';
import { getRandomInt } from './helpers/helpers';

export class Entity {
  constructor({
    id,
    name,
    health,
    combatEfficiency,
    magicKnowledge,
    img,
    sounds,
  }) {
    this.id = id;
    this.name = name;
    this.currentHealth = health;
    this.combatEfficiency = combatEfficiency;
    this.magicKnowledge = magicKnowledge;
    this.image = img;
    this.sounds = sounds;
    this.dualSpecialization = this.combatEfficiency === this.magicKnowledge;

    this.maxHealth = health;

    this.cooldows = {
      healing: 2,
    };

    this.animationsFlags = {
      blocked: false,
      smallHit: false,
      bigHit: false,
      heal: false,
      dead: false,
    };
  }

  playSound(audio) {
    new Audio(this.sounds[audio]).play();
  }

  animationsEnded() {
    return new Promise((resolve) => {
      const check = () => {
        let flag = true;

        for (const anim in this.animationsFlags) {
          if (Object.hasOwnProperty.call(this.animationsFlags, anim)) {
            if (this.animationsFlags[anim]) {
              flag = false;
              break;
            }
          }
        }

        if (flag) {
          resolve();
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  executeAttack() {
    const powerOfAttack = getRandomInt(50, 150);
    const hit = Math.round((powerOfAttack * this.combatEfficiency) / 100);

    this.playSound('attack');

    return hit;
  }

  castSpell() {
    const powerOfMagic = getRandomInt(30, 180);
    const spell = Math.round((powerOfMagic * this.magicKnowledge) / 100);

    this.playSound('spell');

    return spell;
  }

  healSelf() {
    const powerOfHealing = getRandomInt(10, 50);
    const healing = Math.round((powerOfHealing * this.maxHealth) / 100);

    this.cooldows.healing = 3;

    this.setAnimationsFlag('heal', true);
    setTimeout(() => this.setAnimationsFlag('heal', false), 1000);

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

  mainSkill() {
    return this.combatEfficiency > this.magicKnowledge
      ? ACTIONS_ENUM.MELEE
      : ACTIONS_ENUM.MAGIC;
  }

  setHealth(value) {
    this.currentHealth = value;
  }

  async takeDamage(amount) {
    this.currentHealth -= amount;

    if (amount > this.maxHealth * 0.4) {
      this.setAnimationsFlag('bigHit', true);
      setTimeout(() => this.setAnimationsFlag('bigHit', false), 1000);
    } else {
      this.setAnimationsFlag('smallHit', true);
      setTimeout(() => this.setAnimationsFlag('smallHit', false), 1000);
    }

    await this.animationsEnded();
  }

  isDead() {
    if (this.currentHealth <= 0) {
      this.setAnimationsFlag('dead', true);
      setTimeout(() => this.setAnimationsFlag('dead', false), 1000);
    }
    return this.currentHealth <= 0;
  }

  getHighestSpec() {
    return Math.max(this.combatEfficiency, this.magicKnowledge);
  }

  setCooldown(name, value = 0) {
    if (value < 0) return;
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
    const probability = getRandomInt(0, 100);

    if (probability <= chance) {
      this.setAnimationsFlag('blocked', true);
      setTimeout(() => this.setAnimationsFlag('blocked', false), 1000);

      return true;
    } else {
      return false;
    }
  }
}
