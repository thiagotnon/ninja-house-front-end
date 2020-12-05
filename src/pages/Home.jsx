import React from "react";
import { Alert, Card, Col, Row } from "react-bootstrap";
import UnitsService from "../services/UnitsService";
import ReservationService from "../services/ReservationService";
import DwellerService from "../services/DwellerService";
import MessageService from "../services/MessageService";

import {
  FaBox,
  FaBuilding,
  FaCalendarCheck,
  FaRegNewspaper,
  FaShippingFast,
  FaUserAlt,
} from "react-icons/fa";

import "../styles/home.css";
import OrderService from "../services/OrderService";
import { Link } from "react-router-dom";
import Page from "../components/Page";

const Home = () => {
  const [units, setUnits] = React.useState([]);
  const [reservations, setReservations] = React.useState([]);
  const [dwallers, setDwellers] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [messages, setSetMessages] = React.useState([]);

  React.useEffect(() => {
    UnitsService.getAll()
      .then((results) => {
        setUnits(results.data.data.length);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    ReservationService.getAll()
      .then((results) => {
        setReservations(results.data.data.length);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    DwellerService.getAll()
      .then((results) => {
        setDwellers(results.data.data.length);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    OrderService.getAll()
      .then((results) => {
        setOrders(results.data.data.length);
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    MessageService.getAll()
      .then((results) => {
        setSetMessages(results.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  return (
    <>
      <Page title="Painel de controle">
        <Row className="pt-3">
          <Col md={12}>
            <Row>
              <Col md={3} className="mb-3">
                <Link to="/unidades">
                  <Card className="card-counter bg-primary text-white">
                    <FaBuilding />
                    <span className="count-numbers font-weight-bold">
                      {units && <>{units}</>}
                    </span>
                    <span className="count-name">Unidades</span>
                  </Card>
                </Link>
              </Col>
              <Col md={3} className="mb-3">
                <Link to="/reservas">
                  <Card className="card-counter bg-warning text-white">
                    <FaCalendarCheck />
                    <span className="count-numbers font-weight-bold">
                      {reservations && <>{reservations}</>}
                    </span>
                    <span className="count-name">Reservas</span>
                  </Card>
                </Link>
              </Col>
              <Col md={3} className="mb-3">
                <Link to="/moradores">
                  <Card className="card-counter bg-info text-white">
                    <FaUserAlt />
                    <span className="count-numbers font-weight-bold">
                      {dwallers && <>{dwallers}</>}
                    </span>
                    <span className="count-name">Moradores</span>
                  </Card>
                </Link>
              </Col>
              <Col md={3} className="mb-3">
                <Link to="/encomendas">
                  <Card className="card-counter bg-dark text-white">
                    <FaShippingFast />
                    <span className="count-numbers font-weight-bold">
                      {orders && <>{orders}</>}
                    </span>
                    <span className="count-name">Encomendas</span>
                  </Card>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col md={9} className="d-none">
            <h5>
              <FaBox /> Encomendas
            </h5>
            <hr />
            <div></div>
          </Col>

          <Col md={12}>
            <h5>
              <FaRegNewspaper /> Últimos avisos
            </h5>
            <hr />
            {messages.length === 0 ? (
              <>
                <Alert variant="secondary">
                  Não existem mensagens até o momento.
                </Alert>
              </>
            ) : (
              <>
                <Row>
                  {messages
                    .filter((message) => message.apartment_id == null)
                    .map((message) => (
                      <Col md={12} key={message.id}>
                        <Card className="mb-2">
                          <Card.Body>
                            <h6 className="font-weight-bold">
                              {message.title}
                            </h6>
                            <hr />
                            <small>{message.message}</small>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Page>
    </>
  );
};

export default Home;
