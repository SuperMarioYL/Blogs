import React, { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';
import { DeviceDetector } from '@site/src/utils/deviceDetector';
import styles from './ParticleBackground.module.css';

/**
 * 粒子星空背景组件
 *
 * 使用 @tsparticles 创建动态粒子效果
 */
export default function ParticleBackground() {
  // 初始化 tsparticles 引擎
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // 根据设备类型调整粒子数量
  const particleCount = useMemo(() => {
    if (DeviceDetector.isMobile()) return 30;
    if (DeviceDetector.isTablet()) return 50;
    return 80;
  }, []);

  return (
    <div className={styles.container}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'attract',
              },
              onClick: {
                enable: true,
                mode: 'push',
              },
              resize: {
                enable: true,
              },
            },
            modes: {
              attract: {
                distance: 200,
                duration: 0.4,
                speed: 1,
              },
              push: {
                quantity: 4,
              },
            },
          },
          particles: {
            color: {
              value: ['#667eea', '#764ba2', '#f093fb'],
            },
            links: {
              color: '#667eea',
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: particleCount,
            },
            opacity: {
              value: 0.5,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
              },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
