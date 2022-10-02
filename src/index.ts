import * as THREE from "three";
import Stars from "./stars";
// import Rocket from "./rocket";

//-------------------------SETUP----------------------//
document.body.onscroll = onScroll;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  4500
);
const CAMERA_Z = 40;
const CAMERA_X = -13;
const CAMERA_Y = 0;
camera.position.setZ(CAMERA_Z);
camera.position.setX(CAMERA_X);
camera.position.setY(CAMERA_Y);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg") as HTMLCanvasElement,
});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 15);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

scene.background = new THREE.Color("#1a0f31");
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// const lightHelper = new THREE.PointLightHelper(PointLight);
// scene.add(lightHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

//-------------------------3D OBJECTS----------------------//

const stars = new Stars();
scene.add(stars.getStars1);
scene.add(stars.getStars2);

/* const geometry = new THREE.SphereGeometry(15, 30, 15);
const material = new THREE.MeshBasicMaterial({
  color: 0xfa2862,
  wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere); */

// const rocket = await Rocket.createRocket();
// scene.add(rocket.getRocket());

//-------------------------FUNCTIONS----------------------//
function onMouseMove(event: MouseEvent) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onScroll() {
  const { top } = document.body.getBoundingClientRect();
  camera.position.z = CAMERA_Z + top * 0.01;
  camera.position.y = CAMERA_Y + top * -0.0002;
  camera.position.x = CAMERA_X + top * -0.0002;
}
//------------------------- LOOP ----------------------//
function animate() {
  raycaster.setFromCamera(mouse, camera);
  stars.updatePosition(mouse);
  // rocket.updatePosition(mouse);

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
