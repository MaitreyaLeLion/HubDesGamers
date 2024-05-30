import { createScene3D } from "/HubDesGamers/src/assets/SnakeOfDoom/lib/scene3d.js";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

const scene3D = createScene3D(engine);

let sceneToRender = scene3D;

let startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender.camera) {
      const camera = scene3D.camera;
      scene3D.scene.render();
    }
  });
};
startRenderLoop(engine, canvas);

window.addEventListener("resize", function () {
  scene3D.getEngine().resize();
});
