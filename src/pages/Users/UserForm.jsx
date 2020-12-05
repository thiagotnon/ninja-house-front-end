import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import "../../styles/users.css";
import UsersService from "../../services/UsersService";
import Input from "../../components/forms/Input";
import validator from "../../validator/UserValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { withRouter } from "react-router-dom";

const UserForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  const [dados, setDados] = React.useState({});

  React.useEffect(() => {
    const id = props.match.params.id;

    if (id) {
      UsersService.get(id).then((results) => {
        setDados(results.data);
      });
    }
  }, [props]);

  function onSubmit(data) {
    const resultado = dados.id
      ? UsersService.update(dados.id, data)
      : UsersService.create(data);

    resultado
      .then((results) => {
        props.history.push("/alunos");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  return (
    <>
      <Page title="Novo Usuário">
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Row>
                  <Input
                    label="Nome"
                    name="username"
                    reference={reference}
                    size={12}
                    valor={dados.username}
                  />
                  <Input
                    label="E-mail"
                    type="email"
                    name="email"
                    reference={reference}
                    size={12}
                    valor={dados.email}
                  />
                  <Input
                    label="Telefone"
                    type="tel"
                    name="phone"
                    reference={reference}
                    size={6}
                    mask={["(99) 9999-9999", "(99) 99999-9999"]}
                    valor={dados.phone}
                  />
                  <Input
                    label="RG"
                    name="rg"
                    reference={reference}
                    valor={dados.rg}
                    size={6}
                  />
                  <Input
                    label="CPF"
                    name="cpf"
                    reference={reference}
                    size={6}
                    mask="999.999.999-99"
                    valor={dados.cpf}
                  />
                  <Input
                    label="Senha"
                    type="password"
                    name="password"
                    reference={reference}
                    size={6}
                    valor={dados.password}
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

export default withRouter(UserForm);
