import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import {
  FaMobileAlt,
  FaRegEnvelope,
  FaUserEdit,
  FaUserPlus,
  FaUserTimes,
} from "react-icons/fa";
import Page from "../../components/Page";
import "../../styles/users.css";
import UsersService from "../../services/UsersService";
import { formatPhoneNumber } from "../../helpers/functions";
import { Link } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    UsersService.getAll().then((results) => {
      setUsers(results.data.data);
    });
  }, []);

  function handleClick(id) {
    if (window.confirm("Deseja realmente excluir o registro?")) {
      UsersService.delete(id)
        .then(() => {
          UsersService.getAll().then((results) => {
            setUsers(results.data.data);
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
        title="Usuários"
        custom_content={
          <Link
            to="/usuario/novo"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
          >
            <FaUserPlus size={20} className="mr-2" />
            Adicionar Usuário
          </Link>
        }
      >
        {users.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem usuários cadastrados até o momento.
            </Alert>
          </>
        ) : (
          <Row>
            <>
              {users.map((user) => (
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
                          <Link
                            className="btn btn-outline-secondary"
                            to={`/usuario/${user.id}/editar`}
                          >
                            <FaUserEdit size={20} />
                          </Link>
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
};

export default Users;
