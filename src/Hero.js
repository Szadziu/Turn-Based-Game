import { Entity } from './Entity';

export class Hero extends Entity {
  constructor(props) {
    super(props);
  }
  specialAttack() {
    console.log('special atak');
  }
}
