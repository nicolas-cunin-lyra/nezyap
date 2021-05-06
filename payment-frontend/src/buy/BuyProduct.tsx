import { Button, makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Config } from '../Config';
import { Product } from '../model/Product';

/*
// TODO: here we handle buying a new product
  const [email, setEmail] = useState<string>("")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  };
*/

const useStyles = makeStyles({
  product: {

  },
  productInfo: {
    fontWeight: "bold"
  },
  buy: {
    
  },
  successText: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "green",
    padding: "12px",
    textAlign: "center",
    margin: "10px",
    borderRadius: "10px"
  },
  failureText: {
    color: "white",
    fontWeight: "bold",
    backgroundColor: "red",
    padding: "12px",
    textAlign: "center",
    margin: "10px",
    borderRadius: "10px",
  },
  navBtnsContainer: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
  navBtn: {
    margin: "0 4px",
  },
  buyBtnContainer: {
    textAlign: 'center',
  },
});

interface ParamTypes {
  user: string
  productId: string
}

function BuyProduct() {
  const classes = useStyles();
  const history = useHistory();
  let { user, productId } = useParams<ParamTypes>()
  const [ isSuccess, setIsSuccess ] = useState<boolean | undefined>()
  const [ isBuying, setIsBuying ]  = useState<boolean>(false)
  const [ product, setProduct ]  = useState<Product | undefined>()

  useEffect(() => {
    if (product != null) return
    axios
      .get(`${Config.CATALOG_BACKEND_BASE_URL}/catalog/${productId}`)
      .then((res: {data: Product}) => setProduct(res.data))
  })

  const buyThat = () => {
    setIsBuying(true)
    axios
      .post(`${Config.PAYMENT_BACKEND_URL}/users/${user}/transactions/${productId}`, {})
      .then((res: {data: boolean}) => setIsSuccess(res.data))
      .catch((error) => {
        console.error("Could not buy product", error)
        setIsSuccess(false)
      })
      .finally(() => setIsBuying(false))
  }
  return (
    <div className={classes.buy}>

      {// Product detail
      }
      {product ? (
      <div className={classes.product}>
        <ul>
          <li>Id: <span className={classes.productInfo}>{product?.id}</span></li>
          <li>Name: <span className={classes.productInfo}>{product?.name}</span></li>
          <li>Description: <span className={classes.productInfo}>{product?.description}</span></li>
          <li>Price: <span className={classes.productInfo}>{product?.price} €</span></li>
        </ul>
      </div>
      ): ''}

      {// Buy
      }
      <div className={classes.buyBtnContainer}>
        <Button variant="contained" onClick={() => buyThat()} disabled={isBuying || isSuccess}>Buy</Button>
        {isSuccess != null ? (
          isSuccess ? 
          ( <div className={classes.successText}>Successfully bought {product?.name}</div>) : 
          (<div className={classes.failureText}>Failed to buy {productId}</div>)
        ) : ''}
      </div>

      {// Navigate
      }
      <div className={classes.navBtnsContainer}>
        <Button variant="contained" className={classes.navBtn} onClick={() => window.location.replace(`${Config.CATALOG_FRONTEND_BASE_URL}/catalog`)}>Back to catalog</Button>
        <Button variant="contained" className={classes.navBtn} onClick={() => history.push(`/users/${user}/transactions/`)}>See transactions</Button>
      </div>
    </div>
  );
}

export default BuyProduct