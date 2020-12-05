import React from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import GuestService from "../../services/GuestService";
import "../../styles/units.css";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import {
  FaMobileAlt,
  FaRegEnvelope,
  FaUserEdit,
  FaUserPlus,
  FaUserTimes,
} from "react-icons/fa";
import { formatPhoneNumber } from "../../helpers/functions";

const Guests = () => {
  const [guests, setGuests] = React.useState([]);

  React.useEffect(() => {
    GuestService.getAll().then((results) => {
      setGuests(results.data.data);
    });
  }, []);
  function handleClick(id) {
    if (window.confirm("Deseja realmente excluir o registro?")) {
      GuestService.delete(id)
        .then(() => {
          GuestService.getAll().then((results) => {
            setGuests(results.data.data);
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
        title="Hospedes"
        custom_content={
          <Link
            to="/hospede/novo"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
          >
            <FaUserPlus size={20} className="mr-2" />
            Adicionar Hospede
          </Link>
        }
      >
        {guests.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem hospedes registrados até o momento.
            </Alert>
          </>
        ) : (
          <Row>
            {guests.map((user) => (
              <Col md={4} key={user.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Subtitle className="mb-0 text-muted user-name">
                      {user.username}
                    </Card.Subtitle>
                    <hr />
                    <div className="box-contact d-flex align-items-center justify-content-between">
                      <div className="phone d-flex align-items-center">
                        <small className="text-success">
                          <FaMobileAlt /> {formatPhoneNumber(user.phone)}
                        </small>
                      </div>
                      <div className="mail">
                        <small className="text-primary">
                          <FaRegEnvelope /> {user.email}
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
          </Row>
        )}
      </Page>
    </>
  );
};

export default Guests;
