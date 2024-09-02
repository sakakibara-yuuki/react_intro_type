import { createGlobalStyle, withTheme } from 'styled-components';
import { ThemeProps } from './themes';

type GlobalStyleProps = {
  theme: ThemeProps;
};

export const globalStyle = createGlobalStyle`
  :root {
    // dark-mode
    --dark-background: #1A1B27;
    --dark-text: #F5F5F7;

    // light-mode
    --light-background: #f2f2f2;
    --light-text: #2E0509;
  }

  * {
    box-sizing: border-box;
    outline: 0;
  }

  body {
    box-sizing: content-box;
    height: 100vh;
    background-color: ${({ theme }: GlobalStyleProps) => theme.backgroundColor};
  }
`;

export default withTheme(globalStyle);
