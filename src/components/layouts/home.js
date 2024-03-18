import { useEffect } from "react";
import Metadata from "./metadata";
import { useDispatch, useSelector } from "react-redux";
import getProducts from "../../actions/productsActions";
import Loader from "./loader";
import Product from "../products/product";
import { toast } from "react-toastify";


const Home = () => {
  const dispatch=useDispatch()
  const {products,loading,error}=useSelector((state)=>state.productsState)
  useEffect(()=>{
    if(error){
    return  toast.error('welcome to shopping...', {
        position: 'bottom-center'
      });
    }
    dispatch(getProducts)
  },[error])
    return (
      <>
      {loading?<Loader/>:
            <>
        <Metadata title={'buy best products'}/>
        <h1 id="products_heading">Latest Products</h1>

<section id="products" className="container mt-5">
  <div className="row">
    {products&&products.map(product=>(
      <Product product={product}/>
    ))}
    

    
  </div>
</section>










            </>}
      </>      
    );
  };
  
  export default Home;
  