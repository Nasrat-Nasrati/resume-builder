import type { LinkProps } from '@mui/material/Link';

import { useId, forwardRef } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = LinkProps & {
  isSingle?: boolean;
  disabled?: boolean;
};

export const Logo = forwardRef<HTMLAnchorElement, LogoProps>((props, ref) => {
  const { className, href = '/', isSingle = true, disabled, sx, ...other } = props;

  const theme = useTheme();

  const gradientId = useId();

  const TEXT_PRIMARY = theme.vars.palette.text.primary;
  const PRIMARY_LIGHT = theme.vars.palette.primary.light;
  const PRIMARY_MAIN = theme.vars.palette.primary.main;
  const PRIMARY_DARKER = theme.vars.palette.primary.dark;

  /*
    * OR using local (public folder)
    *
    const singleLogo = (
      <img
        alt="Single logo"
        src={`${CONFIG.assetsDir}/logo/favicon.svg`}
        width="100%"
        height="100%"
      />
    );

    const fullLogo = (
      <img
        alt="Full logo"
        src={`${CONFIG.assetsDir}/logo/favicon.svg`}
        width="100%"
        height="100%"
      />
    );
    *
    */

  const singleLogo = (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 229 201"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Example linear gradient using theme colors */}
        <linearGradient
          id={`${gradientId}-1`}
          x1="0"
          y1="0"
          x2="229"
          y2="201"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_DARKER} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
        <linearGradient
          id={`${gradientId}-2`}
          x1="0"
          y1="0"
          x2="229"
          y2="201"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_MAIN} />
        </linearGradient>
      </defs>

      <g>
        <path
          d="m51.74 62.07 28.43 28.42-24.34 23.66L80.17 139l-28.43 27.58L0 114.32zM177.19 62.07l-28.42 28.42 24.34 23.66L148.77 139l28.42 27.58 51.75-52.26z"
          fill={`url(#${gradientId}-1)`} // theme gradient
        />
        <path
          d="m113.53 4.19 52.85 50.72-25.53 24.85-27.32-23.15-23.74 24.85-27.23-26.55zM113.49 0l-2.08 2.07-50.98 50.72-2.16 2.15 2.18 2.13 27.23 26.55 2.17 2.12 2.09-2.19 21.79-22.81 25.16 21.32 2.08 1.76 1.95-1.9 25.53-24.85 2.22-2.16-2.24-2.15-52.82-50.73z"
          fill={`url(#${gradientId}-2)`} // another gradient
        />
        <path
          d="M156.46 164.62h-3v-7.69h-8.2c-.83 0-1.5-.67-1.5-1.5v-34.24h-10.02v27.61c0 .83-.67 1.5-1.5 1.5h-6.38c-.83 0-1.5-.67-1.5-1.5v-44.2h-10.79v21.48c0 .83-.67 1.5-1.5 1.5h-3.86v25.56c0 .83-.67 1.5-1.5 1.5h-3.86v3.1c0 .83-.67 1.5-1.5 1.5h-4.34c-.83 0-1.5-.67-1.5-1.5v-23.01h-9.77v29.9h-3v-31.4c0-.83.67-1.5 1.5-1.5h12.77c.83 0 1.5.67 1.5 1.5v23.01h1.34v-3.1c0-.83.67-1.5 1.5-1.5h3.86v-25.56c0-.83.67-1.5 1.5-1.5h3.86V103.1c0-.83.67-1.5 1.5-1.5h13.79c.83 0 1.5.67 1.5 1.5v44.2h3.38v-27.61c0-.83.67-1.5 1.5-1.5h13.02c.83 0 1.5.67 1.5 1.5v34.24h8.2c.83 0 1.5.67 1.5 1.5z"
          // fill={TEXT_PRIMARY} // use theme text color
          fill={`url(#${gradientId}-2)`} // use theme text color
        />
      </g>
    </svg>
  );

  const fullLogo = singleLogo; // Or create a separate full logo SVG if needed

  return (
    <LogoRoot
      ref={ref}
      component={RouterLink}
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        () => ({
          width: 40,
          height: 40,
          ...(!isSingle && { width: 102, height: 36 }),
          ...(disabled && { pointerEvents: 'none' }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </LogoRoot>
  );
});

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: 'transparent',
  display: 'inline-flex',
  verticalAlign: 'middle',
}));
