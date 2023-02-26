(function(){"use strict";var e={3998:function(e,t,s){s(6992),s(8674),s(9601),s(7727);var a=s(8935),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[e.isGame?e._e():s("div",{staticClass:"menu__choose-hero animate__animated animate__slideInDown"},e._l(e.heroesPool,(function(t,a){return s("FancyButton",{key:a,class:"hero--"+t.name,on:{click:function(t){return e.startGame(a+1)}}},[e._v(" "+e._s(t.name)+" ")])})),1),s("div",{staticClass:"battle__container"},[e.isGame?s("div",{staticClass:"battle__characters-container"},[s("CharacterCard",{attrs:{char:e.currentHero}}),s("CharacterCard",{attrs:{char:e.currentMonster}})],1):e._e(),e.isGame?s("div",{staticClass:"battle__actions-container"},[s("div",{staticClass:"battle__hero-actions"},[s("FancyButton",{class:"character--attack",attrs:{disabled:e.currentHero.getAnimationsFlag("blocked")||e.currentMonster.getAnimationsFlag("blocked")},on:{click:function(t){return e.heroTurn(e.ACTIONS_ENUM.MELEE)}}},[e._v(" attack ")]),s("FancyButton",{class:"character--spell",attrs:{disabled:e.currentHero.getAnimationsFlag("blocked")||e.currentMonster.getAnimationsFlag("blocked")},on:{click:function(t){return e.heroTurn(e.ACTIONS_ENUM.MAGIC)}}},[e._v(" cast spell ")]),s("FancyButton",{class:"character--heal",attrs:{disabled:e.currentHero.getCooldown("healing")>0||e.currentHero.getAnimationsFlag("blocked")||e.currentMonster.getAnimationsFlag("blocked")},on:{click:function(t){return e.heroTurn(e.ACTIONS_ENUM.HEAL)}}},[e._v(" heal "+e._s(e.currentHero.getCooldown("healing")?"("+e.currentHero.getCooldown("healing")+")":"")+" ")]),s("FancyButton",{class:"character--special",attrs:{disabled:e.currentHero.getCooldown("special")>0||e.currentHero.getAnimationsFlag("blocked")||e.currentMonster.getAnimationsFlag("blocked")},on:{click:function(t){return e.heroTurn("SPECIAL")}}},[e._v(" special attack "+e._s(e.currentHero.getCooldown("special")?"("+e.currentHero.getCooldown("special")+")":"")+" ")])],1),s("ul",{staticClass:"battle__actions-list"},e._l(e.lastActions,(function(t,a){return s("li",{key:a,staticClass:"animate__animated animate__fadeInUp"},[e._v(" "+e._s(t)+" ")])})),0),e.isGame?s("FancyButton",{staticClass:"skills",attrs:{disabled:!e.availableCredits},on:{click:function(t){return e.toggleCreditsManager()}}},[e._v(" "+e._s("skill points: "+e.availableCredits))]):e._e()],1):e._e(),e.isCreditsManagerOpen?s("div",{staticClass:"credits-manager"},[s("a",{staticClass:"icons-link",attrs:{href:"https://www.flaticon.com",target:"_blank"}},[e._v("All icons created by authors from Flaticon")]),s("FancyButton",{staticClass:"close",on:{click:function(t){return e.toggleCreditsManager()}}},[e._v(" X ")]),s("p",{staticClass:"credits-manager__feature credits-manager__title"},[e._v("Available credits: "+e._s(e.availableCredits)+" points")]),e._m(0),s("div",{staticClass:"credits-manager__feature"},[s("FancyButton",{staticClass:"update-stats",on:{click:function(t){return e.updateHeroStats("combatEfficiency")}}},[e._v(" +1 ")]),s("FancyButton",{staticClass:"update-stats",on:{click:function(t){return e.updateHeroStats("magicKnowledge")}}},[e._v(" +1 ")]),s("FancyButton",{staticClass:"update-stats",on:{click:function(t){return e.updateHeroStats("currentHealth")}}},[e._v(" +3 ")])],1)],1):e._e()]),!e.isGame&&e.currentHero?s("div",{staticClass:"battle__results animate__animated animate__rubberBand"},[e._v(" Results: Defeated monsters: "+e._s(e.defeatedMonsters)+" "),e.currentHero.currentHealth>0?s("p",[e._v("Congratulations you defeated all monsters !")]):s("p",[e._v("Oh no... You lose. Maybe try again ?")])]):e._e()])},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"credits-manager__feature"},[s("span",{staticClass:"credits-manager__feature-item"},[e._v(" Combat Efficiency ")]),s("span",{staticClass:"credits-manager__feature-item"},[e._v(" Magic Knowledge ")]),s("span",{staticClass:"credits-manager__feature-item"},[e._v(" Maximum Health ")])])}],i=s(7906),o=s(6198),c=(s(7327),s(1539),s(2222),s(3371),Object.freeze({MELEE:"MELEE",MAGIC:"MAGIC",HEAL:"HEAL",SPECIAL:"SPECIAL"})),l=[{id:"_h1",name:"viking",health:70,combatEfficiency:10,magicKnowledge:10,img:"assets/heroes/viking.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/dead.wav",block:"assets/sounds/block.wav"}},{id:"_h2",name:"wizard",health:30,combatEfficiency:2,magicKnowledge:18,img:"assets/heroes/wizard.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/dead.wav",block:"assets/sounds/block.wav"}},{id:"_h3",name:"rogue",health:50,combatEfficiency:14,magicKnowledge:4,img:"assets/heroes/rogue.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/dead.wav",block:"assets/sounds/block.wav"}},{id:"_h4",name:"knight",health:60,combatEfficiency:13,magicKnowledge:8,img:"assets/heroes/knight.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/dead.wav",block:"assets/sounds/block.wav"}},{id:"_h5",name:"archer",health:40,combatEfficiency:16,magicKnowledge:3,img:"assets/heroes/archer.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/dead.wav",block:"assets/sounds/block.wav"}},{id:"_h6",name:"druid",health:55,combatEfficiency:10,magicKnowledge:8,img:"assets/heroes/druid.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/dead.wav",block:"assets/sounds/block.wav"}}],u=[{id:"_m1",name:"gnome",level:1,health:15,combatEfficiency:10,magicKnowledge:2,img:"assets/monsters/gnome.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m2",name:"goblin",level:1,health:18,combatEfficiency:4,magicKnowledge:4,img:"assets/monsters/goblin.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m3",name:"imp",level:1,health:10,combatEfficiency:7,magicKnowledge:1,img:"assets/monsters/imp.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m4",name:"ogre",level:2,health:30,combatEfficiency:3,magicKnowledge:2,img:"assets/monsters/ogre.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m5",name:"troll",level:2,health:35,combatEfficiency:13,magicKnowledge:11,img:"assets/monsters/troll.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m6",name:"dragon",level:2,health:50,combatEfficiency:15,magicKnowledge:15,img:"assets/monsters/dragon.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m7",name:"giant",level:3,health:40,combatEfficiency:30,magicKnowledge:1,img:"assets/monsters/giant.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m8",name:"reaper",level:3,health:22,combatEfficiency:8,magicKnowledge:25,img:"assets/monsters/reaper.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m9",name:"harpy",level:3,health:36,combatEfficiency:12,magicKnowledge:12,img:"assets/monsters/harpy.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}},{id:"_m10",name:"vampire",level:4,health:66,combatEfficiency:9,magicKnowledge:11,img:"assets/monsters/vampire.png",sounds:{attack:"assets/sounds/sword.wav",spell:"assets/sounds/spell.wav",dead:"assets/sounds/monsterDying.wav",block:"assets/sounds/block.wav"}}],d=s(6133),h=s(2751),m=s(796),g=s(2122);s(8309);function v(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,s=t-e,a=Math.random();return a=Math.floor(a*s),a+=e,a}var f=function(){function e(t){var s=t.id,a=t.name,n=t.health,r=t.combatEfficiency,i=t.magicKnowledge,o=t.img,c=t.sounds;(0,d.Z)(this,e),this.id=s,this.name=a,this.currentHealth=n,this.combatEfficiency=r,this.magicKnowledge=i,this.image=o,this.sounds=c,this.dualSpecialization=this.combatEfficiency===this.magicKnowledge,this.maxHealth=n,this.cooldows={healing:2},this.animationsFlags={blocked:!1,smallHit:!1,bigHit:!1,heal:!1,dead:!1}}return(0,h.Z)(e,[{key:"playSound",value:function(e){new Audio(this.sounds[e]).play()}},{key:"animationsEnded",value:function(){var e=this;return new Promise((function(t){var s=function s(){var a=!0;for(var n in e.animationsFlags)if(Object.hasOwnProperty.call(e.animationsFlags,n)&&e.animationsFlags[n]){a=!1;break}a?t():setTimeout(s,100)};s()}))}},{key:"executeAttack",value:function(){var e=v(50,150),t=Math.round(e*this.combatEfficiency/100);return this.playSound("attack"),t}},{key:"castSpell",value:function(){var e=v(30,180),t=Math.round(e*this.magicKnowledge/100);return this.playSound("spell"),t}},{key:"healSelf",value:function(){var e=this,t=v(10,50),s=Math.round(t*this.maxHealth/100);return this.cooldows.healing=3,this.setAnimationsFlag("heal",!0),setTimeout((function(){return e.setAnimationsFlag("heal",!1)}),1e3),this.currentHealth+s>this.maxHealth?this.maxHealth:this.currentHealth+s}},{key:"setAttribute",value:function(e,t){this[e]=t}},{key:"getAttribute",value:function(e){return this[e]}},{key:"mainSkill",value:function(){return this.combatEfficiency>this.magicKnowledge?c.MELEE:c.MAGIC}},{key:"setHealth",value:function(e){this.currentHealth=e}},{key:"takeDamage",value:function(){var e=(0,o.Z)((0,i.Z)().mark((function e(t){var s=this;return(0,i.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.currentHealth-=t,t>.4*this.maxHealth?(this.setAnimationsFlag("bigHit",!0),setTimeout((function(){return s.setAnimationsFlag("bigHit",!1)}),1e3)):(this.setAnimationsFlag("smallHit",!0),setTimeout((function(){return s.setAnimationsFlag("smallHit",!1)}),1e3)),e.next=4,this.animationsEnded();case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"isDead",value:function(){var e=this;return this.currentHealth<=0&&(this.setAnimationsFlag("dead",!0),setTimeout((function(){return e.setAnimationsFlag("dead",!1)}),1e3)),this.currentHealth<=0}},{key:"getHighestSpec",value:function(){return Math.max(this.combatEfficiency,this.magicKnowledge)}},{key:"setCooldown",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;t<0||(this.cooldows[e]=t)}},{key:"setAnimationsFlag",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.animationsFlags[e]=t}},{key:"getAnimationsFlag",value:function(e){return this.animationsFlags[e]}},{key:"getCooldown",value:function(e){return this.cooldows[e]}},{key:"isAttackBlocked",value:function(e){var t=this,s=this.getAttribute(e)/4,a=v(0,100);return a<=s&&(this.setAnimationsFlag("blocked",!0),setTimeout((function(){return t.setAnimationsFlag("blocked",!1)}),1e3),!0)}}]),e}(),p=function(e){(0,m.Z)(s,e);var t=(0,g.Z)(s);function s(e){var a;return(0,d.Z)(this,s),a=t.call(this,e),a.setCooldown("special",6),a}return(0,h.Z)(s,[{key:"specialAttack",value:function(){var e=v(100,300),t=Math.round(e*this.getHighestSpec()/100);return this.playSound("attack"),this.cooldows.special=7,t}},{key:"regenerateInjures",value:function(){this.currentHealth+.5*this.maxHealth>this.maxHealth?this.setHealth(this.maxHealth):this.setHealth(this.currentHealth+.5*this.maxHealth)}}]),s}(f),w=s(3571),_=s(3796),b=s(4367),k=s(3274),y=(s(9720),["level"]),H=function(e){(0,m.Z)(s,e);var t=(0,g.Z)(s);function s(e){var a,n=e.level,r=(0,k.Z)(e,y);return(0,d.Z)(this,s),a=t.call(this,(0,b.Z)({},r)),a.level=n,a}return(0,h.Z)(s,[{key:"drawRandomAction",value:function(e){var t,s=this,a=!!this.getCooldown("healing"),n=function(){return e.dualSpecialization?s.mainSkill():e.combatEfficiency>e.magicKnowledge?c.MAGIC:c.MELEE};if(a)return n();var r=Math.floor(this.currentHealth/this.maxHealth*100),i=(t={},(0,_.Z)(t,n(),100),(0,_.Z)(t,c.HEAL,Math.max(0,10+10*Math.floor((75-r)/10))),t);e.currentHealth<=this.getHighestSpec()&&(i.HEAL=i.HEAL/5);for(var o=[],l=0,u=Object.entries(i);l<u.length;l++)for(var d=(0,w.Z)(u[l],2),h=d[0],m=d[1],g=0;g<m;g++)o.push(h);var f=v(0,o.length-1);return o[f]}}]),s}(f),C=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("transition",{attrs:{name:"slide",mode:"out-in",appear:""}},[s("div",{staticClass:"card animate__animated",class:{animate__headShake:e.char.getAnimationsFlag("smallHit"),animate__wobble:e.char.getAnimationsFlag("bigHit"),animate__slideOutUp:e.char.getAnimationsFlag("dead")}},[s("div",{staticClass:"card__image",class:{dead:e.heroDead}},[s("img",{attrs:{src:e.char.image,alt:e.char.name}})]),e.char.level?s("div",{staticClass:"card__level"},[e._v(" level "+e._s(e.char.level)+" ")]):s("div",{staticClass:"card__level"},[e._v("hero")]),s("div",{staticClass:"card__name"},[e._v(e._s(e.char.name))]),e.char.getAnimationsFlag("blocked")?s("div",{staticClass:"block"},[s("img",{staticClass:"block__img animate__animated animate__flash",attrs:{src:"assets/items/shield.png",alt:"shield"}})]):e._e(),e.char.getAnimationsFlag("heal")?s("div",{staticClass:"heal"},[s("img",{staticClass:"heal__img animate__animated animate__flash",attrs:{src:"assets/items/plus.png",alt:"heal"}})]):e._e(),s("HealthBar",{attrs:{color:"#42B782"},model:{value:e.percentageValue,callback:function(t){e.percentageValue=t},expression:"percentageValue"}}),s("div",{staticClass:"card__stats"},[s("div",{staticClass:"one-third",class:"one-third--"+e.char.name},[s("div",{staticClass:"stat"},[e._v("HP")]),s("div",{staticClass:"stat-value"},[e._v(e._s(e.char.currentHealth))])]),s("div",{staticClass:"one-third",class:"one-third--"+e.char.name},[s("div",{staticClass:"stat"},[e._v("Combat")]),s("div",{staticClass:"stat-value"},[e._v(e._s(e.char.combatEfficiency))])]),s("div",{staticClass:"one-third",class:"one-third--"+e.char.name},[s("div",{staticClass:"stat"},[e._v("Magic")]),s("div",{staticClass:"stat-value"},[e._v(e._s(e.char.magicKnowledge))])])])],1)])},A=[],E=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"healthbar"},[s("div",{staticClass:"healthbar-percentage",style:e.healthBarStyles})])},M=[],F=(s(9653),{props:{value:{type:Number},color:{type:String}},computed:{healthBarStyles:function(){return{width:this.value+"%",backgroundColor:this.value>50?this.color:"#CC0000"}}}}),T=F,L=s(1001),x=(0,L.Z)(T,E,M,!1,null,"7ea0acf8",null),S=x.exports,K={name:"CharacterCard",components:{HealthBar:S},props:["char"],computed:{percentageValue:function(){return this.heroDead?0:100*this.char.currentHealth/this.char.maxHealth},heroDead:function(){return this.char.currentHealth<=0}}},Z=K,O=(0,L.Z)(Z,C,A,!1,null,"b72972c8",null),D=O.exports,B=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{class:{unavailable:e.disabled},attrs:{disabled:e.disabled},on:{click:function(t){return e.$emit("click",t)}}},[e._t("default")],2)},G=[],P={props:["disabled"]},I=P,j=(0,L.Z)(I,B,G,!1,null,"9be26eb8",null),N=j.exports,$={name:"App",data:function(){return{currentHero:"",currentMonster:"",heroesPool:l,monstersPool:[],currentMonsterLevel:1,defeatedMonsters:0,lastActions:[],availableCredits:0,isGame:!1,currentTurn:"hero",isCreditsManagerOpen:!1,actionList:null,publicPath:"/turnbasedgame/",allMonsters:u,ACTIONS_ENUM:c,activeTurn:!1}},components:{CharacterCard:D,FancyButton:N},methods:{createHero:function(e){this.currentHero=new p(l[e-1])},createMonster:function(){if(0!==this.monstersPool.length){var e=v(0,this.monstersPool.length);this.currentMonster=new H(this.monstersPool[e])}else this.isGame=!1},startGame:function(e){this.resetGame(),this.createHero(e),this.createMonster()},resetGame:function(){var e=this;this.defeatedMonsters=0,this.availableCredits=0,this.lastActions=[],this.currentHero="",this.currentMonster="",this.currentMonsterLevel=1,this.monstersPool=this.allMonsters.filter((function(t){return t.level===e.currentMonsterLevel})),this.isGame=!0},toggleCreditsManager:function(){this.isCreditsManagerOpen=!this.isCreditsManagerOpen},monsterDead:function(){var e=this;new Audio(this.currentMonster.sounds.dead).play(),this.availableCredits+=5,this.currentHero.regenerateInjures(),this.addActionToLog({type:"monster",msg:"died"}),this.addActionToLog({type:"hero",msg:"regenerated"}),this.monstersPool=this.allMonsters.filter((function(t){return t.level===e.currentMonsterLevel&&t.id!==e.currentMonster.id})),this.createMonster()},updateHeroStats:function(e){this.availableCredits>0&&(this.availableCredits--,"currentHealth"===e?(this.currentHero.setHealth(this.currentHero[e]+3),this.currentHero.setAttribute("maxHealth",this.currentHero.maxHealth+3)):this.currentHero.setAttribute(e,this.currentHero[e]+1))},addActionToLog:function(e){this.lastActions.unshift("".concat(e.type," ").concat(e.msg))},heroTurn:function(e){var t=0,s=0,a="combatEfficiency";e===c.MELEE?(t=this.currentHero.executeAttack(),a="combatEfficiency",this.addActionToLog({type:"hero",msg:"attacked for ".concat(t)})):e===c.MAGIC?(t=this.currentHero.castSpell(),a="magicKnowledge",this.addActionToLog({type:"hero",msg:"casted a spell for ".concat(t," damage")})):e===c.SPECIAL&&(t=this.currentHero.specialAttack(),a=this.currentHero.mainSkill()===c.MELEE?"combatEfficiency":"magicKnowledge",this.addActionToLog({type:"hero",msg:"dealt ".concat(t," damage with special attack")})),e===c.HEAL&&(s=this.currentHero.healSelf(),this.addActionToLog({type:"hero",msg:"healed to ".concat(s," HP")})),t>0&&!this.currentMonster.isAttackBlocked(a)&&this.currentMonster.takeDamage(t),s>0&&this.currentHero.setHealth(s),this.endTurn()},monsterTurn:function(e){var t=0,s=0,a="combatEfficiency";e===c.MELEE?(t=this.currentMonster.executeAttack(),a="combatEfficiency",this.addActionToLog({type:"monster",msg:"attacked for ".concat(t)})):e===c.MAGIC&&(t=this.currentMonster.castSpell(),a="magicKnowledge",this.addActionToLog({type:"monster",msg:"casted a spell for ".concat(t," damage")})),e===c.HEAL&&(s=this.currentMonster.healSelf(),this.addActionToLog({type:"monster",msg:"healed to ".concat(s," HP")})),t>0&&!this.currentHero.isAttackBlocked(a)&&this.currentHero.takeDamage(t),s>0&&this.currentMonster.setHealth(s),this.endTurn()},endTurn:function(){var e=this;return(0,o.Z)((0,i.Z)().mark((function t(){return(0,i.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.activeTurn=!0,e.currentHero.isDead()&&(new Audio(e.currentHero.sounds.dead).play(),e.isGame=!1),"hero"===e.currentTurn?(e.currentHero.setCooldown("healing",e.currentHero.getCooldown("healing")-1),e.currentHero.setCooldown("special",e.currentHero.getCooldown("special")-1)):e.currentMonster.setCooldown("healing",e.currentMonster.getCooldown("healing")-1),!e.currentMonster.isDead()){t.next=12;break}return e.defeatedMonsters++,e.defeatedMonsters%2===0&&e.defeatedMonsters>0&&e.currentMonsterLevel++,t.next=8,e.currentMonster.animationsEnded();case 8:e.monsterDead(),e.currenTurn="hero",t.next=14;break;case 12:"hero"===e.currentTurn?e.currentTurn="monster":e.currentTurn="hero","monster"===e.currentTurn&&e.monsterTurn(e.currentMonster.drawRandomAction(e.currentHero));case 14:e.activeTurn=!1;case 15:case"end":return t.stop()}}),t)})))()}}},U=$,z=(0,L.Z)(U,n,r,!1,null,null,null),V=z.exports;a.Z.config.productionTip=!1,new a.Z({render:function(e){return e(V)}}).$mount("#app")}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}s.m=e,function(){var e=[];s.O=function(t,a,n,r){if(!a){var i=1/0;for(u=0;u<e.length;u++){a=e[u][0],n=e[u][1],r=e[u][2];for(var o=!0,c=0;c<a.length;c++)(!1&r||i>=r)&&Object.keys(s.O).every((function(e){return s.O[e](a[c])}))?a.splice(c--,1):(o=!1,r<i&&(i=r));if(o){e.splice(u--,1);var l=n();void 0!==l&&(t=l)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[a,n,r]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,r,i=a[0],o=a[1],c=a[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(n in o)s.o(o,n)&&(s.m[n]=o[n]);if(c)var u=c(s)}for(t&&t(a);l<i.length;l++)r=i[l],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(u)},a=self["webpackChunkturnbasedgame"]=self["webpackChunkturnbasedgame"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(3998)}));a=s.O(a)})();
//# sourceMappingURL=app-legacy.1e9d4367.js.map