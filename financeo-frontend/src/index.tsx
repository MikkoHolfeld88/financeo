import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/firebase';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>
);

