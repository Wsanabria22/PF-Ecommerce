import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions/productsActions';
import UserRow from "../UserRow/UserRow";
import { Link, useHistory } from "react-router-dom";
import styles from './usersAdministration.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
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
    }  
}));  

export default function UserAdministration() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        dispatch(actions.getUsers());
    },[dispatch])

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
            <Typography className={classes.typo}>User Administration</Typography>
          </Grid>
          <Grid item xs={4} className={classes.buttonBack}>
            <Button size="small" variant="contained" color="primary" onClick={handleClickBack}>
              Go Back
            </Button>
          </Grid>
        </Grid>
        <div className={styles.fullDiv}>
          <TableContainer>
              <Table sx={{ minWidth: 'auto' }} size="medium" aria-label="simple table">
                  <TableHead>
                  <TableRow>
                      <TableCell sx={{ color: '#e7ebf0' }}>ID</TableCell>
                      <TableCell sx={{ color: '#e7ebf0' }}>Name</TableCell>
                      <TableCell sx={{ color: '#e7ebf0' }}>Surname</TableCell>
                      {/* <TableCell sx={{ color: '#e7ebf0' }}>Password</TableCell> */}
                      <TableCell sx={{ color: '#e7ebf0' }}>Email</TableCell>
                      <TableCell sx={{ color: '#e7ebf0' }}>Address</TableCell>
                      <TableCell sx={{ color: '#e7ebf0' }}>type</TableCell>
                      <TableCell sx={{ color: '#e7ebf0' }}>Active</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {users?.map((user, index) => {
                      return (
                          <UserRow
                              
                              key={index}
                              id={user.id}
                              name={user.name}
                              surname={user.surname}
                              password={user.password}
                              email={user.email}
                              address={user.adress}
                              isAdmin={user.isAdmin}
                              active={user.active}
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