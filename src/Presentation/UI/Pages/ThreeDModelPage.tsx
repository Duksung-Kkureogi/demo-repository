import { Layout } from "../Components/Layout";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function ThreeDModelPage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const temp = {
      width: 800,
      height: 600,
    };

    const camera = new THREE.PerspectiveCamera(
      75,
      temp.width / temp.height,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(temp.width, temp.height);

    mountRef.current.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <Layout>
      <h1>3D 모델</h1>
      <div ref={mountRef} style={{ width: "800px", height: "600px" }}></div>
    </Layout>
  );
}

export default ThreeDModelPage;
