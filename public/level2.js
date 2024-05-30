
import { $, log, link, levelData, lvlSet, lvlGet, lvlClr } from "./utils.js";

// helper to check if one of the menu buttons is activated (take view use)
function isMarked(btn_) {
    return ($(btn_).classList.contains("menu-high"));
}


// level object containing the story
const level2 = {
    levelName: "Level 2: Das klingende Tor",
    arrTones: [],

    // add Objects to the virtual world, replaces:
    // <my-obj id="way" class="obj obj-way"></my-obj>
    addObjects: function () {
        log("ADD objects for level 2...");
        if ( ! lvlGet('lvl2')) lvlSet('lvl2');  // remember, we have reached lvl2 (for back/fwd Buttons in other levels)
        
        var newObj;

        /* background - muss direkt am Anfang von body (d.h. direkt VOR 'menu_container') eingefügt werden, sonst ist er unsichtbar (komischerweise) / objekte sind aber klickbar wenn sie unten dran gehängt werden...!?
        */
        newObj = document.createElement('my-obj');
        newObj.id = "bg";

        var img = document.createElement('img');
        img.src = 'res/gate.jpg';
        newObj.appendChild(img);

        document.body.insertBefore(newObj, $('menu_container'));


        /* back/fwd forward/backward Buttons: First Level has NO back button, from 2nd on they have. By default no fwd button. */
        $('btn_back').style = "visibility: visible;";
        $('btn_fwd').style = "visibility: hidden;";


        /* fruits
        */
        newObj = document.createElement('my-obj');
        newObj.id = "fruits";
        newObj.className = "obj obj-fruits";
        document.body.appendChild(newObj);


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

        var element = $("fruits");
        if (element) element.parentNode.removeChild(element);

        var element = $("bell1");
        element.parentNode.removeChild(element);

        var element = $("bell2");
        element.parentNode.removeChild(element);

        var element = $("bell3");
        element.parentNode.removeChild(element);

    },

    getNextText: function (obj_) {
        log("*** lvl.data: " + levelData);

        const lvlGet = (str) => levelData.includes(str);
        const lvlSet = (str) => levelData.push(str);
        const lvlClr = (str) => levelData.splice(levelData.indexOf(str), 1);

        var arr = new Array();          //array with texts to add
        
        switch (obj_) {

            case 'fruits':
                if (isMarked("btn_view")) {
                    arr.push("Eine Schale mit Früchten.")
                }
                if (isMarked("btn_use")) {
                    arr.push("Danke, gerade keinen Appetit.")
                }
                if (isMarked("btn_take")) {
                    arr.push("Okay, nehm ich mit./+Früchte")
                    var element = $("fruits");
                    element.parentNode.removeChild(element);
                }

                break;
                
            case 'bell1':
                if (isMarked("btn_view")) {
                    arr.push("Ein schwerer, fingerdicker Eisenring in einer liebevoll verzierten, gusseisenen Halterung. Dient wohl dazu, anzuklopfen oder sowas. In welchem Jahrundert dieses Meisterwerk wohl gefertigt wurde...");
                }
                if (isMarked("btn_use")) {
                    arr.push("Nadann.../*bell1")
                    this.arrTones.push('1');
                }
                if (isMarked("btn_take")) {
                    arr.push("Machst du Witze?")
                }

                break;


            case 'bell2':
                if (isMarked("btn_view")) {
                    arr.push("Ein Meisterwerk von einem Türklopfer, das seinesgleichen sucht.");
                }
                if (isMarked("btn_use")) {
                    arr.push("Okay./*bell2")
                    this.arrTones.push('2');
                }
                if (isMarked("btn_take")) {
                    arr.push("Das sind EISEN RINGE, kapert?")
                }
                break;

            case 'bell3':
                if (isMarked("btn_view")) {
                    arr.push("Schmiedekunst hat mir schon immer gefallen!");
                }
                if (isMarked("btn_use")) {
                    arr.push("Gern./*bell3")
                    this.arrTones.push('3');
                }
                if (isMarked("btn_take")) {
                    arr.push("Erstens wäre es Diebstahl, und zweitens geht nehmen hier nicht.");
                }

                break;

            case 'btn_dev':
            case 'btn_back':                
                log("---------------- lvl2---");
                log("this.levelData arr content: >>" + levelData + "<<");
                link.href = 'level1.css';
                this.removeObjects();
                arr.push("Und wieder hier.../L1");
                break;

            default:
                log("DEFAULT geklickt - obj: " + obj_);
                break;
        }
            
        // **** shift melody tone memory and check if correct melody was played    
        if ( this.arrTones.length > 5 ) this.arrTones.shift();
        
        if (    (this.arrTones[0] == '1') &&        // ***************** WIN *************
                (this.arrTones[1] == '3') && 
                (this.arrTones[2] == '2') && 
                (this.arrTones[3] == '1') && 
                (this.arrTones[4] == '1')  )       {    
                    new Audio('res/win.mp3').play();
                    $("overlay").innerHTML ="<br>Gratulation<br><br>Soweit hast dus mal durchgespielt ;)<br>Wenn es dir gefallen hat, bitte den lieben Peter dass er weiter bastelt dran!";  
                    $("overlay").hidden = false;

                }

        return arr;
    } // end level.getNextText(obj)    
};
//export { level2, level2AddObjects, level2RemoveObjects };
export { level2 };

