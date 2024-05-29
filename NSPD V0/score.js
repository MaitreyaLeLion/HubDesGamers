import * as BABYLON from "@babylonjs/core"
	
	var scoreOrdinateur = 0;
	var scoreJoueur = 0;

	function score(parametre) {

	  if (parametre === 1) {
		scoreOrdinateur++;
	  } else if (parametre === 2) {
		scoreJoueur++;
	  }
	  
	  // Mettre à jour les scores affichés
	  document.getElementById("scoreOrdinateur").textContent = "Score Ordinateur: " + scoreOrdinateur;
	  document.getElementById("scoreJoueur").textContent = "Score Joueur: " + scoreJoueur;
	}
	
export {score}