import React, {type ReactNode} from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {AnimatePresence, motion} from 'framer-motion';
import {useLocation} from '@docusaurus/router';
import MouseTracker from '@site/src/effects/MouseTracker';
import {PerformanceMonitor} from '@site/src/utils/performanceMonitor';
import {ThemeProvider} from '@site/src/contexts/ThemeContext';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  const location = useLocation();
  const shouldLoadMouseTracker = typeof window !== 'undefined' && PerformanceMonitor.shouldLoadHeavyEffects();

  return (
    <ThemeProvider>
      {/* 全局鼠标跟踪特效 - 仅桌面端 */}
      {shouldLoadMouseTracker && <MouseTracker />}

      {/* 页面过渡动画 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -20}}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          <Layout {...props} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
