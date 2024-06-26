import axios from "axios";
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlice";
import { productFail, productRequest, productSuccess } from "../slices/productSlice"

   
const getProducts = (keyword,price,categories,rating,currentPage) => async (dispatch) => {
   try {
      dispatch(productsRequest());
      let link = `/api/v1/product?page=${currentPage}`;

      if (keyword) {
         link += `&keyword=${keyword}`;
      }
      if (price) {
         link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      }
      if (categories) {
         link += `&categories=${categories}}`;
      }
      if (rating) {
         link += `&rating=${rating}}`;
      }

      const { data } = await axios.get(link); // Pass the constructed URL to axios.get()
      dispatch(productsSuccess(data));
   } catch (error) {
      // Handle error
      dispatch(productsFail(error.response.data.message));
   }
};

export default getProducts;




export const getProduct = (id) => async (dispatch) => {
   try {
      dispatch(productRequest());
      
      const { data } = await axios.get(`/api/v1/product/${id}`);
      console.log(data);
      dispatch(productSuccess(data));
   } catch (error) {
      // Handle error
      dispatch(productFail(error.response.data.message));
   }
};

