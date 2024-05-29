import { createSnake } from "/Snage/Assets/lib/snake.js";
import {
  createGround2DMaterial,
  createAppleMaterial,
} from "/Snage/Assets/lib/materials.js";
import * as BABYLON from "/../../node_modules/@babylonjs/core";

class Scene2D {
  constructor(engine, taille) {
    this.engine = engine;
    this.taille = taille;
    this.renderSpeed = 125;
    this.scene = new BABYLON.Scene(engine);
    this.scene.createDefaultLight();
    this.createCamera();
    this.createGround();
    this.pomme = this.spawnRandomSphere(
      -(taille - 1.5),
      taille - 1.5,
      -(taille - 1.5),
      taille - 1.5
    );
    this.snake = createSnake(this.scene, taille, this);
    this.interval = setInterval(() => {
      this.updateScene();
    }, this.renderSpeed);
  }
  createCamera() {
    this.camera = new BABYLON.FreeCamera(
      "camera",
      new BABYLON.Vector3(0, 5, 0),
      this.scene
    );
    this.camera.rotation.z = Math.PI;
    this.camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    const newAspectRatio =
      this.engine.getRenderWidth() / this.engine.getRenderHeight();
    this.camera.orthoTop = this.taille;
    this.camera.orthoBottom = -this.taille;
    this.camera.orthoLeft = -this.taille * newAspectRatio;
    this.camera.orthoRight = this.taille * newAspectRatio;
    this.camera.rotation.x = Math.PI / 2;
  }
  createGround() {
    this.ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: this.taille * 2 - 2, height: this.taille * 2 - 2 },
      this.scene
    );
    this.ground.position.x = 0;
    this.ground.position.z = 0;
    this.ground.position.y = this.camera.position.y - 5;
    this.ground.material = createGround2DMaterial(this.scene);
  }
  spawnRandomSphere(minX, maxX, minZ, maxZ) {
    const randomX = Math.floor(Math.random() * (maxX - minX) + minX) + 0.5;
    const randomZ = Math.floor(Math.random() * (maxZ - minZ) + minZ) + 0.5;
    const sphere = BABYLON.MeshBuilder.CreateSphere(
      "pomme",
      { diameter: 1 },
      this.scene
    );
    sphere.position = new BABYLON.Vector3(randomX, 0, randomZ);
    sphere.material = createAppleMaterial(this.scene);
    return sphere;
  }
  AppleEaten() {
    this.pomme.dispose();
    this.pomme = this.spawnRandomSphere(
      -(this.taille - 1.5),
      this.taille - 1.5,
      -(this.taille - 1.5),
      this.taille - 1.5
    );
  }
  updateScene() {
    this.snake.updateSnake();
  }
}

function createScene2D(engine, taille) {
  return new Scene2D(engine, taille);
}

export { createScene2D };
