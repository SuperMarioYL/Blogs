import React, { useRef, ReactNode } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './MagneticCard.module.css';

interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  magneticStrength?: number;
  tiltStrength?: number;
}

/**
 * MagneticCard - 3D倾斜 + 磁吸效果卡片
 *
 * 功能:
 * - 鼠标靠近时卡片被"磁吸"移动
 * - 3D倾斜效果 (perspective: 1000px)
 * - react-spring 物理弹性动画
 *
 * @param magneticStrength - 磁吸强度系数 (默认 0.15)
 * @param tiltStrength - 3D倾斜强度系数 (默认 15)
 */
export default function MagneticCard({
  children,
  className = '',
  href,
  magneticStrength = 0.15,
  tiltStrength = 15,
}: MagneticCardProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  const [{ x, y, rotateX, rotateY, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 磁吸偏移计算
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    // 3D倾斜计算 (相对于卡片中心)
    const tiltX = ((e.clientY - rect.top - rect.height / 2) / rect.height) * tiltStrength;
    const tiltY = ((e.clientX - rect.left - rect.width / 2) / rect.width) * tiltStrength;

    api.start({
      x: deltaX,
      y: deltaY,
      rotateX: -tiltX,
      rotateY: tiltY,
      scale: 1.03,
    });
  };

  const handleMouseLeave = () => {
    api.start({
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  const content = (
    <animated.div
      ref={cardRef}
      className={`${styles.magneticCard} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: x.to(
          (x) =>
            y.to(
              (y) =>
                rotateX.to(
                  (rx) =>
                    rotateY.to(
                      (ry) =>
                        scale.to(
                          (s) =>
                            `perspective(1000px)
                             translateX(${x}px)
                             translateY(${y}px)
                             rotateX(${rx}deg)
                             rotateY(${ry}deg)
                             scale(${s})`
                        )
                    )
                )
            )
        ),
      }}
    >
      {children}
    </animated.div>
  );

  if (href) {
    return (
      <a href={href} className={styles.cardLink}>
        {content}
      </a>
    );
  }

  return content;
}
