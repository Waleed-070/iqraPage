import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GenerativeConstellation({ 
  color = 0x1d4ed8, 
  particleCount = 150,
  baseMaxDist = 60,
  speed = 0.08
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const container = mountRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 300;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- Particles & Lines ---
    const particlesData = [];
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    const range = 400; // spawn range
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * range;
      const y = (Math.random() - 0.5) * range;
      const z = (Math.random() - 0.5) * range;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particlesData.push({
        x, y, z,
        baseX: x, baseY: y, baseZ: z,
        numConnections: 0
      });

      velocities.push({
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.4
      });
    }

    const pMaterial = new THREE.PointsMaterial({
      color: color, // Parameterized color
      size: 3,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointCloud = new THREE.Points(pGeometry, pMaterial);
    scene.add(pointCloud);

    // Lines
    const linesGeometry = new THREE.BufferGeometry();
    const maxLineCount = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLineCount * 6);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const linesMaterial = new THREE.LineBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });
    
    // We use line segments to dynamically update pairs
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // --- Scroll Interaction ---
    let attractionStrength = 0;
    let baseMaxDistance = baseMaxDist;
    let maxDistance = baseMaxDistance;

    const handleScroll = () => {
      // Find the parent .syllabus section
      const syllabusSection = container.closest('.syllabus');
      if (!syllabusSection) return;

      const rect = syllabusSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we have scrolled through the section
      // When top is at bottom of screen: ratio ~ 0
      // When bottom is at top of screen: ratio ~ 1
      const totalScrollDistance = windowHeight + rect.height;
      const scrolled = windowHeight - rect.top;
      let ratio = scrolled / totalScrollDistance;
      
      // Clamp between 0 and 1
      ratio = Math.max(0, Math.min(1, ratio));

      // Peak attraction in the middle of the section using a sine wave
      attractionStrength = Math.sin(ratio * Math.PI);
      
      // Max distance increases slightly when particles group together to form more connections
      maxDistance = baseMaxDistance + (attractionStrength * 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Mouse Interaction ---
    const mouse = new THREE.Vector2(9999, 9999);
    const raycaster = new THREE.Raycaster();
    const handleMouseMove = (event) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Animation Loop ---
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      raycaster.setFromCamera(mouse, camera);
      const targetZ = 0;
      const distanceToPlane = (targetZ - camera.position.z) / raycaster.ray.direction.z;
      const mousePosWorld = camera.position.clone().add(raycaster.ray.direction.multiplyScalar(distanceToPlane));
      
      // Convert mouse world position to the point cloud's local space
      const localMousePos = pointCloud.worldToLocal(mousePosWorld.clone());

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      for (let i = 0; i < particleCount; i++) {
        particlesData[i].numConnections = 0;
      }

      for (let i = 0; i < particleCount; i++) {
        const particleData = particlesData[i];

        // 1. Move the base position slowly
        particleData.baseX += velocities[i].x * speed;
        particleData.baseY += velocities[i].y * speed;
        particleData.baseZ += velocities[i].z * speed;

        // Bounce base position off bounds
        if (particleData.baseX < -range / 2 || particleData.baseX > range / 2) velocities[i].x *= -1;
        if (particleData.baseY < -range / 2 || particleData.baseY > range / 2) velocities[i].y *= -1;
        if (particleData.baseZ < -range / 2 || particleData.baseZ > range / 2) velocities[i].z *= -1;

        // Apply central attraction force based on scroll to the base position
        const maxRadius = range / 2;
        const pull = (attractionStrength * 0.005); 
        particleData.baseX -= (particleData.baseX / maxRadius) * pull;
        particleData.baseY -= (particleData.baseY / maxRadius) * pull;
        particleData.baseZ -= (particleData.baseZ / maxRadius) * pull;

        // 2. Mouse interaction (repel actual position)
        const dxMouse = particleData.x - localMousePos.x;
        const dyMouse = particleData.y - localMousePos.y;
        const distToMouse = Math.sqrt(dxMouse*dxMouse + dyMouse*dyMouse);
        
        // Reduced radius and force for a gentler mouse effect
        if (distToMouse < 120) {
          const force = (120 - distToMouse) * 0.05;
          const safeDist = Math.max(distToMouse, 1);
          particleData.x += (dxMouse / safeDist) * force;
          particleData.y += (dyMouse / safeDist) * force;
        }

        // 3. Restore force: Spring back to base position
        particleData.x += (particleData.baseX - particleData.x) * 0.05;
        particleData.y += (particleData.baseY - particleData.y) * 0.05;
        particleData.z += (particleData.baseZ - particleData.z) * 0.05;

        positions[i * 3] = particleData.x;
        positions[i * 3 + 1] = particleData.y;
        positions[i * 3 + 2] = particleData.z;

        // Check connections
        for (let j = i + 1; j < particleCount; j++) {
          const particleDataB = particlesData[j];
          const dx = particleData.x - particleDataB.x;
          const dy = particleData.y - particleDataB.y;
          const dz = particleData.z - particleDataB.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            particleData.numConnections++;
            particleDataB.numConnections++;

            // Calculate alpha based on distance
            const alpha = 1.0 - dist / maxDistance;

            linePositions[vertexpos++] = particleData.x;
            linePositions[vertexpos++] = particleData.y;
            linePositions[vertexpos++] = particleData.z;

            linePositions[vertexpos++] = particleDataB.x;
            linePositions[vertexpos++] = particleDataB.y;
            linePositions[vertexpos++] = particleDataB.z;
            
            numConnected++;
          }
        }
      }

      linesMesh.geometry.setDrawRange(0, numConnected * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      pointCloud.geometry.attributes.position.needsUpdate = true;

      // Slight rotation of the whole system
      scene.rotation.y += 0.0003;
      scene.rotation.x += 0.00015;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.remove(pointCloud);
      scene.remove(linesMesh);
      pGeometry.dispose();
      pMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
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
        backgroundColor: 'var(--bg-alt)'
      }} 
    />
  );
}
