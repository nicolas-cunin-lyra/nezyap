import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useState } from "react";
import { Product } from "./model/Product";
import { Config } from './Config'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 345,
    maxWidth: "80%",
    margin: "4px",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function ProductItem(props: { product: Product }) {
  const classes = useStyles();
  const [indexImg, setindexImg] = useState(0)

  // TODO: ask user about email
  const user = "nicolas.cunin@lyra-network.com"

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.product.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="add" onClick={() => window.location.href = `${Config.PAYMENT_FRONTEND_BASE_URL}/users/${user}/buy/${props.product.id}`}>
            <ShoppingCartIcon />
          </IconButton>
        }
        title={props.product.name}
        subheader={`${props.product.price} €`}
      />
      <CardMedia
        className={classes.media}
        image={props.product.pictures[indexImg]}
        title={props.product.name}
        onClick={() => setindexImg((indexImg + 1) % props.product.pictures.length)}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.product.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ProductItem