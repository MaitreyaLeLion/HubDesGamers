import {
  getSprites,
  isColliding,
} from "/HubDesGamers/src/assets/SnakeOfDoom/lib/globalFunc.js";

class ToxicSpit {
  constructor(scene, position, direction) {
    this.scene = scene;
    this.name = "toxicSpit";
    this.damage = 10;
    this.speed = 0.05;
    this.range = 10;
    this.hasCollided = false;
    this.spriteManager = new BABYLON.SpriteManager(
      "toxicSpitManager",
      "/HubDesGamers/src/assets/SnakeOfDoom/textures/ToxicSpitSprites.png",
      1,
      { width: 32, height: 32 },
      this.scene
    );
    this.sprite = new BABYLON.Sprite("toxicSpit", this.spriteManager);
    this.sprite.cellIndex = 0;
    this.sprite.size = 1;
    this.sprite.position = new BABYLON.Vector3(
      position.x,
      position.y,
      position.z
    );
    this.direction = direction;
    this.fired();
  }
  checkCollision() {
    getSprites(this.scene).forEach((sprite) => {
      if (this.hasCollided) return;
      if (
        sprite.name.toLowerCase().includes("apple") &&
        !sprite.name.toLowerCase().includes("projectile")
      ) {
        if (isColliding(this.sprite, sprite)) {
          sprite.parent.reduceLife(this.damage);
          this.sprite.dispose();
          this.spriteManager.dispose();
          this.hasCollided = true;
        }
      }
    });
  }

  fired() {
    const rangei = Math.floor(this.range / this.speed);
    for (let i = 0; i < rangei; i++) {
      setTimeout(() => {
        if (i > (2 * rangei) / 3) {
          this.sprite.cellIndex = 2;
        } else if (i > rangei / 3) {
          this.sprite.cellIndex = 1;
        }
        this.sprite.position = this.sprite.position.addInPlace(
          this.direction.scale(this.speed)
        );
        this.checkCollision();
      }, i * 10);
    }
    setTimeout(() => {
      this.sprite.dispose();
    }, rangei * 10);
  }
}

class RedAppleProjectile {
  constructor(scene, position, direction) {
    this.scene = scene;
    this.name = "redAppleProjectile";
    this.damage = 20;
    this.speed = 0.05;
    this.range = 10;
    this.hasCollided = false;
    this.spriteManager = new BABYLON.SpriteManager(
      "redAppleProjectileManager",
      "/HubDesGamers/src/assets/SnakeOfDoom/textures/RedAppleProjectileSprites.png",
      1,
      { width: 32, height: 32 },
      this.scene
    );
    this.sprite = new BABYLON.Sprite("redAppleProjectile", this.spriteManager);
    this.sprite.cellIndex = 0;
    this.sprite.size = 1;
    this.sprite.position = new BABYLON.Vector3(
      position.x,
      position.y,
      position.z
    );
    this.direction = direction;
    this.fired();
  }
  checkCollision() {
    getSprites(this.scene).forEach((sprite) => {
      if (this.hasCollided) return;
      if (sprite.name === "player") {
        if (isColliding(this.sprite, sprite)) {
          sprite.parent.reduceLife(this.damage);
          this.sprite.dispose();
          this.spriteManager.dispose();
          this.hasCollided = true;
        }
      }
    });
  }

  fired() {
    const rangei = Math.floor(this.range / this.speed);
    for (let i = 0; i < rangei; i++) {
      setTimeout(() => {
        this.sprite.position = this.sprite.position.addInPlace(
          this.direction.scale(this.speed)
        );
        this.checkCollision();
      }, i * 10);
    }
    setTimeout(() => {
      this.sprite.dispose();
    }, rangei * 10);
  }
}

function spawnToxicSpit(scene, position, direction) {
  return new ToxicSpit(scene, position, direction);
}

function spawnRedAppleProjectile(scene, position, direction) {
  return new RedAppleProjectile(scene, position, direction);
}
export { spawnToxicSpit, spawnRedAppleProjectile };
