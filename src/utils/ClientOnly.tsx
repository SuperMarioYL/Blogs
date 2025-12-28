import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly 组件 - SSR 安全封装
 *
 * 只在客户端渲染子组件，避免 SSR 时访问浏览器 API 导致错误
 *
 * @example
 * <ClientOnly>
 *   <ThreeBackground />
 * </ClientOnly>
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps): JSX.Element | null {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback as JSX.Element | null;
  }

  return <>{children}</>;
}
