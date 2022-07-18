import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from "./components/navigation";
import * as ROUTES from './constants/routes'
import AppRoutes from "./components/navigation/AppRoutes";
import store from "./store/store";

function App() {
    useEffect(() => {
        console.log(store.getState());
    }, [store])

    return (
      <>
          <Router>
              <Navigation />
              <AppRoutes />
          </Router>
      </>
    );
};

export default App;
