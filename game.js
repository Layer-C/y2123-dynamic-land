BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
  if (document.getElementById("customLoadingScreenDiv")) {
    document.getElementById("customLoadingScreenDiv").style.display = "initial";
    // Do not add a loading screen if there is already one
    return;
  }

  this._loadingDiv = document.createElement("div");
  this._loadingDiv.id = "customLoadingScreenDiv";
  this._loadingDiv.innerHTML = "<img src='Loadingsome.gif' />";
  var customLoadingScreenCss = document.createElement("style");
  customLoadingScreenCss.type = "text/css";
  customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: #FFFFFFcc;
        color: white;
        font-size:50px;
        text-align:center;
    }
    `;
  document.getElementsByTagName("head")[0].appendChild(customLoadingScreenCss);
  this._resizeLoadingUI();
  window.addEventListener("resize", this._resizeLoadingUI);
  document.body.appendChild(this._loadingDiv);
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function () {
  document.getElementById("customLoadingScreenDiv").style.display = "none";
  console.log("scene is now loaded");
};

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  engine.displayLoadingUI();

  BABYLON.SceneLoader.ImportMesh("", "", "Fullscene.glb", scene, sceneLoaded);

  return scene;
};

var sceneLoaded = function (meshes, particleSystems, skeletons, animationGroups) {
  const alpha = 3.45;
  const beta = Math.PI / 3;
  const radius = 125;
  const target = new BABYLON.Vector3(0, 0, 0);

  const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
  camera.attachControl(canvas, true);

  scene.createDefaultEnvironment();

  // Load the sound and play it automatically once ready
  var music = new BABYLON.Sound("Savannah", "Savannah.mp3", scene, null, {
    loop: true,
    autoplay: true,
  });

  engine.hideLoadingUI();

  scene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
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
                meshes[i] = null;
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
};
