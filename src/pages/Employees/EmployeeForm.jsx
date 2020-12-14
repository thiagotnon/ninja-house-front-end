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
import swal from "sweetalert";

const EmployeeForm = (props) => {
  const [users, setUsers] = React.useState([]);
  const [dados, setDados] = React.useState([]);

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  React.useEffect(() => {
    UsersService.getAll().then((results) => {
      setUsers(results.data.data);
    });
  }, []);

  React.useEffect(() => {
    const id = props.match.params.id;

    if (id) {
      EmployeeService.get(id).then((results) => {
        setDados(results.data);
      });
    }
  }, [props]);
  function onSubmit(data) {
    const resultado = dados.id
      ? EmployeeService.update(dados.id, data)
      : EmployeeService.create(data);

    resultado
      .then((results) => {
        if (results.data.error) {
          swal({
            icon: "error",
            text: results.data.error,
          });
        } else {
          swal({
            icon: "success",
            text: "Registrado com sucesso!",
          });
          props.history.push("/funcionarios");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  const periods = [
    { id: 1, period: "Diurno" },
    { id: 2, period: "Noturno" },
  ];
  console.log(dados);
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
                    valor={dados.user_id}
                  />
                  <Select
                    label="Período"
                    name="period"
                    data={periods}
                    reference={reference}
                    descricao="period"
                    size={12}
                    valor={dados.period}
                  />
                  <Input
                    label="Horário de entrada"
                    name="entry_time"
                    type="time"
                    reference={reference}
                    valor={dados.entry_time}
                  />
                  <Input
                    label="Horário de saída"
                    name="departure_time"
                    type="time"
                    reference={reference}
                    valor={dados.departure_time}
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
