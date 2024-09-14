import { createGlobalStyle, withTheme } from 'styled-components';
import { ThemeProps } from './themes';

type GlobalStyleProps = {
  theme: ThemeProps;
};

export const globalStyle = createGlobalStyle`
  :root {
  }

  * {
    box-sizing: border-box;
    outline: 0;
  }

  body {
    box-sizing: content-box;
    height: 100vh;
    background-color: ${({ theme }: GlobalStyleProps) => theme.backgroundColor};
    color: ${({ theme }: GlobalStyleProps) => theme.text};
    transition: background-color 0.4s;
  }
`;

export default withTheme(globalStyle);
