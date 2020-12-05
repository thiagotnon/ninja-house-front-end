import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import "../../styles/users.css";
import MessageService from "../../services/MessageService";
import Input from "../../components/forms/Input";
import Textarea from "../../components/forms/Textarea";
import validator from "../../validator/MessageValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import UnitsService from "../../services/UnitsService";
import Select from "../../components/forms/Select";

const MessageForm = (props) => {
  const [units, setUnits] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  function onSubmit(data) {
    const { title, message, apartment_id } = data;
    if (apartment_id === "") {
      const finalData = { title, message, apartment_id: null };
      MessageService.create(finalData)
        .then((results) => {
          alert("Mensagem cadastrada com sucesso!");
          props.history.push("/moradores");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    } else {
      MessageService.create(data)
        .then((results) => {
          console.log(results);
          alert("Mensagem cadastrada com sucesso!");
          props.history.push("/moradores");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }

  React.useEffect(() => {
    UnitsService.getAll().then((results) => {
      setUnits(results.data.data);
    });
  }, []);

  const warns = [
    { id: 1, value: 0, description: "Aviso geral" },
    { id: 2, value: 1, description: "Aviso para unidade" },
  ];
  const handleChange = (event) => {
    if (+event.target.value === 2) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  console.log(units);
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
                  <Select
                    label="Aviso geral ou aviso para unidade"
                    name="warns"
                    data={warns}
                    chave="id"
                    descricao="description"
                    reference={reference}
                    size={12}
                    onChange={handleChange}
                  />

                  <Form.Group
                    as={Col}
                    md={12}
                    controlId="apartment_id"
                    className={show ? "d-block" : "d-none"}
                  >
                    <Form.Label>
                      Unidades <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      ref={register(validator.unit)}
                      isInvalid={errors.unit}
                      name="apartment_id"
                    >
                      <option value="">Selecione a Unidade</option>
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
                    label="Título da mensagem"
                    name="title"
                    reference={reference}
                    size={12}
                  />
                  <Textarea
                    label="Mensagem"
                    name="message"
                    reference={reference}
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

export default MessageForm;
