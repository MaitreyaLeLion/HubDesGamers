async function load(scene) {
  const headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
  const headTexture = new BABYLON.Texture(
    "/HubDesGamers/src/assets/NSPD/images/logo_arr.png",
    scene
  );

  headMaterial.disableLighting = true;
  headMaterial.emissiveColor = BABYLON.Color3.White();
  headMaterial.diffuseTexture = headTexture;
  var box = new BABYLON.MeshBuilder.CreatePlane(
    "logo",
    { width: 2, height: 4 / 3 },
    scene
  );
  box.material = headMaterial;
  box.position.y = 8.4;

  return box;
}

export { load };
