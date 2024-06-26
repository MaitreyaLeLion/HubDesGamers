import { createScene2D } from "/HubDesGamers/src/assets/Snage/lib/scene2d.js";

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
// resize the canvas when the window is resized
window.addEventListener("resize", function () {
  const camera = scene2D._activeCamera;
  const newAspectRatio = engine.getRenderWidth() / engine.getRenderHeight();
  camera.orthoTop = camera.orthoRight / newAspectRatio;
  camera.orthoBottom = camera.orthoLeft / newAspectRatio;
  scene2D.getEngine().resize();
});
