import { Entity } from './Entity';

export class Monster extends Entity {
  constructor(level, ...rest) {
    super(...rest);
    this.level = level;
  }
}
