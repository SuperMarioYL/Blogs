import { useCallback } from 'react';

/**
 * Ripple 水波纹效果 Hook
 *
 * 功能:
 * - 点击位置计算
 * - 径向扩散动画 (CSS @keyframes)
 * - 渐变色填充
 *
 * 使用方法:
 * ```tsx
 * const { createRipple } = useRipple();
 *
 * <button onClick={createRipple}>
 *   Click me
 * </button>
 * ```
 *
 * 对应CSS:
 * ```css
 * .ripple {
 *   position: absolute;
 *   border-radius: 50%;
 *   transform: scale(0);
 *   animation: ripple-animation 0.6s ease-out;
 *   background: radial-gradient(circle, rgba(102, 126, 234, 0.5), transparent);
 *   pointer-events: none;
 * }
 *
 * @keyframes ripple-animation {
 *   to {
 *     transform: scale(4);
 *     opacity: 0;
 *   }
 * }
 * ```
 */
export function useRipple() {
  const createRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget;

    // 确保按钮有相对定位
    const computedStyle = window.getComputedStyle(button);
    if (computedStyle.position === 'static') {
      button.style.position = 'relative';
    }

    // 确保不会溢出
    if (computedStyle.overflow === 'visible') {
      button.style.overflow = 'hidden';
    }

    // 创建水波纹元素
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // 计算点击位置
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - radius;
    const y = e.clientY - rect.top - radius;

    // 设置样式
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.classList.add('ripple');

    // 移除旧的水波纹
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }

    // 添加新的水波纹
    button.appendChild(circle);

    // 动画结束后移除
    setTimeout(() => {
      circle.remove();
    }, 600);
  }, []);

  return { createRipple };
}

/**
 * 为元素添加长按水波纹效果
 *
 * 用于长按场景，水波纹会持续扩散
 */
export function useLongPressRipple() {
  let timeoutId: NodeJS.Timeout | null = null;
  let rippleElement: HTMLSpanElement | null = null;

  const startRipple = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget;

    // 确保按钮有相对定位
    const computedStyle = window.getComputedStyle(button);
    if (computedStyle.position === 'static') {
      button.style.position = 'relative';
    }
    if (computedStyle.overflow === 'visible') {
      button.style.overflow = 'hidden';
    }

    // 创建水波纹元素
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // 计算点击位置
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - radius;
    const y = e.clientY - rect.top - radius;

    // 设置样式
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.classList.add('ripple-long-press');

    // 移除旧的水波纹
    const existingRipple = button.querySelector('.ripple-long-press');
    if (existingRipple) {
      existingRipple.remove();
    }

    // 添加新的水波纹
    button.appendChild(circle);
    rippleElement = circle;
  }, []);

  const endRipple = useCallback(() => {
    if (rippleElement) {
      rippleElement.style.animation = 'ripple-fade-out 0.3s ease-out';
      timeoutId = setTimeout(() => {
        rippleElement?.remove();
        rippleElement = null;
      }, 300);
    }
  }, []);

  const clearRipple = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    rippleElement?.remove();
    rippleElement = null;
  }, []);

  return { startRipple, endRipple, clearRipple };
}
