import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

export default function WaveDivider() {
  const mountRef       = useRef(null);
  const mouseRef       = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    // ── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    container.appendChild(renderer.domElement);

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera: perspective, looking down at the water at ~35° ───────────
    // This is critical — the Water addon needs a PerspectiveCamera and
    // the viewing angle determines how much reflection/specularity shows.
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.5, 3000);
    // Position above and slightly in front of center, looking down
    camera.position.set(0, 38, 60);
    camera.lookAt(0, 0, 0);

    // ── Sky / reflection background ────────────────────────────────────────
    // A gradient sky mesh — this is what gets reflected in the water surface.
    // We make it very dark (near-black gradient) to keep the B&W aesthetic.
    const skyGeo = new THREE.SphereGeometry(500, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        uDark: { value: 0 },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vWorldPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uDark;
        varying vec3 vWorldPos;
        void main() {
          float t = clamp((vWorldPos.y + 200.0) / 400.0, 0.0, 1.0);
          // Light mode: horizon 0.88 → zenith 0.70 (warm silver-grey sky)
          // Dark  mode: horizon 0.18 → zenith 0.04 (deep near-black sky)
          float lo = mix(0.88, 0.18, uDark);
          float hi = mix(0.70, 0.04, uDark);
          float lum = mix(lo, hi, t);
          gl_FragColor = vec4(vec3(lum), 1.0);
        }
      `,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // ── Water geometry: large flat plane ──────────────────────────────────
    const waterGeometry = new THREE.PlaneGeometry(400, 400, 1, 1);

    // ── Normal map texture ─────────────────────────────────────────────────
    const textureLoader = new THREE.TextureLoader();
    const waterNormals = textureLoader.load("/waternormals.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
    });

    // ── Dark mode detection ────────────────────────────────────────────────
    const isDark = () => document.documentElement.classList.contains("dark");

    // ── Water colours tuned for B&W palette ───────────────────────────────
    // Light mode: pale silver water with bright sun highlight
    // Dark  mode: near-black water with dimmer, cooler specular
    const getLightWaterColor = () => isDark() ? 0x080808 : 0xc8c8c8;
    const getLightSunColor   = () => isDark() ? 0xffffff : 0xffffff;

    // ── Three.js Water object ──────────────────────────────────────────────
    const water = new Water(waterGeometry, {
      textureWidth:   1024,
      textureHeight:  1024,
      waterNormals,
      sunDirection:   new THREE.Vector3(-1, 1, 0).normalize(),
      sunColor:       getLightSunColor(),
      waterColor:     getLightWaterColor(),
      distortionScale: 3.5,
      alpha: 1.0,
      fog: false,
    });

    // Rotate plane to be horizontal (XZ), then tilt to face camera
    water.rotation.x = -Math.PI / 2;
    scene.add(water);

    // ── Mouse-driven camera pan ────────────────────────────────────────────
    // Mouse X slowly pans the camera left/right for a parallax feel.
    // Mouse Y slightly raises/lowers the camera for a viewing-angle shift.
    const BASE_CAM = { x: 0, y: 38, z: 60 };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;
      if (inside) {
        targetMouseRef.current.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2; // -1..1
        targetMouseRef.current.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2; // -1..1
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Dark-mode sync ─────────────────────────────────────────────────────
    const syncDark = () => {
      const dark = isDark();
      skyMat.uniforms.uDark.value = dark ? 1 : 0;
      water.material.uniforms["waterColor"].value.set(getLightWaterColor());
      water.material.uniforms["sunColor"].value.set(getLightSunColor());
      // In dark mode, use a stronger distortion for rougher-looking dark water
      water.material.uniforms["distortionScale"].value = dark ? 2.8 : 3.5;
    };
    syncDark();
    const mo = new MutationObserver(syncDark);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // ── Resize ─────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    // ── Render loop ────────────────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Advance the water animation
      water.material.uniforms["time"].value = elapsed * 0.6;

      // Smooth mouse lerp
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04;

      // Camera gently follows mouse — subtle parallax
      camera.position.x = BASE_CAM.x + mouseRef.current.x * 12;
      camera.position.y = BASE_CAM.y - mouseRef.current.y * 5;
      camera.lookAt(mouseRef.current.x * 4, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      mo.disconnect();
      renderer.dispose();
      waterGeometry.dispose();
      water.material.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "0 2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        ref={mountRef}
        style={{
          width: "100%",
          maxWidth: "1300px",
          height: "300px",
          overflow: "hidden",
          borderRadius: "12px",
          lineHeight: 0,
        }}
      />
    </div>
  );
}
