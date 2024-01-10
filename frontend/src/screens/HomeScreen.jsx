import React from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product";
import products from "../products.js";

const HomeScreen = () => {
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
