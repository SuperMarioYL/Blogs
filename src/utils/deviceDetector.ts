/**
 * 设备检测工具类
 *
 * 用于检测设备类型、浏览器能力等信息
 */
export class DeviceDetector {
  /**
   * 检测是否为移动设备
   */
  static isMobile(): boolean {
    if (typeof window === 'undefined') return false;

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;
  }

  /**
   * 检测是否为平板设备
   */
  static isTablet(): boolean {
    if (typeof window === 'undefined') return false;

    return (
      /iPad|Android/i.test(navigator.userAgent) &&
      window.innerWidth >= 768 &&
      window.innerWidth < 1024
    );
  }

  /**
   * 检测是否为桌面设备
   */
  static isDesktop(): boolean {
    return !this.isMobile() && !this.isTablet();
  }

  /**
   * 检测是否支持 WebGL
   */
  static supportsWebGL(): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  /**
   * 检测是否支持 backdrop-filter
   */
  static supportsBackdropFilter(): boolean {
    if (typeof window === 'undefined') return false;

    return (
      CSS.supports('backdrop-filter', 'blur(1px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
    );
  }

  /**
   * 检测是否为触摸设备
   */
  static isTouchDevice(): boolean {
    if (typeof window === 'undefined') return false;

    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }

  /**
   * 获取设备类型描述
   */
  static getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (this.isMobile()) return 'mobile';
    if (this.isTablet()) return 'tablet';
    return 'desktop';
  }

  /**
   * 获取浏览器信息
   */
  static getBrowserInfo(): {
    name: string;
    version: string;
  } {
    if (typeof window === 'undefined') {
      return { name: 'unknown', version: 'unknown' };
    }

    const ua = navigator.userAgent;
    let name = 'unknown';
    let version = 'unknown';

    if (ua.indexOf('Chrome') > -1) {
      name = 'Chrome';
      version = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || 'unknown';
    } else if (ua.indexOf('Safari') > -1) {
      name = 'Safari';
      version = ua.match(/Version\/(\d+\.\d+)/)?.[1] || 'unknown';
    } else if (ua.indexOf('Firefox') > -1) {
      name = 'Firefox';
      version = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || 'unknown';
    } else if (ua.indexOf('Edge') > -1) {
      name = 'Edge';
      version = ua.match(/Edge\/(\d+\.\d+)/)?.[1] || 'unknown';
    }

    return { name, version };
  }

  /**
   * 检测性能级别
   *
   * @returns 'high' | 'medium' | 'low'
   */
  static getPerformanceLevel(): 'high' | 'medium' | 'low' {
    if (typeof window === 'undefined') return 'low';

    const cores = navigator.hardwareConcurrency || 2;
    const memory = (navigator as any).deviceMemory || 4;

    if (this.isMobile()) {
      return cores >= 4 && memory >= 4 ? 'medium' : 'low';
    }

    if (cores >= 8 && memory >= 8) return 'high';
    if (cores >= 4 && memory >= 4) return 'medium';
    return 'low';
  }

  /**
   * 打印设备信息 (调试用)
   */
  static logDeviceInfo(): void {
    if (typeof console === 'undefined') return;

    console.group('🖥️ Device Information');
    console.log('Device Type:', this.getDeviceType());
    console.log('Performance Level:', this.getPerformanceLevel());
    console.log('WebGL Support:', this.supportsWebGL());
    console.log('Backdrop Filter Support:', this.supportsBackdropFilter());
    console.log('Touch Device:', this.isTouchDevice());
    console.log('CPU Cores:', navigator.hardwareConcurrency || 'unknown');
    console.log('Memory:', (navigator as any).deviceMemory || 'unknown', 'GB');
    console.log('Browser:', this.getBrowserInfo());
    console.groupEnd();
  }
}
