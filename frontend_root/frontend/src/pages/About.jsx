import {
    Container,
    Typography,
    Paper,
    Stack,
    Divider,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";


export default function About() {
    const features = [
        "Curated 65% and 75% layout kits",
        "Reliable component sourcing and SMT assembled PCBs",
        "Fast, secure, and developer-friendly checkout",
        "Dedicated support from fellow enthusiasts"
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 8 },
                    borderRadius: 4,
                    border: "1px solid #e5e7eb",
                    background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
                }}
            >
                <Stack spacing={4}>
                    
                    <Box  sx={{textAlign:"center"}}>
                        <Typography 
                            variant="h3" 
                            fontWeight="900" 
                            gutterBottom
                            sx={{
                                background: "linear-gradient(90deg, #1976d2, #9c27b0)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                letterSpacing: "-0.02em"
                            }}
                        >
                            About Us
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Crafting the ultimate typing and workspace experience.
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        Welcome to <strong>MyStore</strong>! We are deeply passionate about the technical and commercial design of custom input devices. Our goal is to provide enthusiasts with high-quality components and a remarkably smooth shopping experience. Whether you are planning your first build or refining your endgame setup, we are committed to offering incredible value and top-tier customer service.
                    </Typography>

                    <Typography variant="h5" fontWeight="bold" color="text.primary" sx={{ mt: 2 }}>
                        Our Mission
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        We believe the perfect setup requires precision. Whether you are hunting for the ideal layout, evaluating open-source PCB designs, or looking for high-quality switches, we carefully select every product in our store to support your build from start to finish.
                    </Typography>

                    <Typography variant="h5" fontWeight="bold" color="text.primary" sx={{ mt: 2 }}>
                        Why Choose Us?
                    </Typography>

                    <List sx={{ pt: 0 }}>
                        {features.map((text, index) => (
                            <ListItem key={index} sx={{ px: 0, py: 1 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                        ✓
                                    </Typography>
                                </ListItemIcon>
                                <ListItemText 
                                    primary={text} 
                                    primaryTypographyProps={{ 
                                        color: "text.secondary",
                                        fontWeight: 500
                                    }} 
                                />
                            </ListItem>
                        ))}
                    </List>

                </Stack>
            </Paper>
        </Container>
    );
}