import React from 'react';
import { render } from 'react-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';



function ThemeBuilder() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  const theme = React.useMemo(
      () =>
        createMuiTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',

            primary: {
              main: yellow[500],
            },
            secondary: {
              main: '#2d3436',
              contrastText: '#000',
            },
          },
        }),
      [prefersDarkMode],
    );

    return theme;
 }


export default ThemeBuilder;