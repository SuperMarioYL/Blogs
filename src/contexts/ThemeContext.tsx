import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { DOMAINS, detectDomain, type DomainConfig } from '@site/src/config/domains';

type DomainTheme = 'aiinfra' | 'cloudnative' | 'backend' | 'thoughts' | 'default';

interface ThemeContextValue {
  currentTheme: DomainTheme;
  currentDomain: DomainConfig | null;
  isHomePage: boolean;
  setTheme: (theme: DomainTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: 'default',
  currentDomain: null,
  isHomePage: true,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [currentTheme, setCurrentTheme] = useState<DomainTheme>('default');
  const [currentDomain, setCurrentDomain] = useState<DomainConfig | null>(null);

  // 检测是否在首页
  const isHomePage = location.pathname === '/' || location.pathname === '/Blogs/';

  useEffect(() => {
    // 根据路由自动切换主题和领域
    const path = location.pathname;
    console.log('🎨 Current path:', path);

    const domainId = detectDomain(path);

    if (domainId) {
      console.log(`✅ Switching to ${domainId} theme`);
      setCurrentTheme(domainId as DomainTheme);
      setCurrentDomain(DOMAINS[domainId]);
    } else {
      console.log('ℹ️ Using default theme');
      setCurrentTheme('default');
      setCurrentDomain(null);
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
    <ThemeContext.Provider value={{ currentTheme, currentDomain, isHomePage, setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
