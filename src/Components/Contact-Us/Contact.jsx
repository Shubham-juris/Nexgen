import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from 'emailjs-com';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Contact from '../../assets/Contact-Us/Contact.jpg';

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    course: '',
    message: '',
  });

  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_lje9sz5',
        'template_fpw4t0f',
        formRef.current,
        'Yuqf4YlQZe4bGFRCd'
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          toast.success('Message sent successfully!');
          setFormData({ from_name: '', from_email: '', course: '', message: '' });
          formRef.current.reset();
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast.error('Message sending failed. Please try again.');
        }
      );
  };

  return (
    <Box sx={{ padding: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <Typography variant='h4' align='center' gutterBottom sx={{ marginTop: '10%' }}>
        Contact Us
      </Typography>

      {/* Centered Info Cards */}
      <Grid container spacing={3} sx={{ marginTop: 2, justifyContent: 'center', textAlign: 'center' }}>
        <Grid item xs={12} sm={6} md={4} data-aos='fade-up'>
          <Card sx={cardStyle}>
            <a href='https://www.google.com/maps/place/SCO+4-5,+New+Sunny+Enclave,+Sector+125,+Mohali,+Punjab+140301' target='_blank' rel='noopener noreferrer' style={linkStyle}>
              <LocationOnIcon fontSize='large' sx={iconStyle} />
              <Typography variant='h6' sx={{ marginTop: 1 }}>OUR MAIN OFFICE</Typography>
              <Typography>
                SCO 4/5, Second Floor, New Sunny <br />
                Enclave, Sector-125, Mohali, Kharar <br />
                Punjab - 140301
              </Typography>
            </a>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} data-aos='fade-up'>
          <Card sx={cardStyle}>
            <a href='tel:+919056729370' style={linkStyle}>
              <PhoneIcon fontSize='large' sx={iconStyle} />
              <Typography variant='h6' sx={{ marginTop: 1 }}>PHONE NUMBER</Typography>
              <Typography>+91 9056729370</Typography>
            </a>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} data-aos='fade-up'>
          <Card sx={cardStyle}>
            <a href='mailto:nexgeneducareacademy@gmail.com' style={linkStyle}>
              <EmailIcon fontSize='large' sx={iconStyle} />
              <Typography variant='h6' sx={{ marginTop: 1 }}>EMAIL</Typography>
              <Typography>nexgeneducareacademy@gmail.com</Typography>
            </a>
          </Card>
        </Grid>
      </Grid>

      {/* Main Section: Left - Logo, Right - Form */}
      <Grid container spacing={4} sx={{ marginTop: 4, alignItems: 'center' }}>
        {/* Left: Logo */}
        <Grid item xs={12} md={6} data-aos='fade-right' sx={{ textAlign: 'center' }}>
          <img
            src={Contact}
            alt='Contact'
            style={{
              borderRadius: '50%',
              width: '100%',
              maxWidth: '240px',
              height: 'auto',
              border: '3px solid #ccc',
              marginBottom: 20,
            }}
          />
          <Typography variant='h5' gutterBottom>Contact Info</Typography>
          <Typography sx={{ padding: '0 10px', textAlign: 'justify' }}>
            Nexgen Educare Academy serves as a beacon of quality education,
            shaping future leaders and problem-solvers. Our academy caters to
            students of all age groups, offering a wide range of programs
            designed to meet the evolving demands of the modern world.
          </Typography>
        </Grid>

        {/* Right: Form */}
        <Grid item xs={12} md={6} data-aos='fade-left'>
          <Typography variant='h5' gutterBottom sx={{ textAlign: 'center', marginBottom: 2 }}>
            Get in touch
          </Typography>
          <Box
            component='form'
            ref={formRef}
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: '450px',
              margin: '0 auto',
            }}
            noValidate
            autoComplete='off'
          >
            <TextField label='Name' name='from_name' value={formData.from_name} onChange={handleChange} required />
            <TextField label='Email' name='from_email' type='email' value={formData.from_email} onChange={handleChange} required />
            <TextField
              label='Courses'
              name='course'
              value={formData.course}
              onChange={handleChange}
              select
              required
            >
              {[
                'Web Technologies Courses',
                'Accounts Courses',
                'Monograph Courses',
                'Languages Courses',
                'Hospitalist Courses',
                'Competitive Courses',
                'Coaching Courses',
                'Cooking Courses',
              ].map((course) => (
                <MenuItem key={course} value={course}>
                  {course}
                </MenuItem>
              ))}
            </TextField>
            <TextField label='Message' name='message' value={formData.message} onChange={handleChange} multiline rows={4} required />
            <Button variant='contained' type='submit' fullWidth>SEND</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Styles
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '200px',
  padding: 2,
  margin: '0 auto',
  width: '100%',
  maxWidth: '360px',
};

const iconStyle = {
  color: 'primary.main',
  marginBottom: 1,
};

const linkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  textAlign: 'center',
};

export default ContactUs;
