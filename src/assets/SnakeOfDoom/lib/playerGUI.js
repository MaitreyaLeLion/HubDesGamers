class playerGUI {
  constructor(scene, lifePoints) {
    this.maxLife = lifePoints;
    this.advancedTexture =
      BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    this.background();
    this.panel();
  }
  ammoCount(bottomRect) {
    let ammoText = new TextBlock();
    ammoText.text = "Ammo: 100";
    ammoText.color = "black";
    ammoText.fontSize = 24;
    ammoText.top = "-10px";
    ammoText.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    bottomRect.addControl(ammoText);
  }
  background() {
    let bottomRect = new GUI.Rectangle();
    bottomRect.width = 1;
    bottomRect.height = "100px";
    bottomRect.color = "black";
    bottomRect.thickness = 0;
    bottomRect.background = "white";
    bottomRect.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.ammoCount(bottomRect);
    this.advancedTexture.addControl(bottomRect);
  }
  healthBar(panel) {
    this.healthText = new GUI.TextBlock();
    this.healthText.text = "Health: 100%";
    this.healthText.color = "black";
    this.healthText.height = "20px";
    this.healthText.width = "200px";
    panel.addControl(this.healthText); // Add the text block to the panel

    this.health = new GUI.Rectangle();
    this.health.width = 2 * this.maxLife + "px";
    this.health.height = "20px";
    this.health.color = "black";
    this.health.thickness = 2;
    this.health.background = "red";
    panel.addControl(this.health); // Add the health bar to the panel
  }
  panel() {
    let panel = new GUI.StackPanel();
    panel.width = "400px";
    panel.height = "40px";
    panel.isVertical = false;
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.healthBar(panel);
    this.advancedTexture.addControl(panel);
  }
  updateHealth(newHealth) {
    if (newHealth < 0) {
      newHealth = 0;
    }
    this.health.width = Math.floor(2 * newHealth) + "px";
    this.healthText.text = "Health: " + Math.floor(newHealth) + "%";
  }
}

function createGUI(scene, lifePoints) {
  return new playerGUI(scene, lifePoints);
}

export { createGUI };
