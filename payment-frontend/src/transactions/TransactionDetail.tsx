import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Config } from '../Config';
import { Transaction } from '../model/Transaction';

const useStyles = makeStyles((theme) => ({
  detail: {
    
  },
  transactionList: {
    backgroundColor: "#fdd19e",
  },
  product: {
    backgroundColor: "#ffe4c4",
  },
  productDetail: {
    marginLeft: "20px",
  },
  navBtnsContainer: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
  navBtn: {
    margin: "0 4px"
  },
  avatarTransaction: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  avatarProduct: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  }
}))

interface ParamTypes {
  user: string,
  transactionId: string
}

function TransactionDetail() {
  const history = useHistory();
  const { user, transactionId } = useParams<ParamTypes>()
  const classes = useStyles();
  let [transaction, setTransaction] = useState<Transaction>()

  useEffect(() => {
    if (transaction != null) return
    axios
    .get(`${Config.PAYMENT_BACKEND_URL}/users/${user}/transactions/${transactionId}`)
    .then((res: { data: Transaction }) =>  setTransaction(res.data))
  })

  return (
    <div className={classes.detail}>
      {transaction ? (
        <div className={classes.transactionList}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar className={classes.avatarTransaction}>T</Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={'Transaction ' + transaction?.id}
                secondary={new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric"
                }).format(new Date(transaction?.date))} />
                <ListItemSecondaryAction>
                  {transaction?.totalAmount} €
                </ListItemSecondaryAction>
            </ListItem>
          </List>
          <div className={classes.product}>
            {transaction?.product?.map((product, index) => {
              return (
                <div className={classes.productDetail}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className={classes.avatarProduct}>{index + 1}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={product.name} secondary={product.description} />
                      <ListItemSecondaryAction>
                        {product.price} €
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </div>
              )
            })}
          </div>
        </div>
      ) : ''}

      <div className={classes.navBtnsContainer}>
        <Button variant="contained" className={classes.navBtn} onClick={() => window.location.replace(`${Config.CATALOG_FRONTEND_BASE_URL}/catalog`)}>Back to catalog</Button>
        <Button variant="contained" className={classes.navBtn} onClick={() => history.push(`/users/${user}/transactions/`)}>See transactions</Button>
      </div>
    </div>
  )
}

export default TransactionDetail