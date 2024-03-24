const $ = (id) => document.getElementById(id);                    // $ as alias for getElementById, like in JQuery
const log = (str) => console.log(str);

var link = document.createElement('link');                    // global .css style sheet, gets loaded with each level

export { $, log, link };

