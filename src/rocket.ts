import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const getRocketGltf = () => {
  const loader = new GLTFLoader();
  return new Promise<GLTF>((resolve, reject) => {
    loader.load(
      "./img/shapes/cohete2.gltf",
      (gltf) => {
        resolve(gltf);
      },
      undefined,
      (error) => {
        reject(error);
      }
    );
  });
};

export default class Rocket {
  rocket: THREE.Object3D;

  constructor(rocket: THREE.Object3D) {
    rocket.position.z = 24;
    this.rocket = rocket;
  }

  updatePosition(mouse: THREE.Vector2) {
    if (this.rocket) {
      this.rocket.rotateY(0.1);
      this.rocket.position.x = mouse.x * -2;
      this.rocket.position.y = mouse.y * -2;
    }
  }

  getRocket() {
    return this.rocket;
  }

  static async createRocket() {
    const gltf = await getRocketGltf();
    return new Rocket(gltf.scene);
  }
}
