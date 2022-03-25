import * as B from "babylonjs";
import "regenerator-runtime/runtime";
import { scene, engine } from "./src/scene";
import { CustomLoadingScreen } from "./src/loadingscreen";
import "babylonjs-loaders";
//import Ammo from "ammojs-typed";
//import { makeGround } from "./src/ground";
//import { makeCube } from "./src/cube";

async function main(): Promise<void> {
  const loadingScreen = new CustomLoadingScreen("");
  engine.loadingScreen = loadingScreen;
  engine.displayLoadingUI();

  /*
  const ammo = await Ammo();
  const physics: B.AmmoJSPlugin = new B.AmmoJSPlugin(true, ammo);
  scene.enablePhysics(new B.Vector3(0, -9.81, 0), physics);
  makeCube();
  makeGround();
  */

  const { meshes } = await B.SceneLoader.ImportMeshAsync("", "", "land.glb", scene, (evt) => {
    const loadStatus = ((evt.loaded * 100) / evt.total).toFixed();
    loadingScreen.updateLoadStatus(loadStatus);
  });
  console.log(meshes);

  new B.Sound("Savannah", "Savannah.mp3", scene, null, {
    loop: true,
    autoplay: true,
  });

  scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case B.KeyboardEventTypes.KEYDOWN:
        switch (kbInfo.event.key) {
          case "a":
          case "A":
            for (let i = 0; i < meshes.length; i++) {
              var random = Math.random() < 0.5;
              meshes[i].isVisible = random;
            }
            break;
          case "b":
          case "B":
            for (let i = 0; i < meshes.length; i++) {
              meshes[i].isVisible = true;
            }
            break;
          case "c":
          case "C":
            console.log(meshes.length);
            for (let i = 1; i < meshes.length; i++) {
              if (Math.random() < 0.5) {
                meshes[i].dispose();
              }
            }
            console.log("After dispose: ", meshes.length);
            break;
          case "d":
          case "D":
            console.log(meshes.length);
            for (let i = 0; i < 100; i++) {
              meshes[i].isVisible = true;
            }
            break;
        }
        break;
    }
  });

  engine.hideLoadingUI();
  engine.runRenderLoop(() => scene.render());
}

main();
