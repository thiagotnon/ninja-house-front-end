import React from "react";
import { Carousel, Col, Row } from "react-bootstrap";
import LeisureService from "../../services/LeisureService";
import "../../styles/leisure.css";
import Page from "../../components/Page";
import { MoneyFormat } from "../../helpers/functions";
import { Link } from "react-router-dom";
import { FaCalendarCheck } from "react-icons/fa";
const LeizureSpaces = (props) => {
  const [leisureSpace, setLeisureSpace] = React.useState({});
  const [leisureSpaceImages, setLeisureSpaceImages] = React.useState([]);

  React.useEffect(() => {
    const id = props.match.params.id;
    LeisureService.get(id).then((results) => {
      setLeisureSpace(results.data);
      setLeisureSpaceImages(results.data.images);
    });
  }, [props]);

  return (
    <>
      <Page title={leisureSpace.name}>
        <Row>
          <Col md={6}>
            <Carousel>
              {leisureSpaceImages.map((item) => (
                <Carousel.Item key={item.id}>
                  <img
                    className="d-block w-100"
                    src={item.url}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={6} className="my-auto">
            <h4>
              <strong>Situação: </strong>
              <span
                className={
                  leisureSpace.availability ? "text-success" : "text-danger"
                }
              >
                {leisureSpace.availability ? "Disponível" : "Indisponível"}
              </span>
            </h4>
            <h4>
              <strong>Capacidade:</strong> {leisureSpace.capacity}
            </h4>
            <h4>
              <strong>Taxa de urilização:</strong>
              {MoneyFormat(leisureSpace.rate)}
            </h4>
            <h4>
              <strong>Horádio:</strong> {leisureSpace.start_time} às{" "}
              {leisureSpace.end_time}
            </h4>
            <Link
              to={`${leisureSpace.id}/reserva`}
              className={`btn btn-outline-primary btn-lg ${
                leisureSpace.availability ? "" : "disabled"
              }`}
            >
              <FaCalendarCheck className="mr-2" />
              Reservar
            </Link>
          </Col>
        </Row>
      </Page>
    </>
  );
};

export default LeizureSpaces;
