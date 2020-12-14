import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import Input from "../../components/forms/Input";
import validator from "../../validator/OrderValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import UnitsService from "../../services/UnitsService";
import GuestService from "../../services/GuestService";
import swal from "sweetalert";

const GuestForm = (props) => {
  const [units, setUnits] = React.useState([]);
  const [dados, setDados] = React.useState({});

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  React.useEffect(() => {
    const id = props.match.params.id;

    if (id) {
      GuestService.get(id).then((results) => {
        setDados(results.data);
      });
    }
  }, [props]);
  function onSubmit(data) {
    const resultado = dados.id
      ? GuestService.update(dados.id, data)
      : GuestService.create(data);

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
          props.history.push("/hospedes");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  React.useEffect(() => {
    UnitsService.getAll().then((results) => {
      setUnits(results.data.data);
    });
  }, []);
  return (
    <>
      <Page title="Novo hospede">
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={7}>
                <Form.Row>
                  <Input
                    label="Nome completo"
                    name="name"
                    reference={reference}
                    size={11}
                    valor={dados.name}
                  />
                  <Input
                    label="RG"
                    name="rg"
                    reference={reference}
                    size={3}
                    valor={dados.rg}
                  />
                  <Input
                    label="CPF"
                    name="cpf"
                    reference={reference}
                    size={4}
                    mask="999.999.999-99"
                    valor={dados.cpf}
                  />

                  <Form.Group as={Col} md={4} controlId="apartment_id">
                    <Form.Label>
                      Unidades <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      ref={register(validator.unit)}
                      isInvalid={errors.unit}
                      name="apartment_id"
                    >
                      <option>Selecione</option>
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
                  <Input
                    label="Data de entrada"
                    name="entry_date"
                    type="date"
                    reference={reference}
                    size={4}
                    valor={dados.entry_date}
                  />
                  <Input
                    label="Data de saída"
                    name="departure_date"
                    type="date"
                    reference={reference}
                    size={4}
                    valor={dados.departure_date}
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

export default GuestForm;
