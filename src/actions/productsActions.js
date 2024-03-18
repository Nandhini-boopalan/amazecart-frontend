import axios from "axios"
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlice"

const getProducts= async(dispatch)=>{
   try{
    dispatch(productsRequest())
    
    const {data}=await axios.get('/api/v1/product')
    dispatch(productsSuccess(data))
   }
   catch(error){
//handle error
dispatch(productsFail(error.response.data.message))
   }
   
}
export default getProducts