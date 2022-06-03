import wizardImg from './assets/heroes/wizard.png';
import vikingImg from './assets/heroes/viking.png';
import rogueImg from './assets/heroes/rogue.png';

import gnomeImg from './assets/monsters/gnome.png';
import goblinImg from './assets/monsters/goblin.png';
import impImg from './assets/monsters/imp.png';
import ogreImg from './assets/monsters/ogre.png';
import trollImg from './assets/monsters/troll.png';
import dragonImg from './assets/monsters/dragon.png';

export const Heroes = [
  {
    id: '_h1',
    name: 'viking',
    health: 70,
    combatEfficiency: 12,
    magicKnowledge: 5,
    img: vikingImg,
  },
  {
    id: '_h2',
    name: 'wizard',
    health: 40,
    combatEfficiency: 2,
    magicKnowledge: 14,
    img: wizardImg,
  },
  {
    id: '_h3',
    name: 'rogue',
    health: 50,
    combatEfficiency: 11,
    magicKnowledge: 7,
    img: rogueImg,
  },
];

export const Monsters = [
  {
    name: 'gnome',
    level: 1,
    health: 15,
    combatEfficiency: 10,
    magicKnowledge: 2,
    img: gnomeImg,
  },
  {
    name: 'goblin',
    level: 1,
    health: 18,
    combatEfficiency: 4,
    magicKnowledge: 4,
    img: goblinImg,
  },
  {
    name: 'imp',
    level: 1,
    health: 10,
    combatEfficiency: 7,
    magicKnowledge: 1,
    img: impImg,
  },
  {
    name: 'ogre',
    level: 1,
    health: 30,
    combatEfficiency: 3,
    magicKnowledge: 2,
    img: ogreImg,
  },
  {
    name: 'troll',
    level: 1,
    health: 35,
    combatEfficiency: 13,
    magicKnowledge: 11,
    img: trollImg,
  },
  {
    name: 'dragon',
    level: 1,
    health: 100,
    combatEfficiency: 20,
    magicKnowledge: 15,
    img: dragonImg,
  },
];
