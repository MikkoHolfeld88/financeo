import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux"
import Firebase, { FirebaseContext } from './components/firebase';
import { store } from "./store"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Provider store={store}>
            <App />
        </Provider>
    </FirebaseContext.Provider>
);

