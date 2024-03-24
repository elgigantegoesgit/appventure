
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
        log("*** lvl.data: " + this.levelData);

        const lvlGet = (str) => this.levelData.includes(str);
        const lvlSet = (str) => this.levelData.push(str);
        const lvlClr = (str) => this.levelData.splice(this.levelData.indexOf(str), 1);

        var arr = new Array();          //array with texts to add

        if (lvlGet("cmdUseTwig")) {                                   // "Verwende Ast mit..." und dann nicht auf tree2 od river geklickt ->raus
            if ((obj_ != "tree2") && (obj_ != "way")) {
                lvlClr("cmdUseTwig");
                $('Grosser Ast').innerHTML = 'Grosser Ast';
                log("RAUS: cmdUseTwig:" + lvlGet("cmdUseTwig"));
                return;
            }
        }

        if (lvlGet("cmdUseCrutch")) {                                   // "Verwende Krücke mit..." und dann nicht auf tree2 od river geklickt ->raus
            if ((obj_ != "tree2") && (obj_ != "way")) {
                lvlClr("cmdUseCrutch");
                $('Krücke').innerHTML = 'Krücke';
                return;
            }
        }

        

        switch (obj_) {

            case 'tree':
                if (isMarked("btn_view")) {
                    if (!$("Grosser Ast") && !$("Krücke")) {
                        if (!lvlGet("treeviewd")) {
                            lvlSet("treeviewed");
                            arr.push("Ein Baum in erreichbarer Nähe...");
                            arr.push("Also wenn ich versuchen wollte, dort was zu nehmen, dann könnte ich hinrobben, wenn auch unter Schmerzen...");
                        } else {
                            arr.push("Ja, das ist Baum eins links vorn. Gesehen hab ich ihn.");
                        }

                    } else {
                        arr.push("Ja das war der morsche Baum, hab bereits einen Ast unter größter Not herausgezogen. Das muss jetzt mal reichen, kann mit meinem verletzten Bein jetzt nicht auch noch Feuerholz sammeln.");
                    }
                }
                if (isMarked("btn_take")) {
                    if (!$("Grosser Ast") && !$("Krücke")) {
                        if (lvlGet("treeviewed")) {
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
                    else {
                        arr.push("Ja das war der morsche Baum, hab bereits einen Ast dabei. Das muss jetzt mal reichen, kann mit meinem verletzten Bein jetzt nicht auch noch Feuerholz sammeln.");
                    }
                }
                break;


            case 'tree2':

                if (isMarked("btn_view")) {
                    if ($("Krücke"))
                        arr.push("Ja genau, jetzt haben wirs geschnallt. Das ist der Baum, in dessen Loch wir uns den Ast zurechtgebrochen haben.");
                    else {
                        if (!lvlGet("treeViewedOnce")) {
                            lvlSet("treeViewedOnce");
                            arr.push("Der zweite Baum in erreichbarer Nähe... da könnte ich auch hinüber robben, wenn auch unter noch mehr Schmerzen...");
                            arr.push("...jedoch nicht einfach so zum Spass. Erst sollte ich mir den Baum noch genauer ansehen...");
                        } else {
                            if (!lvlGet("treeViewedTwice")) {
                                lvlSet("treeViewedTwice");
                                arr.push("Okay, ja da steht ein weiterer Baum<br>...schon recht gut. Aber der müsste noch genauer inspiziert werden...");
                            } else {
                                arr.push("Aha, jetzt seh ichs, der hat ein robustes Loch mit soliden Rändern...");
                                arr.push("Wofür das wohl nützlich sein könnte...");
                            }
                        }
                    }
                }

                if (lvlGet("cmdUseTwig")) {
                    lvlClr("cmdUseTwig");
                    $('Grosser Ast').innerHTML = "Grosser Ast";
                    if ( lvlGet("treeViewedTwice") ) {
                        arr.push("RATSCH! Oh ja, das hat geklappt!/*crack");
                        arr.push("Perfekt./-Grosser Ast");
                        arr.push("Jetzt kann ich diesen Ast da als Krücke verwenden./+Krücke");
                    } else {
                        arr.push("Möglich dass sich da was machen lässt, aber zuerst müsste ich mir den Baum genau  -  wirklich genau  - ansehen.");                        
                    }
                } 

                if (lvlGet("cmdUseCrutch")) {
                    lvlClr("cmdUseCrutch");
                    $('Krücke').innerHTML = "Krücke";       //reset "Verwende Krücke mit..."
                    arr.push("Keine gute Idee. Die Länge passt jetzt so wie sie ist.");                        
                }

                break;

            case 'Grosser Ast':
                if (isMarked("btn_view")) {
                    arr.push("Oh ja, ein schöner stabiler Ast mit Gabel dran. Nur etwas lang.");
                } else if (isMarked("btn_use")) {
                    lvlSet("cmdUseTwig");
                    $('Grosser Ast').innerHTML = "Verwende Ast mit...";
                } else {
                    arr.push("Ja, ja, der Ast...");
                }

                break;

            case 'Krücke':
                if (isMarked("btn_view")) {
                    arr.push("Der Ast gibt eine brauchbare Krücke ab.");
                } else if (isMarked("btn_use")) {
                    $('Krücke').innerHTML = "Verwende Krücke mit...";
                    lvlSet("cmdUseCrutch");
                }
                break;


            case 'btn_dev':
                log("this.levelData arr content: >>" + this.levelData + "<<");

                break;




            case 'river':
                if (isMarked("btn_view")) {
                    arr.push("Ein fröhlich plätscherndes Bächlein von bester Trinkwasserqualität!");
                }
                else if (isMarked("btn_take") || isMarked("btn_use")) {
                    if (lvlGet("reachedWater")) {
                        if (lvlGet("hasDrunken")) {
                            arr.push("Ja ich weiss, 4 Liter am Tag und so. Trotzdem danke, ich hab keinen Durst mehr.");
                        } else {
                            arr.push("Ohhh... das tut gut!/*drink");
                            lvlSet("hasDrunken");
                        }
                    } else {
                        arr.push("So leicht gehts nicht. Mein Bein tut zu sehr weh, so komm ich nicht bis zum Wasser. Ich bräuchte eine Krücke oder sowas.");
                    }
                }
                break;


            case 'way':
                if (isMarked("btn_view")) {
                    if (!$("Krücke")) {
                        arr.push("Ein Pfad... führt erst zum Wasser und dann ins schier Endlose. So kommt's mir zumindest mit meinem schmerzenden Bein derzeit vor...");
                        arr.push("Und so in dem Zustand ist garnicht daran zu denken. Ohne Hilfsmittel wird das nichts.")
                    } else {
                        arr.push("Jetzt mit Krücke könnte ich es bis zum Wasser wagen...");
                    }

                } else {
                    if (lvlGet("cmdUseTwig")) {
                        lvlClr("cmdUseTwig");
                        $('Grosser Ast').innerHTML = "Grosser Ast";
                        arr.push("Nein Mann, ohne Krücke und dann noch mit diesem dermaßen langen Ast kann ich nicht vorwärts kommen.");
                        $("Grosser Ast").innerHTML = "Grosser Ast";
                    }
                    if (lvlGet("cmdUseCrutch")) {
                        lvlClr("cmdUseCrutch");
                        $('Krücke').innerHTML = "Krücke";       //reset "Verwende Krücke mit..."

                        if (!lvlGet("reachedWater")) {
                            arr.push("Okay, dann humple ich mit der Krücke zum Wasser.");
                            arr.push("Ohoho das zieht - aber es geht. Bin endlich am Wasser./*moan");
                            lvlSet("reachedWater");
                        } else {
                            if (!lvlGet("hasDrunken")) {
                                arr.push("Kann schon sein, dass ichs noch weiter schaffe, aber eines der Grundbedürfnisse muss erst gestillt werden.");
                            } else {
                                arr.push("Ohoho und schon wieder zieht's. Aber es geht... Nur weg hier!/*moan");
                                //lvlSet("reachedTree3");
                            }
                        }
                    }
                }
                break;

        }
        return arr;
    }
};
export { level, levelAddObjects };

