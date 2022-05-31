import { Entity } from './Entity';

export class Hero extends Entity {
  constructor(props) {
    super(props);

    this.specialAttackCooldown = 6;
  }
  specialAttack() {
    console.log('special atak');
    this.endTurn();
    this.specialAttackCooldown = 6;
  }
}
