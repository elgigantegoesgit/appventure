import { $, log } from "./utils.js";
import { level } from "./level1.js";
let TXT_MAX_LEN = 170;


/* object class for all clickable things in the current level
    reports to storyclass if clicked  */
class objclass extends HTMLElement {             //custom element - each object with its id from html, that is instantiated, points to storyclass.obj_clicked(id) 
    connectedCallback() {
        log(this.id + " connected.");
        this.addEventListener('click', function () { storyclass.obj_clicked(this.id) });
    }
}


/*  class storyclass - main story obj
    input:  id from txt field for its constructor, where story shall be rendered to.
*/
class storyclass {

    static tmp = "a";                           // can be accessed from static and obj methods by storyclass.tmp
    static txt_id = "";                         // HTML el id passed by caller stored to 'txt_id'
    static txt = [];                            // array that buffers the text blocks, the user clicks through
    static audio = null;                          // audio effect. mp3 filename without .mp3 can be set at the end of each text line with prefix '/*', e.g. this plays yawn.mp3: mytext is mytext/*yawn

    constructor(id_) {                          // the id of the div, where the text shall be rendered to, is passed to constructor
        storyclass.txt_id = id_;
    }


    txt_clicked() {                             // clickevent from $(overlay_txt_active) - screen was clicked during text was displayed (objs were non-clickable)
        $("overlay_txt_active").hidden = true;  // if clicked, show next text block if there is one, hide overlay and grant click acces to the world again
        $(storyclass.txt_id).innerHTML = "";
        if (storyclass.txt.length > 0) storyclass.nxt("");       // if still text in queue, show next part...
    }
    
    
    /* text - show & flow function
    in:     add    text to add (single string or array, works both)- if nothing is passed, show next array element
    out:    displays first element of storyclass.txt[] to txt_id.innerHTML and removes it if it fits in one screen, or truncates it after last full word (no break in the middle of a word)
    modifies text-queue array storyclass.txt[]*/
    static nxt(add) {
    
        function inventory_add(item) {
            /*
            */
            var div = document.createElement("my-obj");
            div.id = item;
            div.innerHTML = item;
            div.classList.add("ani");
            div.classList.add("inventory-item");
            $("inventory").appendChild(div);
        }

        if (add != "") {            
            storyclass.txt = storyclass.txt.concat(add);
        }

        if (storyclass.txt.length > 0) {


            if ($("overlay_txt_active").hidden) {                                   // now is text active - objs are not reactive for clicks
                $("overlay_txt_active").hidden = false;

                // if starts with '/+', add item to inventory
                var itemPos = storyclass.txt[0].indexOf("/+");
                if ( itemPos >= 0 ) {
                    var item = storyclass.txt[0].slice(itemPos + 2);               // extract item from txt, all after /+
                    storyclass.txt[0] = storyclass.txt[0].slice(0, itemPos);
                    
                    inventory_add(item);


                }   


                // if audio: check for special char "/*filename" in text, add .mp3 and play the audio, crop text to /*
                var audioPos = storyclass.txt[0].indexOf("/*");
                if ( audioPos >= 0 ) {
                    var file = storyclass.txt[0].slice(audioPos + 2);               // extract filename from txt, all after /*
                    storyclass.txt[0] = storyclass.txt[0].slice(0, audioPos);
                    
                    if (this.audio) this.audio.pause();                             // stop current running effect if exists
                    this.audio = new Audio('res/' + file + '.mp3');
                    this.audio.play();
                }   


                if (storyclass.txt[0].length <= TXT_MAX_LEN)
                    var txt_ = storyclass.txt.shift();                              // all fits in one screen, display and shift (remove) first element (shift modifies storyclass.txt[] !)
                else {

                    var txt_ = storyclass.txt[0].slice(0, TXT_MAX_LEN);             // take first block
                    if (txt_.search(" ") > 0) {                                     // dont break in the middle of the word (but only if there is any space in the string)
                        while (txt_.slice(txt_.length - 1) != " ") {
                            txt_ = txt_.slice(0, txt_.length - 1);
                        }
                        storyclass.txt[0] = storyclass.txt[0].slice(txt_.length);   // truncate first element after last entire word
                    }
                }
                
                /*const el = this;
                var newone = elm.cloneNode(true);
                elm.parentNode.replaceChild(newone, elm);
                */
                $(storyclass.txt_id).innerHTML = txt_;                              // write to div with id txt_id
          }
        }
    }

    start() {
        storyclass.nxt("Ohhh./*woosh");
        storyclass.nxt("Ahhh. Aua<br>aua.");
        storyclass.nxt("Was, wo bin ich hier gelandet? Was ist passiert?");
        /*
        storyclass.nxt("Ich erinnere mich nicht... und mein Kopf dröhnt.xx");
        storyclass.nxt("Im Mund ein Geschmack wie Oma unterm Arm. Was ist nur passiert?");
        storyclass.nxt("Was war nur los... grübel grübel...");
        storyclass.nxt("Ich muss was trinken. Wie lange liege ich hier wohl schon?");        */
        storyclass.nxt("Au, mein Bein, das zieht! Erstmal umschauen.../*ting");
    }

    static obj_clicked(obj_) {                          // called by onclick event from each object with its id as param

        //                                               ***         Menu Handling       ***
        function toggle_btn(btn_) {

            var audio_ = new Audio('res/click.mp3');
            audio_.playbackRate = 2.0;
            audio_.volume = 0.5;
            audio_.play();


            for (var i = 0; i < document.getElementsByClassName("menu_item").length; i++) {               // loop through all menu items and unmark all others and toggle the clicked one (highlighted-not highlighted)
                if (document.getElementsByClassName("menu_item").item(i).id == btn_)                       // if clicked eleme
                    document.getElementsByClassName("menu_item").item(i).classList.toggle("menu-high");
                else
                    document.getElementsByClassName("menu_item").item(i).classList.remove("menu-high");
            }
        }

        log(obj_);
        switch (obj_) {
            case 'btn_view':                                                                                //menu buttons clicked
            case 'btn_take':
            case 'btn_use':
                toggle_btn(obj_);
                break;

            default:                                                                                        //any other object clicked
                storyclass.nxt(level.getNextText(obj_));
                toggle_btn(obj_);                                                                           //reset menu button. This needs to be done AFTER level.getNextText (as there the menu btn state is checked)
                break;
        }
    }
}

export { storyclass, objclass };

