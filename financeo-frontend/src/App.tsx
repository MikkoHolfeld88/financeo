import React from 'react';
import {BrowserRouter, BrowserRouter as Router} from 'react-router-dom';
import AppRoutes from "./components/navigation/AppRoutes";
import Layout from "./Layout";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <AppRoutes/>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
