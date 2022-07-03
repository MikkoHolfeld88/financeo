import React from 'react';
import logo from './logo.svg';
import './App.css';

import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);

const test = () => {
  console.log(process.env.TEST)
}

function App() {
  test()
  return (
    <div className="App">

    </div>
  );
}

export default App;
