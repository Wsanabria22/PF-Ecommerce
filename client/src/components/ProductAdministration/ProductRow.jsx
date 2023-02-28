import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { TableCell, TableRow, Button } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import * as actions from '../../redux/actions/productsActions';
import styles from "./ProductRow.module.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "50px",
    height: "50px",
    border: "solid 1px",
  },
}));



export default function ProductRow({ id, row, image, name, price, stock, brand, status, handleRender }) {

const dispatch = useDispatch();
const classes = useStyles();

const handleClickActive = (e) => {
  e.preventDefault();
  const data = {
    id: id,
    status : !status,
  }
  dispatch(actions.toggleStatusProduct( data ));
  handleRender();
}



return (
  <TableRow
      key={row}
      className={row % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
    >
      <TableCell sx={{ color: "#e7ebf0" }}>{id}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
        <img src={image} alt={name} className={styles.image}/></TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{name}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{price}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{stock}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{brand}</TableCell>
      <TableCell>
        <Button color={(status * 1) === 1 ?'success':'error'} variant='contained' 
          endIcon={<ChangeCircleOutlinedIcon/>}
          onClick={(e) => {handleClickActive(e);
                            handleRender();
                          }}>
          {status ? 'Active' : 'Inactive'}
        </Button>
      </TableCell>
      <TableCell>
        <NavLink to={`/modifyProduct/${id}`}>
          <Button size="medium" variant="contained" color="primary" endIcon={<CreateOutlinedIcon/>}>
            Update
          </Button>
        </NavLink>
      </TableCell>
  </TableRow>

)


}