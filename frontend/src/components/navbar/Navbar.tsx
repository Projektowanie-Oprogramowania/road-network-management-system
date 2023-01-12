import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRole } from '@context/useRole';
import { TextField } from '@mui/material';

interface INavbar {
    navbarList: Array<{
        label: string;
        path: string;
        image: any;
    }>;
}

export const Navbar = (props: INavbar) => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );

    const { role, changeRole, userId, changeUser } = useRole();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <nav>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <EditRoadIcon
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        />
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
                            }}
                        >
                            RNMS
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
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
                                }}
                            >
                                {props.navbarList.map(v => (
                                    <li>
                                        <Link
                                            to={v.path}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <MenuItem
                                                key={v.label}
                                                onClick={handleCloseNavMenu}
                                            >
                                                <Typography textAlign="center">
                                                    <v.image
                                                        sx={{
                                                            top: 6,
                                                            position:
                                                                'relative',
                                                            marginLeft: 1,
                                                            marginRight: 1,
                                                        }}
                                                    />
                                                    {v.label}
                                                </Typography>
                                            </MenuItem>
                                        </Link>
                                    </li>
                                ))}
                            </Menu>
                        </Box>
                        <EditRoadIcon
                            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                        />
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
                            }}
                        >
                            RNMS
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {props.navbarList.map(v => (
                                <Link
                                    to={v.path}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        key={v.label}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                        }}
                                    >
                                        <v.image
                                            sx={{
                                                top: 6,
                                                position: 'relative',
                                                marginLeft: 1,
                                                marginRight: 1,
                                            }}
                                        />
                                        {v.label}
                                    </Button>
                                </Link>
                            ))}
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Box>Widok</Box>
                            {(role === 'user' && (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => changeRole('admin')}
                                    >
                                        Użytkownik
                                    </Button>
                                    <TextField
                                        id="outlined-basic"
                                        label={`UserID`}
                                        variant="outlined"
                                        type="text"
                                        autoComplete="off"
                                        value={userId}
                                        onChange={e => {
                                            changeUser(e.target.value);
                                        }}
                                        sx={{
                                            width: '100px',
                                        }}
                                    />
                                </>
                            )) ||
                                (role === 'admin' && (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => changeRole('user')}
                                    >
                                        Pracownik GDDKiA
                                    </Button>
                                )) || (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => changeRole('user')}
                                    >
                                        Błąd kliknij aby zmienić role
                                    </Button>
                                )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </nav>
    );
};
