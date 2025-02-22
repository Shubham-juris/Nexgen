import React, { useState } from 'react';
// import '../Login&Signup/Login.css';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LoginImage2 from '../../assets/Login&Signup/loginImage3.jpg';
import bgImage2 from '../../assets/Login&Signup/bgimage2.jpg';
import Logoimg from '../../assets/LogoImg/Logo.png';

const Login = ({ onLogin }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Hardcoded credentials
  const validCredentials = {
    userId: 'student',
    password: '1234',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userId = formData.get('userId');
    const password = formData.get('password');

    if (
      userId === validCredentials.userId &&
      password === validCredentials.password
    ) {
      setOpenSnackbar(true);
      setLoginError('');
      onLogin({ userId });
      setTimeout(() => {
        navigate('/Sdashboard');
      }, 1000);
    } else {
      setLoginError('Invalid ID or password');
    }

    setFormKey((prevKey) => prevKey + 1);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bgImage2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth='md' display='flex'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          data-aos='fade-up'
        >
          <Box
            width='100%'
            // paddingX='5%'
            border='none'
            // borderRadius='20px'
            display='flex'
            justifyContent='center'
            flexDirection={{ xs: 'column', sm: 'row', md: 'row' }}
            boxShadow='5px 5px 10px rgb(139, 125, 125)'
          >
            <Box
              sx={{
                height: 'auto',
                backgroundImage: `url(${LoginImage2})`,
                backgroundSize: 'cover',
                // marginTop: 8,
                backgroundColor: 'rgba(255, 255, 255, 1)',
                display: { sm: 'flex', xs: 'none' },
                // padding: 2,
                flexDirection: 'row',

                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: 3,
                position: 'relative',
                width: '100%',
              }}
            ></Box>
            <Box
              sx={{
                border: 'none',
                height: { xs: 'auto', sm: 'auto' },
                borderRadius: { xs: '10px', sm: '0px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: {
                  xs: `url(${LoginImage2}) no-repeat center center`,
                  sm: '#fff',
                },
                backgroundColor: '#fff',
                backgroundSize: { xs: 'cover' }, // or 'cover' depending on your needs
                backgroundPosition: { xs: 'center' }, // Ensure the image is centered
                paddingY: { xs: 2, md: 4 },
                position: 'relative',
                width: { xs: '100%', sm: '89%' },
              }}
            >
              {/* <img
                src={LoginImage2}
                alt='Login'
                style={{
                  visibility: { xs: 'visible', sm: 'hidden' },
                  width: '100%', // Default for larger screens
                  maxWidth: '80%', // Adjust the width of the image on smaller screens
                  height: 'auto',
                  display: 'block',
                }}
              /> */}
              <Box
                sx={{
                  mt: { xs: '1', md: 'auto' },
                }}
              >
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{ position: 'absolute', top: 10, left: 10 }}
                >
                  <ArrowBack />
                </IconButton>
                <img
                  style={{ height: '60px' }}
                  onClick={() => navigate('/')}
                  src={Logoimg}
                  alt='logoimg'
                />
                <Typography
                  component='h1'
                  variant='h5'
                  sx={
                    {
                      // py: 2
                    }
                  }
                >
                  Login
                </Typography>
              </Box>
              <Box
                padding='25px'
                key={formKey}
                component='form'
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  sx={{
                    overflow: 'visible',
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    border: 'none',
                    // width: { xs: '80%', sm: '100%' },
                    // height: { xs: '80%', sm: '100%' },
                  }}
                  margin='normal'
                  required
                  fullWidth
                  id='userId'
                  label='ID'
                  name='userId'
                  autoComplete='username'
                  autoFocus
                />
                <TextField
                  sx={{
                    overflow: 'visible',
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    border: 'none',
                  }}
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  autoComplete='current-password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        sx={{ overflow: 'hidden' }}
                      >
                        <IconButton onClick={handleTogglePasswordVisibility}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {loginError && (
                  <Typography color='error' sx={{ mt: 1, textAlign: 'center' }}>
                    {loginError}
                  </Typography>
                )}
                <Box
                  width='80%'
                  margin='10% 10% 0 10%'
                  display='flex'
                  justifyContent='center'
                >
                  {' '}
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    boxShadow='5px 5px 10px rgba(0,0,0,1)'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Link
                    href='#'
                    variant='body2'
                    sx={{ textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                  <Link
                    href='/SignUp'
                    variant='body2'
                    sx={{ textDecoration: 'none' }}
                  >
                    Sign Up
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          sx={{ width: '100%' }}
        >
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </Box>
    // <Box>
    //   <iframe
    //     style={{
    //       height: '100vh',
    //       width: '100vw',
    //     }}
    //     src='https://forms.visme.co/formsPlayer/6x47w1v6-untitled-project'
    //   ></iframe>
    // </Box>
  );
};

export default Login;
