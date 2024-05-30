import { defineConfig } from "vite";

export default defineConfig({
  optimiseDeps: {
    exclude: ["@babylonjs/havok"],
  },
  base: "/HubDesGamers/",
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },

  resolve: {
    alias: {
      "@enemie": "/SnakeOfDoom/Assets/lib/enemie.js", // Replace with the actual path to your enemie.js file
      "@attacks": "/SnakeOfDoom/Assets/lib/attacks.js",
      "@globalFunc": "/SnakeOfDoom/Assets/lib/globalFunc.js",
      "@playerGUI": "/SnakeOfDoom/Assets/lib/playerGUI.js",
      "@materials": "/Snage/Assets/lib/materials.js",
      "@scene2d": "/Snage/Assets/lib/scene2d.js",
      "@scene3d": "/SnakeOfDoom/Assets/lib/scene3d.js",
      "@player3d": "/SnakeOfDoom/Assets/lib/player3d.js",
      "@random_spawn": "/NSPD V0/random_spawn.js",
      "@loader": "/NSPD V0/loader.js",
      "@score": "/NSPD V0/score.js",
      "@snake": "/Snage/Assets/lib/snake.js",
    },
  },
});
