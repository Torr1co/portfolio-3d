import * as THREE from "THREE";
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
camera.position.setZ(30);

// const lightHelper = new THREE.PointLightHelper(PointLight);
// scene.add(lightHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

renderer.render(scene, camera);

//-------------------------3D OBJECTS----------------------//

const stars = new Stars();
scene.add(stars.getStars1);
scene.add(stars.getStars2);

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
  console.log(top);
  camera.position.z = top * -0.01;
  camera.position.y = top * -0.0002;
  camera.position.x = top * -0.0002;
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
