import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';

type DomainTheme = 'aiinfra' | 'cloudnative' | 'backend' | 'thoughts' | 'default';

interface ThemeContextValue {
  currentTheme: DomainTheme;
  setTheme: (theme: DomainTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: 'default',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState<DomainTheme>('default');

  useEffect(() => {
    // 根据路由自动切换主题
    const path = location.pathname;

    if (path.startsWith('/Blogs/aiinfra') || path.startsWith('/aiinfra')) {
      setCurrentTheme('aiinfra');
    } else if (path.startsWith('/Blogs/cloudnative') || path.startsWith('/cloudnative')) {
      setCurrentTheme('cloudnative');
    } else if (path.startsWith('/Blogs/backend') || path.startsWith('/backend')) {
      setCurrentTheme('backend');
    } else if (path.startsWith('/Blogs/thoughts') || path.startsWith('/thoughts')) {
      setCurrentTheme('thoughts');
    } else {
      setCurrentTheme('default');
    }
  }, [location]);

  useEffect(() => {
    // 应用主题类名到 document.documentElement
    if (typeof document === 'undefined') return;

    document.documentElement.classList.remove(
      'theme-aiinfra',
      'theme-cloudnative',
      'theme-backend',
      'theme-thoughts'
    );

    if (currentTheme !== 'default') {
      document.documentElement.classList.add(`theme-${currentTheme}`);
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
