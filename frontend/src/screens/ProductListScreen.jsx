import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../slices/productsApiSlice";

const OrderListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate, error: createError }] =
    useCreateProductMutation();

  const deleteHandler = (id) => {
    console.log("delete: " + id);
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <LinkContainer to="/admin/product/create">
            <Button className="btn-sm sm-3" onClick={createProductHandler}>
              <FaEdit className="fas fa-plus"></FaEdit> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className="btn-sm mx-2" variant="light">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default OrderListScreen;
