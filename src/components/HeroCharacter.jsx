'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export default function HeroCharacter() {
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

    scene.add(new THREE.HemisphereLight(0xf1f2e7, 0x292a24, 3.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(-3, 5, 7);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc5e866, 2.4);
    fillLight.position.set(4, 2, 3);
    scene.add(fillLight);

    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mixer = null;
    let character = null;
    let particleField = null;
    let particleMaterial = null;
    let particleBase = null;
    let particlePhases = null;
    let particlePositions = null;
    const fitDiameter = 2.7;
    let cameraDistance = 0;
    let frame = 0;
    let disposed = false;

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

    new FBXLoader().load('/models/character-t-pose-slow-turn.fbx', (model) => {
      if (disposed) return;

      character = model;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      model.scale.setScalar(fitDiameter / Math.max(size.x, size.y, 0.001));
      model.position.set(-center.x * model.scale.x, -bounds.min.y * model.scale.y, -center.z * model.scale.z);
      model.traverse((item) => {
        if (!item.isMesh) return;
        item.frustumCulled = false;
      });
      scene.add(model);

      const particleCount = 110;
      const particleGeometry = new THREE.BufferGeometry();
      particlePositions = new Float32Array(particleCount * 3);
      particleBase = new Float32Array(particleCount * 3);
      particlePhases = new Float32Array(particleCount);
      const particleColors = new Float32Array(particleCount * 3);
      const lime = new THREE.Color(0xd5fa58);
      const pale = new THREE.Color(0xf2ffd1);
      for (let i = 0; i < particleCount; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.98 + Math.random() * 0.28;
        const offset = i * 3;
        particleBase[offset] = Math.cos(angle) * radius;
        particleBase[offset + 1] = fitDiameter * 0.5 + Math.sin(angle) * radius;
        particleBase[offset + 2] = -0.12 - Math.random() * 0.38;
        particlePositions.set(particleBase.subarray(offset, offset + 3), offset);
        particlePhases[i] = Math.random() * Math.PI * 2;
        const color = lime.clone().lerp(pale, Math.random() * 0.55);
        particleColors[offset] = color.r;
        particleColors[offset + 1] = color.g;
        particleColors[offset + 2] = color.b;
      }
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
      particleMaterial = new THREE.PointsMaterial({
        size: 0.052,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      particleField = new THREE.Points(particleGeometry, particleMaterial);
      particleField.frustumCulled = false;
      scene.add(particleField);

      const frameHeight = 3.2;
      cameraDistance = frameHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      camera.position.set(0, fitDiameter * 0.5, cameraDistance);
      camera.lookAt(0, fitDiameter * 0.5, 0);

      if (model.animations?.length) {
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(model.animations[0]).play();
      }
    }, undefined, (error) => {
      console.error('Could not load the homepage character.', error);
    });

    const render = () => {
      frame = requestAnimationFrame(render);
      mixer?.update(Math.min(clock.getDelta(), 0.05));
      if (character && !reducedMotion) {
        const time = clock.elapsedTime;
        const azimuth = Math.sin(time * 0.28) * THREE.MathUtils.degToRad(15);
        const elevation = Math.sin(time * 0.2) * THREE.MathUtils.degToRad(4);
        const horizontalDistance = cameraDistance * Math.cos(elevation);
        camera.position.set(
          Math.sin(azimuth) * horizontalDistance,
          fitDiameter * 0.5 + Math.sin(elevation) * cameraDistance,
          Math.cos(azimuth) * horizontalDistance,
        );
        camera.lookAt(0, fitDiameter * 0.5, 0);
      }
      if (particleField && particleBase && particlePositions && particlePhases) {
        const time = clock.elapsedTime;
        for (let i = 0; i < particlePhases.length; i += 1) {
          const offset = i * 3;
          const phase = particlePhases[i];
          const motion = reducedMotion ? 0 : 1;
          particlePositions[offset] = particleBase[offset] + Math.sin(time * 0.8 + phase) * 0.035 * motion;
          particlePositions[offset + 1] = particleBase[offset + 1] + Math.sin(time * 1.1 + phase) * 0.07 * motion;
          particlePositions[offset + 2] = particleBase[offset + 2] + Math.cos(time * 0.75 + phase) * 0.035 * motion;
        }
        particleField.geometry.attributes.position.needsUpdate = true;
        if (particleMaterial) particleMaterial.opacity = reducedMotion ? 0.78 : 0.7 + Math.sin(time * 1.8) * 0.18;
      }
      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      mixer?.stopAllAction();
      particleField?.geometry.dispose();
      particleMaterial?.dispose();
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

  return <div className="hero-character" ref={hostRef} aria-hidden="true" />;
}
