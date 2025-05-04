<script type="module">
  import * as THREE from "https://cdn.skypack.dev/three@0.135.0/build/three.module";
  import { OrbitControls } from "https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls";

  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#c"), alpha: true });
  renderer.setClearColor(0x000000, 0); // Fondo transparente

  const camera = new THREE.PerspectiveCamera(75, 2, 0.01, 15);
  camera.position.z = 1;

  const controls = new OrbitControls(camera, renderer.domElement);
  const scene = new THREE.Scene();

  const geometry = new THREE.PlaneGeometry(3, 2, 1000, 1000);

  // Esperar a que el DOM esté cargado antes de acceder a los shaders
  document.addEventListener("DOMContentLoaded", function() {
    const vertexShader = document.getElementById('vertexShader').textContent;
    const fragmentShader = document.getElementById('fragmentShader').textContent;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        uColor: {
          value: [
            new THREE.Color(0xff9911),
            new THREE.Color(0xff6600),
            new THREE.Color(0xfb4f4f),
            new THREE.Color(0xfc6791),
            new THREE.Color(0xfc99c3),
          ]
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = (canvas.clientWidth * pixelRatio) | 0;
    const height = (canvas.clientHeight * pixelRatio) | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let then = 0;
  function render(now) {
    now *= 0.001;
    const deltaTime = now - then;
    then = now;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
</script>

