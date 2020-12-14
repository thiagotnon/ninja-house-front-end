import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import "../../styles/leisure.css";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { dateFormat } from "../../helpers/functions";
import swal from "sweetalert";
import ReservationService from "../../services/ReservationService";
const Reservations = () => {
  const [reservations, setReservations] = React.useState([]);

  React.useEffect(() => {
    ReservationService.getAll().then((results) => {
      setReservations(results.data.data);
    });
  }, []);

  function handleClick(id) {
    swal({
      title: "Você realmente deseja remover a reserva?",
      text: "Não será possível recupera-la após a remoção.",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        ReservationService.delete(id)
          .then(() => {
            ReservationService.getAll().then((results) => {
              setReservations(results.data.data);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
        swal("Poof! A reserva foi removida!", {
          icon: "success",
        });
      }
    });
  }

  return (
    <>
      <Page title="Reservas">
        {reservations.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem reservas cadastradas até o momento.
            </Alert>
          </>
        ) : (
          <>
            <Row>
              {reservations.map((item) => (
                <Col md={3} key={item.id}>
                  <Card>
                    <Card.Body>
                      <h5 className="font-weight-bold">
                        {item.leisure_space.name}
                      </h5>
                      <hr />
                      <strong>Reservado para: </strong> {dateFormat(item.date)}
                    </Card.Body>
                    <Card.Footer>
                      <ButtonGroup>
                        <Link
                          className="btn btn-outline-secondary"
                          to={`reserva/${item.id}`}
                        >
                          <FaEye /> Ver reserva
                        </Link>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleClick(item.id)}
                        >
                          <FaTrashAlt size={20} /> Remover reserva
                        </Button>
                      </ButtonGroup>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Page>
    </>
  );
};

export default Reservations;
