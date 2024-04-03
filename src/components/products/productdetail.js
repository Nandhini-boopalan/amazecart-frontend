import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../layouts/loader';
import { getProduct } from '../../actions/productActions';

import {Carousel} from 'react-bootstrap'
import Metadata from '../layouts/metadata';


const ProductDetail = () => {
    const { loading, product } = useSelector((state) => state.productState);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch,id]);

    // Log the props received by the component
    //console.log("Props received by ProductDetail:", { loading, product });
    const { product: actualProduct } = product;
    <h3>{actualProduct && actualProduct.name}</h3>
    //console.log("Product Name:", actualProduct && actualProduct.name);
    //console.log(actualProduct)
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : actualProduct !== undefined ? (
                <Fragment>
                   <Metadata title={actualProduct.name}/>
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {actualProduct.images&&actualProduct.images.map((image,index)=>
                                    <Carousel.Item key={image._id}>
                                 <img className='d-block w-100' src={image.image} alt={actualProduct.name} height="500" width="500" />
                                    </Carousel.Item>)}
                            
                            </Carousel>
                           
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                        <h3>{actualProduct.name}</h3>

                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {actualProduct._id}</p>

                            <hr />

                            <div className="rating-outer">
                        <div className="rating-inner" style={{width: `${product.ratings/ 5 * 100}%` }}></div>
                    </div>
                            <span id="no_of_reviews">({actualProduct.numOfReviews} Reviews)</span>

                            <hr />

                            <p id="product_price">${actualProduct.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus">-</span>

                                <input type="number" className="form-control count d-inline" value="1" readOnly />

                                <span className="btn btn-primary plus">+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">
                                Add to Cart
                            </button>

                            <hr />

                            <p>Status: <span className={actualProduct.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{actualProduct.stock > 0 ? 'in stock' : 'out of stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{actualProduct.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{actualProduct.seller}</strong></p>

                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your Review
                            </button>

                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="stars">
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>
                                                    <textarea name="review" id="review" className="form-control mt-3"></textarea>
                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ) : (
                <p>No product found</p>
            )}
        </Fragment>
    );
};

export default ProductDetail;
