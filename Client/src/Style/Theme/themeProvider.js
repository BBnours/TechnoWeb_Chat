import React from 'react';
import { render } from 'react-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import blue from '@material-ui/core/colors/blue';
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
              main: blue[700],
              contrastText: '#000',
            },
          },
        }),
      [prefersDarkMode],
    );

    return theme;
 }


export default ThemeBuilder;