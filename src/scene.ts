import * as B from "babylonjs";
import { canvas } from "./domItems";

export const engine = new B.Engine(canvas, true);
export const scene = makeScene();
export var camera = createCamera(scene);

function makeScene(): B.Scene {
  const scene = new B.Scene(engine);
  createLight(scene);
  setBackground(scene);
  return scene;
}

function createCamera(scene: B.Scene): B.ArcRotateCamera {
  const alpha: number = Math.PI;
  const beta: number = Math.PI / 4;
  const radius: number = 20;
  const target: B.Vector3 = new B.Vector3(0, 0, 0);
  let camera = new B.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
  camera.lowerRadiusLimit = 3;
  camera.upperRadiusLimit = 15;
  camera.lowerBetaLimit = Math.PI / 9;
  camera.upperBetaLimit = Math.PI / 2.5;
  camera.attachControl(canvas, true);
  return camera;
}

function createLight(scene: B.Scene): void {
  new B.HemisphericLight("light", new B.Vector3(0, 1, 0), scene);
}

function setBackground(scene: B.Scene): void {
  scene.clearColor = new B.Color4(0, 0, 0, 1);
}
