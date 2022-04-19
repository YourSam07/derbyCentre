import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from "./contexts/theme";
import {UserProvider} from './contexts/userContext'


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <ThemeProvider>
      <App /> 
    </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
