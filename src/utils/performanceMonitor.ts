/**
 * 性能监控工具类
 *
 * 用于检测设备性能并决定是否加载重型特效
 */
export class PerformanceMonitor {
  private static fpsHistory: number[] = [];
  private static rafId: number | null = null;

  /**
   * 判断是否应该加载重型特效
   *
   * 考虑因素:
   * - 设备类型 (移动端禁用)
   * - CPU核心数 (低端设备禁用)
   * - 用户偏好 (prefers-reduced-motion)
   */
  static shouldLoadHeavyEffects(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const isMobile = window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency < 4;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    return !isMobile && !isLowEnd && !prefersReducedMotion;
  }

  /**
   * 判断是否应该加载中等复杂度特效
   */
  static shouldLoadMediumEffects(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }

    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isLowEnd = navigator.hardwareConcurrency < 2;

    return !isLowEnd && (isTablet || window.innerWidth >= 1024);
  }

  /**
   * 测量 FPS (帧率)
   *
   * 用于动态性能降级
   */
  static measureFPS(callback?: (fps: number) => void): void {
    if (typeof window === 'undefined') return;

    let lastTime = performance.now();
    let frames = 0;

    const tick = () => {
      const now = performance.now();
      frames++;

      if (now >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (now - lastTime));
        this.fpsHistory.push(fps);

        // 保留最近10次测量
        if (this.fpsHistory.length > 10) {
          this.fpsHistory.shift();
        }

        if (callback) {
          callback(fps);
        }

        // 性能警告
        if (fps < 30) {
          console.warn('[Performance] Low FPS detected:', fps);
        }

        frames = 0;
        lastTime = now;
      }

      this.rafId = requestAnimationFrame(tick);
    };

    tick();
  }

  /**
   * 停止 FPS 测量
   */
  static stopMeasureFPS(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * 获取平均 FPS
   */
  static getAverageFPS(): number {
    if (this.fpsHistory.length === 0) return 60;

    const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.fpsHistory.length);
  }

  /**
   * 判断性能是否良好
   */
  static isPerformanceGood(): boolean {
    return this.getAverageFPS() >= 50;
  }

  /**
   * 启用低性能模式
   *
   * 在body上添加class，CSS可以据此调整样式
   */
  static enableLowPerformanceMode(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.add('low-performance-mode');
      console.info('[Performance] Low performance mode enabled');
    }
  }

  /**
   * 禁用低性能模式
   */
  static disableLowPerformanceMode(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('low-performance-mode');
    }
  }
}
