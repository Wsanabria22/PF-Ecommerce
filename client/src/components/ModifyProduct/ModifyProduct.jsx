import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getProductsDetails, clearProductDetail } from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, 
  Grid, Button, IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles';
import styles from './ModifyProduct.module.css'
import ModifyForm from '../ModifyForm/ModifyForm.jsx';
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
}));


export default function ModifyProduct() {
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.detail);
    const history = useHistory();
		const classes = useStyles();

    useEffect(() => {
        dispatch(clearProductDetail());
        dispatch(getProductsDetails(id));
    }, [id, dispatch]);

    useEffect(() => {
        updateState(productDetails);
    }, [productDetails]);
    

    const [dataProduct, setDataProduct] = useState({})


    console.log('productDetails',productDetails);

    const updateState = (dataProduct) => {
        setDataProduct(prevState => (dataProduct))
        console.log('dataProduct==>',dataProduct)
    }

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
					<Typography className={classes.typo}>Product Update</Typography>
				</Grid>
				<Grid item xs={4} className={classes.buttonBack}>
					<Button size="small" variant="contained" color="primary" onClick={handleClickBack}>
						Go Back
					</Button>
				</Grid>
			</Grid>

        {/* <div className={styles.fullDiv}> */}
            { dataProduct.id && <ModifyForm id={id} productDetails={dataProduct} /> }
        {/* </div> */}
		</div>
  )
}