import * as B from "babylonjs";
import "regenerator-runtime/runtime";
import { camera, scene, engine } from "./src/scene";
import { CustomLoadingScreen } from "./src/loadingscreen";
import { http } from "./src/http";
import "babylonjs-loaders";

async function main(): Promise<void> {
  const loadingScreen = new CustomLoadingScreen("");
  engine.loadingScreen = loadingScreen;
  engine.displayLoadingUI();

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const tokenID = urlParams.get("id");
  let glbFile = "land1.glb";
  if (parseInt(tokenID!) >= 0) {
    const data = await http(`https://dev-api.y2123.io/clan?id=${tokenID}`);
    console.log(data);
    glbFile = `land${tokenID}.glb`;
  }

  var { meshes } = await B.SceneLoader.ImportMeshAsync("", "", glbFile, scene, (evt) => {
    const loadStatus = ((evt.loaded * 100) / evt.total).toFixed();
    loadingScreen.updateLoadStatus(loadStatus);
  });

  new B.Sound("Savannah", "Savannah.mp3", scene, null, {
    loop: false,
    autoplay: true,
  });
  /*
  setInterval(() => {
    if (anim) {
      for (let i = 0; i < meshes.length; i++) {
        var random = Math.random() < 0.6;
        if (meshes[i].name !== "__root__" && meshes[i].name !== "ground top" && meshes[i].name !== "ground bot") {
          //console.log(meshes[i].name);
          meshes[i].isVisible = random;
        }
      }
    }
  }, 500);
  */
  setInterval(() => {
    if (anim) camera.alpha += 0.005;
  }, 50);

  let anim: boolean = false;
  if (parseInt(tokenID!) % 2 === 0) {
    anim = true;
  }
  scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case B.KeyboardEventTypes.KEYDOWN:
        switch (kbInfo.event.key) {
          case "a":
          case "A":
            anim = true;
            break;
          case "b":
          case "B":
            anim = false;
            //for (let i = 0; i < meshes.length; i++) {
            //  meshes[i].isVisible = true;
            //}
            break;
        }
        break;
    }
  });

  engine.hideLoadingUI();
  engine.runRenderLoop(() => scene.render());

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
}

main();
