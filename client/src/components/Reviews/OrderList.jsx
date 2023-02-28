import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import * as actions from "../../redux/actions/productsActions";
import s from "./OrderList.module.css";
import logo from "..//../img/logo.JPG";
import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    marginTop: 5,
    width: '100%',
  },
  detail: {
    display: "flex",
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    display: "flex",
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "2px",
  },
  paper: {
    height: 140,
    width: 100,
  },
  card: {
    // width: 400,
    // height: 800,
  },
  typo: {
    fontfamily: "Poppins",
    fontSize: 25,
    display: "flex",
    justifyContent: "center",
  },
  paragraph: {
    margin: "10px 0",
  },
  image: {
    width: "50px",
    height: "50px",
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
    fontSize: 25,
  },
  buttonBack: {
    display: "flex",
    justifyContent: "flex-End",
  }
}));


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function OrderList({ onOrderSelect }) {
  const order1 = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const userProfile = useSelector((state) => state.userProfile);
  const user = useSelector((state) => state.user);
  const orders = order1.filter(e => e.userId === user.id)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(orders);
  
  useEffect(() => {
    dispatch(actions.getOrders());
    dispatch(actions.getUserProfile(user))
  }, [dispatch]);

  const handleClickBack = () => {
    history.goBack();
  }

  return (
    <div className={s.general}>
      <Grid container spacing={2} xs={12} className={classes.header}>
        <Grid item xs={4} className={classes.trade}>
          <img src={logo} alt={"logo"} className={classes.image} />
          <Typography className={classes.tradeName}>CloudyBuy</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.typo}>Your Orders</Typography>
        </Grid>
        <Grid item xs={4} className={classes.buttonBack}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleClickBack}
          >
            Go to Store
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        {orders.length === 0 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            m={1}
            p={1}
            bgcolor="background.paper"
            className={s.boxStyle}
          >
            <Typography variant="h4" color="initial">
              You have no orders created yet.
            </Typography>
            <br />
            <Typography variant="h5" color="initial">
              Go to the store and buy!
            </Typography>
            <br />
            <IconButton onClick={handleClickBack} size="large">
              <SearchIcon />
              <ShoppingBasketIcon />
            </IconButton>
          </Box>
        ) : (
          orders.map((order) => {
            const orderDetails = order.OrderDetails;
            let totalPrice = 0;
            for (let i = 0; i < orderDetails.length; i++) {
              const productPrice = orderDetails[i].product.price;
              totalPrice += productPrice;
            }

            return (
              <Grid spacing={2} item xs={11} key={order._id}>
                <Card className={classes.card}>
                  <CardContent>
                    <Grid container spacing={1} className={classes.detail}>
                      <Grid item xs={2}>
                        <Typography
                          variant="h5"
                          component="h2"
                          className={classes.paragraph}
                        >
                          Order #{order.id}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography className={classes.paragraph}>
                          Date: {order.createdAt}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography className={classes.paragraph}>
                          Status: {order.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} >
                        <Typography className={classes.paragraph}>
                        Order Total:$ {totalPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                    <hr />
                    {orderDetails.map((orderDetail) => {
                      const productId =  orderDetail.product.id;
                      const orderId = order.id;
                      const userId = order.userId;
                      return (
                        <Grid container spacing={1} className={classes.detail}>
                          <Grid item xs={1}>
                            <img
                              className={classes.image}
                              src={orderDetail.product.thumbnail}
                              alt={orderDetail.product.title}
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <Typography className={classes.paragraph}>
                              {orderDetail.product.title}:{" "}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography className={classes.paragraph}>
                              {orderDetail.quantity} x $
                              {orderDetail.product.price}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Link to={`/reviews/${productId}/${orderId}/${userId}`}>    
                              <Button variant="contained"
                                id="review-button"
                                // onClick={() => handleOpen()}
                                >Leave your review
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      );
                    })}
                    <hr />
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}
