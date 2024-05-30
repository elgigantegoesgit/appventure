
import { $, log, link, levelData, lvlGet, lvlSet, lvlClr } from "./utils.js";


// helper to check if one of the menu buttons is activated (take view use)
function isMarked(btn_) {
    return ($(btn_).classList.contains("menu-high"));
}


// level object containing the story
const level1 = {
    levelName: "Level 1: Das Erwachen im Wald",
    //levelData: [], // former version. now levelData & methods from utils.js are used in order to have one global storage

    // add Objects to the virtual world, replaces:
    // <my-obj id="way" class="obj obj-way"></my-obj>
    addObjects: function () {
        log("ADD OBJ1");
        
        var newObj;
        
        /* background - muss direkt am Anfang von body (d.h. direkt VOR 'menu_container') eingefügt werden, sonst ist er unsichtbar (komischerweise) / objekte sind aber klickbar wenn sie unten dran gehängt werden...!?
        */
        newObj = document.createElement('my-obj');
        newObj.id = "bg";
        
        var img = document.createElement('img');
        img.src = 'res/bg.jpg';
        newObj.appendChild(img);

        document.body.insertBefore(newObj, $('menu_container'));

        /* First Level has NO back button and starts without fwd button       */
        $('btn_back').style = "visibility: hidden;";
        if ( lvlGet('lvl2') )       $('btn_fwd').style = "visibility: visible;";
        else                        $('btn_fwd').style = "visibility: hidden;";


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

        
        /* middle tree in the back
        */
        newObj = document.createElement('my-obj');
        newObj.id = "tree3";
        newObj.className = "obj obj-tree3";
        document.body.appendChild(newObj);

                
        /* bird-yes        */
        newObj = document.createElement('my-obj');
        newObj.id = "bird-yes";
        newObj.className = "obj obj-bird-yes";
        document.body.appendChild(newObj);     

        /* bird-no        */
        newObj = document.createElement('my-obj');
        newObj.id = "bird-no";
        newObj.className = "obj obj-bird-no";
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
    },

    removeObjects: function () {
        /* remove background    */
        var element = $("bg");
        element.parentNode.removeChild(element);

        /* left tree    */
        var element = $("tree");
        element.parentNode.removeChild(element);

        /* right tree */
        var element = $("tree2");
        element.parentNode.removeChild(element);

        // way
        var element = $("way");
        element.parentNode.removeChild(element);

        // river
        var element = $("river");
        element.parentNode.removeChild(element);

    },

    getNextText: function (obj_) {
        log("*** lvl.data: " + levelData);

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
            if ((obj_ != "tree2") && (obj_ != "tree3") && (obj_ != "way")) {                 // VORSICHT, schiacha HACK! Objekt reagiert nicht auf "Verwende mit" wenns hier nicht drin ist
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
                    if (lvlGet("treeViewedTwice")) {
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


            case 'tree3':
                
                if (isMarked("btn_view")) {
                    //if ($("Krücke"))
                        arr.push("Oha, der ist ja hohl.");         
                }
                if (!$("Krücke")) {
                    arr.push("Ein Pfad... führt erst zum Wasser und dann ins schier Endlose. So kommt's mir zumindest mit meinem schmerzenden Bein derzeit vor...");
                    arr.push("Und so in dem Zustand ist garnicht daran zu denken. Ohne Hilfsmittel wird das nichts.")
                } else {

                    if (lvlGet("cmdUseFruits")) {
                        lvlClr("cmdUseFruits");
                        $('Früchte').innerHTML = "Früchte";
                        arr.push("So. Hier kleiner Freund - dann werfe ich dir die Früchte rein.../*eat");
                        arr.push("Oh, scheint ihm zu schmecken.");
                        lvlSet("ateFruits");

                    }
                    
                    if (lvlGet("cmdUseCrutch")) {
                        lvlClr("cmdUseCrutch");
                        $('Krücke').innerHTML = "Krücke";       //reset "Verwende Krücke mit..."
                        arr.push("Nagut, ich fahr mal rein ins Loch.../*crack2");
                        if (!lvlGet("ateFruits")) {
                            arr.push("...hm. Das gefällt dem Vogel nicht. Er sieht hungrig aus.../*no2");
                            
                            $('bird-no').style = "visibility: visible;"
                            function birdnClr()
                            {
                                $('bird-no').style = "visibility: hidden;";
                            }
                            setTimeout(birdnClr, 5000);
                        } else {                            
                            arr.push("Ah das Futter hat ihn freundlich gestimmt. Welch wundervolle Melodei er tudelt.../*melody");
                            $('bird-yes').style = "visibility: visible;"
                            function birdyClr()
                            {
                                $('bird-yes').style = "visibility: hidden;";
                            }
                            setTimeout(birdyClr, 10000);
                        }
                    }
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
    

                case 'Früchte':
                    if (isMarked("btn_view")) {
                        arr.push("Hmmm. Ja, noch sehen sie lecker aus. Noch.");
                    } else if (isMarked("btn_use")) {
                        $('Früchte').innerHTML = "Verwende Früchte mit...";
                        lvlSet("cmdUseFruits");
                    }
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
                                link.href = 'level2.css';
                                this.removeObjects();
                                arr.push("Oh, hier bei einem uralten, steinernen Tor bin ich also.../L2");
                            }
                        }
                    }
                }
                break;

            case 'btn_fwd':          
                log("------------------- lvl1 jumps to lvl2");
                link.href = 'level2.css';
                this.removeObjects();
                arr.push("Oh, hier bei einem uralten, steinernen Tor bin ich also.../L2");
                break;

            case 'btn_dev':          
                arr.push("Jetzt kann ich diesen Ast da als Krücke verwenden./+Krücke");
                arr.push("und Hier früchte verwenden./+Früchte");
                break;

                log("-------------------dev lvl1 jumps to lvl2");
                link.href = 'level2.css';
                this.removeObjects();
                arr.push("Oh, hier bei einem uralten, steinernen Tor bin ich also.../L2");
                break;

            default:
                log("DEFAULT geklickt - obj: " + obj_);
                break;
        }

        return arr;
    } // end level.getNextText(obj)    
};
//export { level1, level1AddObjects, level1RemoveObjects };
export { level1 };

