let $ = (id) => document.getElementById(id);                    // $ as alias for getElementById, like in JQuery
function isMarked(btn_) {
    return ($(btn_).classList.contains("menu-high"));
}
const level = {
    levelName: "Level 1: Das Erwachen im Wald",
    levelData: [],
    id: 5566,
    getNextText: function (obj_) {
        var arr_  = new Array();          //array with texts to add
        switch (obj_) {
            case 'way':
                if (isMarked("btn_view")) {
                    arr_.push("Ein Pfad... führt erst zum Wasser und dann ins schier Endlose. So kommt's mir zumindest mit meinem schmerzenden Bein derzeit vor...");
                }
                break;
            case 'tree':
                if (isMarked("btn_view")) {
                    arr_.push("Ein Baum in erreichbarer Nähe...");
                    arr_.push("Also wenn ich versuchen wollte, dort was zu nehmen, dann könnte ich hinrobben, wenn auch unter Schmerzen...");
                }
                break;

            case 'tree2':
                if (isMarked("btn_view")) {
                    if (!this.levelData.includes("treeViewedOnce")) {
                        this.levelData.push("treeViewedOnce");
                        arr_.push("Der zweite Baum in erreichbarer Nähe... da könnte ich auch hinüber robben, wenn auch unter noch mehr Schmerzen...");
                        arr_.push("...jedoch nicht einfach so zum Spass. Erst sollte ich mir den Baum noch genauer ansehen...");
                    } else {
                        if (!this.levelData.includes("treeViewedTwice")) {
                            this.levelData.push("treeViewedTwice");
                            arr_.push("Okay, ja da steht ein weiterer Baum<br>...schon recht gut. Aber der müsste noch genauer inspiziert werden...");
                        } else {
                            arr_.push("Aha, jetzt seh ichs, der hat ein robustes Loch mit soliden Rändern...");
                            arr_.push("Wofür das wohl nützlich sein könnte...");
                        }
                    }
                }
                break;
        }
        return arr_;
    }
};
export { level };

