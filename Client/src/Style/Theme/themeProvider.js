import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import pink from '@material-ui/core/colors/pink';



function ThemeBuilder() {

  const prefersDarkMode = window.localStorage.getItem('theme');
  
  const theme = React.useMemo(
      () =>
        createMuiTheme({
          palette: {
            type: prefersDarkMode === 'dark' ? 'dark' : 'light',

            primary: {
              main: prefersDarkMode === 'dark' ? yellow[500] :pink[500],
            },
            secondary: {
              main: prefersDarkMode === 'dark' ? '#5d6d7c' : '#ffad39',
            },
            third : {
              main: prefersDarkMode === 'dark' ? "#f2efe2" : '#39ff74',
            },
            typography: {
              color: '#ffad39',
              fontFamily: 'Roboto',
            },
          },
        }),
      [prefersDarkMode],
    );

    return theme;
 }


export default ThemeBuilder;