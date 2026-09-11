import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LogoutIcon from "@mui/icons-material/Logout";


function UserBadge() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const isLoggedIn = Boolean(user);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/user/api/me", { credentials: "include" })
      .then((response) => response.ok ? response.json() : null)
      .then((currentUser) => setUser(currentUser))
      .catch(() => setUser(null));
  }, [user, isLoggedIn]);

  const handleLogout = async () => {
    setAnchorEl(null);
    setUser(null);
    await fetch("/user/api/signout", {
      method: "POST",
      credentials: "include",
    });
    window.location.assign("/register");
  };

  return (
    <>
    {isLoggedIn && 
    <>
      <IconButton
        color="inherit"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-label="Open user menu"
        aria-controls={menuOpen ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
      >
        <Avatar
          src={user?.profileImageURL}
          alt={user?.fullName || "User profile"}
          sx={{ width: 32, height: 32, bgcolor: "secondary.main", fontSize: "0.95rem" }}
        >
          {user?.fullName?.charAt(0).toUpperCase() || "U"}
        </Avatar>
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </MenuItem>
        {user.role?.toUpperCase() === 'ADMIN' && 
          <MenuItem onClick={() => navigate('/addProduct')}>
            <ListItemIcon>
              <AddOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Product</ListItemText>
          </MenuItem>
        }
        </Menu>
    </>
    }
    </>
  );
}

export default UserBadge;