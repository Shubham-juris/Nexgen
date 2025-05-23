import React from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

import IndustrialAccounting from '../../../assets/Courses/AccountsCourses/Industrial-Accounting.png';
import TallyPrime from '../../../assets/Courses/AccountsCourses/Tally-Prime.png';
import BusySoftware from '../../../assets/Courses/AccountsCourses/Busy-Software.png';
import QuickBooks from '../../../assets/Courses/AccountsCourses/Quick-Book.png';

const cardsData = [
  { id: 1, title: 'Industial Accounting ', image: IndustrialAccounting },
  { id: 2, title: 'Tally Prime/ERP 9 ', image: TallyPrime },
  { id: 3, title: 'Busy Software ', image: BusySoftware },
  { id: 4, title: 'Quick Books ', image: QuickBooks },
];

const AccountsCoursesCards = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
        <Typography 
                variant="h4" 
                sx={{
                  display: 'flex', 
                  justifyContent: 'center', 
                  width: '100%', 
                  mt:4,
                  marginBottom: 3
                }}
              >
                Accounts Courses
              </Typography>
      {cardsData.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.id}>
          <Card
            sx={{
              width: '280px',
              height: 320,
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
            }}
          >
            <CardMedia
              component="img"
              alt={card.title}
              image={card.image}
              title={card.title}
              sx={{
                padding: '25px 25px 0px 25px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                objectFit: 'cover',
                height: 200,
              }}
            />
            <CardContent sx={{ backgroundColor: '#f4f4f4' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                {card.title}
              </Typography>
              <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                <Grid item>
                  <Button variant="contained" size="small" color="primary">
                    Details
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="small" color="secondary">
                    Buy Now
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AccountsCoursesCards;
