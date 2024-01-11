import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../Components/Rating";

const ProductScreen = () => {
  const [product, setProducts] = useState([]);

  const { id: productID } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`/api/products/${productID}`);
      setProducts(data);
      console.log(data);
    };
    fetchProducts();
  }, [productID]);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <button
                  className="btn btn-dark btn-block"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;

// useEffect & useState are react hooks that allow us to use state and lifecycle methods in functional components
// The procedure how to use them is as follows:
// 1. import them from react
// 2. call them in the component
// 3. pass in the initial state as an argument to useState
// 4. call useEffect and pass in a function that will run when the component loads
// 5. inside the function, call the axios request and set the state to the data
// 6. pass in an empty array as a second argument to useEffect
// 7. if you want to run the function when a variable changes, pass in the variable as a second argument to useEffect
