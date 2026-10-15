'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export default function NinjaAnimation() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(29, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xf1f2e7, 0x292a24, 2.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(-3, 5, 7);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc5e866, 1.1);
    fillLight.position.set(4, 2, 3);
    scene.add(fillLight);

    const clock = new THREE.Clock();
    let mixer = null;
    let frame = 0;
    let disposed = false;
    let character = null;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    new FBXLoader().load('/models/character-ninja-stance-idle.fbx', (model) => {
      if (disposed) {
        model.traverse((item) => {
          if (!item.isMesh) return;
          item.geometry?.dispose();
          const materials = Array.isArray(item.material) ? item.material : [item.material];
          materials.forEach((material) => material?.dispose());
        });
        return;
      }

      character = model;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const fitHeight = 2.65;
      model.scale.setScalar(fitHeight / Math.max(size.y, 0.001));
      model.position.set(-center.x * model.scale.x, -bounds.min.y * model.scale.y, -center.z * model.scale.z);
      model.traverse((item) => {
        if (!item.isMesh) return;
        item.frustumCulled = false;
        item.castShadow = false;
        item.receiveShadow = false;
      });
      scene.add(model);

      const cameraDistance = fitHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.15;
      camera.position.set(0, fitHeight * 0.48, cameraDistance);
      camera.lookAt(0, fitHeight * 0.48, 0);

      if (model.animations?.length) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(model.animations[0]).play();
      }
    }, undefined, (error) => {
      console.error('Could not load the homepage ninja animation.', error);
    });

    const render = () => {
      frame = requestAnimationFrame(render);
      mixer?.update(Math.min(clock.getDelta(), 0.05));
      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      mixer?.stopAllAction();
      character?.traverse((item) => {
        if (!item.isMesh) return;
        item.geometry?.dispose();
        const materials = Array.isArray(item.material) ? item.material : [item.material];
        materials.forEach((material) => material?.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-ninja" ref={hostRef} aria-hidden="true" />;
}
