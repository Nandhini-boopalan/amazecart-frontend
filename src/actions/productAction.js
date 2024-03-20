import axios from "axios"
import { productFail, productRequest, productSuccess } from "../slices/productSlice"

const getProduct=(id)=> async(dispatch)=>{
   try{
    dispatch(productRequest())
    
    const {data}=await axios.get(`/api/v1/product/${id}`)
    console.log(data)
    dispatch(productSuccess(data))
   }
   catch(error){
//handle error
dispatch(productFail(error.response.data.message))
   }
   
}
export default getProduct

