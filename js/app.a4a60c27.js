(function(e){function l(l){for(var t,i,p=l[0],r=l[1],s=l[2],m=0,v=[];m<p.length;m++)i=p[m],o[i]&&v.push(o[i][0]),o[i]=0;for(t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t]);c&&c(l);while(v.length)v.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,l=0;l<a.length;l++){for(var n=a[l],t=!0,p=1;p<n.length;p++){var r=n[p];0!==o[r]&&(t=!1)}t&&(a.splice(l--,1),e=i(i.s=n[0]))}return e}var t={},o={app:0},a=[];function i(l){if(t[l])return t[l].exports;var n=t[l]={i:l,l:!1,exports:{}};return e[l].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,l,n){i.o(e,l)||Object.defineProperty(e,l,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,l){if(1&l&&(e=i(e)),8&l)return e;if(4&l&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&l&&"string"!=typeof e)for(var t in e)i.d(n,t,function(l){return e[l]}.bind(null,t));return n},i.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(l,"a",l),l},i.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)},i.p="/blue-mage/";var p=window["webpackJsonp"]=window["webpackJsonp"]||[],r=p.push.bind(p);p.push=l,p=p.slice();for(var s=0;s<p.length;s++)l(p[s]);var c=r;a.push([0,"chunk-vendors"]),n()})({0:function(e,l,n){e.exports=n("56d7")},"034f":function(e,l,n){"use strict";var t=n("64a9"),o=n.n(t);o.a},"09d9":function(e,l,n){"use strict";var t=n("75da"),o=n.n(t);o.a},"56d7":function(e,l,n){"use strict";n.r(l);n("cadf"),n("551c"),n("f751"),n("097d");var t=n("2b0e"),o=function(){var e=this,l=e.$createElement,n=e._self._c||l;return n("div",{attrs:{id:"app"}},[n("aside",[n("SpellFilter",{attrs:{filterTypes:e.filterTypes,filterLevel:e.filterLevel,orderByLevel:e.orderByLevel},on:{typeChange:e.handleTypeChange,levelChange:e.handleLevelChange,orderChange:e.handleOrderChange}}),n("SpellList",{attrs:{spells:e.spells},on:{change:e.handleStatusChange}})],1),n("SpellInst",{attrs:{filterTypes:e.filterTypes,filterLevel:e.filterLevel,spells:e.spells,orderByLevel:e.orderByLevel}})],1)},a=[],i=(n("ac6a"),function(){var e=this,l=e.$createElement,n=e._self._c||l;return n("div",{staticClass:"spell-list"},[n("h3",[e._v("青魔法书")]),n("div",{staticClass:"spell-list-pager"},e._l(e.pages,function(l){return n("span",{key:l,class:{active:e.page===l},on:{click:function(n){e.page=l}}},[e._v(e._s(l))])}),0),e._l(e.showSpells,function(l,t){return n("div",{key:l.no,staticClass:"spell",class:{lighter:t%2===Math.floor(t/4)%2,learned:!!l.learned},attrs:{title:l.spell},on:{click:function(n){return e.handleClick(l,l.no-1)}}},[n("img",{attrs:{src:"icons/spells/"+l.icon}}),n("span",[e._v(e._s(l.no))])])}),n("p",{staticClass:"spell-list-note"},[e._v("选中（已学习）的技能不会出现在获取方式中")])],2)}),p=[],r={props:{spells:Array},data:function(){return{page:1}},computed:{pages:function(){return Math.ceil(this.spells.length/16)},showSpells:function(){return this.spells.slice(16*(this.page-1),16*this.page)}},methods:{handleClick:function(e,l){e.learned=!e.learned,this.$emit("change",l,e.learned)}}},s=r,c=(n("a8fd"),n("2877")),m=Object(c["a"])(s,i,p,!1,null,null,null),v=m.exports,u=function(){var e=this,l=e.$createElement,n=e._self._c||l;return n("main",{staticClass:"spell-inst"},[n("h3",[e._v("可学习技能列表")]),0===e.showSpells.length?n("p",[e._v("当前条件下暂无可学习的技能")]):e._e(),e._l(e.showSpells,function(l){return n("div",{key:l.no,staticClass:"inst"},[n("img",{staticClass:"inst-spell-icon",attrs:{src:"icons/spells/"+l.icon}}),n("div",{staticClass:"inst-content"},[n("h4",[n("span",[e._v("["+e._s(l.no)+"]")]),e._v(" "+e._s(l.spell)+" "),n("small",[e._v("(Lv."+e._s(l.level)+")")])]),e._l(l.method,function(l,t){return n("p",{key:t},[n("img",{staticClass:"inst-method-type",attrs:{src:"icons/type_"+l.type+".png"}}),e._v("\n        "+e._s(e._f("renderMethod")(l))+" "),n("sup",[e._v("Lv."+e._s(l.level))])])})],2)])})],2)},d=[],h=(n("7f7f"),n("55dd"),n("c5f6"),{props:{spells:Array,filterTypes:Object,filterLevel:Number,orderByLevel:Boolean},computed:{showSpells:function(){var e=this,l=this.spells.filter(function(l){return!l.learned&&l.level<=e.filterLevel&&l.method.some(function(l){return e.filterTypes[l.type]})});return this.orderByLevel&&l.sort(function(e,l){return e.level-l.level}),l}},filters:{renderMethod:function(e){switch(e.type){case"map":var l=e.position;return"".concat(e.map," ").concat(e.rank?"[".concat(e.rank,"]"):"").concat(l.length?"(x:".concat(l[0],", y:").concat(l[1]).concat(l[2]?", z:".concat(l[2]):"",")"):""," - ").concat(e.mob);case"raid":case"dungeon":case"trail":return"".concat(e.name," - ").concat(e.mob);case"fate":return"".concat(e.map," - ").concat(e.name," - ").concat(e.mob);case"special":return e.text}}},methods:{handleClick:function(e,l){e.learned=!e.learned,this.$emit("change",l,e.learned)}}}),f=h,g=(n("09d9"),Object(c["a"])(f,u,d,!1,null,null,null)),y=g.exports,b=function(){var e=this,l=e.$createElement,n=e._self._c||l;return n("div",{staticClass:"spell-filter"},[n("h3",[e._v("角色等级")]),n("div",{staticClass:"spell-level"},[n("input",{attrs:{type:"number",max:"50",min:"1"},domProps:{value:e.filterLevel},on:{input:e.handleInput}}),n("div",{staticClass:"spell-level-order",class:{checked:e.orderByLevel},on:{click:function(l){return e.handleOrder(e.orderByLevel)}}},[e._v("按等级排序")])]),n("h3",[e._v("学习途径过滤")]),n("ul",e._l(e.filterTypes,function(l,t,o){return n("li",{key:t,staticClass:"type",class:{lighter:o%2===Math.floor(o/4)%2,checked:l},on:{click:function(n){return e.handleClick(t,l)}}},[n("img",{attrs:{src:"icons/type_"+t+".png"}})])}),0)])},_=[],k={props:{filterTypes:Object,filterLevel:Number,orderByLevel:Boolean},methods:{handleInput:function(e){var l=+e.target.value;isNaN(l)&&(l=50),this.$emit("levelChange",l)},handleClick:function(e,l){this.$emit("typeChange",e,!l)},handleOrder:function(e){this.$emit("orderChange",!e)}}},S=k,C=(n("de2b"),Object(c["a"])(S,b,_,!1,null,null,null)),L=C.exports,T=n("fccc"),O=function(e){var l;if(localStorage)l=localStorage.getItem(e);else{var n=document.cookie,t=n.indexOf(e+"=");if(t>=0){t+=e.length+1;var o=n.indexOf(";",t);l=n.substr(t,-1===o?void 0:o-t)}}if(l)try{return JSON.parse(l)}catch(a){return}},x=function(e,l){if(l=JSON.stringify(l),localStorage)localStorage.setItem(e,l);else{var n=new Date;n.setFullYear(n.getFullYear()+10),document.cookie="".concat(e,"=").concat(l,";expires=").concat(n.toUTCString(),";path=/")}},B=function(){var e=O("spell-status")||[];Array.isArray(e)||(e=[]),T.forEach(function(l,n){l.learned=!!e[n]})};B();var w={name:"app",data:function(){return{spells:T,filterTypes:Object.assign({special:!0,map:!0,fate:!0,dungeon:!0,trail:!0,raid:!0},O("filter-types")||{}),filterLevel:O("filter-level")||50,orderByLevel:O("order-by-level")||!1}},components:{SpellList:v,SpellInst:y,SpellFilter:L},methods:{handleStatusChange:function(e,l){T[e].learned=l;var n=T.map(function(e){var l=e.learned;return l?1:0});x("spell-status",n)},handleTypeChange:function(e,l){this.$set(this.filterTypes,e,l),x("filter-types",this.filterTypes)},handleLevelChange:function(e){this.filterLevel=e,x("filter-level",e)},handleOrderChange:function(e){this.orderByLevel=e,x("order-by-level",e)}}},j=w,M=(n("034f"),Object(c["a"])(j,o,a,!1,null,null,null)),F=M.exports;t["a"].config.productionTip=!1,new t["a"]({render:function(e){return e(F)}}).$mount("#app")},"64a9":function(e,l,n){},"75da":function(e,l,n){},a8fd:function(e,l,n){"use strict";var t=n("fe53"),o=n.n(t);o.a},b529:function(e,l,n){},de2b:function(e,l,n){"use strict";var t=n("b529"),o=n.n(t);o.a},fccc:function(e){e.exports=[{no:"1",spell:"水炮",level:1,icon:"Water_Cannon.png",method:[{type:"special",text:"自动习得",level:1}]},{no:"2",spell:"火炎放射",level:50,icon:"Flame_Thrower.png",method:[{type:"dungeon",name:"纷争要地布雷福洛克斯野营地",mob:"6号哥布林坦克",level:50}]},{no:"3",spell:"水流吐息",level:50,icon:"Aqua_Breath.png",method:[{type:"trail",name:"艾玛吉娜杯斗技大会决赛",mob:"奥尔特罗斯",level:50},{type:"trail",name:"利维亚桑歼灭战",mob:"利维亚桑",level:50}]},{no:"4",spell:"狂乱",level:50,icon:"Flying_Frenzy.png",method:[{type:"dungeon",name:"领航明灯天狼星灯塔",mob:"祖",level:50}]},{no:"5",spell:"钻头炮",level:46,icon:"Drill_Cannons.png",method:[{type:"fate",map:"北萨纳兰",name:"逆向工程",mob:"废弃的魔导先锋",level:46},{type:"map",map:"北萨纳兰",rank:null,position:[16,15,0],mob:"魔导先锋强化型",level:46}]},{no:"6",spell:"高压电流",level:50,icon:"High_Voltage.png",method:[{type:"raid",name:"巴哈姆特大迷宫 邂逅之章1",mob:"自卫系统",level:50},{type:"raid",name:"巴哈姆特大迷宫 邂逅之章2",mob:"自卫系统",level:50}]},{no:"7",spell:"若隐若现",level:50,icon:"Loom.png",method:[{type:"map",map:"北萨纳兰",rank:"B",position:[],mob:"永恒不灭的菲兰德副耀士",level:50}]},{no:"8",spell:"终极针",level:13,icon:"Final_Sting.png",method:[{type:"map",map:"中拉诺西亚",rank:null,position:[15,15,0],mob:"杀手胡蜂",level:13}]},{no:"9",spell:"苦闷之歌",level:50,icon:"Song_of_Torment.png",method:[{type:"dungeon",name:"领航明灯天狼星灯塔",mob:"塞壬",level:50}]},{no:"10",spell:"怒视",level:47,icon:"Glower.png",method:[{type:"dungeon",name:"毒雾洞窟黄金谷",mob:"数币巨人",level:47}]},{no:"11",spell:"平原震裂",level:28,icon:"Plaincracker.png",method:[{type:"map",map:"黑衣森林北部林区",rank:null,position:[19,28,0],mob:"泥土巨像",level:28},{type:"dungeon",name:"骚乱坑道铜铃铜山",mob:"哥革巨像",level:50}]},{no:"12",spell:"怒发冲冠",level:20,icon:"Bristle.png",method:[{type:"map",map:"黑衣森林东部林区",rank:null,position:[18,24,0],mob:"狂野疣猪",level:20}]},{no:"13",spell:"白风",level:1,icon:"White_Wind.png",method:[{type:"special",text:"学习 10 个技能后可从[乌尔达哈来生回廊]的[异男子嘎希迦]处获得[天青图腾]",level:1}]},{no:"14",spell:"5级石化",level:28,icon:"Level_5_Petrify.png",method:[{type:"dungeon",name:"名门府邸静语庄园",mob:"庄园的守卫",level:28},{type:"dungeon",name:"恶灵府邸静语庄园",mob:"庄园的守卫",level:50}]},{no:"15",spell:"锋利菜刀",level:50,icon:"Sharpened_Knife.png",method:[{type:"dungeon",name:"神灵圣域放浪神古神殿",mob:"冬贝利王",level:50}]},{no:"16",spell:"冰棘屏障",level:9,icon:"Ice_Spikes.png",method:[{type:"map",map:"黑衣森林中央林区",rank:null,position:[27,24,0],mob:"捣蛋小鬼",level:9}]},{no:"17",spell:"吸血",level:7,icon:"Blood_Drain.png",method:[{type:"map",map:"拉诺西亚低地",rank:null,position:[27,16,0],mob:"洞穴蝙蝠",level:7}]},{no:"18",spell:"橡果炸弹",level:12,icon:"Acorn_Bomb.png",method:[{type:"map",map:"黑衣森林北部林区",rank:null,position:[27,28,0],mob:"幼体树精",level:12}]},{no:"19",spell:"投弹",level:5,icon:"Bomb_Toss.png",method:[{type:"map",map:"中拉诺西亚",rank:null,position:[23,21,0],mob:"哥布林鱼师",level:5},{type:"map",map:"中拉诺西亚",rank:null,position:[23,21,0],mob:"哥布林赌徒",level:5}]},{no:"20",spell:"破防",level:1,icon:"Off-guard.png",method:[{type:"special",text:"学习 5 个技能后可从[乌尔达哈来生回廊]的[异男子嘎希迦]处获得[天青图腾]",level:1}]},{no:"21",spell:"自爆",level:12,icon:"Self-destruct.png",method:[{type:"map",map:"西萨纳兰",rank:null,position:[27,16,0],mob:"滑行爆弹怪",level:12}]},{no:"22",spell:"融合",level:1,icon:"Transfusion.png",method:[{type:"special",text:"学习 20 个技能后可从[乌尔达哈来生回廊]的[异男子嘎希迦]处获得[天青图腾]",level:1}]},{no:"23",spell:"拍掌",level:6,icon:"Faze.png",method:[{type:"map",map:"中萨纳兰",rank:null,position:[16,19,0],mob:"卢恩人护甲手",level:6},{type:"map",map:"东拉诺西亚",rank:null,position:[26,32,0],mob:"卢恩人烘鸥手",level:6}]},{no:"24",spell:"投掷沙丁鱼",level:30,icon:"Flying_Sardine.png",method:[{type:"map",map:"东拉诺西亚",rank:null,position:[27,35,0],mob:"碧企鹅",level:30}]},{no:"25",spell:"鼻息",level:50,icon:"Snort.png",method:[{type:"trail",name:"艾玛吉娜杯斗技大会决赛",mob:"提丰",level:50}]},{no:"26",spell:"4星吨",level:50,icon:"4-tonze_Weight.png",method:[{type:"trail",name:"艾玛吉娜杯斗技大会决赛",mob:"奥尔特罗斯",level:50}]},{no:"27",spell:"诡异视线",level:50,icon:"The_Look.png",method:[{type:"dungeon",name:"邪教驻地无限城古堡",mob:"阿难塔波嘉",level:50}]},{no:"28",spell:"臭气",level:31,icon:"Bad_Breath.png",method:[{type:"map",map:"黑衣森林中央林区",rank:null,position:[18,21,0],mob:"套索花",level:31},{type:"map",map:"黑衣森林中央林区",rank:null,position:[15,21,0],mob:"臭套索花",level:31}]},{no:"29",spell:"超硬化",level:50,icon:"Diamondback.png",method:[{type:"dungeon",name:"激战城塞石卫塔",mob:"库卡龙龟",level:50}]},{no:"30",spell:"强力守护",level:1,icon:"Mighty_Guard.png",method:[{type:"special",text:"学习 10 个技能后可从[乌尔达哈来生回廊]的[异男子嘎希迦]处获得[天青图腾]",level:1}]},{no:"31",spell:"滑舌",level:14,icon:"Sticky_Tongue.png",method:[{type:"map",map:"中萨纳兰",rank:null,position:[27,19,0],mob:"毒蟾蜍",level:14},{type:"map",map:"西萨纳兰",rank:null,position:[15,7,0],mob:"痴笑巨蟾蜍",level:14}]},{no:"32",spell:"油性分泌物",level:24,icon:"Toad_Oil.png",method:[{type:"map",map:"西萨纳兰",rank:null,position:[15,7,0],mob:"痴笑巨蟾蜍",level:24}]},{no:"33",spell:"寒冰咆哮",level:38,icon:"The_Ram's_Voice.png",method:[{type:"dungeon",name:"流沙迷宫樵鸣洞",mob:"奇美拉",level:38}]},{no:"34",spell:"雷电咆哮",level:38,icon:"The_Dragon's_Voice.png",method:[{type:"dungeon",name:"流沙迷宫樵鸣洞",mob:"奇美拉",level:38}]},{no:"35",spell:"导弹",level:50,icon:"Missile.png",method:[{type:"trail",name:"无限城的死斗",mob:"恩奇都",level:50}]},{no:"36",spell:"千针刺",level:24,icon:"1000_Needles.png",method:[{type:"map",map:"南萨纳兰",rank:null,position:[16,15,0],mob:"仙人刺舞蹈家",level:24},{type:"dungeon",name:"流沙迷宫樵鸣洞",mob:"仙人刺逃兵",level:24}]},{no:"37",spell:"喷墨",level:50,icon:"Ink_Jet.png",method:[{type:"dungeon",name:"逆转要害沙斯塔夏溶洞",mob:"克拉肯",level:50}]},{no:"38",spell:"火投枪",level:50,icon:"Fire_Angon.png",method:[{type:"dungeon",name:"武装圣域放浪神古神殿",mob:"折角骑士 寇黑加",level:50}]},{no:"39",spell:"月之笛",level:1,icon:"Moon_Flute.png",method:[{type:"special",text:"完成 10 种假面狂欢关卡后可从[乌尔达哈来生回廊]的[异男子嘎希迦]处获得[天青图腾]",level:1}]},{no:"40",spell:"螺旋尾",level:50,icon:"Tail_Screw.png",method:[{type:"dungeon",name:"逆转要害沙斯塔夏溶洞",mob:"真红龙虾",level:50}]},{no:"41",spell:"精神冲击",level:16,icon:"Mind_Blast.png",method:[{type:"dungeon",name:"地下灵殿塔姆·塔拉墓园",mob:"主宰者 加尔梵斯",level:16}]},{no:"42",spell:"死亡宣告",level:1,icon:"Doom.png",method:[{type:"special",text:"完成 20 种假面狂欢关卡后可从[乌尔达哈来生回廊]的[异男子嘎希迦]处获得[天青图腾]",level:1}]},{no:"43",spell:"惊奇光",level:45,icon:"Peculiar_Light.png",method:[{type:"map",map:"摩杜纳",rank:null,position:[13,10,0],mob:"静水泥沼蝾螈",level:45}]},{no:"44",spell:"飞翎雨",level:50,icon:"Feather_Rain.png",method:[{type:"trail",name:"迦楼罗歼灭战",mob:"迦楼罗",level:50},{type:"trail",name:"迦楼罗歼殛战",mob:"迦楼罗",level:50}]},{no:"45",spell:"地火喷发",level:50,icon:"Eruption.png",method:[{type:"trail",name:"伊弗利特歼灭战",mob:"伊弗利特",level:50},{type:"trail",name:"伊弗利特歼殛战",mob:"伊弗利特",level:50}]},{no:"46",spell:"山崩",level:50,icon:"Mountain_Buster.png",method:[{type:"trail",name:"泰坦歼灭战",mob:"泰坦",level:50},{type:"trail",name:"泰坦歼殛战",mob:"泰坦",level:50}]},{no:"47",spell:"轰雷",level:50,icon:"Shock_Strike.png",method:[{type:"trail",name:"拉姆歼灭战",mob:"拉姆",level:50},{type:"trail",name:"拉姆歼殛战",mob:"拉姆",level:50}]},{no:"48",spell:"冰雪乱舞",level:50,icon:"Glass_Dance.png",method:[{type:"trail",name:"希瓦歼灭战",mob:"希瓦",level:50},{type:"trail",name:"希瓦歼殛战",mob:"希瓦",level:50}]},{no:"49",spell:"水神的面纱",level:50,icon:"Veil_of_the_Whorl.png",method:[{type:"trail",name:"利维亚桑歼灭战",mob:"利维亚桑",level:50},{type:"trail",name:"利维亚桑歼殛战",mob:"利维亚桑",level:50}]}]},fe53:function(e,l,n){}});
//# sourceMappingURL=app.a4a60c27.js.map