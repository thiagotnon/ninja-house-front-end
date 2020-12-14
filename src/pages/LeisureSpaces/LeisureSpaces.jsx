import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import LeisureService from "../../services/LeisureService";
import "../../styles/leisure.css";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import {
  FaCalendarDay,
  FaRegCalendarCheck,
  FaRegEdit,
  FaRegEye,
  FaTrashAlt,
} from "react-icons/fa";
import { MoneyFormat } from "../../helpers/functions";
import swal from "sweetalert";
const LeizureSpaces = () => {
  const [leisureSpaces, setLeisureSpaces] = React.useState([]);

  React.useEffect(() => {
    LeisureService.getAll().then((results) => {
      setLeisureSpaces(results.data.data);
    });
  }, []);
  function handleClick(id) {
    swal({
      title: "Você realmente deseja remover o espaço de lazer?",
      text: "Não será possível recupera-lo após a remoção.",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        LeisureService.delete(id)
          .then(() => {
            LeisureService.getAll().then((results) => {
              setLeisureSpaces(results.data.data);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
        swal("Poof! O espaço de lazer foi removido!", {
          icon: "success",
        });
      }
    });
  }

  return (
    <>
      <Page
        title="Espaços de lazer"
        custom_content={
          <>
            <ButtonGroup>
              <Link
                to="/espaco-de-lazer/novo"
                className="btn btn-outline-secondary d-flex align-items-end justify-content-between"
              >
                <FaRegCalendarCheck size={20} className="mr-2" />
                Novo espaço de lazer
              </Link>
              <Link to="/reservas" className="btn btn-outline-secondary ">
                <FaCalendarDay size={20} className="mr-2" />
                Ver todas as reservas
              </Link>
            </ButtonGroup>
          </>
        }
      >
        {leisureSpaces.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem espaços cadastrados até o momento.
            </Alert>
          </>
        ) : (
          <>
            <Row className="leisure-list">
              {leisureSpaces.map((leisure, i) => (
                <Col className="col-lg-4 col-md-6 col-sm-12" key={i}>
                  <Card className="text-white mb-4">
                    <Card.Img src={leisure.images[0].url} alt={leisure.id} />

                    <Card.Body className="position-absolute">
                      <Card.Title className="font-weight-bold">
                        {leisure.name}
                      </Card.Title>
                      <Card.Text>
                        Capacidade: {leisure.capacity} pessoas
                      </Card.Text>
                      <Card.Text>Taxa: {MoneyFormat(leisure.rate)}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <ButtonGroup className="btn-block">
                        <Link
                          className="btn btn-outline-secondary"
                          to={`espaco-de-lazer/${leisure.id}`}
                        >
                          <FaRegEye size={20} /> Ver detalhes
                        </Link>
                        <Link
                          className="btn btn-outline-secondary"
                          to={`espaco-de-lazer/${leisure.id}/editar`}
                        >
                          <FaRegEdit size={20} /> Editar
                        </Link>
                        <Button
                          variant="outline-danger"
                          onClick={() => handleClick(leisure.id)}
                        >
                          <FaTrashAlt size={20} /> Remover espaço
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

export default LeizureSpaces;
