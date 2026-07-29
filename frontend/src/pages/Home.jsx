import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack
} from "@mui/material";

import KeyboardIcon from '@mui/icons-material/Keyboard'; 

export default function Home() {
  return (
    <Container maxWidth="lg" className="mb-10">
      <Paper
        elevation={0} 
        sx={{
          mt: { xs: 6, md: 10 },
          p: { xs: 4, md: 10 }, 
          textAlign: "center",
          borderRadius: 6,
          background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
          border: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 2,
            borderRadius: "50%",
            mb: 4,
            boxShadow: 3,
            display: "flex"
          }}
        >
          <KeyboardIcon fontSize="large" />
        </Box>

        <Typography 
          variant="h2" 
          fontWeight="900" 
          gutterBottom
          sx={{
            background: "linear-gradient(90deg, #1976d2, #9c27b0)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
          }}
        >
          Build Your Endgame
        </Typography>

        <Typography variant="h6" color="text.secondary" mb={6}  sx={{marginBottom: "2rem", maxWidth: "sm"}}>
          Discover premium 75% layouts, custom switches, and the perfect desk accessories for your setup.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Button
            component={Link}
            to="/Products"
            variant="contained"
            size="large"
            sx={{ 
              px: 6, 
              py: 1.5, 
              fontSize: "1.1rem", 
              borderRadius: 3,
              textTransform: "none", 
              boxShadow: 3,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Shop Now
          </Button>
          
          <Button
            component={Link}
            to="/About"
            variant="outlined"
            size="large"
            sx={{ 
              px: 6, 
              py: 1.5, 
              fontSize: "1.1rem", 
              borderRadius: 3,
              textTransform: "none",
              borderWidth: "2px",
              '&:hover': {
                borderWidth: "2px",
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Learn More
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}