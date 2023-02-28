import React from "react";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import OrderRow from "./OrderRow";
import { useHistory } from "react-router-dom";
import styles from './OrderAdministration.module.css';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, 
  Grid, Button, IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ReplayIcon from '@mui/icons-material/Replay';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import logo from "..//../img/logo.JPG";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    marginTop: 5,
    width: '100%',
  },
  header: {
    display: "flex",
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "2px",
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
  },
  filterLabel: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
  }
}));  

export default function OrderAdministration() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    const classes = useStyles();
    const history = useHistory();
    const [dummyState, rerender] = React.useState(1)

    function handleStatus(e){
        e.preventDefault(e);
        dispatch(actions.filterByStatus(e.target.value));
    }

    function reload(e){
        e.preventDefault();
        rerender(dummyState + 1);
    };

    useEffect(() => {
        dispatch(actions.getOrders());
    },[dummyState]);
    
    const handleClickBack = () => {
      history.goBack();
    }

    return (
      <div className={styles.general}>
        <Grid container spacing={2} xs={12} className={classes.header}>
          <Grid item xs={4} className={classes.trade}>
            <img src={logo} alt={"logo"} className={classes.image} />
            <Typography className={classes.tradeName}>CloudyBuy</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.typo}>Orders Administration</Typography>
          </Grid>
          <Grid item xs={4} className={classes.buttonBack}>
            <Button size="small" variant="contained" color="primary" onClick={handleClickBack}>
              Go Back
            </Button>
          </Grid>
        </Grid>
        <div className={styles.fullDiv}>
          <Box className={styles.mainDiv}>
            <Box>
              <Button size="medium" variant="contained" endIcon={<ReplayIcon />} color="success" type="submit" onClick={(e) => reload(e)}>
                Reload Orders
              </Button>
            </Box>
            <Box>
              <Box className={classes.filterLabel}>
                <h5>Status</h5>
                <IconButton aria-label="filter" disabled color="primary">
                  <FilterAltIcon />
                </IconButton>  
              </Box>
              <select>
                  <option value="all" onClick={(e) => handleStatus(e)}>All</option>
                  <option value="in process" onClick={(e) => handleStatus(e)}>In Process</option>
                  <option value="confirmed" onClick={(e) => handleStatus(e)}>Confirmed</option>
                  <option value="cancelled" onClick={(e) => handleStatus(e)}>Cancelled</option>
              </select>
            </Box>
          </Box>
          <TableContainer>
            <Table size="medium" aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell sx={{ color: '#e7ebf0' }}>Order ID</TableCell>
                  <TableCell sx={{ color: '#e7ebf0' }}>Status</TableCell>
                  <TableCell sx={{ color: '#e7ebf0' }}>Item Quantity</TableCell>
                  <TableCell sx={{ color: '#e7ebf0' }}>Price</TableCell>
                  <TableCell sx={{ color: '#e7ebf0' }}>User ID</TableCell>
                  <TableCell sx={{ color: '#e7ebf0' }}>Order Detail (Products)</TableCell>
                  <TableCell sx={{ color: '#e7ebf0' }}>Cancel Order</TableCell>
                  <TableCell sx={{ color: '#e7ebf0' }}>Confirm Order</TableCell>
                  <TableCell sx={{ color: '#e7ebf0' }}>Shipping Status</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {orders?.map((order, index) => {
                  return (
                      <OrderRow
                          key={index}
                          id={order.id}
                          status={order.status}
                          quantity={order.quantity}
                          price={order.price}
                          user={order.userId}
                          orderDetail={order.OrderDetails}
                          orderShipping={order.shippingStatus}
                      />
                  );
              })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
}