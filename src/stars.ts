import * as THREE from "three";
import star1 from "/img/star1.png";
import star2 from "/img/star2.png";

const getRandomParticelPos = (particleCount: number) => {
  const arr = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    arr[i] = (Math.random() - 0.5) * 80;
  }
  return arr;
};

export default class Stars {
  stars1: THREE.Points;
  stars2: THREE.Points;

  constructor() {
    const geometrys = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];

    geometrys[0].setAttribute(
      "position",
      new THREE.BufferAttribute(getRandomParticelPos(700), 3)
    );
    geometrys[1].setAttribute(
      "position",
      new THREE.BufferAttribute(getRandomParticelPos(700), 3)
    );

    const loader = new THREE.TextureLoader();

    // material
    const materials = [
      new THREE.PointsMaterial({
        size: 0.5,
        map: loader.load(star1),
        transparent: true,
        // color: "#ff0000"
      }),
      new THREE.PointsMaterial({
        size: 0.5,
        map: loader.load(star2),
        transparent: true,
        // color: "#0000ff"
      }),
    ];

    this.stars1 = new THREE.Points(geometrys[0], materials[0]);
    this.stars2 = new THREE.Points(geometrys[1], materials[1]);
  }

  updatePosition(mouse: THREE.Vector2) {
    this.stars1.position.x = mouse.x * -2;
    this.stars1.position.y = mouse.y * -2;
    this.stars2.position.x = mouse.x * -2;
    this.stars2.position.y = mouse.y * -2;
  }

  get getStars1() {
    return this.stars1;
  }
  get getStars2() {
    return this.stars2;
  }
}
