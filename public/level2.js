
import { $, log, link } from "./utils.js";

// helper to check if one of the menu buttons is activated (take view use)
function isMarked(btn_) {
    return ($(btn_).classList.contains("menu-high"));
}


// level object containing the story
const level2 = {
    levelName: "Level 2: Das klingende Tor",
    levelData: [],

    // add Objects to the virtual world, replaces:
    // <my-obj id="way" class="obj obj-way"></my-obj>
    addObjects: function () {
        log("ADD OBJ2");

        var newObj;

        /* background - muss direkt am Anfang von body (d.h. direkt VOR 'menu_container') eingefügt werden, sonst ist er unsichtbar (komischerweise) / objekte sind aber klickbar wenn sie unten dran gehängt werden...!?
        */
        newObj = document.createElement('my-obj');
        newObj.id = "bg";

        var img = document.createElement('img');
        img.src = 'res/gate.jpg';
        newObj.appendChild(img);

        document.body.insertBefore(newObj, $('menu_container'));

        /* bell1
        */
        newObj = document.createElement('my-obj');
        newObj.id = "bell1";
        newObj.className = "obj obj-bell1";
        document.body.appendChild(newObj);

        /* bell2
        */
        newObj = document.createElement('my-obj');
        newObj.id = "bell2";
        newObj.className = "obj obj-bell2";
        document.body.appendChild(newObj);

        /* bell3
        */
        newObj = document.createElement('my-obj');
        newObj.id = "bell3";
        newObj.className = "obj obj-bell3";
        document.body.appendChild(newObj);

    },

    removeObjects: function () {
        /* remove background    */
        var element = $("bg");
        element.parentNode.removeChild(element);

        var element = $("bell1");
        element.parentNode.removeChild(element);

        var element = $("bell2");
        element.parentNode.removeChild(element);

        var element = $("bell3");
        element.parentNode.removeChild(element);

    },

    getNextText: function (obj_) {
        log("*** lvl.data: " + this.levelData);

        const lvlGet = (str) => this.levelData.includes(str);
        const lvlSet = (str) => this.levelData.push(str);
        const lvlClr = (str) => this.levelData.splice(this.levelData.indexOf(str), 1);

        var arr = new Array();          //array with texts to add


        switch (obj_) {

            case 'bell1':
                arr.push("Ein schwerer, fingerdicker Eisenring in einer liebevoll verzierten, gusseisenen Halterung. Dient wohl dazu, anzuklopfen oder sowas. In welchem Jahrundert dieses Meisterwerk wohl gefertigt wurde...");
                arr.push("Mal sehen.../*bell1")
                break;


            case 'bell2':
                arr.push("Mal sehen.../*bell2")
                break;

            case 'bell3':
                arr.push("Mal sehen.../*bell3")
                break;

            case 'btn_dev':
                log("---------------- lvl2---");
                log("this.levelData arr content: >>" + this.levelData + "<<");
                link.href = 'level1.css';
                this.removeObjects();
                arr.push("Und wieder hier.../L1");
                break;

            default:
                log("DEFAULT geklickt");
                break;
        }

        return arr;
    } // end level.getNextText(obj)    
};
//export { level2, level2AddObjects, level2RemoveObjects };
export { level2 };

