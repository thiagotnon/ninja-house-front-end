import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import OrderService from "../../services/OrderService";
import "../../styles/dwellers.css";
import { Link } from "react-router-dom";
import { padLeadingZeros } from "../../helpers/functions";
import Page from "../../components/Page";
import { FaBox, FaRegEdit, FaShippingFast, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";

const Orders = () => {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    OrderService.getAll().then((results) => {
      setOrders(results.data.data);
    });
  }, []);

  function handleClick(id) {
    swal({
      title: "Você realmente deseja remover essa encomenda?",
      text: "Não será possível recupera-la após a remoção.",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        OrderService.delete(id)
          .then(() => {
            OrderService.getAll().then((results) => {
              setOrders(results.data.data);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
        swal("Poof! Encomenda removida com sucesso.", {
          icon: "success",
        });
      }
    });
  }

  return (
    <>
      <Page
        title="Encomendas"
        custom_content={
          <ButtonGroup>
            <Link
              to="/tipo-de-encomenda"
              className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
            >
              <FaBox size={20} className="mr-1" /> Adicionar tipo de encomenda
            </Link>
            <Link
              to="/encomenda/nova"
              className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
            >
              <FaShippingFast size={20} className="mr-1" /> Nova encomenda
            </Link>
          </ButtonGroup>
        }
      >
        {orders.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem encomendas registradas até o momento.
            </Alert>
          </>
        ) : (
          <Row>
            {orders.map((order) => (
              <Col md={4} key={order.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="mb-0">
                        <small>Bloco</small>
                        <br />
                        <strong>{order.apartment.block}</strong>
                      </h5>
                      <h5 className="mb-0">
                        <small>Apto</small>
                        <br />
                        <strong>
                          {padLeadingZeros(order.apartment_id, 3)}
                        </strong>
                      </h5>
                      <h5 className="mb-0">
                        <small>Destinatário</small>
                        <br />
                        <strong>{order.recipient}</strong>
                      </h5>
                      <h5 className="mb-0">
                        <small>Entregue </small>
                        <br />
                        <strong>
                          <span
                            className={
                              order.delivery_status
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {order.delivery_status ? "Sim" : "Não"}
                          </span>
                        </strong>
                      </h5>
                    </div>
                    <hr />
                    <p>
                      <strong>Tipo de encomenda: </strong>
                      {order.order_type.name}
                    </p>

                    <p>
                      <strong>Encomenda registrada: </strong>
                      <span
                        className={
                          order.registered_order
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {order.registered_order ? "Sim" : "Não"}
                      </span>
                    </p>
                    <p>
                      <strong>Transportadora: </strong>
                      {order.sender}
                    </p>
                    <p>
                      <strong>Cód. de Rastreio: </strong>
                      {order.tracking}
                    </p>
                    <hr />
                    <div className="d-flex align-items-center justify-content-between btn-group">
                      <Link
                        to={`encomenda/${order.id}/editar`}
                        className="btn btn-outline-secondary"
                      >
                        <FaRegEdit /> Editar
                      </Link>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleClick(order.id)}
                      >
                        <FaTrashAlt /> Excluir
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Page>
    </>
  );
};

export default Orders;
