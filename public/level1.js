import { $, log } from "./utils.js";

// add Objects to the virtual world, replaces:
// <my-obj id="way" class="obj obj-way"></my-obj>
function levelAddObjects() {
    var newObj;

    /* left tree
    */
    newObj = document.createElement('my-obj');
    newObj.id = "tree";
    newObj.className = "obj obj-tree";
    document.body.appendChild(newObj);

    // right tree
    newObj = document.createElement('my-obj');
    newObj.id = "tree2";
    newObj.className = "obj obj-tree2";
    document.body.appendChild(newObj);

    // way
    newObj = document.createElement('my-obj');
    newObj.id = "way";
    newObj.className = "obj obj-way";
    document.body.appendChild(newObj);

    // river
    newObj = document.createElement('my-obj');
    newObj.id = "river";
    newObj.className = "obj obj-river";
    document.body.appendChild(newObj);


}


// helper to check if one of the menu buttons is activated (take view use)
function isMarked(btn_) {
    return ($(btn_).classList.contains("menu-high"));
}


// level object containing the story
const level = {
    levelName: "Level 1: Das Erwachen im Wald",
    levelData: [],

    getNextText: function (obj_) {
        var arr = new Array();          //array with texts to add

        if (this.levelData.includes("useTwig")) {                                   // "Verwende Ast mit..." und dann nicht auf tree2 geklickt ->raus
            if (obj_ != "tree2") {
                log("raus");
                $('Grosser Ast').innerHTML = 'Grosser Ast';
                this.levelData.splice(this.levelData.indexOf("useTwig"), 1);        // remove "useTwig"
                return;
            }
        }

        switch (obj_) {

            case 'tree':
                if (isMarked("btn_view")) {
                    if (!this.levelData.includes("twigtaken")) {
                        arr.push("Ein Baum in erreichbarer Nähe...");
                        arr.push("Also wenn ich versuchen wollte, dort was zu nehmen, dann könnte ich hinrobben, wenn auch unter Schmerzen...");
                        this.levelData.push("treeviewed");
                    } else {
                        arr.push("Ja das war der morsche Baum, hab bereits einen Ast dabei. Das muss jetzt mal reichen, kann mit meinem verletzten Bein jetzt nicht auch noch Feuerholz sammeln.");
                    }
                }
                if (isMarked("btn_take")) {
                    if (this.levelData.includes("treeviewed")) {
                        arr.push("Okay, bin dort.");
                        arr.push("Tatsächlich, dieser Ast ist schon fast ganz ohne Rinde aber scheint doch stark genung, um einges zu stützen.");
                        arr.push("Ich zieh mal dran.../*effort");
                        arr.push("Uhhh..."); arr.push("Ahhh..."); arr.push("Ihhh...");
                        arr.push("RATSCH!<br><br>...ja, tatsächlich, diesen stabilen Ast hab ich mal. Allerdings ist das ein ziemliches Gerät... Kaum zu tragen./*crack");
                        arr.push("/+Grosser Ast");
                    } else {
                        arr.push("Also wirklich, nur so auf gut Glück krieche ich nicht los. Das muss ich mir voher ansehen.");
                    }
                }
                break;


            case 'tree2':

                if (isMarked("btn_view")) {
                    if (this.levelData.includes("hasTwig"))
                        arr.push("Ja genau, jetzt haben wirs geschnallt. Das ist der Baum, in dessen Loch wir uns den Ast zurechtgebrochen haben.");
                    else {
                        if (!this.levelData.includes("treeViewedOnce")) {
                            this.levelData.push("treeViewedOnce");
                            arr.push("Der zweite Baum in erreichbarer Nähe... da könnte ich auch hinüber robben, wenn auch unter noch mehr Schmerzen...");
                            arr.push("...jedoch nicht einfach so zum Spass. Erst sollte ich mir den Baum noch genauer ansehen...");
                        } else {
                            if (!this.levelData.includes("treeViewedTwice")) {
                                this.levelData.push("treeViewedTwice");
                                arr.push("Okay, ja da steht ein weiterer Baum<br>...schon recht gut. Aber der müsste noch genauer inspiziert werden...");
                            } else {
                                arr.push("Aha, jetzt seh ichs, der hat ein robustes Loch mit soliden Rändern...");
                                arr.push("Wofür das wohl nützlich sein könnte...");
                            }
                        }
                    }
                }

                if ( !this.levelData.includes("hasTwig") ) {
                    if (this.levelData.includes("useTwig")) {
                        arr.push("RATSCH! Oh ja, das hat geklappt!/*crack");
                        arr.push("Jetzt kann ich diesen Ast da als Krücke verwenden.");
                        $('Grosser Ast').innerHTML = 'Handlicher Ast';
                        this.levelData.splice(this.levelData.indexOf("useTwig"), 1);        // remove "useTwig"
                        this.levelData.push("hasTwig");
                    }
                } else {
                    arr.push("Ja, das war eine gute Idee. Aber wenn ich den Ast nochmal abbreche, ist er als Krücke zu kurz.");
                }

                break;

            case 'Grosser Ast':
                if (isMarked("btn_view")) {
                    arr.push("Oh ja, ein schöner stabiler Ast mit Gabel dran. Nur etwas lang.");
                }
                if (isMarked("btn_use")) {
                    $('Grosser Ast').innerHTML = "Verwende Ast mit...";
                    //arr.push("Verwende Ast mit...");
                    this.levelData.push("useTwig");
                }

                break;




            case 'river':
                if (isMarked("btn_take") || isMarked("btn_use")) {
                    arr.push("So leicht gehts nicht. Mein Bein tut zu sehr weh, so komm ich nicht bis zum Wasser. Ich bräuchte eine Krücke oder sowas.");
                }

                if ( !this.levelData.includes("hasDrunken") ) {
                    if (this.levelData.includes("useTwig")) {
                        arr.push("Okay, dann humple ich mit der Krücke zum Wasser.");
                        arr.push("Ohhh... das tut gut!/*drink");
                        this.levelData.splice(this.levelData.indexOf("useTwig"), 1);        // remove "useTwig"
                        this.levelData.push("hasDrunken");
                    }
                } else {
                    arr.push("Ja ich weiss, 4 Liter am Tag und so. Trotzdem danke, ich hab keinen Durst mehr.");
                }

                break;


            case 'way':
                if (isMarked("btn_view")) {
                    if (!this.levelData.includes("hasTwig")) {
                        arr.push("Ein Pfad... führt erst zum Wasser und dann ins schier Endlose. So kommt's mir zumindest mit meinem schmerzenden Bein derzeit vor...");
                        arr.push("Und so in dem Zustand ist garnicht daran zu denken. Ohne Hilfsmittel wird das nichts.")
                    } else {
                        arr.push("Jetzt mit dem Ast als Krücke könnte ich es bis zum Wasser wagen...");
                    }

                }
                break;

        }
        return arr;
    }
};
export { level, levelAddObjects };

