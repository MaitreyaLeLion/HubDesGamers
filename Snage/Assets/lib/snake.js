import * as BABYLON from "@babylonjs/core";
import {
  createHeadMaterial,
  createBodyStraightMaterial,
  createBodyCurvedRightMaterial,
  createBodyCurvedLeftMaterial,
  createTailMaterial,
  createAppleMaterial,
  createGround2DMaterial,
} from "@materials";

class Snake {
  constructor(scene, taille, parent) {
    this.parent = parent;
    this.scene = scene;
    this.taille = taille;
    this.snake = [];
    this.direction = new BABYLON.Vector3(0, 0, 1);
    this.snake.push(
      BABYLON.MeshBuilder.CreatePlane("snakeSection1", { size: 1 }, scene)
    );
    this.snake.push(
      BABYLON.MeshBuilder.CreatePlane("snakeSection2", { size: 1 }, scene)
    );
    this.snake[0].material = this.headMaterial;
    this.createMaterials();
    this.controles();
    this.snake[0].rotation.x = Math.PI / 2;
    this.snake[0].rotation.z = Math.PI / 2;
    this.snake[1].rotation.x = Math.PI / 2;
    this.snake[1].rotation.z = Math.PI / 2;
    this.snake[0].position = new BABYLON.Vector3(-0.5, 0, -0.5);

    this.updateSnake();
  }
  controles() {
    this.scene.onKeyboardObservable.add((kbInfo) => {
      if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
        if (
          (kbInfo.event.key === "ArrowUp" ||
            kbInfo.event.key === "z" ||
            kbInfo.event.key === "w") &&
          this.snake[0].position.x != this.snake[1].position.x
        ) {
          this.direction = new BABYLON.Vector3(0, 0, -1);
        } else if (
          (kbInfo.event.key === "ArrowDown" || kbInfo.event.key === "s") &&
          this.snake[0].position.x != this.snake[1].position.x
        ) {
          this.direction = new BABYLON.Vector3(0, 0, 1);
        } else if (
          (kbInfo.event.key === "ArrowLeft" ||
            kbInfo.event.key === "q" ||
            kbInfo.event.key === "a") &&
          this.snake[0].position.z != this.snake[1].position.z
        ) {
          this.direction = new BABYLON.Vector3(1, 0, 0);
        } else if (
          (kbInfo.event.key === "ArrowRight" || kbInfo.event.key === "d") &&
          this.snake[0].position.z != this.snake[1].position.z
        ) {
          this.direction = new BABYLON.Vector3(-1, 0, 0);
        }
      }
    });
  }
  createMaterials() {
    this.headMaterial = createHeadMaterial(this.scene);
    this.bodyStraightMaterial = createBodyStraightMaterial(this.scene);
    this.bodyCurvedRightMaterial = createBodyCurvedRightMaterial(this.scene);
    this.bodyCurvedLeftMaterial = createBodyCurvedLeftMaterial(this.scene);
    this.tailMaterial = createTailMaterial(this.scene);
    this.appleMaterial = createAppleMaterial(this.scene);
    this.ground2DMaterial = createGround2DMaterial(this.scene);
  }
  resetGame() {
    // Réinitialise la position du serpent
    this.snake[0].position = new BABYLON.Vector3(-0.5, 0, -0.5);
    this.snake[1].position = new BABYLON.Vector3(-0.5, 0, -1.5);

    while (this.snake.length > 2) {
      this.snake.pop().dispose();
    }

    // Réinitialise la direction
    this.direction = new BABYLON.Vector3(0, 0, 1);
  }

  updateSnakePosition() {
    for (let i = this.snake.length - 1; i > 0; i--) {
      this.snake[i].position.copyFrom(this.snake[i - 1].position);
      this.snake[i].rotation.y = this.snake[i - 1].rotation.y;
      this.updateSnakeMaterial(i);
    }
    this.snake[this.snake.length - 1].material = this.tailMaterial;
    this.snake[0].material = this.headMaterial;
    this.updateSnakeHeadRotation();
    this.snake[0].position.addInPlace(this.direction);
  }

  updateSnakeMaterial(i) {
    if (i > 1 && this.snake[i - 1].rotation.y != this.snake[i - 2].rotation.y) {
      if (
        !(this.snake[i - 1].rotation.y / -2 === this.snake[i - 2].rotation.y) &&
        (this.snake[i - 1].rotation.y - this.snake[i - 2].rotation.y > 0 ||
          this.snake[i - 1].rotation.y === this.snake[i - 2].rotation.y / -2)
      ) {
        this.snake[i].material = this.bodyCurvedLeftMaterial;
      } else {
        this.snake[i].material = this.bodyCurvedRightMaterial;
      }
    } else {
      this.snake[i].material = this.bodyStraightMaterial;
    }
  }

  updateSnakeHeadRotation() {
    if (this.direction.x === 1) {
      this.snake[0].rotation.y = Math.PI;
    } else if (this.direction.x === -1) {
      this.snake[0].rotation.y = 0;
    } else if (this.direction.z === 1) {
      this.snake[0].rotation.y = Math.PI / 2;
    } else if (this.direction.z === -1) {
      this.snake[0].rotation.y = -Math.PI / 2;
    }
  }

  checkCollisionWithSelf() {
    const position0 = this.snake[0].position;
    for (let i = 1; i < this.snake.length; i++) {
      if (position0.equals(this.snake[i].position)) {
        this.resetGame();
      }
    }
  }

  checkCollisionWithBorders() {
    if (
      this.snake[0].position.x < -(this.taille - 1.5) ||
      this.snake[0].position.x > this.taille - 1.5 ||
      this.snake[0].position.z < -(this.taille - 1.5) ||
      this.snake[0].position.z > this.taille - 1.5
    ) {
      this.resetGame();
    }
  }

  eatApple() {
    if (this.snake[0].position.equals(this.parent.pomme.position)) {
      this.parent.AppleEaten();
      this.growSnake();
    }
  }

  growSnake() {
    const snakeI = this.snake.length;
    this.snake.push(
      BABYLON.MeshBuilder.CreateBox(
        `snakeSection${snakeI + 1}`,
        { size: 1 },
        this.scene
      )
    );
    this.snake[snakeI].material = this.tailMaterial;
    this.snake[snakeI - 1].material = this.bodyStraightMaterial;
    this.snake[snakeI].position.x =
      this.snake[snakeI - 1].position.x -
      this.snake[snakeI - 2].position.x +
      this.snake[snakeI - 1].position.x;
    this.snake[snakeI].position.y = 0;
    this.snake[snakeI].position.z =
      this.snake[snakeI - 1].position.z -
      this.snake[snakeI - 2].position.z +
      this.snake[snakeI - 1].position.z;
  }

  updateSnake() {
    this.updateSnakePosition();
    this.eatApple();
    this.checkCollisionWithSelf();
    this.checkCollisionWithBorders();
  }
}

const createSnake = (scene, taille, parent) => {
  return new Snake(scene, taille, parent);
};

export { createSnake };
