import { TableRow } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../redux/actions/productsActions";
import styles from "../UserRow/userRow.module.css";
import s from "./OrderRow.module.css";
import { TableCell, Button } from "@mui/material";
import DetailsIcon from '@mui/icons-material/Details';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import SendSharpIcon from '@mui/icons-material/SendSharp';

export default function OrderRow({
  id,
  quantity,
  status,
  price,
  user,
  orderDetail,
  orderShipping,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleCancell(e) {
    e.preventDefault();
    dispatch(actions.cancellOrder(id));
  }

  function handleConfirm(e) {
    e.preventDefault();
    dispatch(actions.confirmOrder(id));
  }

  async function handleShipping(e) {
    e.preventDefault();
    await dispatch(actions.shippingOrder(id));

    orderShipping === "in process"
      ? dispatch(actions.getOrders())
      : dispatch(actions.notShippOrder({ id: id }));
    dispatch(actions.getOrders());
  }

  function handleDetailCard() {
    history.push(`orders/admind/${id}`);
  }

  return (
    <TableRow
      key={id}
      className={id % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}
    >
      <TableCell sx={{ color: "#e7ebf0" }}>{id}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{status}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{quantity}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{price}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>{user}</TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
      <Button size="small" variant="contained" endIcon={<DetailsIcon />} color="info"
          type="submit"
          onClick={() => handleDetailCard()}
        >
         Details
        </Button>
        {/* <Link to={`/orderDetails/${user}/${id}`}>More Details</Link> */}
      </TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
        <Button size="small" variant="contained" endIcon={<CancelIcon />} color="warning"
          type="submit"
          onClick={(e) => handleCancell(e)}
        >
          Cancel
        </Button>
      </TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
        <Button size="small" variant="contained" endIcon={<CheckIcon />} color="success"
          type="submit"
          onClick={(e) => handleConfirm(e)}
        >
          Confirm
        </Button>
      </TableCell>
      <TableCell sx={{ color: "#e7ebf0" }}>
        < Button size="small" variant="contained" endIcon={<SendSharpIcon />} color="secondary"
          type="submit"
          onClick={(e) => handleShipping(e)}
        >
          {orderShipping}
        </Button>
      </TableCell>
    </TableRow>
  );
}
