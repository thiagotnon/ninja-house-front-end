import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import "../../styles/users.css";
import UsersService from "../../services/UsersService";
import validator from "../../validator/DwellerValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import UnitsService from "../../services/UnitsService";
import Select from "../../components/forms/Select";
import DwellerService from "../../services/DwellerService";
import swal from "sweetalert";

const DwellerForm = (props) => {
  const [units, setUnits] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [dados, setDados] = React.useState([]);

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };
  React.useEffect(() => {
    const id = props.match.params.id;

    if (id) {
      DwellerService.get(id).then((results) => {
        setDados(results.data);
      });
    }
  }, [props]);
  function onSubmit(data) {
    const resultado = dados.id
      ? DwellerService.update(dados.id, data)
      : DwellerService.create(data);

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
          props.history.push("/moradores");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  React.useEffect(() => {
    UnitsService.getAll().then((results) => {
      setUnits(results.data.data);
      console.log(results.data.data);
    });
    UsersService.getAll().then((results) => {
      setUsers(results.data.data);
    });
  }, []);
  return (
    <>
      <Page title="Novo Morador">
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
                  <Form.Group as={Col} md={12} controlId="apartment_id">
                    <Form.Label>
                      Unidades <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      ref={register(validator.unit)}
                      isInvalid={errors.unit}
                      name="apartment_id"
                    >
                      <option>Selecione a Unidade</option>
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          Bloco {unit.block} - Apto {unit.unit_number}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.apartment_id?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
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

export default DwellerForm;
