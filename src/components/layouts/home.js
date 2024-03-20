import { useEffect, useState } from "react";
import Metadata from "./metadata";
import { useDispatch, useSelector } from "react-redux";
import getProducts from "../../actions/productsActions";
import Loader from "./loader";
import Product from "../products/product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
console.log(currentPage)
const setCurrentPageNo = (pageNo) => {
  console.log("Page changed to:", pageNo);
  setCurrentPage(pageNo); // Update the currentPage state
  dispatch(getProducts(pageNo)); // Fetch products for the new page
};


useEffect(() => {
  if (error) {
    return toast.error("Welcome to shopping...", {
      position: "bottom-center",
    });
  }
  dispatch(getProducts(null,null,null,null,currentPage)); // Fetch products for the current page
}, [error, dispatch, currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={"Buy Best Products"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product col={4} key={product._id} product={product} />
                ))}
            </div>
          </section>
{productsCount>0 && productsCount>resPerPage?
          <div className="d-flex justify-content-center mt-5">
  <Pagination
    activePage={currentPage}
    onChange={setCurrentPageNo}
    totalItemsCount={productsCount}
    itemsCountPerPage={resPerPage}
    nextPageText={'Next'}
    firstPageText={'First'}
    lastPageText={'Last'}
    itemClass={'page-item'}
    linkClass={'page-link'}
  />
</div>:null}

        </>
      )}
    </>
  );
};

export default Home;
