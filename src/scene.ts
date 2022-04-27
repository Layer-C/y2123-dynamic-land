import * as B from "babylonjs";
import { canvas } from "./domItems";

export const engine = new B.Engine(canvas, true);
export const scene = makeScene();
export var camera = createCamera(scene);

function makeScene(): B.Scene {
  const scene = new B.Scene(engine);
  createLight(scene);
  setBackground(scene);
  createSkyBox(scene);
  return scene;
}

function createCamera(scene: B.Scene): B.ArcRotateCamera {
  const alpha: number = -Math.PI / 2;
  const beta: number = Math.PI / 3;
  const radius: number = 16;
  const target: B.Vector3 = new B.Vector3(0, 0, 0);
  let camera = new B.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
  camera.lowerRadiusLimit = 7;
  camera.upperRadiusLimit = 20;
  //camera.lowerBetaLimit = Math.PI / 9;
  //camera.upperBetaLimit = Math.PI / 3;
  camera.attachControl(canvas, true);
  return camera;
}

function createLight(scene: B.Scene): void {
  new B.HemisphericLight("light", new B.Vector3(0, 1, 0), scene);
}

function setBackground(scene: B.Scene): void {
  scene.clearColor = new B.Color4(0, 0, 0, 1);
}

function createSkyBox(scene: B.Scene): void {
	const skybox = B.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	const skyboxMaterial = new B.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new B.CubeTexture("sb", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = B.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new B.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new B.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;
}