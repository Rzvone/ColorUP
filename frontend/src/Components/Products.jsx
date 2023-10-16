import { useEffect,useState } from "react"
import { Grid, Card, CardContent, CardMedia, Button, Typography, CardActions, Box } from "@mui/material"
const Products = () =>{
    const [products,setProducts] = useState([])
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
        sx={{ minHeight: 300 }}
        image={product.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.product.price}$
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
      </CardActions>
    </Card>
    </Grid>
))}
</Grid>
</Box>
}

export default Products