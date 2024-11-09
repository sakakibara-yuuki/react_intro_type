interface ColorPallet {
  primary: string; // for background
  secondary: string; // for buttons
  tertiary: string; // for active
  quaternary: string; // for text
}

function lightDarkColor(color: ColorPallet): Array<ColorPallet> {
  const antiColor = (color: ColorPallet): ColorPallet => ({
    primary: color.quaternary,
    secondary: color.tertiary,
    tertiary: color.secondary,
    quaternary: color.primary,
  });

  return [color, antiColor(color)];
}

const pallet1: ColorPallet = {
  primary: "#F6F5F5",
  secondary: "#D3E0EA",
  tertiary: "#1687A7",
  quaternary: "#276678",
};

export interface ThemeProps {
  backgroundColor: string;
  buttonBackground?: string;
  butttonText?: string;
  text: string;
}

function palletToTheme(color: ColorPallet): ThemeProps {
  return {
    backgroundColor: color.primary,
    buttonBackground: color.secondary,
    butttonText: color.tertiary,
    text: color.quaternary,
  };
}

function createTheme(color: ColorPallet): Array<ThemeProps> {
  const [palletLight, palletDark] = lightDarkColor(color);
  const lightTheme = palletToTheme(palletLight);
  const darkTheme = palletToTheme(palletDark);

  return [lightTheme, darkTheme];
}

export const [lightTheme, darkTheme] = createTheme(pallet1);
