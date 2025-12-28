import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './ThreeGeometryGrid.module.css';

/**
 * 几何网格粒子组件
 *
 * 创建动态三角网格效果
 */
function GeometryMesh() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // 生成随机粒子点
  const particles = useMemo(() => {
    const count = 100; // 粒子数量
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // 随机分布在空间中
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // 渐变色: 紫色到粉色
      const t = Math.random();
      colors[i * 3] = THREE.MathUtils.lerp(0.4, 0.94, t);     // R
      colors[i * 3 + 1] = THREE.MathUtils.lerp(0.49, 0.58, t); // G
      colors[i * 3 + 2] = THREE.MathUtils.lerp(0.92, 0.98, t); // B
    }

    return { positions, colors };
  }, []);

  // 鼠标移动监听
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 动画循环
  useFrame((state) => {
    if (!meshRef.current) return;

    // 缓慢旋转
    meshRef.current.rotation.y += 0.001;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

    // 鼠标视差效果
    meshRef.current.rotation.x += mouseRef.current.y * 0.0002;
    meshRef.current.rotation.y += mouseRef.current.x * 0.0002;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * 连接线组件
 *
 * 连接相近的粒子
 */
function ConnectionLines() {
  const linesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!linesRef.current) return;

    // 连接线淡入淡出效果
    const material = linesRef.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.2 + Math.sin(state.clock.elapsedTime) * 0.1;
  });

  // 生成连接线
  const lines = useMemo(() => {
    const points = [];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const x1 = (Math.random() - 0.5) * 15;
      const y1 = (Math.random() - 0.5) * 8;
      const z1 = (Math.random() - 0.5) * 8;

      const x2 = x1 + (Math.random() - 0.5) * 3;
      const y2 = y1 + (Math.random() - 0.5) * 3;
      const z2 = z1 + (Math.random() - 0.5) * 3;

      points.push(new THREE.Vector3(x1, y1, z1));
      points.push(new THREE.Vector3(x2, y2, z2));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, []);

  return (
    <lineSegments ref={linesRef} geometry={lines}>
      <lineBasicMaterial
        color="#667eea"
        transparent
        opacity={0.2}
      />
    </lineSegments>
  );
}

/**
 * Three.js 几何网格背景主组件
 */
export default function ThreeGeometryGrid() {
  return (
    <div className={styles.container}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]} // 设备像素比
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <GeometryMesh />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
