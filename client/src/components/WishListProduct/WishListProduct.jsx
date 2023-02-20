import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, TableRow, TableCell, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as actions from "../../redux/actions/productsActions";
import styles from "../WishListProduct/WishListProduct.module.css";

const useStyles = makeStyles((theme) => ({
    image: {
      width: "50px",
      height: "50px",
    },
  }));

export default function WishListProduct({
    index,
    id,
    title,
    description,
    price,
    image,
}) {
    const dispatch = useDispatch();
    const wishList = useSelector((state) => state.wishListItems);
    const history = useHistory();
    const classes = useStyles();
    //   let product = useSelector((state) => state.products);

    function handleWishListDelete() {
        console.log('entra a handleWishListDelete. El id es: ' + id);
        console.log('la wishList es: ', wishList);
        const data = wishList?.find(item => {
          return item.id === id;
        });
        console.log('la data de handleWishListDelete es: ', data);
        if(data) {
          dispatch(actions.removeProductFromWishList(data.id));
          const objWishList = {
            user_id: sessionStorage.getItem("userId"),
            wishListItems: wishList.filter(wishListItem => {
              return (wishListItem.id !== data.id)
            })
          }
          dispatch(actions.saveUserWishList(objWishList));
        }
      }
    function goToProductDetails(event) {
        const id = event.target.value;
        console.log('el id es: ', id);
        history.push(`/details/${id}`);
    }

    return (
      <TableRow
          key={index}
          className={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
      >

          <TableCell>
              <img src={image} alt={title} className={classes.image}/>
          </TableCell>
          <TableCell>{title}</TableCell>
          <TableCell>{description}</TableCell>
          <TableCell>$ {price}</TableCell>
          <TableCell>
              <Button onClick={handleWishListDelete} color="error" variant="contained">
                  Remove
              </Button>
          </TableCell>
          <TableCell sx={{ color: "#e7ebf0" }}>
              <Button onClick={(event) => goToProductDetails(event)} color="success" variant="contained" value={id}>
                  View
              </Button>
          </TableCell>
      </TableRow>
    );
}
