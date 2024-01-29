import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./cartDetails.module.css";
import { addProductToCart } from "../reduxModule/cartSlice";

export const CartDetails = (props) => {
  const { open, closeDialog } = props;
  const dispatch = useDispatch();

  const cartInfo = useSelector((state) => state.cart.cart);
  console.log("cartInfo= ", cartInfo);
  const carTotalPrice = useSelector((state) => state.cart.discountedTotal);
  const [cartState, setCartState] = useState(cartInfo);

  const updateCartDetails = (itemId) => {
    const existingCart = [...cartInfo];
    let newProductDetails = {};
    existingCart.forEach((cart) => {
      Object.values(cart).forEach((cartDetails) => {
        console.log("cartDetails= ",cartDetails);
        const index = cartDetails.products.findIndex((item) => item.id === itemId);
        console.log(index);
        let newQuantity = cartDetails.products[index].quantity;
        if (index !== -1) {
          newQuantity = cartDetails.products[index].quantity + 1;
          console.log("newQuantity= ", newQuantity);
          // existingCart[index].quantity = newQuantity;
          newProductDetails = {
            id: itemId,
            quantity: newQuantity,
          };
          console.log("newProductDetails= ", newProductDetails);
        }
        dispatch(addProductToCart({ products: [{ ...newProductDetails }] }));
      });
    });
    /* let index = existingCart.findIndex((cart) => cart.id === itemId);
    let newQuantity = existingCart[index].quantity;
    console.log("index= ", index);
    if (index !== -1) {
      newQuantity = existingCart[index].quantity + 1;
      console.log("newQuantity= ", newQuantity);
      // existingCart[index].quantity = newQuantity;
      newProductDetails = {
        id: itemId,
        quantity: newQuantity,
      };
      console.log("newProductDetails= ", newProductDetails);
    }
    dispatch(addProductToCart({ products: [{ ...newProductDetails }] })); */
  };

  return (
    <Dialog open={open} sx={{ color: "#d3b17b" }} maxWidth={"md"}>
      <DialogTitle>Your Shopping Cart</DialogTitle>
      <DialogContent>
        {cartInfo.map((cart) => {
          return Object.values(cart).map((items) => {
            console.log("items= ", items);
            return items.products.map((item) => {
              console.log("item= ", item);
              return (
                <>
                  <div className={classes["grid-container-element"]}>
                    <div className={classes["grid-child-element"]}>
                      <span>
                        <InputLabel htmlFor={item.title} variant="outlined">
                          {item.title}
                        </InputLabel>
                      </span>
                    </div>
                    <div className={classes["grid-child-element"]}>
                      <IconButton
                        color="primary"
                        aria-label="decrease quantity"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        id={item.id}
                        variant="outlined"
                        value={item.quantity}
                        size="small"
                        sx={{ width: 60, mr: 2, ml: 2 }}
                      />
                      <IconButton
                        color="primary"
                        aria-label="increase quantity"
                      >
                        <AddIcon
                          onClick={() => {
                            // addRemoveActionHandler(item.id, "add");
                            updateCartDetails(item.id);
                          }}
                        />
                      </IconButton>
                    </div>
                  </div>
                </>
              );
            });
          });
        })}
        <div>{`Cart Total: $${carTotalPrice}`}</div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDialog}
          variant="outlined"
          sx={{ fontWeight: "light", fontSize: "18" }}
        >
          Close
        </Button>
        {/* <Button
              type="submit"
              variant="contained"
              sx={{ fontWeight: "light", fontSize: "18" }}
            >
              Save
            </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default CartDetails;
