import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core';
import { Catalog } from './model/Catalog';
import axios from 'axios';
import ProductItem from './ProductItem';
import { Config } from './Config'

const useStyles = makeStyles(() => ({
  app: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    padding: "20px",
    overflow: "auto",
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "center",
  }
}));

const App = () => {
  const [catalog, setcatalog] = useState<Catalog | undefined>()

  useEffect(() => {
    if (catalog != null) return
    axios
    .get(`${Config.CATALOG_BACKEND_URL}/catalog`)
    .then((res: { data: Catalog; }) =>  setcatalog(res.data))
  })

  const classes = useStyles();
  return (
    <div className={classes.app}>
      {catalog?.products.map(product => <ProductItem key={product.id} product={product}/>)}
    </div>
  );
}

export default App;
