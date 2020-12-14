import React from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import UnitsService from "../../services/UnitsService";
import MessageService from "../../services/MessageService";
import "../../styles/units.css";
import {
  dateFormat,
  formatCpf,
  formatPhoneNumber,
  padLeadingZeros,
} from "../../helpers/functions";
import { FaEnvelope, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
import CustomModal from "../../components/CustomModal";
import Page from "../../components/Page";

const SingleUnit = (props) => {
  const [unit, setUnit] = React.useState({});
  const [orders, setOrders] = React.useState([]);
  const [messages, setMessages] = React.useState({});
  const [guests, setGuests] = React.useState([]);
  const [dwellers, setDwellers] = React.useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {
    const id = props.match.params.id;
    UnitsService.get(id).then((results) => {
      setUnit(results.data);
      setOrders(results.data.orders);
    });

    UnitsService.getDwellers(id).then((results) => {
      setDwellers(results.data);
    });
    MessageService.getAll().then((results) => {
      setMessages(results.data.data.pop());
    });
  }, [props]);
  React.useEffect(() => {
    setGuests(unit.guests);
  }, [unit]);
  return (
    <>
      <Page
        title={`Unidade ${padLeadingZeros(unit.unit_number, 3)} - Bloco ${
          unit.block
        }${unit.floor}`}
        custom_content={
          <>
            {messages && (
              <Button variant="primary" onClick={() => setModalShow(true)}>
                <FaEnvelope /> Avisos
              </Button>
            )}
          </>
        }
      >
        <Container fluid>
          <Row>
            <Col md={6} className="dwellers-list">
              <div className="d-flex aling-items-center justify-content-between">
                <h4 className="pb-0 mb-0">Moradores</h4>
              </div>
              <hr />
              {dwellers.length === 0 ? (
                <>
                  <Alert variant="secondary">
                    Não existem moradores cadastrados nessa unidade até o
                    momento.
                  </Alert>
                </>
              ) : (
                <>
                  {dwellers.map((item) => (
                    <Card key={item.id} className="mb-3">
                      <Card.Body>
                        <h5 className="display-4">{item.dweller.username}</h5>
                        <hr />
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="phone">
                            <FaPhoneAlt
                              size={20}
                              className="mr-2 text-success"
                            />
                            <span>{formatPhoneNumber(item.dweller.phone)}</span>
                          </div>
                          <div className="mail">
                            <FaRegEnvelope
                              size={20}
                              className="mr-2 text-primary"
                            />
                            <span>{item.dweller.email}</span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              )}
            </Col>
            <Col md={3}>
              <h4>Encomendas</h4>
              <hr />
              {orders.length === 0 ? (
                <Alert variant="warning">Você não possui encomendas</Alert>
              ) : (
                <>
                  <div className="scroll">
                    {orders.map((order) => (
                      <ListGroup key={order.id} className="mb-3">
                        <ListGroup.Item className="list-group-item list-group-item-action">
                          <h5>{order.message}</h5>
                          <hr />
                          <strong>Rastreio:</strong> {order.tracking}
                          <br />
                          <strong>Remetente:</strong> {order.sender}
                          <br />
                          <strong>Destinatário:</strong> {order.recipient}
                          <br />
                          <strong>Entregue:</strong>{" "}
                          <span
                            className={
                              order.delivery_status
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {order.delivery_status ? "Sim" : "Não"}
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                    ))}
                  </div>
                </>
              )}
            </Col>
            <Col md={3}>
              <h4>Hóspedes</h4>
              <hr />
              {guests && (
                <>
                  {guests.map((item) => (
                    <Card key={item.id} className="mb-4">
                      <Card.Body>
                        <Card.Title className="font-weight-bold">
                          {item.name}
                        </Card.Title>
                        <Card.Text>
                          <strong> CPF: </strong> {formatCpf(item.cpf)}
                        </Card.Text>
                        <Card.Text>
                          <strong> Entrada:</strong>{" "}
                          {dateFormat(item.entry_date)}
                        </Card.Text>
                        <Card.Text>
                          <strong> Saída:</strong>{" "}
                          {dateFormat(item.departure_date)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              )}
            </Col>
          </Row>
        </Container>
      </Page>

      {messages && (
        <>
          <CustomModal
            title={messages.title}
            children={<>{messages.message}</>}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      )}
    </>
  );
};

export default SingleUnit;
