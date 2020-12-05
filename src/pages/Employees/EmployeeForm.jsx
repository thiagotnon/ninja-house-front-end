import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import EmployeeService from "../../services/EmployeeService";
import Input from "../../components/forms/Input";
import validator from "../../validator/EmployeeValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import Select from "../../components/forms/Select";
import UsersService from "../../services/UsersService";

const EmployeeForm = (props) => {
  const [users, setUsers] = React.useState([]);

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  React.useEffect(() => {
    UsersService.getAll().then((results) => {
      setUsers(results.data.data);
      console.log(results.data.data);
    });
  }, []);

  function onSubmit(data) {
    EmployeeService.create(data)
      .then((results) => {
        console.log(results);
        alert("Funcionário cadastrado com sucesso!");
        props.history.push("/funcionarios");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  const periods = [
    { id: 1, period: "Diurno" },
    { id: 2, period: "Noturno" },
  ];
  return (
    <>
      <Page title="Novo Funcionário">
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Row>
                  <Select
                    label="Usuário"
                    name="user_id"
                    data={users}
                    reference={reference}
                    descricao="username"
                    size={12}
                  />
                  <Select
                    label="Período"
                    name="period"
                    data={periods}
                    reference={reference}
                    descricao="period"
                    size={12}
                  />
                  <Input
                    label="Horário de entrada"
                    name="entry_time"
                    type="time"
                    reference={reference}
                  />
                  <Input
                    label="Horário de saída"
                    name="departure_time"
                    type="time"
                    reference={reference}
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

export default EmployeeForm;
