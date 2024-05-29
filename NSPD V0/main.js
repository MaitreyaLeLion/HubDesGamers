import { load } from "@loader";
import { start } from "@random_spawn";
import { score } from "@score";

var canvas = document.getElementById("renderCanvas");



var engine = new BABYLON.Engine(canvas);
var scene = null;
var sceneToRender = null;


var createScene = function () {
	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);

	document.body.style.cursor = "none";

	// Create a locked free camera
	var camera = new BABYLON.FreeCamera(
		"camera1",
		new BABYLON.Vector3(0, 5, -10),
		scene
	);

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	var light = new BABYLON.HemisphericLight(
		"light",
		new BABYLON.Vector3(0, 0, -1),
		scene
	);
	var directionalLight = new BABYLON.DirectionalLight(
		"dir01",
		new BABYLON.Vector3(0, -1, 0),
		scene
	);
	directionalLight.position = new BABYLON.Vector3(0, 50, 0);
	directionalLight.shadowEnabled = true;
	directionalLight.diffuse = new BABYLON.Color3(1, 1, 1); // Couleur de la lumière
	directionalLight.specular = new BABYLON.Color3(0.5, 0.5, 0.5);

	// Default intensity is 1. Let's dim the light a small amount
	light.intensity = 0.3;
	//directionalLight.intensity=2;
	load(scene);

	//box.position = new BABYLON.Vector3(0,7, 0);
	//box.rotation= new BABYLON.Vector3(0,0,);;

	//dimensions
	const rect_fin_width = 0.05;
	const rectangle_width = 8;
	const rectangle_height = 5;
	var plat_joueur_width = 0.2;
	var plat_joueur_height = 1.0;
	var plat_joueur_height_update = plat_joueur_height;
	var plat_ordi_width = 0.2;
	var plat_ordi_height = 1.0;
	var plat_ordi_height_fixe = plat_ordi_height;
	var ball_diameter = 0.6;
	var rotation = -1;
	var tri_x = 1;
	const tri_rad = 0.15;

	var troisd = 1; //1:3D, 0:2D
	//var diff_ia = 1;//1:facile, 2:moyen, 3:dur, 4: imbattable (littérallement)

	if (troisd == 1) {
		var haut_tri = 7.5 - tri_rad;
	} else {
		var haut_tri = 7.4;
	}

	var plus = BABYLON.MeshBuilder.CreatePlane(
		"plus",
		{ width: 2, height: 2 },
		scene
	);
	plus.position = new BABYLON.Vector3(-3.5, 5, 10);
	plus.material = new BABYLON.StandardMaterial("plusMaterial", scene);
	plus.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
	plus.visibility = 0;

	var rectangle = BABYLON.MeshBuilder.CreatePlane(
		"rectangle",
		{ width: rectangle_width, height: rectangle_height },
		scene
	);
	rectangle.material = new BABYLON.StandardMaterial("rectangleMaterial", scene);
	rectangle.material.diffuseColor = new BABYLON.Color3(0.19, 0.19, 0.19);
	rectangle.position = new BABYLON.Vector3(0, 5, 0);

	if (troisd == 1) {
		var rect_fin_o = BABYLON.MeshBuilder.CreateCylinder(
			"rect_fin_o",
			{
				diameterTop: rect_fin_width,
				diameterBottom: rect_fin_width,
				height: rectangle_height,
			},
			scene
		);
		var rect_fin_j = BABYLON.MeshBuilder.CreateCylinder(
			"rect_fin_j",
			{
				diameterTop: rect_fin_width,
				diameterBottom: rect_fin_width,
				height: rectangle_height,
			},
			scene
		);
		var plat_joueur = BABYLON.MeshBuilder.CreateCylinder(
			"plat_joueur",
			{
				diameterTop: plat_joueur_width,
				diameterBottom: plat_joueur_width,
				height: plat_joueur_height,
			},
			scene
		);
		var plat_ordi = BABYLON.MeshBuilder.CreateCylinder(
			"plat_ordi",
			{
				diameterTop: plat_joueur_width,
				diameterBottom: plat_joueur_width,
				height: plat_joueur_height,
			},
			scene
		);
	} else {
		var rect_fin_o = BABYLON.MeshBuilder.CreatePlane(
			"rect_fin_o",
			{ width: rect_fin_width, height: rectangle_height },
			scene
		);
		var rect_fin_j = BABYLON.MeshBuilder.CreatePlane(
			"rect_fin_j",
			{ width: rect_fin_width, height: rectangle_height },
			scene
		);
		var plat_joueur = BABYLON.MeshBuilder.CreatePlane(
			"plat_joueur",
			{ width: plat_joueur_width, height: plat_joueur_height },
			scene
		);
		var plat_ordi = BABYLON.MeshBuilder.CreatePlane(
			"plat_ordi",
			{ width: plat_ordi_width, height: plat_ordi_height },
			scene
		);
	}
	rect_fin_o.material = new BABYLON.StandardMaterial(
		"rect_fin_oMaterial",
		scene
	);
	rect_fin_o.material.diffuseColor = new BABYLON.Color3(0.92, 0.93, 0.92);
	rect_fin_o.position = new BABYLON.Vector3(-3.5, 5, 0);

	rect_fin_j.material = new BABYLON.StandardMaterial(
		"rect_fin_jMaterial",
		scene
	);
	rect_fin_j.material.diffuseColor = new BABYLON.Color3(0.92, 0.93, 0.92);
	rect_fin_j.position = new BABYLON.Vector3(3.5, 5, 0);

	if (troisd == 1) {
		for (var i = 0; i < 5; i++) {
			var triangle = BABYLON.MeshBuilder.CreateCylinder(
				"Triangle",
				{ diameterTop: 0, diameterBottom: tri_rad, height: 2 * tri_rad },
				scene
			);
			triangle.material = new BABYLON.StandardMaterial(
				"triangleMaterial",
				scene
			);
			triangle.material.diffuseColor = new BABYLON.Color3(0.75, 0.9, 0.75);
			triangle.position = new BABYLON.Vector3(tri_x * 3.5, haut_tri, 0);
			triangle.rotation = new BABYLON.Vector3(0, 0, rotation * Math.PI);
			if (i > 1) {
				tri_x = -1;
			}
			if (haut_tri == 7.5 - tri_rad) {
				haut_tri = 2.5 + tri_rad;
				rotation = 0;
			} else {
				haut_tri = 7.5 - tri_rad;
				rotation = -1;
			}
		}
	} else {
		for (var i = 0; i < 5; i++) {
			var triangle = BABYLON.MeshBuilder.CreateDisc(
				"Triangle",
				{ radius: tri_rad, tessellation: 3 },
				scene
			);
			triangle.material = new BABYLON.StandardMaterial(
				"triangleMaterial",
				scene
			);
			triangle.material.diffuseColor = new BABYLON.Color3(0.92, 0.93, 0.92);
			triangle.position = new BABYLON.Vector3(tri_x * 3.5, haut_tri, 0);
			triangle.rotation = new BABYLON.Vector3(0, 0, (rotation * Math.PI) / 2);
			if (i > 1) {
				tri_x = -1;
			}
			if (haut_tri == 7.5 - tri_rad / 2) {
				haut_tri = 2.5 + tri_rad / 2;
				rotation = 1;
			} else {
				haut_tri = 7.5 - tri_rad / 2;
				rotation = -1;
			}
		}
	}

	plat_joueur.material = new BABYLON.StandardMaterial(
		"plat_joueurMaterial",
		scene
	);
	if (troisd == 1) {
		plat_joueur.material.diffuseColor = new BABYLON.Color3(0.02, 0.45, 0.45);
	} else {
		plat_joueur.material.diffuseColor = new BABYLON.Color3(0.92, 0.93, 0.92);
	}
	plat_joueur.position = new BABYLON.Vector3(3.5, 5, 0);

	plat_ordi.material = new BABYLON.StandardMaterial("plat_ordiMaterial", scene);
	plat_ordi.material.diffuseColor = new BABYLON.Color3(0.02, 0.45, 0.45);
	plat_ordi.position = new BABYLON.Vector3(-3.5, 5, -rect_fin_width / 2);

	var ball = BABYLON.MeshBuilder.CreateSphere(
		"ball",
		{ diameter: ball_diameter },
		scene
	);
	ball.material = new BABYLON.StandardMaterial("ballMaterial", scene);
	ball.material.diffuseColor = new BABYLON.Color3(0.08, 0.08, 0.08); // Red color
	ball.position = new BABYLON.Vector3(-3.5, 5, 0);

	var carre = function (x) {
		return x * x;
	};

	function delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/*
    scene.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                handleKeyDown(kbInfo.event.key);
                break;
        }
    });

    function handleKeyDown(key) {
        var speed = 0.5; // Adjust the speed as needed
        switch (key) {
            case "ArrowUp":
                plat_joueur.position.y += speed;
                break;
            case "ArrowDown":
                plat_joueur.position.y -= speed;
                break;
        }
    }
    */

	canvas.addEventListener("pointermove", function (event) {
		plat_joueur.position.y =
			(window.innerHeight - event.clientY) * (10 / window.innerHeight); // Adjust sensitivity
		if (
			plat_joueur.position.y >
			7.5 - ball_diameter / 2 - plat_joueur_height / 2
		) {
			plat_joueur.position.y = 7.5 - ball_diameter / 2 - plat_joueur_height / 2;
		}
		if (
			plat_joueur.position.y <
			2.5 + ball_diameter / 2 + plat_joueur_height / 2
		) {
			plat_joueur.position.y = 2.5 + ball_diameter / 2 + plat_joueur_height / 2;
		}
		if (plat_ordi.position.y > 7.5 - ball_diameter / 2 - plat_ordi_height / 2) {
			plat_ordi.position.y = 7.5 - ball_diameter / 2 - plat_ordi_height / 2;
		}
		if (plat_ordi.position.y < 2.5 + ball_diameter / 2 + plat_ordi_height / 2) {
			plat_ordi.position.y = 2.5 + ball_diameter / 2 + plat_ordi_height / 2;
		}
	});

	var coordX = 3.1;
	var coordY = 3 * Math.random() + 3.5;

	/*
    var animation = new BABYLON.Animation(
        "ballAnimation",
        "position",
        30,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
    );

    // Animation keys
    var keys = [
        { frame: 0, value: ball.position.clone()},
        { frame: 30, value: new BABYLON.Vector3(coordX, coordY, 0)  } // Adjust the distance as needed
    ];

    animation.setKeys(keys);
    ball.animations = [animation];
    scene.beginAnimation(ball, 0, 30, false)

    */
	var premier_re = 0;
	var Position_contact_y = 0;
	var x0 = 0;
	var y0 = 0;
	var a = 0;
	var b = 0;
	var anc_coordX = 0;
	var anc_coordY = 0;
	var f1 = 30;
	var f2 = 30;
	var f3 = 5; //vitesse ordi
	var speed = 5; //(décroissante)

	var coordY_o = 0;
	var tour = 1; //si tour==1, tour joueur, sinon tour==-1
	var ecart = 0;

	var point_critique = 0;

	var loop = 0;
	var pos_pong = 0;

	for (let i = 0; i < 50; i++) {
		var sphere = BABYLON.MeshBuilder.CreateSphere(
			"sphere" + i,
			{ diameter: 0.2 },
			scene
		);
		sphere.position = new BABYLON.Vector3(0, 5, 0);
		sphere.material = new BABYLON.StandardMaterial("sphereMaterial", scene);
		sphere.material.diffuseColor = new BABYLON.Color3(0.84, 0.2, 0.2);
		sphere.visibility = 0;
	}

	for (let i = 50; i < 100; i++) {
		var sphere = BABYLON.MeshBuilder.CreateSphere(
			"sphere" + i,
			{ diameter: 0.2 },
			scene
		);
		sphere.position = new BABYLON.Vector3(0, 5, 0);
		sphere.material = new BABYLON.StandardMaterial("sphereMaterial", scene);
		sphere.material.diffuseColor = new BABYLON.Color3(0.31, 0.69, 0.33);
		sphere.visibility = 0;
	}

	var animation_disparition = function (X, Y) {
		ball.position.x = 0;
		ball.position.y = 5;
		ball.visibility = 0;

		if (X < 0) {
			loop = 50;
			coordX = 3.1;
			score(2);
		} else {
			loop = 0;
			coordX = -3.1;
			score(1);
		}

		for (let i = loop; i < loop + 50; i++) {
			scene.getMeshByName("sphere" + i).visibility = 1;
			BABYLON.Animation.CreateAndStartAnimation(
				"ballkaboom",
				scene.getMeshByName("sphere" + i),
				"position",
				60,
				60,
				new BABYLON.Vector3(X, Y, 0),
				new BABYLON.Vector3(
					10 * Math.random() - 5 + X,
					10 * Math.random() - 5 + Y,
					0
				),
				BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
				undefined,
				() => {
					if (i == 49 + loop) {
						for (let i = loop; i < loop + 50; i++) {
							BABYLON.Animation.CreateAndStartAnimation(
								"ballcentre",
								scene.getMeshByName("sphere" + i),
								"position",
								60,
								60,
								scene.getMeshByName("sphere" + i).position.clone(),
								new BABYLON.Vector3(0, 5, 0),
								BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
								undefined,
								() => {
									if (i == 49 + loop) {
										ball.visibility = 1;
										for (let i = loop; i < loop + 50; i++) {
											scene.getMeshByName("sphere" + i).visibility = 0;
										}

										coordY = 3 * Math.random() + 3.5;
										f2 = speed * Math.abs(ball.position.x - coordX);
										deplacement_boule();
										coordY_o =
											Math.random() * (plat_ordi_height_fixe + ball_diameter) +
											coordY -
											plat_ordi_height_fixe / 2 -
											ball_diameter / 2;
										if (
											coordY_o >
											7.5 - ball_diameter / 2 - plat_ordi_height / 2
										) {
											coordY_o =
												(ball_diameter + plat_ordi_height / 2 - 1) *
													Math.random() +
												7.5 -
												ball_diameter -
												plat_ordi_height / 2;
											point_critique = 1;
										}
										if (
											coordY_o <
											2.5 + ball_diameter / 2 + plat_ordi_height / 2
										) {
											coordY_o =
												(ball_diameter + plat_ordi_height / 2 - 1) *
													Math.random() +
												3.5;
											point_critique = 1;
										}
										f2 = speed * Math.abs(ball.position.x - coordX);
										if (diff_ia == 4) {
											f3 = speed * Math.abs(ball.position.x - coordX);
										} else {
											//f3 = 1/(diff_ia)*speed * Math.abs(plat_ordi.position.y - coordY_o);
											f3 = speed * Math.abs(ball.position.x - coordX);
										}
										deplacement_ordi();
									}
								}
							);
						}
					}
				}
			);
		}
	};

	var deplacement_ordi = function () {
		BABYLON.Animation.CreateAndStartAnimation(
			"ordiAnimation",
			plat_ordi,
			"position",
			f1,
			f3,
			plat_ordi.position.clone(),
			new BABYLON.Vector3(-3.5, coordY_o, -rect_fin_width / 2),
			BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
			undefined
		);
	};
	//() => {

	var deplacement_boule = function () {
		BABYLON.Animation.CreateAndStartAnimation(
			"ballAnimation",
			ball,
			"position",
			f1,
			f2,
			ball.position.clone(),
			new BABYLON.Vector3(coordX, coordY, 0),
			BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
			undefined,
			() => {
				//test de collision joueur :
				if (ball.position.x == 3.1) {
					if (
						ball.position.y + ball_diameter / 2 >
							plat_joueur.position.y - plat_joueur_height / 2 &&
						ball.position.y - ball_diameter / 2 <
							plat_joueur.position.y + plat_joueur_height / 2
					) {
						//top
						if (
							ball.position.y >
							plat_joueur.position.y + plat_joueur_height / 6
						) {
							Position_contact_y = ball.position.y;
							coordX =
								(5.8 / 0.8) *
									(ball.position.y -
										(plat_joueur.position.y + plat_joueur_height / 6)) -
								3.1;
							if (
								plat_joueur.position.y >
								7.5 - ball_diameter - plat_joueur_height / 2
							) {
								coordY = 2.5 + ball_diameter / 2;
							} else {
								coordY = 7.5 - ball_diameter / 2;
							}
							premier_re = 1;
						}

						//bottom
						else if (
							ball.position.y <
							plat_joueur.position.y - plat_joueur_height / 6
						) {
							Position_contact_y = ball.position.y;
							coordX =
								(-5.8 / 0.8) *
									(ball.position.y -
										(plat_joueur.position.y - plat_joueur_height / 6)) -
								3.1;
							if (
								plat_joueur.position.y <
								2.5 + ball_diameter + plat_joueur_height / 2
							) {
								coordY = 7.5 - ball_diameter / 2;
							} else {
								coordY = 2.5 + ball_diameter / 2;
							}
							premier_re = 1;
						}

						//middle
						else {
							coordX = -3.1; //fixe, x=-3.1
							coordY = 6 * (ball.position.y - plat_joueur.position.y) + 5;
						}

						coordY_o =
							Math.random() * (plat_ordi_height_fixe + ball_diameter) +
							coordY -
							plat_ordi_height_fixe / 2 -
							ball_diameter / 2;
						if (coordY_o > 7.5 - ball_diameter / 2 - plat_ordi_height / 2) {
							coordY_o =
								(ball_diameter + plat_ordi_height / 2 - 1) * Math.random() +
								7.5 -
								ball_diameter -
								plat_ordi_height / 2;
							point_critique = 1;
						}
						if (coordY_o < 2.5 + ball_diameter / 2 + plat_ordi_height / 2) {
							coordY_o =
								(ball_diameter + plat_ordi_height / 2 - 1) * Math.random() +
								3.5;
							point_critique = 1;
						}
						f2 = speed * Math.abs(ball.position.x - coordX);
						if (diff_ia == 4) {
							f3 = speed * Math.abs(ball.position.x - coordX);
						} else {
							//f3 = 1/(diff_ia)*speed * Math.abs(plat_ordi.position.y - coordY_o);
							f3 = 8 * speed * (1 / diff_ia);
						}
						deplacement_ordi();

						tour = 1;
						f2 = speed * Math.abs(ball.position.x - coordX);
						deplacement_boule();
					} else {
						animation_disparition(
							ball.position.x + ball_diameter / 2,
							ball.position.y
						);
					}
				}

				//test de collision ordi
				else if (ball.position.x == -3.1) {
					//ça touche ?
					if (
						ball.position.y + ball_diameter / 2 >
							plat_ordi.position.y - plat_ordi_height / 2 &&
						ball.position.y - ball_diameter / 2 <
							plat_ordi.position.y + plat_ordi_height / 2
					) {
						//top
						if (ball.position.y > plat_ordi.position.y + plat_ordi_height / 6) {
							//alert(ball.position.y-(plat_ordi.position.y+plat_ordi_height/6))
							Position_contact_y = ball.position.y;
							coordX = -(
								(5.8 / 0.8) *
									(ball.position.y -
										(plat_ordi.position.y + plat_ordi_height / 6)) -
								3.1
							);
							if (
								plat_ordi.position.y >
								7.5 - ball_diameter - plat_ordi_height / 2
							) {
								coordY = 2.5 + ball_diameter / 2;
							} else {
								coordY = 7.5 - ball_diameter / 2;
							}
							point_critique = 0;
							premier_re = 1;
						}
						//bottom
						else if (
							ball.position.y <
							plat_ordi.position.y - plat_ordi_height / 6
						) {
							Position_contact_y = ball.position.y;
							coordX = -(
								(-5.8 / 0.8) *
									(ball.position.y -
										(plat_ordi.position.y - plat_ordi_height / 6)) -
								3.1
							);
							if (
								plat_ordi.position.y <
								2.5 + ball_diameter + plat_ordi_height / 2
							) {
								coordY = 7.5 - ball_diameter / 2;
							} else {
								coordY = 2.5 + ball_diameter / 2;
							}
							point_critique = 0;
							premier_re = 1;
						}
						//middle
						else {
							coordX = 3.1; //fixe, x=3.1
							coordY = 6 * (ball.position.y - plat_ordi.position.y) + 5;
						}
						f2 = speed * Math.abs(ball.position.x - coordX);
						tour = -1;
						deplacement_boule();
					} else {
						animation_disparition(
							ball.position.x - ball_diameter / 2,
							ball.position.y
						);
						//plat_ordi.scaling.y = 0.5;
						//plat_ordi_height=0.5;
					}
				}
				//rebonds
				else {
					x0 = coordX;
					y0 = coordY;
					if (premier_re == 1) {
						premier_re = 0;
						anc_coordX = coordX;
						anc_coordY = coordY;

						//cas top:
						if (coordY == 7.5 - ball_diameter / 2) {
							coordX =
								tour *
								(tour * coordX -
									(5 - ball_diameter / 2) *
										((3.1 - tour * coordX) / (coordY - Position_contact_y)));
							coordY = 2.5 + ball_diameter / 2;
						}

						//cas bottom
						else {
							coordX =
								tour *
								(tour * coordX -
									(5 - ball_diameter / 2) *
										((3.1 - tour * coordX) / (Position_contact_y - coordY)));
							coordY = 7.5 - ball_diameter / 2;
						}
						ecart = anc_coordX - coordX;
						//console.log(ecart);
					} else {
						coordX = coordX - ecart;

						//cas top
						if (coordY == 7.5 - ball_diameter / 2) {
							coordY = 2.5 + ball_diameter / 2;
						}
						//cas bottom
						else {
							coordY = 7.5 - ball_diameter / 2;
						}
					}

					//troncature
					if (tour * (tour * coordX < -3.1)) {
						//calcul de droite:
						a = (y0 - coordY) / (x0 - coordX);
						b = y0 - a * x0;
						coordY = -tour * a * 3.1 + b;
						coordX = -tour * 3.1;
					}
					//coordY_o=coordY;
					coordY_o =
						Math.random() * (plat_ordi_height_fixe + ball_diameter) +
						coordY -
						plat_ordi_height_fixe / 2 -
						ball_diameter / 2;
					if (coordY_o > 7.5 - ball_diameter / 2 - plat_ordi_height / 2) {
						coordY_o =
							(ball_diameter + plat_ordi_height / 2 - 1) * Math.random() +
							7.5 -
							ball_diameter -
							plat_ordi_height / 2;
						point_critique = 1;
					}
					if (coordY_o < 2.5 + ball_diameter / 2 + plat_ordi_height / 2) {
						coordY_o =
							(ball_diameter + plat_ordi_height / 2 - 1) * Math.random() + 3.5;
						point_critique = 1;
					}
					if (diff_ia == 4) {
						f3 = speed * Math.abs(ball.position.x - coordX);
					} else if (diff_ia == 3) {
						//f3 = 1/(diff_ia)*speed * Math.abs(plat_ordi.position.y - coordY_o);
						f3 = 8 * speed * (1 / diff_ia);
					}
					deplacement_ordi();

					f2 = speed * Math.abs(ball.position.x - coordX);
					deplacement_boule();
				}
			}
		);
	};
	f2 = speed * Math.abs(ball.position.x - coordX);
	deplacement_boule();

	//fonctions de get

	/*
    function get_plat_joueur_pos_y(){
        return plat_joueur.position.y
    }

    function get_plat_joueur_height(){
        return plat_joueur_height
    }    
    */

	var get_plat_joueur_pos_y = () => {
		return plat_joueur_height;
	};

	setInterval(start(plus, plat_joueur.position.y, plat_joueur_height),1000);

	return scene;
};

async function createEngine() {
    return new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil:true, disableWebGL2Support:false})
}

window.initFunction = async function () {

    
    var startRenderLoop = function (engine, canvas) {
        engine.runRenderLoop(function () {
            if (sceneToRender && sceneToRender.activeCamera) {
                
                sceneToRender.render();
            }
        });
    };

    window.engine=await createEngine();
    
	startRenderLoop(window.engine, canvas);
	window.scene = createScene();

};
initFunction().then(() => {
	sceneToRender = window.scene;
});

// Resize
window.addEventListener("resize", function () {
	engine.resize();
});
