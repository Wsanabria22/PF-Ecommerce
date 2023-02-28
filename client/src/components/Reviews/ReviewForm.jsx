import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Rating from "@mui/material/Rating";
import TextField from "@material-ui/core/TextField";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as actions from "../../redux/actions/productsActions";
import logo from "..//../img/logo.JPG";
import s from "./ReviewForm.module.css";
import Swal from "sweetalert2";

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
  card: {
    width: '60%',
    height: '60%',
  },
  detail: {
    display: "flex",
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: "50px",
    height: "50px",
    marginRight: "5px",
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

export default function ReviewForm() {
  const { productId, orderId, userId } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [formVisible, setFormVisible] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productId: productId,
    orderId: orderId,
    comment: "",
    rating: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const productDetail = useSelector((state) => state.detail)

  useEffect(()=>{
    dispatch(actions.getProductsDetails(productId));
    console.log('productDetail', productDetail);
  },[productId])

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));

  const handleClickBack = () => {
    history.goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormData({
        ...formData,
        productId: productId,
        orderId: orderId,
      });
      dispatch(actions.postReview(formData));
      Swal.fire({
        title: "Review created!",
        icon: "success",
        confirmButtonText: "Continue",
      });
      history.goBack();
    }
  };

  const handleCommentChange = (e) => {
    if (e.target.value === "") {
      setErrors({ ...errors, comment: "Comment section must not be empty" });
    } else {
      setErrors({ ...errors, comment: "" });
    }
    setFormData({ ...formData, comment: e.target.value });
  };

  const handleRatingChange = (e) => {
    setFormData({ ...formData, rating: e.target.value });
  };

  function validate(formData) {
    let errors = {};
    if (isNaN(parseFloat(formData.rating).toFixed(2))) {
      errors.rating = "Please rate the product";
    }
    if (formData.comment === "") {
      errors.comment = "Comment section must not be empty";
    } 
    return errors;
  };

  return (
  <div className={s.general}>
      <Grid container spacing={2} xs={12} className={classes.header}>
        <Grid item xs={4} className={classes.trade}>
          <img src={logo} alt={"logo"} className={classes.image} />
          <Typography className={classes.tradeName}>CloudyBuy</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.typo}>Create a Review</Typography>
        </Grid>
        <Grid item xs={4} className={classes.buttonBack}>
          <Button  size="small" variant="contained" color="primary" onClick={handleClickBack}>
            Go Back
          </Button>
        </Grid>
      </Grid>
      <hr />
  <Card className={classes.card}>
    <CardContent>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Review Of:</Typography>
        </Grid>
        <Grid item xs={12} className={classes.detail}>
           <Grid item xs={1}>
              <img className={classes.image} src={productDetail.thumbnail} alt={productDetail.title}/>
            </Grid>
            <Grid item xs={5}>
              <Typography className={classes.paragraph}>
                {productDetail.title}
              </Typography>
            </Grid>
        </Grid>
        <Grid item xs={12}>
          <br />
          <TextField
            fullWidth
            id="comment"
            label="Add your review"
            type="text"
            multiline
            maxRows={4}
            variant="outlined"
            value={formData.comment}
            onChange={handleCommentChange}
            error={errors.comment}
            helperText={errors.comment}
          />
          <br />
          <br />
          <Rating
            name="rating"
            precision={0.1}
            value={formData.rating}
            onChange={handleRatingChange}
            size="large"
          />
          {errors.rating && (
            <Typography color="error">{errors.rating}</Typography>
          )}
        </Grid>
      </Grid>
      <hr />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        type="submit"
        disable={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Make a review"}
      </Button>
    </form>
    </CardContent>
  </Card>
  </div>
  );
}
