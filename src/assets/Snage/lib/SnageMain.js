import { createScene2D } from "/Snage/Assets/lib/scene2d.js";
import * as BABYLON from "./../../node_modules/@babylonjs/core";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const taille = 8;

const scene2D = createScene2D(engine, taille);

let sceneToRender = scene2D;

let startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender) {
      sceneToRender.scene.render();
    }
  });
};

startRenderLoop(engine, canvas);

window.addEventListener("resize", function () {
  const camera = scene2D._activeCamera;
  const newAspectRatio = engine.getRenderWidth() / engine.getRenderHeight();
  camera.orthoTop = camera.orthoRight / newAspectRatio;
  camera.orthoBottom = camera.orthoLeft / newAspectRatio;
  scene2D.getEngine().resize();
});
