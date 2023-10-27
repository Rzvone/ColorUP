import { useEffect,useState } from "react"
import { Grid, Card, CardContent, CardMedia, Button, Typography, CardActions, Box } from "@mui/material"
import ProductModal from "./ProductModal"
import { useRef } from "react"
const Products = () =>{
    const [products,setProducts] = useState([])
    const [open,setOpen] = useState(false)
    const productSelected = useRef({})
useEffect(()=>{
    const fetchProducts = async() =>{
        const response = await fetch("http://localhost:8080/api/products/getProducts")
        const res = await response.json()
        setProducts(res.content)
        console.log(res)
    }
    fetchProducts()
},[])
return <Box sx={{margin:'3rem'}}>
<Grid container spacing = {2}>
{products.map((product,key)=>(
    <Grid item xs={12} md={4}>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ minHeight: 370 }}
        image={product.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.product.description}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{marginTop:1}}>
          {product.product.price}$
        </Typography>
        <Typography variant="body1" color={product.product.stock>50?"green":"red"} sx={{marginTop:1}}>
          {product.product.stock} items in stock
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{setOpen(true);productSelected.current=product.product}}>Add to cart</Button>
      </CardActions>
    </Card>
    </Grid>
))}
</Grid>
<ProductModal open={open} handleClose={()=>setOpen(false)} product={productSelected.current}/>
</Box>
}

export default Products