import { NavLink } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartBadge from "./CartBadge";

export default function NavBar() {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path:"/Products" },
        { name: "About Us", path: "/About" },
    ];

    return (
        <AppBar position="sticky" color="primary" elevation={2}>
            <Toolbar>

                <Typography
                variant="h5"
                component={NavLink}
                to="/"
                sx={{
                    textDecoration:"none",
                    color:"inherit",
                    fontWeight:"bold"
                }} 
                >
                    My Store 
                </Typography>

                <Box sx={{ flexGrow: 1 }}></Box>

                <Box
                sx={{
                    display: "flex",
                    gap: 2
                }}
                >
                    {navLinks.map((link) => (
                        <Button
                        key={link.path}
                        component={NavLink}
                        to={link.path}
                        sx={{
                            color: "white",
                            fontWeight:"bold",
                            "&.active": {
                                borderBottom: "2px solid white",
                                borderRadius: 0
                            }
                        }}
                        >
                            {link.name}
                        </Button>
                    ))}
                </Box>

                <Box sx={{ flexGrow: 1 }}></Box>

                <Button
                    key={"/Cart"}
                    component={NavLink}
                    to={"/Cart"}
                    sx={{
                        color: "white",
                        fontWeight:"bold",
                        "&.active": {
                            borderBottom: "2px solid white",
                            borderRadius: 0
                        }
                    }}
                >
                    <CartBadge />
                </Button>
            </Toolbar>
        </AppBar>
    )

}