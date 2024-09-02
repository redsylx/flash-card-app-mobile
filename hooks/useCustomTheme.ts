import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const lightTheme = {
  bg: '#ebe1ef',
  main: '#8a5bd6',
  caret: '#212b43',
  sub: '#a28db8',
  subAlt: '#dac7e2',
  text: '#212b43',
  error: '#f794ca',
  errorExtra: '#f279c2',
  colorfulError: '#f794ca',
  colorfulErrorExtra: '#f279c2',
};

const darkTheme = {
  bg: '#221c35',
  main: '#f67599',
  caret: '#f67599',
  sub: '#5a3a7e',
  subAlt: '#2f2346',
  text: '#ffe3eb',
  error: '#efc050',
  errorExtra: '#c5972c',
  colorfulError: '#efc050',
  colorfulErrorExtra: '#c5972c',
};

export function useCustomTheme() {
  const scheme = useColorScheme();
  const [theme, setTheme] = useState(scheme === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    setTheme(scheme === 'dark' ? darkTheme : lightTheme);
  }, [scheme]);

  return theme;
}