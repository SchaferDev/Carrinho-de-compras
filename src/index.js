import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2A9F85'
    },
    secondary: {
      main: '#FF7070'
    },
  }
});

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StylesProvider>
  </React.StrictMode>
);
