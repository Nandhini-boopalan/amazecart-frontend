import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Metadata from "../layouts/metadata";
import { useDispatch, useSelector } from "react-redux";
import getProducts from "../../actions/productActions";
import Loader from "../layouts/loader";
import Product from "./product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import Slider from "rc-slider"
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'


const ProductSearch = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
   const [price, setPrice] = useState([1,1000]);
   const [priceChanged,setPriceChanged]=useState(price)
   const [categories,setCategories]=useState(null)
   const [rating,setRating]=useState(0)
  
   const { keyword } = useParams();
  const category=['Electronics',
  'Mobile Phones',
  'Laptops',
  'Accessories',
  'Headphones',
  'Food',
  'Books',
  'Clothes/Shoes',
  'Beauty/Health',
  'Sports',
  'Outdoor',
  'Home']

  useEffect(() => {
    if (error) {
      return toast.error("Welcome to shopping...", {
        position: "bottom-center",
      });
    }
    // Fetch products only if there's a keyword or currentPage change
    dispatch(getProducts(keyword,priceChanged,categories,rating ,currentPage));
  }, [dispatch, error, currentPage, keyword,priceChanged,categories,rating]); // Depend on keyword and currentPage

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo); // Update the currentPage state
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Buy Best Products"} />
          <h1 id="products_heading">search Products</h1>

          <section id="products" className="container mt-5">
         
            <div className="row">
              <div className="col-6 col-md-3 mb-5 mt-5">
                 {/*price filter*/}
                    <div className="px-5" onMouseUp={()=>setPriceChanged(price)}>
                    <Slider
                    range={true}
                    marks={
                      {
                        1:"$1",
                        2:"$1000"
                      }
                    }
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price)=>{
                      setPrice(price)
                    }}
                    handleRender={
                      renderProps=>{
                        return(
                          <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                            <div {...renderProps.props}>

                            </div>

                          </Tooltip>
                        )
                      }
                    }
                    />
                    </div>
                    <hr className="my-5"/>
                    {/*category filter*/}
                <div className="my-5">
       <h3 className="mb-3">category</h3>
         <ul className="pl-0">
             {category.map(category => (
       <li 
        style={{
          cursor: "pointer",
          listStyleType: "none"
        }}
        key={category}
        onClick={() => {
          setCategories(category);
        }}
        
        
      >
        {category}
      </li>
    ))}
  </ul>
</div>
<hr className="my-5"/>
{/*rating filter */}
<div className="mt-5">
<h4 className="mb-3">ratings</h4>
<ul className="pl-0">
             {[5,4,3,2,1].map(star => (
       <li 
        style={{
          cursor: "pointer",
          listStyleType: "none"
        }}
        key={star}
        onClick={()=>{
          setRating(star)
        }}
      >
       <div className="rating-outer">
        <div className="rating-inner"
        style={{
          width:`${star*20}%`
        }}>

        </div>
       </div>
      </li>
    ))}
  </ul>
</div>

              </div>
              <div className="col-6 col-md-9 ">
                <div className="row">
                {products &&
                products.map((product) => (
                  <Product col={4} key={product._id} product={product} />
                ))}
                </div>
              </div>
              
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default ProductSearch;
