import { css } from '@twilio-paste/core/styling-library';
import { GenericThemeShape } from '@twilio-paste/core/theme';

interface PrismStylesProps {
  theme: Partial<GenericThemeShape>;
}

// inspiratiopn from https://github.com/SaraVieira/prism-theme-night-owl
export const getPrismStyles = (props: PrismStylesProps): any =>
  css({
    'code[class*="language-"], pre[class*="language-"]': {
      color: '#d6deeb',
      fontFamily: 'fontFamilyCode',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      wordWrap: 'normal',
      lineHeight: 'lineHeight40',
      tabSize: '4',
      hyphens: 'none',
    },
    'pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection, code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection':
      {
        textShadow: 'none',
        background: 'rgba(29, 59, 83, 0.99)',
      },
    'pre[class*="language-"]::selection, pre[class*="language-"] ::selection, code[class*="language-"]::selection, code[class*="language-"] ::selection':
      {
        textShadow: 'none',
        background: 'rgba(29, 59, 83, 0.99)',
      },
    '@media print': {
      'code[class*="language-"], pre[class*="language-"]': {
        textShadow: 'none',
      },
    },
    ':not(pre) > code[class*="language-"], pre[class*="language-"]': {
      color: 'white',
      background: '#011627',
    },
    ':not(pre) > code[class*="language-"]': {
      padding: '0.1em',
      borderRadius: '0.3em',
      whiteSpace: 'normal',
    },
    '.token.comment, .token.prolog, .token.cdata': {
      color: 'rgb(99, 119, 119)',
      fontStyle: 'italic',
    },
    '.token.punctuation': {
      color: 'rgb(199, 146, 234)',
    },
    '.namespace': {
      color: 'rgb(178, 204, 214)',
    },
    '.token.deleted': {
      color: 'rgba(239, 83, 80, 0.56)',
      fontStyle: 'italic',
    },
    '.token.symbol, .token.property': {
      color: 'rgb(128, 203, 196)',
    },
    '.token.tag, .token.operator, .token.keyword': {
      color: 'rgb(127, 219, 202)',
    },
    '.token.boolean': {
      color: 'rgb(255, 88, 116)',
    },
    '.token.number': {
      color: 'rgb(247, 140, 108)',
    },
    '.token.constant, .token.function, .token.builtin, .token.char': {
      color: 'rgb(130, 170, 255)',
    },
    '.token.selector, .token.doctype': {
      color: 'rgb(199, 146, 234)',
      fontStyle: 'italic',
    },
    '.token.attr-name, .token.inserted': {
      color: 'rgb(173, 219, 103)',
      fontStyle: 'italic',
    },
    '.token.string, .token.url, .token.entity, .language-css .token.string, .style .token.string': {
      color: 'rgb(173, 219, 103)',
    },
    '.token.class-name, .token.atrule, .token.attr-value': {
      color: 'rgb(255, 203, 139)',
    },
    '.token.regex, .token.important, .token.variable': {
      color: 'rgb(214, 222, 235)',
    },
    '.token.important, .token.bold': {
      fontWeight: 'bold',
    },
    '.token.italic': {
      fontStyle: 'italic',
    },
  })(props);
