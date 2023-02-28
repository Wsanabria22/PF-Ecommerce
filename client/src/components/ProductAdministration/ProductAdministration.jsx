import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import styles from './ProductAdministration.module.css';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, 
  Grid, Button, IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import * as actions from '../../redux/actions/productsActions';
import logo from "..//../img/logo.JPG";
import ProductRow from "./ProductRow";

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



export default function ProductAdministration() {

const dispatch = useDispatch();
const history = useHistory();
const classes = useStyles();
const allProducts = useSelector((store) => store.allProducts);
const categories = useSelector((store) => store.categories);
const [rerender, setRerender] = useState(1)
const [categoryFilter, setCategoryFilter] = useState('All')

const filterProducts = (nameCategory) => {
  if (nameCategory !== 'All') {
    let idCategory = categories.find( category => category.name === nameCategory )
    let filteredProducts = allProducts.filter((product) => {
      return product.categories.find( category => category.id === idCategory.id )
    });
    return filteredProducts
  }
  else return allProducts;
}

let listProducts = filterProducts(categoryFilter);

useEffect(()=>{
  dispatch(actions.getProducts());
  dispatch(actions.getCategories());
},[dispatch]);

const handleClickBack = () => {
  history.goBack();
}

const handleFilter = (e) => {
  e.preventDefault();
  setCategoryFilter( e.target.value ) 
}

const handleRender = () => {
  setRerender(prevstate => prevstate +1);
  dispatch(actions.getProducts());
};

return (
  <div className={styles.general}>
    <Grid container spacing={2} xs={12} className={classes.header}>
      <Grid item xs={4} className={classes.trade}>
        <img src={logo} alt={"logo"} className={classes.image} />
        <Typography className={classes.tradeName}>CloudyBuy</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={classes.typo}>Products Administration</Typography>
      </Grid>
      <Grid item xs={4} className={classes.buttonBack}>
        <Button size="small" variant="contained" color="primary" onClick={handleClickBack}>
          Go Back
        </Button>
      </Grid>
    </Grid>
    <div className={styles.fullDiv}>
      <Box className={styles.mainDiv}>
        <NavLink to='/createProduct'>
          <Button size="medium" variant="contained" color="primary">
            Create Product
          </Button>
        </NavLink>
        <Box>
          <Box className={classes.filterLabel}>
            <h5>Categories</h5>
            <IconButton aria-label="filter" disabled color="primary">
              <FilterAltIcon />
            </IconButton>  
          </Box>
          <select onChange={(e) => handleFilter(e)}>
              <option value="All">All</option>
              { categories?.map((category, index) => {
                return (
                  <option value={category.name}>{category.name}</option>
                )
              })}
          </select>
        </Box>
      </Box>
      <TableContainer>
        <Table size="medium" aria-label="simple table">
          <TableHead>
          <TableRow>
          <TableCell sx={{ color: '#e7ebf0' }}>ID</TableCell>
              <TableCell sx={{ color: '#e7ebf0' }}>Image</TableCell>
              <TableCell sx={{ color: '#e7ebf0', width: "30%" }}>Name</TableCell>
              <TableCell sx={{ color: '#e7ebf0' }}>Price</TableCell>
              <TableCell sx={{ color: '#e7ebf0' }}>Stock</TableCell>
              <TableCell sx={{ color: '#e7ebf0', width: "20%" }}>Brand</TableCell>
              <TableCell sx={{ color: '#e7ebf0' }}>Active</TableCell>
              <TableCell sx={{ color: '#e7ebf0' }}>Update</TableCell>
          </TableRow>
          </TableHead>

          <TableBody>
              {listProducts?.map((product, index) => {
                  return (
                      <ProductRow
                          key={index}
                          row={index}
                          id={product.id}
                          image={product.thumbnail}
                          name={product.title}
                          price={product.price}
                          stock={product.stock}
                          brand={product.brand}
                          status={product.active}
                          handleRender={handleRender}
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
