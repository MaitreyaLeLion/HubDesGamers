// 2D materials and textures

localpath = "/HubDesGamers/src/assets/Snage";

function createHeadMaterial(scene) {
  const headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
  const headTexture = new BABYLON.Texture(
    localpath + "/textures/head_up.png",
    scene
  );
  headTexture.hasAlpha = true;
  headMaterial.disableLighting = true;
  headMaterial.emissiveColor = BABYLON.Color3.White();
  headMaterial.diffuseTexture = headTexture;

  return headMaterial;
}

function createBodyStraightMaterial(scene) {
  const bodyStraightMaterial = new BABYLON.StandardMaterial(
    "bodyStraightMaterial",
    scene
  );
  const bodyStraightTexture = new BABYLON.Texture(
    localpath + "/textures/body_vertical.png",
    scene
  );
  bodyStraightTexture.hasAlpha = true;
  bodyStraightMaterial.disableLighting = true;
  bodyStraightMaterial.emissiveColor = BABYLON.Color3.White();
  bodyStraightMaterial.diffuseTexture = bodyStraightTexture;

  return bodyStraightMaterial;
}

function createBodyCurvedRightMaterial(scene) {
  const bodyCurvedRightMaterial = new BABYLON.StandardMaterial(
    "bodyCurvedRightMaterial",
    scene
  );
  const bodyCurvedRightTexture = new BABYLON.Texture(
    localpath + "/textures/body_corner_right.png",
    scene
  );
  bodyCurvedRightTexture.hasAlpha = true;
  bodyCurvedRightMaterial.disableLighting = true;
  bodyCurvedRightMaterial.emissiveColor = BABYLON.Color3.White();
  bodyCurvedRightMaterial.diffuseTexture = bodyCurvedRightTexture;

  return bodyCurvedRightMaterial;
}

function createBodyCurvedLeftMaterial(scene) {
  const bodyCurvedLeftMaterial = new BABYLON.StandardMaterial(
    "bodyCurvedLeftMaterial",
    scene
  );
  const bodyCurvedLeftTexture = new BABYLON.Texture(
    localpath + "/textures/body_corner_left.png",
    scene
  );
  bodyCurvedLeftTexture.hasAlpha = true;
  bodyCurvedLeftMaterial.disableLighting = true;
  bodyCurvedLeftMaterial.emissiveColor = BABYLON.Color3.White();
  bodyCurvedLeftMaterial.diffuseTexture = bodyCurvedLeftTexture;

  return bodyCurvedLeftMaterial;
}

function createTailMaterial(scene) {
  const tailMaterial = new BABYLON.StandardMaterial("tailMaterial", scene);
  const tailTexture = new BABYLON.Texture(
    localpath + "/textures/tail_down.png",
    scene
  );
  tailTexture.hasAlpha = true;
  tailMaterial.disableLighting = true;
  tailMaterial.emissiveColor = BABYLON.Color3.White();
  tailMaterial.diffuseTexture = tailTexture;

  return tailMaterial;
}

function createAppleMaterial(scene) {
  const appleMaterial = new BABYLON.StandardMaterial("appleMaterial", scene);
  appleMaterial.diffuseColor = BABYLON.Color3.Green();
  return appleMaterial;
}

function createGround2DMaterial(scene) {
  const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = BABYLON.Color3.Black();
  groundMaterial.disableLighting = true;
  return groundMaterial;
}

// 3D materials

export {
  createHeadMaterial,
  createBodyStraightMaterial,
  createBodyCurvedRightMaterial,
  createBodyCurvedLeftMaterial,
  createTailMaterial,
  createAppleMaterial,
  createGround2DMaterial,
};
