import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import NavbarContent from '@theme-original/Navbar/Content';
import type NavbarContentType from '@theme/Navbar/Content';
import type {WrapperProps} from '@docusaurus/types';
import { useTheme } from '@site/src/contexts/ThemeContext';

function useFilteredNavbarItems() {
  const { navbar } = useThemeConfig();
  const allItems = navbar.items;
  const { currentDomain, isHomePage } = useTheme();

  // 首页: 显示所有领域链接
  if (isHomePage) {
    return allItems;
  }

  // 领域页面: 只显示当前领域的内部链接
  if (currentDomain) {
    return [
      ...currentDomain.navItems,
      // 保留右侧的 GitHub 等链接
      ...allItems.filter(item => item.position === 'right'),
    ];
  }

  return allItems;
}

type Props = WrapperProps<typeof NavbarContentType>;

export default function NavbarContentWrapper(props: Props): JSX.Element {
  const filteredItems = useFilteredNavbarItems();

  // 覆盖 navbar items
  const modifiedProps = {
    ...props,
  };

  // 注入过滤后的导航项
  React.useLayoutEffect(() => {
    const { navbar } = useThemeConfig();
    navbar.items = filteredItems;
  }, [filteredItems]);

  return <NavbarContent {...modifiedProps} />;
}
