import React from 'react';
import {useLocation} from "react-router-dom";
import * as ROUTES from "./constants/routes";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const showLayout = !location.pathname.startsWith(ROUTES.DASHBOARD);

    return (
        <React.Fragment>
            {showLayout && <header>Header-Inhalt</header>}
            <main>{children}</main>
            {showLayout && <footer>Footer-Inhalt</footer>}
        </React.Fragment>
    )
};

export default Layout;
