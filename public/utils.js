const $ = (id) => document.getElementById(id);                    // $ as alias for getElementById, like in JQuery
const log = (str) => console.log(str);

var link = document.createElement('link');                      // global .css style sheet, gets loaded with each level




//levelData from utils.js is used in order to have one global storage
var levelData = new Array();                                      // array with global game data, like mark for each reached level ('lvl1') or to remember wich things were done already ('twigTaken')

const lvlGet = (str) => levelData.includes(str);
const lvlSet = (str) => levelData.push(str);
const lvlClr = (str) => levelData.splice(levelData.indexOf(str), 1);
                                                                

export { $, log, link, levelData, lvlGet, lvlSet, lvlClr };

