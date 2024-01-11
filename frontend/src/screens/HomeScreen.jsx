import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
      console.log(data);
    };
    fetchProducts();
    //Explanation: this is a function that will run when the component loads, it will fetch the data from the backend and set the state of the products to the data
  }, []);
  //react explanation of useEffect: this is an array of dependencies, if the array is empty, it will run only once, if it has a variable, it will run when that variable changes
  return (
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
  );
};

export default HomeScreen;
