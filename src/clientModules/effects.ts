/**
 * 全局效果初始化模块
 *
 * 此文件在客户端加载时自动执行
 * 用于初始化全局性能监控、设备检测等
 */

import { DeviceDetector } from '../utils/deviceDetector';
import { PerformanceMonitor } from '../utils/performanceMonitor';

// 仅在生产环境打印设备信息
if (process.env.NODE_ENV === 'development') {
  DeviceDetector.logDeviceInfo();
}

// 启动性能监控 (仅在桌面端)
if (DeviceDetector.isDesktop() && PerformanceMonitor.shouldLoadHeavyEffects()) {
  // 延迟3秒后开始监控，避免影响初始加载
  setTimeout(() => {
    PerformanceMonitor.measureFPS((fps) => {
      // 如果 FPS 持续低于 30，启用低性能模式
      if (fps < 30 && PerformanceMonitor.getAverageFPS() < 30) {
        PerformanceMonitor.enableLowPerformanceMode();
      }
    });
  }, 3000);
}

// 清理：页面卸载时停止监控
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    PerformanceMonitor.stopMeasureFPS();
  });
}
