import React from "react";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { FaMobileAlt, FaRegEnvelope, FaUserTimes } from "react-icons/fa";
import Page from "../../components/Page";
import "../../styles/users.css";
import UsersService from "../../services/UsersService";
import { formatPhoneNumber } from "../../helpers/functions";
import swal from "sweetalert";

const Users = (props) => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    UsersService.getAll().then((results) => {
      setUsers(results.data.data);
    });
  }, []);

  function handleClick(id) {
    swal({
      title: "Você realmente deseja remover o usuário?",
      text: "Não será possível recupera-lo após a remoção.",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        UsersService.delete(id)
          .then(() => {
            UsersService.getAll().then((results) => {
              setUsers(results.data.data);
            });
          })
          .catch((error) => {
            swal({
              icon: "error",
              text: error.data.error,
            });
            console.log(error.response.data);
          });
        swal("Poof! O usuário foi removido com sucesso!", {
          icon: "success",
        });
      }
    });

    props.history.push("/usuarios");
  }
  return (
    <>
      <Page title="Usuários">
        {users.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem usuários cadastrados até o momento.
            </Alert>
          </>
        ) : (
          <Row className="pb-5">
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

                        <Button
                          variant="outline-danger"
                          onClick={() => handleClick(user.id)}
                        >
                          <FaUserTimes size={20} />
                        </Button>
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
