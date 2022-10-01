import "./style.css";

import * as THREE from "THREE";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointLight, PositionalAudio } from "THREE";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
//-------------------------FUNCTIONS----------------------//
function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

const getRandomParticelPos = (particleCount) => {
  const arr = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    arr[i] = (Math.random() - 0.5) * 80;
  }
  return arr;
};

//-------------------------SETUP----------------------//

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 15);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

scene.background = new THREE.Color("#1a0f31");
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// const lightHelper = new THREE.PointLightHelper(PointLight);
// scene.add(lightHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

//-------------------------3D OBJECTS----------------------//
class Stars {
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
        map: loader.load(
          "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png"
        ),
        transparent: true,
        // color: "#ff0000"
      }),
      new THREE.PointsMaterial({
        size: 0.5,
        map: loader.load(
          "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
        ),
        transparent: true,
        // color: "#0000ff"
      }),
    ];

    this.stars1 = new THREE.Points(geometrys[0], materials[0]);
    this.stars2 = new THREE.Points(geometrys[1], materials[1]);
  }

  updatePosition(mouse) {
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

class Rocket {
  constructor() {
    const loader = new GLTFLoader();
    loader.load("./img/shapes/cohete2.gltf", (gltf) => {
      this.rocket = gltf.scene;
      console.log(this.rocket);
      scene.add(this.rocket);
      this.rocket.position.z = 24;
    });
  }

  updatePosition(mouse) {
    if (this.rocket) {
      this.rocket.rotateY(0.1);
      this.rocket.position.x = mouse.x * -2;
      this.rocket.position.y = mouse.y * -2;
    }
  }
}

const stars = new Stars();
scene.add(stars.getStars1);
scene.add(stars.getStars2);

const rocket = new Rocket();

//------------------------- LOOP ----------------------//
function animate() {
  raycaster.setFromCamera(mouse, camera);
  stars.updatePosition(mouse);
  rocket.updatePosition(mouse);

  if (Math.abs(camera.position.x + mouse.x * 0.01) < 1)
    camera.position.x += mouse.x * 0.01;
  if (Math.abs(camera.position.y + mouse.y * 0.01) < 1)
    camera.position.y += mouse.y * 0.01;

  // camera.position.z -= 1;
  // controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
window.addEventListener("mousemove", onMouseMove, false);
animate();
