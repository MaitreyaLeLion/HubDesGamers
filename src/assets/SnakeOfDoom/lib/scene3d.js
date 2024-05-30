import {
  spawnGreenApple,
  spawnRedApple,
} from "/HubDesGamers/src/assets/SnakeOfDoom/lib/enemie.js";
import { createPlayer3D } from "/HubDesGamers/src/assets/SnakeOfDoom/lib/player3d.js";

class Scene3D {
  constructor(engine) {
    this.engine = engine;

    this.models = [];
    this.isActive = false;
    this.createScene();
  }
  async createPhysicsEngine() {
    this.HK = await HavokPhysics();
  }
  createScene() {
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    this.scene.collisionsEnabled = true;
    this.scene.parent = this;
    this.createPhysicsEngine()
      .then(() => {
        this.physicsPlugin = new BABYLON.HavokPlugin(true, this.HK);
        this.scene.enablePhysics(this.scene.gravity, this.physicsPlugin);
        this.createCamera();

        this.player = createPlayer3D(
          this.scene,
          new BABYLON.Vector3(0, 1, -1),
          this.camera
        );

        this.apples = [];
        this.apples.push(
          spawnRedApple(this.scene, new BABYLON.Vector3(0, 1, 0))
        );
        setInterval(() => {
          this.update();
        }, 16);
      })
      .then(() => {
        this.addGlbModelToScene(
          "/HubDesGamers/src/assets/SnakeOfDoom/models/",
          "Level_1_LowPoly.glb",
          new BABYLON.Vector3(0, -4, 0),
          true
        );
      });

    this.scene.createDefaultLight();
    this.scene.actionManager = new BABYLON.ActionManager(this.scene);
  }

  createCamera() {
    this.camera = new BABYLON.UniversalCamera(
      "UniversalCamera",
      new BABYLON.Vector3(0, 1, -1),
      this.scene
    );
    this.camera.applyGravity = true;
    this.camera.speed = 0.5;
    this.camera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera's controls to the canvas
    const canvas = this.engine.getRenderingCanvas();
    this.camera.attachControl(canvas, true, false, false);

    // Create a sphere mesh and parent it to the camera
    canvas.addEventListener("click", function () {
      // Lock the pointer to the canvas
      canvas.requestPointerLock =
        canvas.requestPointerLock || canvas.mozRequestPointerLock;
      canvas.requestPointerLock();
    });

    canvas.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        canvas.exitPointerLock();
      }
    });
    // Set the angular sensitivity (lower value means slower mouse movement)
    this.camera.angularSensitivity = 1500;

    // Remove inertia
    this.camera.inertia = 0;
  }

  spawnRandomGreenApple() {
    this.apples.push(
      spawnGreenApple(
        this.scene,
        new BABYLON.Vector3(
          Math.floor(Math.random() * 10) - 5,
          1,
          Math.floor(Math.random() * 10) - 5
        )
      )
    );
  }
  async addGlbModelToScene(
    modelUrl,
    file,
    position,
    doesCollide = false,
    gravity = false
  ) {
    const { meshes } = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      modelUrl,
      file,
      this.scene
    );

    this.scene.enablePhysics(position, this.physicsPlugin);

    meshes.forEach((mesh) => {
      mesh.position = position;

      if (doesCollide && mesh.getTotalVertices() > 0) {
        mesh.checkCollisions = true;
        mesh.physicsAggregate = new BABYLON.PhysicsAggregate(
          mesh,
          BABYLON.PhysicsShapeType.MESH,
          { mass: 0, friction: 500, restitution: 0 },
          this.scene
        );
        mesh.physicsAggregate.body = mesh;
      }
    });
  }

  toggle() {
    this.isActive = !this.isActive;
  }
  deactivateEnemy() {
    this.apples.forEach((apple) => {
      apple.sprite.dispose();
      apple.spriteManager.dispose();
      this.apples.splice(this.apples.indexOf(apple), 1);
    });
  }
  update() {
    this.player.checkCollision();
    this.apples.forEach((apple) => {
      if (apple.life <= 0) {
        this.apples.splice(this.apples.indexOf(apple), 1);
        this.spawnRandomGreenApple();
      }
    });
  }
}

const createScene3D = function (engine) {
  return new Scene3D(engine);
};

export { createScene3D };
