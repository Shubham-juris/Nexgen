import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError('');
    setMessage('');

    if (!username || !password) {
      toast.error('Please fill in all fields!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          toast.success('Login successful! Redirecting...');
          setTimeout(() => navigate('/Sidebar'), 2000);
        } else {
          setLoginError('Invalid credentials');
          toast.error('Invalid credentials');
        }
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || 'Invalid credentials');
        toast.error(errorData.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoginError('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            position: 'relative',
            width: '100%',
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{ position: 'absolute', top: 10, left: 10 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
            Admin Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin='normal'
              required
              fullWidth
              label='Admin ID'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete='username'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge='end'
                    >
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
            {message && <p>{message}</p>}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer position='top-center' autoClose={3000} />
    </Box>
  );
};

export default AdminLogin;
