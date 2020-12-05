import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import DwellerService from "../../services/DwellerService";
import "../../styles/dwellers.css";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "../../helpers/functions";
import Page from "../../components/Page";
import {
  FaMobileAlt,
  FaRegEnvelope,
  FaUserEdit,
  FaUserPlus,
  FaUserTimes,
} from "react-icons/fa";

function Dwellers() {
  const [dwellers, setDwellers] = React.useState([]);

  React.useEffect(() => {
    DwellerService.getAll().then((results) => {
      setDwellers(results.data.data);
    });
  }, []);

  function handleClick(id) {
    if (window.confirm("Deseja realmente excluir o registro?")) {
      DwellerService.delete(id)
        .then(() => {
          DwellerService.getAll().then((results) => {
            setDwellers(results.data.data);
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
        title="Moradores"
        custom_content={
          <Link
            to="/morador/novo"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
          >
            <FaUserPlus size={20} className="mr-2" />
            Adicionar Morador
          </Link>
        }
      >
        {dwellers.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem moradores cadastrados até o momento.
            </Alert>
          </>
        ) : (
          <Row>
            <>
              {dwellers.map((user) => (
                <Col md={4} key={user.dweller.id} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Subtitle className="mb-0 text-muted user-name">
                        {user.dweller.username}
                      </Card.Subtitle>
                      <hr />
                      <div className="box-contact d-flex align-items-center justify-content-between">
                        <div className="phone d-flex align-items-center">
                          <small className="text-success">
                            <FaMobileAlt />{" "}
                            {formatPhoneNumber(user.dweller.phone)}
                          </small>
                        </div>
                        <div className="mail">
                          <small className="text-primary">
                            <FaRegEnvelope /> {user.dweller.email}
                          </small>
                        </div>
                        <ButtonGroup>
                          <Button variant="outline-secondary">
                            <FaUserEdit size={20} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleClick(user.id)}
                          >
                            <FaUserTimes size={20} />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </>
          </Row>
        )}
      </Page>
    </>
  );
}

export default Dwellers;
