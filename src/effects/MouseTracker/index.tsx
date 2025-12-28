import React, { useEffect, useRef } from 'react';
import { throttle } from 'lodash-es';
import styles from './MouseTracker.module.css';

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  vx: number;
  vy: number;
}

/**
 * MouseTracker - 全局鼠标跟踪特效组件
 *
 * 功能:
 * 1. 自定义鼠标光标 (渐变圆环)
 * 2. 鼠标轨迹粒子 (延迟跟随)
 * 3. 点击波纹扩散
 *
 * 使用方法:
 * ```tsx
 * import MouseTracker from '@site/src/effects/MouseTracker';
 *
 * <Layout>
 *   <MouseTracker />
 *   {children}
 * </Layout>
 * ```
 */
export default function MouseTracker(): JSX.Element | null {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!canvas || !cursor || !cursorDot) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置 canvas 尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 鼠标移动处理 - 节流到 16ms (60fps)
    const handleMouseMove = throttle((e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // 更新光标位置
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;

      // 添加轨迹粒子
      if (Math.random() > 0.7) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          opacity: 1,
          size: Math.random() * 4 + 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }

      // 限制粒子数量
      if (particlesRef.current.length > 30) {
        particlesRef.current.shift();
      }
    }, 16);

    // 点击波纹效果
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = styles.clickRipple;
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    };

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制并更新粒子
      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity *= 0.96;
        p.size *= 0.99;

        // 渐变色粒子
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(102, 126, 234, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(118, 75, 162, ${p.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(240, 147, 251, ${p.opacity * 0.3})`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 移除透明粒子
        if (p.opacity < 0.02 || p.size < 0.5) {
          particlesRef.current.splice(index, 1);
        }
      });

      rafIdRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    animate();

    // 清理
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // 移动端不渲染
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* Canvas 粒子层 */}
      <canvas ref={canvasRef} className={styles.mouseCanvas} />

      {/* 自定义光标 - 外圈 */}
      <div ref={cursorRef} className={styles.cursor} />

      {/* 自定义光标 - 内点 */}
      <div ref={cursorDotRef} className={styles.cursorDot} />
    </>
  );
}
