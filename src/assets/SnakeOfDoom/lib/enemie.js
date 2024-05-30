import { spawnRedAppleProjectile } from "/HubDesGamers/src/assets/SnakeOfDoom/lib/attacks.js";

class GreenApple {
  constructor(scene, position) {
    this.name = "greenApple";
    this.life = 100;

    this.spriteManager = new BABYLON.SpriteManager(
      "greenAppleManager",
      "/HubDesGamers/src/assets/SnakeOfDoom/textures/GreenAppleSprites.png",
      1,
      { width: 16, height: 16 },
      scene
    );
    this.spriteManager.pixelPerfect = true;

    this.sprite = new BABYLON.Sprite("greenApple", this.spriteManager);
    this.sprite.cellIndex = 0;
    this.sprite.size = 2;
    this.sprite.position = position;
    this.sprite.parent = this;
  }

  // Method to reduce the life of the apple
  reduceLife(amount) {
    this.life -= amount;
    if (this.life <= 0) {
      console.log("dead");
      this.sprite.dispose();
      this.spriteManager.dispose();
    }
  }
}

class RedApple {
  constructor(scene, position) {
    this.name = "redApple";
    this.life = 200;
    this.scene = scene;

    this.spriteManager = new BABYLON.SpriteManager(
      "redAppleManager",
      "/HubDesGamers/src/assets/SnakeOfDoom/textures/RedAppleSprites.png",
      1,
      { width: 16, height: 16 },
      scene
    );
    this.spriteManager.pixelPerfect = true;

    this.sprite = new BABYLON.Sprite("redApple", this.spriteManager);
    this.sprite.cellIndex = 0;
    this.sprite.size = 2;
    this.sprite.position = position;
    this.sprite.parent = this;
    // if (this.sprite) {
    //   new BABYLON.PhysicsAggregate(
    //     this.sprite,
    //     BABYLON.PhysicsShapeType.CAPSULE,
    //     { mass: 80, friction: 5000, restitution: 0 },
    //     this.scene
    //   );
    // }

    this.attackInterval = setInterval(() => {
      this.attack();
    }, 5000);
  }

  attack() {
    const target = this.scene.parent.player.body.position;
    const direction = target.subtract(this.sprite.position).normalize();
    spawnRedAppleProjectile(this.scene, this.sprite.position, direction);
  }
  reduceLife(amount) {
    this.life -= amount;
    if (this.life <= 0) {
      console.log("dead");
      clearInterval(this.attackInterval);
      this.attackInterval = null;
      this.sprite.dispose();
      this.spriteManager.dispose();
    }
  }
}

function spawnGreenApple(scene, position) {
  return new GreenApple(scene, position);
}
function spawnRedApple(scene, position) {
  return new RedApple(scene, position);
}

export { spawnGreenApple, spawnRedApple };
