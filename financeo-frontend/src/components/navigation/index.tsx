import * as React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {logout} from "../../services/firebaseService";
import * as ROUTES from '../../constants/routes';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// @ts-ignore
import Image from "mui-image";
// @ts-ignore
import logo from "../../assets/logo/logo_white_large.png";

const pages = [
    {route: ROUTES.OVERVIEW, name: 'Overview', desc: "Provides fundamental financial information"},
    {route: ROUTES.ACCOUNTING, name: 'Accounting', desc: "Investigate and edit your bookings"},
    {route: ROUTES.INVESTING, name: 'Investing', desc: "Invest according to your self-designed strategies "},
    {route: ROUTES.ANALYSING, name: 'Analysing', desc: "Analyze buying behavior, frugality, investment strategies, risk affinity and more"},
];

const settings = [
    {route: ROUTES.PROFILE, name: 'Profile'},
    {route: ROUTES.ACCOUNT, name: 'Account'},
    {route: ROUTES.SETTINGS, name: 'Settings'},
    {route: ROUTES.SIGN_OUT, name: 'Logout'},
]

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        if(location.pathname === ROUTES.SIGN_OUT){
            logout();
        }
    }, [location])

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (props: any, route: string) => {
        route !== "backdropClick" && navigate(route); // second Element of MUI MenuItem
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (props: any, route: string) => {
        route !== "backdropClick" && navigate(route); // second Element of MUI MenuItem
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        <img src={logo} alt="financeo logo" width={180}/>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={event => handleCloseNavMenu(event, page.route)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        <img src={logo} alt="financeo logo" width={180}/>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Tooltip title={page.desc}>
                                <Button
                                    key={page.name}
                                    onClick={event => handleCloseNavMenu(event, page.route)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page.name}
                                </Button>
                            </Tooltip>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open Account details">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={event => handleCloseNavMenu(event, setting.route)}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navigation;