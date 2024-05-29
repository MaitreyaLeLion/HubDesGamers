//import * as BABYLON from "@babylonjs/core";

var diff_ia = 1;//1:facile, 2:moyen, 3:dur, 4: imbattable (littérallement)
	
	function changerVariable() {
		var menuDeroulant = document.getElementById("menuDeroulant");
		//diff_ia=diff;
		
		if(menuDeroulant.value=="option1"){
			diff_ia=1;
		}
		if(menuDeroulant.value=="option2"){
			diff_ia=2;
		}
		if(menuDeroulant.value=="option3"){
			diff_ia=3;
		}
		if(menuDeroulant.value=="option4"){
			diff_ia=4;
		}
		
	}
//export {changerVariable}