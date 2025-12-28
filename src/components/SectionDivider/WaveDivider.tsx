import React from 'react';
import styles from './WaveDivider.module.css';

interface WaveDividerProps {
  /** 波浪颜色数组 (3层波浪) */
  colors?: string[];
  /** 是否翻转 (从下到上) */
  flip?: boolean;
  /** 高度 (默认 120px) */
  height?: number;
}

/**
 * WaveDivider - SVG 波浪分割线组件
 *
 * 功能:
 * - 3层波浪叠加效果
 * - 渐变色填充
 * - 动画波动效果
 * - 可翻转方向
 *
 * @example
 * <WaveDivider
 *   colors={['#667eea', '#764ba2', '#f093fb']}
 *   flip={false}
 * />
 */
export default function WaveDivider({
  colors = ['#667eea', '#764ba2', '#f093fb'],
  flip = false,
  height = 120,
}: WaveDividerProps): JSX.Element {
  return (
    <div
      className={`${styles.waveDivider} ${flip ? styles.flip : ''}`}
      style={{ height: `${height}px` }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={styles.waveSvg}
      >
        {/* 第1层波浪 - 最底层，透明度最低 */}
        <path
          d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z"
          fill={colors[0]}
          opacity="0.2"
          className={styles.wave1}
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z;
              M0,50 Q300,90 600,50 T1200,50 L1200,120 L0,120 Z;
              M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z
            "
          />
        </path>

        {/* 第2层波浪 - 中间层 */}
        <path
          d="M0,70 Q300,30 600,70 T1200,70 L1200,120 L0,120 Z"
          fill={colors[1]}
          opacity="0.3"
          className={styles.wave2}
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,70 Q300,30 600,70 T1200,70 L1200,120 L0,120 Z;
              M0,70 Q300,110 600,70 T1200,70 L1200,120 L0,120 Z;
              M0,70 Q300,30 600,70 T1200,70 L1200,120 L0,120 Z
            "
          />
        </path>

        {/* 第3层波浪 - 最顶层，透明度最高 */}
        <path
          d="M0,90 Q300,50 600,90 T1200,90 L1200,120 L0,120 Z"
          fill={colors[2]}
          opacity="0.4"
          className={styles.wave3}
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,90 Q300,50 600,90 T1200,90 L1200,120 L0,120 Z;
              M0,90 Q300,110 600,90 T1200,90 L1200,120 L0,120 Z;
              M0,90 Q300,50 600,90 T1200,90 L1200,120 L0,120 Z
            "
          />
        </path>
      </svg>
    </div>
  );
}
