import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  InputBase,
  Drawer,
  Divider,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Navbar/Logo.png';

// Styled components
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'red',
});

const Search = styled('div')({
  position: 'relative',
  borderRadius: '4px',
  paddingLeft: '7px',
  backgroundColor: '#f1f1f1',
  marginLeft: '16px',
  width: '100%',
  maxWidth: '190px',
  display: 'flex',
  alignItems: 'center',
});

const SearchIconWrapper = styled('div')({
  position: 'absolute',
  pointerEvents: 'none',
  left: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
});

const Input = styled(InputBase)({
  paddingLeft: '30px',
  width: '100%',
});

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY <= 50);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);

  return (
    <Box sx={{ overflowY: 'hidden' }}>
      <AppBar
        position='fixed'
        sx={{
          backgroundColor:
            scrollY > 50 ? 'rgba(243, 236, 236, 0.68)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: 'blur(0px)',
          color: 'red',
          boxShadow: scrollY > 50 ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
          transition: 'transform 0.3s ease, background-color 0.3s ease',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '1400px',
              width: '100%',
              paddingX: { xs: 2, sm: 4, lg: 6 },
            }}
          >
            {/* Logo and Title */}
            <StyledLink
              to='/'
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <img
                src={Logo}
                alt='Logo'
                style={{
                  height: '55px',
                  width: 'auto',
                  cursor: 'pointer',
                }}
              />
              <Typography
                variant='h6'
                sx={{
                  marginLeft: 1,
                  fontWeight: 'bold',
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                  color: 'red',
                  whiteSpace: 'nowrap',
                }}
              >
                Nexgen Educare Academy
              </Typography>
            </StyledLink>

            {/* Nav Links (Desktop) */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: '16px',
                marginLeft: 4,
              }}
            >
              {['Courses', 'About Us', 'Contact Us'].map((text) => (
                <Button
                  key={text}
                  sx={{
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      bottom: 0,
                      left: 0,
                      backgroundColor: 'red',
                      transform: 'scaleX(0)',
                      transformOrigin: 'center',
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover:after': {
                      transform: 'scaleX(1)',
                    },
                  }}
                  component={StyledLink}
                  to={`/${text.replace(' ', '').toLowerCase()}`}
                >
                  {text}
                </Button>
              ))}
            </Box>

            {/* Right: Search & Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {searchBarOpen ? (
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <Input placeholder='Search...' />
                  <IconButton color='inherit' onClick={toggleSearchBar}>
                    <CloseIcon />
                  </IconButton>
                </Search>
              ) : (
                <IconButton color='inherit' onClick={toggleSearchBar}>
                  <SearchIcon />
                </IconButton>
              )}

              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <Button
                  sx={{ color: 'red', fontWeight: 'bold', fontSize: '1.1rem' }}
                  component={StyledLink}
                  to='/login'
                >
                  Login
                </Button>
                <Button
                  sx={{ color: 'red', fontWeight: 'bold', fontSize: '1.1rem' }}
                  component={StyledLink}
                  to='/adminlogin'
                >
                  Admin Login
                </Button>
              </Box>

              {/* Mobile Menu Icon */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton color='inherit' onClick={handleMobileMenuToggle}>
                  {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor='right'
          open={mobileMenuOpen}
          onClose={closeMobileMenu}
          sx={{
            '& .MuiDrawer-paper': { width: '250px', padding: '16px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h6'>Menu</Typography>
            <IconButton onClick={closeMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {['Courses', 'About Us', 'Contact Us'].map((text) => (
              <Button
                key={text}
                onClick={closeMobileMenu}
                component={StyledLink}
                to={`/${text.replace(' ', '').toLowerCase()}`}
                sx={{ color: 'red' }}
              >
                {text}
              </Button>
            ))}
            <Button
              sx={{ color: 'red' }}
              onClick={closeMobileMenu}
              component={StyledLink}
              to='/login'
            >
              Login
            </Button>
            <Button
              sx={{ color: 'red' }}
              onClick={closeMobileMenu}
              component={StyledLink}
              to='/adminlogin'
            >
              Admin Login
            </Button>
          </Box>
        </Drawer>
      </AppBar>
    </Box>
  );
};

export default Navbar;
