import {
    Container,
    Typography,
    Paper,
    Stack,
    Divider
} from "@mui/material";

export default function About() {
    return(
        <Container maxWidth="md" sx={{mt: 6}}>
            <Paper
            elevation={3}
            sx={{
                p:5,
                borderRadius: 3
            }}
            >
                <Stack spacing={3}>
                    <Typography variant="h3" fontWeight="bold">
                        About Us
                    </Typography>

                    <Divider />

                    <Typography variant="body1" color="text.secondary">
                        Welcome to <strong>MyStore</strong>! Our goal is to provide
                        high-quality products with a smooth and enjoyable shopping
                        experience. Whether you're looking for everyday essentials or
                        something unique, we're committed to offering great value and
                        excellent customer service.
                    </Typography>

                    <Typography variant="h5" fontWeight="bold">
                        Our Mission
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We believe online shopping should be simple, fast, and enjoyable.
                        Every product in our store is carefully selected to ensure quality
                        and customer satisfaction.
                    </Typography>

                    <Typography variant="h5" fontWeight="bold">
                        Why Choose Us?
                    </Typography>

                    <Typography component="ul" sx={{pl: 3}}>
                        <li>✔ High-quality products</li>
                        <li>✔ Affordable prices</li>
                        <li>✔ Fast and secure shopping</li>
                        <li>✔ Friendly customer support</li>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );

}