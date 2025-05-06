// Criação da cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Câmera de perspectiva
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 10);

// Renderizador WebGL
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Controles de órbita para a câmera
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Luz ambiente
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Luz direcional com sombra
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Cores dos objetos
const redMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const greenMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const yellowMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });

// Criação e adição dos objetos
const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), redMaterial);
cube.position.set(-4, 1, 0);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  greenMaterial
);
sphere.position.set(4, 1.5, 0);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 3, 32),
  blueMaterial
);
cylinder.position.set(0, 1.5, -4);
cylinder.castShadow = true;
cylinder.receiveShadow = true;
scene.add(cylinder);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), yellowMaterial);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// Helper para visualizar os eixos
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Booleanos para controle da animação e sombras
let shadowsEnabled = true;
let animationPaused = false;

// Função para criar animação
function animate() {
  if (!animationPaused) {
    requestAnimationFrame(animate);

    // Animação do cubo
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;

    // Animação da esfera
    const scale = Math.sin(Date.now() * 0.002) * 0.1 + 1;
    sphere.scale.set(scale, scale, scale);

    // Animação do cilindro
    cylinder.position.y = Math.sin(Date.now() * 0.003) * 1 + 1.5;

    controls.update(); // Atualiza os controles
    renderer.render(scene, camera); // Renderiza a cena
  }
}

// Ajuste da cena ao redimensionar a janela
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Controle de animação
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    animationPaused = !animationPaused;
    if (!animationPaused) animate();
  }
});

// Controle da visibilidade dos eixos
document.getElementById("toggleAxes").addEventListener("change", (e) => {
  axesHelper.visible = e.target.checked;
});

// Controle da sombra
document.getElementById("toggleShadows").addEventListener("click", () => {
  shadowsEnabled = !shadowsEnabled;
  [cube, sphere, cylinder].forEach((obj) => {
    obj.castShadow = shadowsEnabled;
    obj.receiveShadow = shadowsEnabled;
  });
  plane.receiveShadow = shadowsEnabled;
});

// Alter cores dos objetos
document.getElementById("colorCube").addEventListener("input", (e) => {
  cube.material.color.set(e.target.value);
});

document.getElementById("colorSphere").addEventListener("input", (e) => {
  sphere.material.color.set(e.target.value);
});

document.getElementById("colorCylinder").addEventListener("input", (e) => {
  cylinder.material.color.set(e.target.value);
});

// Controle da luz
document.getElementById("lightPosX").addEventListener("input", (e) => {
  directionalLight.position.x = e.target.value;
});

document.getElementById("lightPosY").addEventListener("input", (e) => {
  directionalLight.position.y = e.target.value;
});

document.getElementById("lightPosZ").addEventListener("input", (e) => {
  directionalLight.position.z = e.target.value;
});

// Instanciar a animação
animate();
