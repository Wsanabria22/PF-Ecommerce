import React from 'react';
import EmptyWishList from '../EmptyWishList/EmptyWishList.jsx';
import WishListProduct from "../WishListProduct/WishListProduct.jsx";
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getUserWishList, saveUserWishList, removeProductFromWishList } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import logo from "..//../img/logo.JPG";
import styles from './WishList.module.css';
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
  } from "@material-ui/core";
  import { makeStyles } from "@mui/styles";

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minheight: '100%',
      minwidth: '100%',
      backgroundImage: "linear-gradient(2.6deg, rgb(126, 154, 191) 16%, rgb(254, 255, 255) 91.1%)"
    },
    header: {
      display: "flex",
      direction: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: "2px",
    },
    image: {
      width: "50px",
      height: "50px",
      marginRight: "5px",
    },
    typo: {
      fontfamily: "Poppins",
      fontSize: 30,
      display: "flex",
      justifyContent: "center",
    },
    paragraph: {
      margin: "10px 0",
    },
    trade: {
      display: "flex",
      direction: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingLeft: "5px",
    },
    tradeName: {
      fontfamily: "Poppins",
      fontSize: 20,
    },
    buttonBack: {
      display: "flex",
      justifyContent: "flex-End",
    }
  }));



export default function WishList() {
    const dispatch = useDispatch();
    const wishList = useSelector((state) => state.wishListItems);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getUserWishList());
    }, [dispatch]);

    const handleClickBack = () => {
      history.goBack();
    };

    return (
      <div className={styles.container}>
        <Grid container spacing={2} xs={12}className={classes.header}>
          <Grid item xs={4} className={classes.trade}>
            <img src={logo} alt={"logo"} className={classes.image}/>
            <Typography className={classes.tradeName}>CloudyBuy</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.typo}>My Wishlist</Typography>
          </Grid>
          <Grid item xs={4} className={classes.buttonBack}>
            <Button size="small" variant="contained" color="primary" onClick={handleClickBack}>Go to Store</Button>
          </Grid>
        </Grid>
          <div className={styles.wishList}>
            {wishList.length === 0 ? (
              <div className={styles.fullDiv}>
                
                <EmptyWishList />
              </div>
            ) : (
              <div className={styles.fullDiv}>

                  <TableContainer>
                    <Table
                      sx={{ minWidth: "1440px" }}
                      size="medium"
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: "#e7ebf0" }}>Image</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Title</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Description</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Price</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Action</TableCell>
                          <TableCell sx={{ color: "#e7ebf0" }}>Details</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      { wishList && wishList.map((wishListItem, index) => {
                          return (
                            <WishListProduct
                              key={index}
                              index={index}
                              id={wishListItem.id}
                              image={wishListItem.thumbnail}
                              title={wishListItem.title}
                              description={wishListItem.description}
                              price={wishListItem.price}
                            />
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                       
                </div>
           
            )}
          </div>
      </div>
      );
}