import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {auth, logout} from "../../services/firebaseService/firebaseService";
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
import MenuItem from '@mui/material/MenuItem';
import './style.scss'
import '../../hovers.css'
// @ts-ignore
import testUser from "../../assets/img/portrait_placeholder.png";

// @ts-ignore
import logo from "../../assets/logo/logo_white_large.png";
import {useAuthState} from "react-firebase-hooks/auth";
import {RootState, setToolTipsEnabled, setUid, useAppDispatch} from "../../store";
import {TooltipFinanceo} from "../utils/TooltipFinanceo";
import {FormControlLabel, Switch} from "@mui/material";
import {useSelector} from "react-redux";
import {AppConfigState} from "../../store/slices/appConfig/appConfigSlice";

const pages = [
    {route: ROUTES.OVERVIEW, name: 'Overview', desc: "Provides fundamental financial information"},
    {route: ROUTES.ACCOUNTING, name: 'Accounting', desc: "Investigate and edit your bookings"},
    {route: ROUTES.INVESTING, name: 'Investing', desc: "Invest according to your self-designed strategies "},
    {
        route: ROUTES.ANALYSING,
        name: 'Analysing',
        desc: "Analyze buying behavior, frugality, investment strategies, risk affinity and more"
    },
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
    const [user] = useAuthState(auth);
    const dispatch = useAppDispatch();
    const hvrFX = 'hvr-skew';
    const appConfig: AppConfigState = useSelector((state: RootState) => state.appConfig);

    // handles logout
    React.useEffect(() => {
        if (location.pathname === ROUTES.SIGN_OUT) {
            logout();
            dispatch(setUid('none'))
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

    const clickLogo = () => {
        if (user) {
            navigate(ROUTES.OVERVIEW);
        } else {
            navigate(ROUTES.SIGN_IN);
        }
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={clickLogo}
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        <img src={logo} alt="financeo logo" width={180} className={hvrFX}/>
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        {
                            user && <IconButton
                                sx={{color: 'white'}}
                                size="large"
                                aria-label="menu button"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit">
                                <MenuIcon/>
                            </IconButton>
                        }
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
                                display: {xs: 'block', md: 'none'},
                            }}>
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={event => handleCloseNavMenu(event, page.route)}>
                                    <Typography key={page.name + "_label"} textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        onClick={clickLogo}
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        <img src={logo} alt="financeo logo" width={180} className={hvrFX}/>
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, textAlign: 'center'}}>
                        {user && pages.map((page) => (
                            <TooltipFinanceo title={page.desc} key={page.name + "_description"}>
                                <Button
                                    key={page.name}
                                    onClick={event => handleCloseNavMenu(event, page.route)}
                                    sx={{my: 2, color: 'white', display: 'block'}}>
                                    {page.name}
                                </Button>
                            </TooltipFinanceo>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <FormControlLabel
                            sx={{color: 'white', fontSize: "8px", marginRight: "10px"}}
                            value="start"
                            control={<Switch
                                checked={!appConfig.toolTipsEnabled}
                                onChange={() => dispatch(setToolTipsEnabled(!appConfig.toolTipsEnabled))}
                                color="secondary"/>}
                            label="Tooltips"
                            labelPlacement="start"/>
                        {
                            user &&
                            <TooltipFinanceo title={"Open account details for '" + user.email + "'"}>
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src={testUser}/>
                                </IconButton>
                            </TooltipFinanceo>
                        }
                        <Menu
                            sx={{mt: '45px'}}
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
                            {user && settings.map((setting) => (
                                <MenuItem key={setting.name}
                                          onClick={event => handleCloseNavMenu(event, setting.route)}>
                                    <Typography key={setting.name + "_label"}
                                                textAlign="center">{setting.name}</Typography>
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
