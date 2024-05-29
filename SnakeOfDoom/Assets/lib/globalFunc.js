import * as BABYLON from "@babylonjs/core";

function getSprites(scene) {
  const sprites = [];
  scene.spriteManagers.forEach((spriteManager) => {
    spriteManager.sprites.forEach((sprite) => {
      sprites.push(sprite);
    });
  });
  return sprites;
}
function isColliding(sprite1, sprite2) {
  return sprite1.position.subtract(sprite2.position).length() < 1.5;
}

function multiplyByRotation(vector, angle) {
  return new BABYLON.Vector3(
    vector.x * Math.cos(angle) + vector.z * Math.sin(angle),
    0,
    vector.x * Math.sin(-angle) + vector.z * Math.cos(angle)
  );
}

export { getSprites, isColliding, multiplyByRotation };
