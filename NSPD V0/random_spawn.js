import * as BABYLON from "@babylonjs/core"

function spawn(mob,plus, plat_joueur_position_y, plat_joueur_height){
    console.log("cc")
    //agrandissement
    if(mob){
        var pos_arriv=6*Math.random()+2
        //plus.visibility = 1;

        BABYLON.Animation.CreateAndStartAnimation(
            "plus_ani",
            plus,
            "position",
            60,
            60,
            new BABYLON.Vector3(-3.5, pos_arriv, 10),
            new BABYLON.Vector3(3.5, pos_arriv, 10),
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
            undefined,
            () => {
                if(pos_arriv + 1 > plat_joueur_position_y - plat_joueur_height / 2 && pos_arriv - 1 < plat_joueur_position_y + plat_joueur_height / 2){
                    //alert("ça touche")
                }
            })
    }
}


function start(plus, plat_joueur_position_y, plat_joueur_height){
    setTimeout(spawn(Math.floor(Math.random() * 3), plus, plat_joueur_position_y, plat_joueur_height), Math.floor(Math.random() * 5000));
}

export {start}