import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Navigation from "./components/navigation";
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
