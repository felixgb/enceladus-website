import { AmbientLight, BoxGeometry, DirectionalLight, Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';


const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();

document.body.appendChild(renderer.domElement);

function resizeRenderer() {
  camera.aspect = window.innerWidth / innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onresize = resizeRenderer;

const cubeSize = 0.7;
const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
const material = new MeshPhongMaterial({color: 0x00ff00});

const cubes = Array.from(Array(6).keys()).map(n => {
  const x = 2 * Math.cos(n);
  const y = 2 * Math.sin(n);
  const cube = new Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  return cube;
});

cubes.forEach(cube => scene.add(cube));

const light = new DirectionalLight(0xffffff, 0.5);
const ambientLight = new AmbientLight(0xffffff, 0.05);
light.castShadow = true;
scene.add(light);
scene.add(ambientLight);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cubes.forEach(cube => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  })
  renderer.render(scene, camera);
}
resizeRenderer();
animate();
