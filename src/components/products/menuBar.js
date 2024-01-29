import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Form, Link, NavLink, redirect } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../reduxModule/productSlice";
import { setOpenDialog } from "../../reduxModule/cartSlice";
// import CartDetails from "../cartDetails/CartDetails";
import CartDetails from "../../pages/cartDetails";

export const MenuBar = () => {
  const cartItems = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const categories = useSelector((state) => state.products.categories);
  const openCartDialog = useSelector((state) => state.cart.openDialog);
  const catItems = useSelector((state) => state.cart.cart);
  console.log("catItems= ",catItems);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFetchData = (menu) => {
    dispatch(fetchProductsByCategory(menu));
  };

  const closeDialogBox = () => {
    dispatch(setOpenDialog(false));
  };

  const openCartDetailsPage = () => {
    redirect("/shopping-cart");
  };

  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
              title="All Products Menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {categories.map((menu, index) => {
                return (
                  <MenuItem
                    onClick={() => {
                      // handleFetchData(menu);
                      handleClose();
                    }}
                  >
                    <Link to={`products/category/${menu}`}>{menu}</Link>
                  </MenuItem>
                );
              })}
            </Menu>

            <Typography textAlign="center" variant="h6" sx={{ flexGrow: 1 }}>
              <NavLink to="/products" style={{ color: "#fff" }}>
                Products
              </NavLink>
            </Typography>
            <Typography textAlign="center" variant="h6" sx={{ flexGrow: 1 }}>
              <NavLink to="/recipes" style={{ color: "#fff" }}>
                Recipes
              </NavLink>
            </Typography>
            <NavLink style={{ color: "#fff" }} to="/auth?mode=login">
              Login
            </NavLink>
            <IconButton
              color="#fff"
              aria-label="add to shopping cart"
              size="large"
              disabled={catItems?.length === 0}
            >
              <Badge badgeContent={cartItems} color="error">
                {/* <Link to="/shopping-cart" variant="body1">
                  <AddShoppingCartIcon sx={{ color: "darkgray" }} />
                </Link> */}
                <AddShoppingCartIcon sx={{ color: "darkgray" }} onClick={() => dispatch(setOpenDialog(true))}/>
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      {openCartDialog && (
        <CartDetails
          open={openCartDialog}
          closeDialog={() => closeDialogBox()}
        />
      )}
    </>
  );
};

export default MenuBar;
