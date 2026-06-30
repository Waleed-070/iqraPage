import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GenerativeGrid() {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    // Position camera to look down at an angle at the grid
    camera.position.set(0, 60, 120);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Grid Plane ---
    // Create a large plane with many segments
    const geometry = new THREE.PlaneGeometry(600, 600, 60, 60);
    
    // Rotate plane to be horizontal
    geometry.rotateX(-Math.PI / 2);

    // Material (wireframe)
    const material = new THREE.MeshBasicMaterial({
      color: 0xd4a843, // Gold color
      wireframe: true,
      transparent: true,
      opacity: 0.4 // Increased opacity for better visibility
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // --- Animation Loop ---
    let time = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      // Animate the vertices to create a wave effect
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        
        // Complex wave function based on X, Z and time
        // Creates an undulating topological surface
        const y = Math.sin(x * 0.03 + time) * Math.cos(z * 0.03 + time) * 20;
        positions.setY(i, y);
      }
      positions.needsUpdate = true;

      // Slowly rotate the whole plane for dynamic feel
      plane.rotation.y = time * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        // Fade out edges so it blends nicely into the background
        maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)'
      }} 
    />
  );
}
