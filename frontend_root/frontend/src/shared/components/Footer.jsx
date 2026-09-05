import { Box, Typography, Link, Container, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "primary.main",
                color: "white",
                py: 6,
                mt: "auto",
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} sx={{ justifyContent: "space-between" }}>
                    
                    <Grid item="true" xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            My Store
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            Your one-stop shop for premium tech, mechanical keyboards, and workspace accessories. 
                            Built with React and Redux Toolkit.
                        </Typography>
                    </Grid>

                    <Grid item="true" xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link component={RouterLink} to="/" color="inherit" underline="hover">
                                Home
                            </Link>
                            <Link component={RouterLink} to="/Products" color="inherit" underline="hover">
                                Products
                            </Link>
                            <Link component={RouterLink} to="/About" color="inherit" underline="hover">
                                About Us
                            </Link>
                        </Box>
                    </Grid>

                    
                    <Grid item="true" xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Customer Service
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link component={RouterLink} to="/Cart" color="inherit" underline="hover">
                                View Cart
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Shipping Policy
                            </Link>
                            <Link href="#" color="inherit" underline="hover">
                                Contact Us
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <Box 
                    sx={{ 
                        textAlign: "center", 
                        mt: 6, 
                        pt: 3, 
                        borderTop: "1px solid rgba(255, 255, 255, 0.2)" 
                    }}
                >
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        &copy; {new Date().getFullYear()} My Store. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}