import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"
import Firebase, { FirebaseContext } from './components/firebase';
import { store } from "./store"
import "./index.scss"
import {ThemeProvider} from "@mui/material";
import theme from "./theme"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </FirebaseContext.Provider>
);

