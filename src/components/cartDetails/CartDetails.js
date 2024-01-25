import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CartDetails = (props) => {
  const { open } = props;
  const cartInfo = useSelector(state => state.cart.cart);
    console.log(cartInfo);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={"md"}
      onClose={props.closeDialog}
      fullScreen
      TransitionComponent={Transition}
    >
      {/* <DialogTitle>Shopping Cart Details</DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="max-width">Quantity</InputLabel>
            <Select
              autoFocus
              label="Quantity"
              inputProps={{
                name: "max-width",
                id: "max-width",
              }}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent> */}
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.closeDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 6, flex: 2 }} variant="h5" component="div">
              Cart Details
            </Typography>
        </Toolbar>
      </AppBar>
      <DialogTitle>Shopping Cart Details</DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="max-width">Quantity</InputLabel>
            <Select
              autoFocus
              label="Quantity"
              inputProps={{
                name: "max-width",
                id: "max-width",
              }}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CartDetails;
