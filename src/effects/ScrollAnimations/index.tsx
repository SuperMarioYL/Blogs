import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册 GSAP 插件
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP ScrollTrigger 滚动动画系统
 *
 * 功能:
 * - 元素淡入动画 (批量处理)
 * - 视差滚动效果
 * - 卡片交错动画
 * - 自动清理
 *
 * 使用方法:
 * ```tsx
 * import { useScrollAnimations } from '@site/src/effects/ScrollAnimations';
 *
 * export default function MyComponent() {
 *   useScrollAnimations();
 *   return (
 *     <div className="animate-fade-in">Content</div>
 *   );
 * }
 * ```
 */
export function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. 批量淡入动画 - 适用于卡片、列表项
    ScrollTrigger.batch('.animate-fade-in', {
      onEnter: (batch) =>
        gsap.from(batch, {
          opacity: 0,
          y: 60,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
        }),
      start: 'top 85%',
      once: true,
    });

    // 2. 标题动画 - 从下往上 + 淡入
    ScrollTrigger.batch('.animate-title', {
      onEnter: (batch) =>
        gsap.from(batch, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
        }),
      start: 'top 90%',
      once: true,
    });

    // 3. 从左进入动画
    ScrollTrigger.batch('.animate-from-left', {
      onEnter: (batch) =>
        gsap.from(batch, {
          opacity: 0,
          x: -80,
          duration: 0.9,
          ease: 'power2.out',
        }),
      start: 'top 85%',
      once: true,
    });

    // 4. 从右进入动画
    ScrollTrigger.batch('.animate-from-right', {
      onEnter: (batch) =>
        gsap.from(batch, {
          opacity: 0,
          x: 80,
          duration: 0.9,
          ease: 'power2.out',
        }),
      start: 'top 85%',
      once: true,
    });

    // 5. 缩放淡入动画
    ScrollTrigger.batch('.animate-scale-in', {
      onEnter: (batch) =>
        gsap.from(batch, {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: 'back.out(1.2)',
        }),
      start: 'top 85%',
      once: true,
    });

    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

/**
 * 视差滚动效果
 *
 * 使用方法:
 * ```tsx
 * useParallaxScroll('.parallax-element', { speed: 0.5 });
 * ```
 */
export function useParallaxScroll(
  selector: string,
  options: { speed?: number; direction?: 'up' | 'down' } = {}
) {
  const { speed = 0.5, direction = 'up' } = options;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const elements = document.querySelectorAll(selector);
    const triggers: ScrollTrigger[] = [];

    elements.forEach((element) => {
      const yPercent = direction === 'up' ? -100 * speed : 100 * speed;

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(element, {
            yPercent: yPercent * self.progress,
          });
        },
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [selector, speed, direction]);
}

/**
 * 计数动画效果
 *
 * 使用方法:
 * ```tsx
 * <span className="animate-counter" data-target="1000">0</span>
 * ```
 */
export function useCounterAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const counters = document.querySelectorAll('.animate-counter');

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0');

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerText: target,
            duration: 2,
            ease: 'power1.out',
            snap: { innerText: 1 },
            onUpdate: function () {
              counter.textContent = Math.ceil(
                parseFloat(counter.textContent || '0')
              ).toString();
            },
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

/**
 * 进度条动画
 *
 * 使用方法:
 * ```tsx
 * <div className="animate-progress" data-progress="80">
 *   <div className="progress-bar"></div>
 * </div>
 * ```
 */
export function useProgressAnimation() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const progressBars = document.querySelectorAll('.animate-progress');

    progressBars.forEach((container) => {
      const bar = container.querySelector('.progress-bar') as HTMLElement;
      const targetProgress = parseInt(
        container.getAttribute('data-progress') || '0'
      );

      if (bar) {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to(bar, {
              width: `${targetProgress}%`,
              duration: 1.5,
              ease: 'power2.out',
            });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
