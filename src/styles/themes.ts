
export interface ThemeProps {
  backgroundColor: string;
  text: string;
}

export const darkTheme: ThemeProps = {
  backgroundColor: 'var(--dark-background)',
  text: 'var(--dark-text)',
}

export const lightTheme: ThemeProps = {
  backgroundColor: 'var(--light-background)',
  text: 'var(--light-text)',
}
