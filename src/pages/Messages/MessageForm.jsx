import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import MessageService from "../../services/MessageService";
import Input from "../../components/forms/Input";
import Textarea from "../../components/forms/Textarea";
import validator from "../../validator/MessageValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import swal from "sweetalert";

const MessageForm = (props) => {
  const [dados, setDados] = React.useState({});

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  React.useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      MessageService.get(id).then((results) => {
        setDados(results.data);
      });
    }
  }, [props]);

  function onSubmit(data) {
    const resultado = dados.id
      ? MessageService.update(dados.id, data)
      : MessageService.create(data);

    resultado
      .then((results) => {
        swal({
          icon: "success",
          text: "Registrado com sucesso",
        });
        props.history.push("/mensagens");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  return (
    <>
      <Page
        title="Nova Mensagem
      "
      >
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Row>
                  <Input
                    label="Título da mensagem"
                    name="title"
                    reference={reference}
                    size={12}
                    valor={dados.title}
                  />
                  <Textarea
                    label="Mensagem"
                    name="message"
                    reference={reference}
                    rows={6}
                    valor={dados.message}
                  />
                </Form.Row>
              </Col>
            </Row>
            <Button variant="success" type="submit">
              <FaSave /> Cadastrar
            </Button>
          </Form>
        </Container>
      </Page>
    </>
  );
};

export default MessageForm;
