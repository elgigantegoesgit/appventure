let TXT_MAX_LEN = 170;
let $ = (id) => document.getElementById(id);                    // $ as alias for getElementById, like in JQuery
let log = (str) => console.log(str);


/* object class for all clickable things
    reports to storyclass */
class objclass extends HTMLElement {             //custom element - each object with its id from html, that is instantiated, points to story.obj_clicked(id) 
    connectedCallback() {
        log(this.id + " connected.");        
        this.addEventListener('click',  function() { storyclass.obj_clicked(this.id) } );
    }
}


/*  class storyclass - main story obj
    takes id from txt field for its constructor, where story shall be rendered to.
*/
class storyclass {
    
    static storyData = [];
    static tmp = "a";                           // can be accessed from static and obj methods by storyclass.tmp
    static txt_id = "";                         // HTML el id passed by caller stored to 'txt_id'
    static txt = [];
    
    constructor(id_) {
        storyclass.txt_id = id_;
    }


    txt_clicked() {                             // clickevent from $(overlay_txt_active) 
        $("overlay_txt_active").hidden = true;  // if clicked, show next text block if there is one, hide overlay and grant click acces to the world again
        $(storyclass.txt_id).innerHTML = "";
        if (storyclass.txt.length > 0) storyclass.nxt("");       // if still text in queue, show next part...
    }
    
    
    
    /* text - show & flow function
        in:     add    text to add - if nothing is passed, show next array element
        out:    displays first element of storyclass.txt[] to txt_id.innerHTML and removes it if it fits in one screen, or truncates it after last full word (no break in the middle of a word)
                modifies text-queue array storyclass.txt[]*/
    static nxt(add) {                               
        if ( add != "" ) storyclass.txt.push(add);

        if ( $("overlay_txt_active").hidden ) {
            $("overlay_txt_active").hidden = false;            
            if (storyclass.txt[0].length <= TXT_MAX_LEN)
                var txt_ = storyclass.txt.shift();                            // all fits in one screen, display and shift (remove) first element (shift modifies storyclass.txt[] !)
            else {
                
                var txt_ = storyclass.txt[0].slice(0, TXT_MAX_LEN);          // take first block
                if ( txt_.search(" ") > 0 ) {                          // dont break in the middle of the word (but only if there is any space in the string)
                    while ( txt_.slice(txt_.length - 1 ) != " " ) {
                        txt_ = txt_.slice(0, txt_.length - 1);                             
                    }
                    storyclass.txt[0] = storyclass.txt[0].slice(txt_.length);       // truncate first element after last entire word
                }
            }  
            log("xxx" + storyclass.txt_id)      ;
            $(storyclass.txt_id).innerHTML = txt_;
        }
    }

    start() {
        storyclass.nxt("Ohhh.");
        /*storyclass.nxt("Ahhh. Aua<br>aua.");
        storyclass.nxt("Was, wo bin ich hier gelandet? Was ist passiert?");
        storyclass.nxt("Ich erinnere mich nicht... und mein Kopf dröhnt.");
        storyclass.nxt("Im Mund ein Geschmack wie Oma unterm Arm. Was ist nur passiert?");
        storyclass.nxt("Was war nur los... grübel grübel...");
        storyclass.nxt("Ich muss was trinken. Wie lange liege ich hier wohl schon?");        */
        storyclass.nxt("Au, mein Bein, das zieht! Erstmal umschauen...");
    }

    static obj_clicked(obj_) {                          // called by onclick event from each object with its id as param

        // *** Menu Handling ***
        function isMarked(btn_)
        {
            return($(btn_).classList.contains("menu-high"));
        }

        function toggle_btn(btn_) {

            var audio_ = new Audio('res/click.mp3');
            audio_.playbackRate = 2.0;
            audio_.volume = 0.5;
            audio_.play();


            for ( var i = 0; i < document.getElementsByClassName("menu-item").length ; i++) {               // loop through all menu items and unmark all others and toggle the clicked one (highlighted-not highlighted)
                if ( document.getElementsByClassName("menu-item").item(i).id == btn_)                       // if clicked eleme
                    document.getElementsByClassName("menu-item").item(i).classList.toggle("menu-high");
                else
                    document.getElementsByClassName("menu-item").item(i).classList.remove("menu-high");
            }
        }

        switch ( obj_)  {
            case 'btn_view':
                toggle_btn(obj_);                
            break;
            case 'btn_take':
                toggle_btn(obj_);
            break;
            case 'btn_use':
                toggle_btn(obj_);
            break;


            case 'way':
                if ( isMarked("btn_view") ) {
                    toggle_btn();
                    storyclass.nxt("Ein Pfad... führt erst zum Wasser und dann ins schier Endlose. So kommt's mir zumindest mit meinem schmerzenden Bein derzeit vor...");
                }
            break;
            case 'tree':
                if ( isMarked("btn_view") ) {
                    toggle_btn();
                    storyclass.nxt("Ein Baum in erreichbarer Nähe...");
                    storyclass.nxt("Also wenn ich versuchen wollte, dort was zu nehmen, dann könnte ich hinrobben, wenn auch unter Schmerzen...");
                }
            break;

            case 'tree2':
                if ( isMarked("btn_view") ) {
                    toggle_btn();
                    if (! this.storyData.includes("treeViewedOnce")) {
                        this.storyData.push("treeViewedOnce");
                        storyclass.nxt("Der zweite Baum in erreichbarer Nähe... da könnte ich auch hinüber robben, wenn auch unter noch mehr Schmerzen...");      
                        storyclass.nxt("...jedoch nicht einfach so zum Spass. Erst sollte ich mir den Baum noch genauer ansehen...");                  
                    } else {
                        if (! this.storyData.includes("treeViewedTwice")) {
                            this.storyData.push("treeViewedTwice");
                            storyclass.nxt("...ja, schon recht gut. Aber ich muss ihn noch genauer ansehen...");
                        } else {
                            storyclass.nxt("Aha, jetzt seh ichs, der hat ein robustes Loch mit soliden Rändern...");
                        }
                    }
                }
            break;
        }
    }
}

export { storyclass, objclass };

