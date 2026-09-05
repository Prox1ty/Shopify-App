import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    IconButton,
    Badge
} from '@mui/material'
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


function CartBadge() {

    const cartItemsQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <>
        <IconButton color="inherit">
            <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
        <p>{cartItemsQuantity}</p>
    </>
  )
}

export default CartBadge