import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import LeisureService from "../../services/LeisureService";
import "../../styles/leisure.css";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { FaUserPlus, FaUserTimes } from "react-icons/fa";
import { MoneyFormat } from "../../helpers/functions";
const LeizureSpaces = () => {
  const [leisureSpaces, setLeisureSpaces] = React.useState([]);

  React.useEffect(() => {
    LeisureService.getAll().then((results) => {
      setLeisureSpaces(results.data.data);
    });
  }, []);
  function handleClick(id) {
    if (window.confirm("Deseja realmente excluir o o espaço de lazer?")) {
      LeisureService.delete(id)
        .then(() => {
          LeisureService.getAll().then((results) => {
            setLeisureSpaces(results.data.data);
          });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }

  return (
    <>
      <Page
        title="Espaços de lazer"
        custom_content={
          <Link
            to="/espaco-de-lazer/novo"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
          >
            <FaUserPlus size={20} className="mr-2" />
            Novo espaço de lazer
          </Link>
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
                <Col className="col-lg-3 col-md-6 col-sm-12" key={i}>
                  <Card className="text-white mb-4">
                    <Card.Img src={leisure.images[0].url} alt={leisure.id} />

                    <Card.ImgOverlay>
                      <Card.Title className="font-weight-bold">
                        {leisure.name}
                      </Card.Title>
                      <Card.Text>
                        Capacidade: {leisure.capacity} pessoas
                      </Card.Text>
                      <Card.Text>Taxa: {MoneyFormat(leisure.rate)}</Card.Text>
                      <hr />
                      <ButtonGroup className="btn-block">
                        <Link
                          className="btn btn-outline-light"
                          to={`espaco-de-lazer/${leisure.id}`}
                        >
                          Ver detalhes
                        </Link>
                        <Button
                          variant="outline-light"
                          onClick={() => handleClick(leisure.id)}
                        >
                          <FaUserTimes size={20} /> Remover espaço
                        </Button>
                      </ButtonGroup>
                    </Card.ImgOverlay>
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
