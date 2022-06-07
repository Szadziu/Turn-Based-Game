import wizardImg from '@/assets/heroes/wizard.png';
import vikingImg from '@/assets/heroes/viking.png';
import rogueImg from '@/assets/heroes/rogue.png';
import knightImg from '@/assets/heroes/knight.png';
import archerImg from '@/assets/heroes/archer.png';
import druidImg from '@/assets/heroes/druid.png';

import gnomeImg from '@/assets/monsters/gnome.png';
import goblinImg from '@/assets/monsters/goblin.png';
import impImg from '@/assets/monsters/imp.png';
import ogreImg from '@/assets/monsters/ogre.png';
import trollImg from '@/assets/monsters/troll.png';
import dragonImg from '@/assets/monsters/dragon.png';
import giantImg from '@/assets/monsters/giant.png';
import reaperImg from '@/assets/monsters/reaper.png';
import vampireImg from '@/assets/monsters/vampire.png';
import harpyImg from '@/assets/monsters/harpy.png';

export const Heroes = [
  {
    id: '_h1',
    name: 'viking',
    health: 70,
    combatEfficiency: 10,
    magicKnowledge: 10,
    img: vikingImg,
  },
  {
    id: '_h2',
    name: 'wizard',
    health: 30,
    combatEfficiency: 2,
    magicKnowledge: 18,
    img: wizardImg,
  },
  {
    id: '_h3',
    name: 'rogue',
    health: 50,
    combatEfficiency: 14,
    magicKnowledge: 4,
    img: rogueImg,
  },
  {
    id: '_h4',
    name: 'knight',
    health: 60,
    combatEfficiency: 13,
    magicKnowledge: 8,
    img: knightImg,
  },
  {
    id: '_h5',
    name: 'archer',
    health: 40,
    combatEfficiency: 16,
    magicKnowledge: 3,
    img: archerImg,
  },
  {
    id: '_h6',
    name: 'druid',
    health: 55,
    combatEfficiency: 10,
    magicKnowledge: 8,
    img: druidImg,
  },
];

export const Monsters = [
  {
    id: '_m1',
    name: 'gnome',
    level: 1,
    health: 15,
    combatEfficiency: 10,
    magicKnowledge: 2,
    img: gnomeImg,
  },
  {
    id: '_m2',
    name: 'goblin',
    level: 1,
    health: 18,
    combatEfficiency: 4,
    magicKnowledge: 4,
    img: goblinImg,
  },
  {
    id: '_m3',
    name: 'imp',
    level: 1,
    health: 10,
    combatEfficiency: 7,
    magicKnowledge: 1,
    img: impImg,
  },
  {
    id: '_m4',
    name: 'ogre',
    level: 3,
    health: 30,
    combatEfficiency: 3,
    magicKnowledge: 2,
    img: ogreImg,
  },
  {
    id: '_m5',
    name: 'troll',
    level: 1,
    health: 35,
    combatEfficiency: 13,
    magicKnowledge: 11,
    img: trollImg,
  },
  {
    id: '_m6',
    name: 'dragon',
    level: 4,
    health: 50,
    combatEfficiency: 15,
    magicKnowledge: 15,
    img: dragonImg,
  },
  {
    id: '_m7',
    name: 'giant',
    level: 5,
    health: 40,
    combatEfficiency: 30,
    magicKnowledge: 1,
    img: giantImg,
  },
  {
    id: '_m8',
    name: 'reaper',
    level: 2,
    health: 22,
    combatEfficiency: 8,
    magicKnowledge: 25,
    img: reaperImg,
  },
  {
    id: '_m9',
    name: 'harpy',
    level: 3,
    health: 36,
    combatEfficiency: 12,
    magicKnowledge: 12,
    img: harpyImg,
  },
  {
    id: '_m10',
    name: 'vampire',
    level: 4,
    health: 66,
    combatEfficiency: 9,
    magicKnowledge: 11,
    img: vampireImg,
  },
];
