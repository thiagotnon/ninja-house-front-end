import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../../styles/leisure.css";
import Page from "../../components/Page";

import { MoneyFormat, padLeadingZeros } from "../../helpers/functions";
import ReservationService from "../../services/ReservationService";
import UnitsService from "../../services/UnitsService";
const SingleReservation = (props) => {
  const [reservation, setReservation] = React.useState({});
  const [unit, setUnit] = React.useState({});
  const [dados, setDados] = React.useState({});

  React.useEffect(() => {
    const id = props.match.params.id;
    ReservationService.get(id).then((results) => {
      setReservation(results.data);
      setDados(results.data.leisure_space);
      UnitsService.get(results.data.apartment_id).then((results) => {
        setUnit(results.data);
      });
    });
  }, [props]);
  console.log(dados);
  return (
    <>
      <Page title={`Reserva de ${dados.name ? dados.name : "..."}`}>
        <Card className="mb-5">
          <Card.Header className="font-weight-bold">
            Regras de Utilização
          </Card.Header>
          <Card.Body>{dados.usage_rules}</Card.Body>
        </Card>

        {dados && (
          <>
            <Row>
              <Col md={4}>
                <Card.Title className="font-weight-bold">
                  Dados da Reserva
                </Card.Title>
                <hr />
                <Card>
                  <Card.Body>
                    <p>
                      <strong>Unidade: </strong> {unit.block}
                      {unit.floor}-{padLeadingZeros(unit.unit_number, 3)}
                    </p>
                    <p>
                      <strong>Horário: </strong> {dados.end_time} às{" "}
                      {dados.start_time}
                    </p>
                    <p>
                      {dados.capacity && (
                        <>
                          <strong>Capacidade: </strong>
                          {dados.capacity} pessoas
                        </>
                      )}
                    </p>
                    <p>
                      <strong>Taxa: </strong> {MoneyFormat(dados.rate)}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={8}>
                <Card.Title className="font-weight-bold">Convidados</Card.Title>
                <hr />
                {reservation.guests && (
                  <>
                    <Row>
                      {reservation.guests.map((item, i) => (
                        <Col md={4} key={i}>
                          <Card>
                            <Card.Body>
                              <div className="d-flex align-items-center justify-content-between">
                                <h5 className="font-weight-bold mb-0">
                                  {item.name}
                                </h5>
                              </div>
                              <hr />
                              <p>
                                <strong>RG: </strong> {item.rg}
                              </p>
                              <p>
                                <strong>CPF: </strong>
                                {item.cpf}
                              </p>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </>
        )}
      </Page>
    </>
  );
};

export default SingleReservation;
