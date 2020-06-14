import { DefaultTheme } from '@twilio-paste/theme';
import merge from 'lodash.merge';

export const PortfolioTheme = merge(DefaultTheme, {
  colors: {
    colorBackground: '#011627',
    colorBackgroundBody: '#232946',
    colorBorderLight: '#ff5470',
    colorBorderPrimary: '#ff5470',
    colorText: '#b8c1ec',
    colorTextWeak: '#fffffe',
    colorTextBrandHighlight: '#ff5470',
    colorTextLink: '#fffffe',
    colorTextLinkDarker: '#eebbc3',
  },
  backgroundColors: {
    colorBackground: '#011627',
    colorBackgroundBody: '#232946',
  },
  borderColors: {
    colorBorder: 'rgba(184, 193, 236, 0.27)',
    colorBorderLight: '#ff5470',
    colorBorderPrimary: '#ff5470',
  },
  textColors: {
    colorText: '#b8c1ec',
    colorTextWeak: '#fffffe',
    colorTextBrandHighlight: '#ff5470',
    colorTextLink: '#fffffe',
    colorTextLinkDarker: '#eebbc3',
  },
  fonts: { fontFamilyText: '"Poppins", sans-serif' },
  fontSizes: {
    fontSize10: '14px',
    fontSize20: '16px',
    fontSize30: '18px',
    fontSize40: '20px',
    fontSize50: '24px',
    fontSize60: '28px',
    fontSize70: '32px',
    fontSize80: '40px',
    fontSize90: '44px',
    fontSize100: '48px',
    fontSize110: '72px',
  },
  lineHeights: {
    lineHeight0: '0',
    lineHeight10: '24px',
    lineHeight20: '28px',
    lineHeight30: '28px',
    lineHeight40: '28px',
    lineHeight50: '32px',
    lineHeight60: '36px',
    lineHeight70: '40px',
    lineHeight80: '52px',
    lineHeight90: '56px',
    lineHeight100: '60px',
    lineHeight110: '92px',
  },
  space: {
    space0: '0',
    space10: '0.5rem',
    space20: '0.75rem',
    space30: '1rem',
    space40: '1.25rem',
    space50: '1.5rem',
    space60: '1.75rem',
    space70: '2rem',
    space80: '2.25rem',
    space90: '2.5rem',
    space100: '2.75rem',
    space110: '3rem',
    space120: '3.25rem',
    space130: '3.5rem',
    space140: '3.75rem',
    space150: '4rem',
    space160: '4.25rem',
    space170: '4.5rem',
    space180: '4.75rem',
    space190: '5rem',
    space200: '5.25rem',
  },
});
