import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
} from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Paper
        elevation={4}
        sx={{
          mt: 10,
          p: 6,
          textAlign: "center",
          borderRadius: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to My Store
        </Typography>

        <Typography variant="h6" color="text.secondary" mb={4}>
          Find amazing products at unbeatable prices.
        </Typography>

        <Button
          component={Link}
          to="/Products"
          variant="contained"
          size="large"
        >
          Browse Products
        </Button>
      </Paper>
    </Container>
  );
}