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

export default function NavBar() {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path:"/Products" },
        { name: "About Us", path: "/About" }
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
                    My Store hihi welcome
                </Typography>

                {/* push nav links to the center */}
                <Box sx={{ flexGrow: 1 }}></Box>

                {/* navigation links */}
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

                {/* push cart to the far right */}
                <Box sx={{ flexGrow: 1 }}></Box>

                {/* cart */}
                <IconButton color="inherit" aria-label="cart">
                    <Badge badgeContent={0} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    )

}