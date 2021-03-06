import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import MessageService from "../../services/MessageService";
import "../../styles/dwellers.css";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { FaEdit, FaRegEnvelope, FaTimes } from "react-icons/fa";
import swal from "sweetalert";

const Messages = () => {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    MessageService.getAll().then((results) => {
      setMessages(results.data.data);
    });
  }, []);

  function handleClick(id) {
    swal({
      title: "Você realmente deseja remover essa mensagem?",
      text: "Não será possível recupera-la após a remoção.",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        MessageService.delete(id)
          .then(() => {
            MessageService.getAll().then((results) => {
              setMessages(results.data.data);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
        swal("Poof! Mensagem removida com sucesso.", {
          icon: "success",
        });
      }
    });
  }

  return (
    <>
      <Page
        title="Mensagens"
        custom_content={
          <Link
            to="/mensagem/nova"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
          >
            <FaRegEnvelope size={20} className="mr-2" />
            Nova mensagem
          </Link>
        }
      >
        {messages.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem mensagens cadastrados até o momento.
            </Alert>
          </>
        ) : (
          <>
            <Row>
              {messages.map((message) => (
                <Col md={6} key={message.id}>
                  <Card>
                    <Card.Body>
                      <div className="d-flex align-items-center justify-content-between">
                        <Card.Title className="mb-0 font-weight-bold">
                          {message.title}
                        </Card.Title>
                        <ButtonGroup>
                          <Link
                            className="btn btn-outline-secondary"
                            to={`/mensagem/${message.id}/editar`}
                          >
                            <FaEdit size={20} />
                          </Link>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleClick(message.id)}
                          >
                            <FaTimes size={20} />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <hr />
                      <Card.Text>{message.message}</Card.Text>
                    </Card.Body>
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

export default Messages;
