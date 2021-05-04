import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Config } from '../Config';
import { Transaction } from '../model/Transaction'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  navBtnsContainer: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
  },
  navBtn: {
    margin: "0 4px",
  }
});

interface ParamTypes {
  user: string
}

function Transactions() {
  const history = useHistory();
  const classes = useStyles();
  let { user } = useParams<ParamTypes>()
  let [transactions, setTransactions] = useState<Array<Transaction>>([])

  useEffect(() => {
    if (transactions.length > 0) return
    axios
    .get(`${Config.PAYMENT_BACKEND_URL}/users/${user}/transactions`)
    .then((res: { data: Array<Transaction>; }) =>  {
      setTransactions(res.data)
    })
  })

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction Id</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Total Amount</TableCell>
              <TableCell align="right">Nb products</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((transaction) => {
              return (
                <TableRow key={transaction.id} onClick={() => history.push(`/users/${user}/transactions/${transaction.id}`)}>
                  <TableCell component="th" scope="row">
                    {transaction.id}
                  </TableCell>
                  <TableCell align="right">
                      {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "numeric"
                    }).format(new Date(transaction.date))}
                  </TableCell>
                  <TableCell align="right">{transaction.totalAmount} €</TableCell>
                  <TableCell align="right">{transaction.product.length}</TableCell>
                </TableRow>)
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classes.navBtnsContainer}>
        <Button variant="contained" className={classes.navBtn} onClick={() => window.location.replace(`${Config.CATALOG_FRONTEND_BASE_URL}/catalog`)}>Back to catalog</Button>
      </div>
    </>
  )
}

export default Transactions