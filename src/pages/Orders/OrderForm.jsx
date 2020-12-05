import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import "../../styles/users.css";
import UsersService from "../../services/UsersService";
import Input from "../../components/forms/Input";
import validator from "../../validator/OrderValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import UnitsService from "../../services/UnitsService";
import Select from "../../components/forms/Select";
import OrderService from "../../services/OrderService";
import OrderTypeService from "../../services/OrderTypeService";
import Textarea from "../../components/forms/Textarea";

const OrderForm = (props) => {
  const [units, setUnits] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [orderTypes, setOrderTypes] = React.useState([]);

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  function onSubmit(data) {
    OrderService.create(data)
      .then((results) => {
        console.log(results);
        alert("Encomenda cadastrada com sucesso!");
        props.history.push("/encomendas");
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
    OrderTypeService.getAll().then((results) => {
      setOrderTypes(results.data.data);
    });
  }, []);

  return (
    <>
      <Page title="Nova Encomenda">
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={7}>
                <Form.Row>
                  <Input
                    label="Cód. de rastreio"
                    name="tracking"
                    reference={reference}
                    size={3}
                  />
                  <Input
                    label="Destinatário"
                    name="recipient"
                    reference={reference}
                    size={6}
                  />
                  <Input
                    label="Transportadora"
                    name="sender"
                    reference={reference}
                    size={3}
                  />
                  <Form.Group as={Col} md={3} controlId="apartment_id">
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
                  <Select
                    label="Tipo de encomenta"
                    name="order_type_id"
                    reference={reference}
                    descricao="name"
                    chave="id"
                    data={orderTypes}
                    size={3}
                  />
                  <Select
                    label="Enc. registrada"
                    name="registered_order"
                    reference={reference}
                    descricao="description"
                    chave="status"
                    data={[
                      { id: 1, status: true, description: "Sim" },
                      { id: 2, status: false, description: "Não" },
                    ]}
                    size={3}
                  />
                  <Select
                    label="Situação"
                    name="delivery_status"
                    reference={reference}
                    descricao="description"
                    chave="status"
                    data={[
                      { id: 1, status: true, description: "Entregue" },
                      { id: 2, status: false, description: "Pendente" },
                    ]}
                    size={3}
                  />

                  <Textarea
                    label="Mensagem"
                    name="message"
                    reference={reference}
                    size={12}
                    rows={6}
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

export default OrderForm;
