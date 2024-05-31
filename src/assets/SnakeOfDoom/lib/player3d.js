import { spawnToxicSpit } from "/HubDesGamers/src/assets/SnakeOfDoom/lib/attacks.js";
import {
  getSprites,
  isColliding,
  multiplyByRotation,
} from "/HubDesGamers/src/assets/SnakeOfDoom/lib/globalFunc.js";
import { createGUI } from "/HubDesGamers/src/assets/SnakeOfDoom/lib/playerGUI.js";

class Player3D {
  constructor(scene, position, camera) {
    this.life = 100;
    this.speed = 15;
    this.name = "player";
    this.scene = scene;
    this.lastDamageTime = 0; // add this line
    this.damageDelay = 1000; // delay in milliseconds
    this.body = BABYLON.MeshBuilder.CreateCapsule(
      "player",
      { height: 2, radius: 0.5 },
      this.scene
    );
    new BABYLON.PhysicsAggregate(
      this.body,
      BABYLON.PhysicsShapeType.CAPSULE,
      {
        mass: 80,
        friction: 2,
        restitution: 0,
      },
      this.scene
    );

    this.body.physicsBody.setMassProperties({
      mass: 80,
      inertia: new BABYLON.Vector3(0, 1, 0),
    });
    this.body.position = position;

    this.camera = camera;
    this.camera.position = position;
    this.body.rotation = this.camera.rotation;

    let direction = new BABYLON.Vector3(0, 0, 1);
    // Control definition
    this.controles();
    this.gui = createGUI(this.scene, this.life);
  }
  controles() {
    const inputMap = {};

    this.scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger,
        (evt) => {
          inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }
      )
    );

    this.scene.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyUpTrigger,
        (evt) => {
          inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }
      )
    );

    this.scene.onBeforeRenderObservable.add(() => {
      let direction = new BABYLON.Vector3(0, 0, 0);
      if (this.body && this.body.physicsBody) {
        let velocity = this.body.physicsBody.getLinearVelocity();
        let currentSpeed = velocity.length();

        if ((inputMap["z"] || inputMap["w"]) && currentSpeed < this.speed) {
          console.log("forward");
          this.body.getDirectionToRef(new BABYLON.Vector3(0, 0, 1), direction);
          if (direction) {
            this.body.physicsBody.applyImpulse(
              direction.scale(this.speed),
              new BABYLON.Vector3(0, 0, 0)
            );
          }
        }
        if (inputMap["s"] && currentSpeed < this.speed) {
          this.body.getDirectionToRef(new BABYLON.Vector3(0, 0, 1), direction);
          if (direction) {
            this.body.physicsBody.applyImpulse(
              direction.scale(-this.speed),
              new BABYLON.Vector3(0, 0, 0)
            );
          }
        }
        if (inputMap[" "]) {
          console.log("jump");
          this.body.physicsBody.applyImpulse(
            new BABYLON.Vector3(0, 20, 0),
            new BABYLON.Vector3(0, 0, 0)
          );
        }

        //   if (inputMap["q"]) {
        //     this.camera.rotation.y -= Math.PI / 24;
        //     this.camera.rotation.x = 0; // Fix x rotation
        //     this.camera.rotation.z = 0; // Fix z rotation
        //   }
        //   if (inputMap["d"]) {
        //     this.camera.rotation.y += Math.PI / 24;
        //     this.camera.rotation.x = 0; // Fix x rotation
        //     this.camera.rotation.z = 0; // Fix z rotation
        //   }
      }
      if (inputMap["Shift"]) {
        this.speed = 20;
      } else {
        this.speed = 15; // Reset speed to its original value
      }
      if (inputMap["e"]) {
        spawnToxicSpit(
          this.scene,
          this.body.position,
          this.camera.getDirection(new BABYLON.Vector3(0, 0, 1))
        );
      }
      if (this.camera.rotationQuaternion) {
        this.body.rotationQuaternion = this.camera.rotationQuaternion.clone();
      } else {
        this.body.rotation = this.camera.rotation.clone();
      }
    });
  }

  reduceLife(amount) {
    this.life -= amount;
    if (this.life <= 0) {
      this.body.dispose();
    }
    this.gui.updateHealth(this.life);
  }

  checkCollision() {
    getSprites(this.scene).forEach((otherSprite) => {
      if (isColliding(this.body, otherSprite)) {
        let currentTime = Date.now();
        if (
          otherSprite.name === "greenApple" &&
          currentTime - this.lastDamageTime > this.damageDelay
        ) {
          this.reduceLife(10);

          this.lastDamageTime = currentTime;
        }
      }
    });
  }
}

function createPlayer3D(scene, position, camera) {
  return new Player3D(scene, position, camera);
}

export { createPlayer3D };
