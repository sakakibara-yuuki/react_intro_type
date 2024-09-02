
interface ColorPallet {
  primary: string; // for background
  secondary: string; // for buttons
  tertiary: string; // for active
  quaternary: string; // for text
}

function lightDarkColor(color: ColorPallet): Array<ColorPallet> {

  function antiColor(color: ColorPallet): ColorPallet {
    return {
      primary: color.quaternary,
      secondary: color.tertiary,
      tertiary: color.secondary,
      quaternary: color.primary,
    }
  }

  const palletLight = color;
  const palletDark = antiColor(color);
  return [palletLight, palletDark];
}

const pallet1: ColorPallet = {
  primary: '#F6F5F5',
  secondary: '#D3E0EA',
  tertiary: '#1687A7',
  quaternary: '#276678',
}

const pallet2: ColorPallet = {
  primary: '#ECF4F3',
  secondary: '#68B0AB',
  tertiary: '#006A71',
  quaternary: '#FF7E67',
}

const pallet3: ColorPallet = {
  primary: '#FFE8DF',
  secondary: '#FFFFFF',
  tertiary: '#F0F0F0',
  quaternary: '#888888',
}

const [palletLight, palletDark] = lightDarkColor(pallet1);


export interface ThemeProps {
  backgroundColor: string;
  text: string;
  buttonBackground?: string;
  butttontext?: string;
}

export const lightTheme: ThemeProps = {
  backgroundColor: palletLight.primary,
  text: palletLight.quaternary,
  buttonBackground: palletLight.secondary,
  butttontext: palletLight.quaternary,
}

export const darkTheme: ThemeProps = {
  backgroundColor: palletDark.primary,
  text: palletDark.quaternary,
  buttonBackground: palletDark.secondary,
  butttontext: palletDark.quaternary,
}
