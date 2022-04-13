import * as B from "babylonjs";
import "regenerator-runtime/runtime";
import { camera, scene, engine } from "./src/scene";
import { CustomLoadingScreen } from "./src/loadingscreen";
import { http } from "./src/http";
import "babylonjs-loaders";
//import Ammo from "ammojs-typed";
//import { makeGround } from "./src/ground";
//import { makeCube } from "./src/cube";

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

  /*
  const ammo = await Ammo();
  const physics: B.AmmoJSPlugin = new B.AmmoJSPlugin(true, ammo);
  scene.enablePhysics(new B.Vector3(0, -9.81, 0), physics);
  makeCube();
  makeGround();
  */

  var { meshes } = await B.SceneLoader.ImportMeshAsync("", "", glbFile, scene, (evt) => {
    const loadStatus = ((evt.loaded * 100) / evt.total).toFixed();
    loadingScreen.updateLoadStatus(loadStatus);
  });

  /*
    new B.Sound("Savannah", "Savannah.mp3", scene, null, {
      loop: true,
      autoplay: true,
    });

    var animateCameraTo = function (toAlpha: number, toBeta: number, toRadius: number, animationFrames: number) {
    var animCamAlpha = new B.Animation("animCam", "alpha", 30, B.Animation.ANIMATIONTYPE_FLOAT, B.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keysAlpha = [];
    keysAlpha.push({
      frame: 0,
      value: camera.alpha,
    });
    keysAlpha.push({
      frame: animationFrames,
      value: toAlpha,
    });
    var animCamBeta = new B.Animation("animCam", "beta", 30, B.Animation.ANIMATIONTYPE_FLOAT, B.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keysBeta = [];
    keysBeta.push({
      frame: 0,
      value: camera.beta,
    });
    keysBeta.push({
      frame: animationFrames,
      value: toBeta,
    });
    var animCamRadius = new B.Animation("animCam", "radius", 30, B.Animation.ANIMATIONTYPE_FLOAT, B.Animation.ANIMATIONLOOPMODE_CYCLE);

    var keysRadius = [];
    keysRadius.push({
      frame: 0,
      value: camera.radius,
    });
    keysRadius.push({
      frame: animationFrames,
      value: toRadius,
    });
    animCamAlpha.setKeys(keysAlpha);
    animCamBeta.setKeys(keysBeta);
    animCamRadius.setKeys(keysRadius);
    camera.animations.push(animCamAlpha);
    camera.animations.push(animCamBeta);
    camera.animations.push(animCamRadius);
    scene.beginAnimation(camera, 0, animationFrames, false, 1, function () {});
  };
  animateCameraTo(alpha * 3, beta, radius, 500);
  */

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

  setInterval(() => {
    if (anim) camera.alpha += 0.01;
  }, 50);

  let toggle: boolean = true;
  let anim: boolean = false;
  let land: string = "land1.glb";
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
            for (let i = 0; i < meshes.length; i++) {
              meshes[i].isVisible = true;
            }
            break;
          case "c":
          case "C":
            if (toggle) {
              land = "land2.glb";
              toggle = false;
            } else {
              land = "land1.glb";
              toggle = true;
            }
            meshes.forEach((mesh) => mesh.dispose());
            B.SceneLoader.ImportMesh("", "", land, scene, (newMeshes) => {
              meshes = newMeshes;
              if (toggle) {
                camera.radius = 15;
              } else {
                camera.radius = 15;
              }
            });
            break;
          case "d":
          case "D":
            console.log(meshes);
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
