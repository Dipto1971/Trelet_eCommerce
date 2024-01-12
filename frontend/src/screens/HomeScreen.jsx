import React from "react";
import { Col, Row } from "react-bootstrap";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Product from "../Components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
                {/* <h3>
              <strong>{product.name}</strong> <br />
              <strong>{product.price}</strong>
            </h3> */}
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;

//react explanation of useEffect: this is an array of dependencies, if the array is empty, it will run only once, if it has a variable, it will run when that variable changes

//instead of using useEffect, we used useGetProductsQuery from productsApiSlice which is redux toolkit difference is that it will automatically fetch the data and update the state for us

// Unlike using axios, now we are using redux toolkit to fetch the data and update the state for us. The procedure is as follows:
// 1. import useGetProductsQuery from productsApiSlice
// 2. call it in the component
// 3. destructure the data, isLoading, and error from the returned object
// 4. use the data, isLoading, and error in the component
// 5. if isLoading is true, display a loading message
// 6. if error is true, display the error message
// 7. if the data is true, display the data
