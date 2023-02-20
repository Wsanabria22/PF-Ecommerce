import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TableRow, TableCell, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as actions from "../../redux/actions/productsActions";

import styles from "../CartProduct/CartProduct.module.css";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "50px",
    height: "50px",
  },
}));

export default function CartProduct({
  productId,
  title,
  amount,
  quantity,
  images,
}) {
  const dispatch = useDispatch();
  let product = useSelector((state) => state.products);
  const classes = useStyles();

  function removeCart() {
    dispatch(actions.removeCart(productId));
  }

  function changeCart(e) {
    const data = product?.filter((item) => item.id === productId);

    let cant = e.target.value < 1 ? 1 : e.target.value > data[0].stock ? data[0].stock: parseInt(e.target.value);

    let canti = cant > data[0].stock ? data[0].stock : parseInt(e.target.value);

    //console.log(data[0].stock)
    
    dispatch(actions.changeItemCart(productId, cant, amount));
  }

  return (
    <TableRow
      key={productId}
      className={productId % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
    >
      <TableCell><img src={images} alt={title} className={classes.image} /></TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>$ {amount}</TableCell>
      <TableCell>
        {" "}
        <input className={styles.quantityInput} type="number" name="quantity" value={quantity} onChange={changeCart}
        />{" "}
      </TableCell>
      <TableCell>$ {amount * quantity}</TableCell>
      <TableCell>
        <Button onClick={removeCart} color="error" variant="contained">
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
}
