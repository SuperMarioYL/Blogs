import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import { useTheme } from '@site/src/contexts/ThemeContext';
import type { Props } from '@theme/Logo';

export default function Logo(props: Props): JSX.Element {
  const { currentDomain } = useTheme();
  const { colorMode } = useColorMode();
  const { className, imageClassName, titleClassName, ...propsRest } = props;

  const getLogo = () => {
    if (currentDomain) {
      const logoPath = colorMode === 'dark'
        ? currentDomain.logo.dark
        : currentDomain.logo.light;
      return {
        src: logoPath,
        alt: currentDomain.name,
        fallback: currentDomain.logo.icon,
      };
    }
    return {
      src: 'https://avatars.githubusercontent.com/u/20982600?v=4',
      alt: 'Yu Lei\'s Blog',
      fallback: null,
    };
  };

  const logo = getLogo();
  const logoUrl = useBaseUrl(logo.src);

  return (
    <Link
      to={useBaseUrl('/')}
      {...propsRest}
      className={className}
    >
      {logo.fallback ? (
        <span className="navbar__logo-emoji" title={logo.alt}>
          {logo.fallback}
        </span>
      ) : (
        <img
          src={logoUrl}
          alt={logo.alt}
          className={imageClassName}
        />
      )}
      {props.title && (
        <b className={titleClassName}>{props.title}</b>
      )}
    </Link>
  );
}
