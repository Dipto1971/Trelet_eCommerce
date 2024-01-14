import React, { useState } from "react";
import { Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../Components/Rating";
import { addToCart } from "../slices/cartSlice";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  // useParams is a react hook that allows us to access the parameters in the url. It returns an object with the parameters as keys and the values as values.

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate(`/cart`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div> {error?.data?.message || error.error}</div>
      ) : (
        <>
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
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
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

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col> Qty </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {
                              // this creates an array of numbers from 0 to countInStock
                              [...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {/* x + 1 because we want to start from 1 */}
                                    {x + 1}
                                  </option>
                                )
                              )
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <button
                      className="btn btn-dark btn-block"
                      disabled={product.countInStock === 0}
                      onClick={() => {
                        addToCartHandler();
                      }}
                    >
                      Add to Cart
                    </button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
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
