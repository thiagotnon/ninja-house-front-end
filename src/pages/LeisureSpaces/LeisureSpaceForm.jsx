import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Page from "../../components/Page";
import "../../styles/users.css";
import Input from "../../components/forms/Input";
import validator from "../../validator/UnitValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import Textarea from "../../components/forms/Textarea";
import Select from "../../components/forms/Select";
import LeisureService from "../../services/LeisureService";

const LeizureSpaceForm = (props) => {
  const [image, setImage] = React.useState("");

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  function onSubmit(data) {
    LeisureService.create(data)
      .then((results) => {
        const formData = new FormData();
        console.log("imagefile: " + data.imageInput);
        for (let i = 0; i < data.imageInput.length; i++) {
          formData.append("image", data.imageInput[i]);
        }
        LeisureService.createImg(results.data.id, formData).then((results) => {
          alert("Espaço de lazer cadastrado com sucesso!");
          props.history.push("/espacos-de-lazer");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleChange(event) {
    setImage(event.target.files[0]);
  }

  const availability = [
    { id: 1, status: true, description: "Disponível" },
    { id: 2, status: false, description: "Indisponível" },
  ];

  return (
    <>
      <Page title="Nova espaço de lazer">
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Row>
              <Col md={8}>
                <Form.Row>
                  <Input
                    label="Selecione uma imagem"
                    type="file"
                    name="imageInput"
                    reference={reference}
                    size={12}
                    onChange={handleChange}
                    multiple
                  />
                  <Input
                    label="Nome do espaço"
                    name="name"
                    reference={reference}
                    size={10}
                  />
                  <Input
                    label="Capacidade"
                    name="capacity"
                    type="number"
                    reference={reference}
                    size={2}
                  />
                  <Input
                    label="Valor da Taxa"
                    name="rate"
                    type="number"
                    reference={reference}
                    size={3}
                  />

                  <Input
                    label="Hora de início"
                    type="time"
                    name="start_time"
                    reference={reference}
                    size={3}
                  />
                  <Input
                    label="Hora do término"
                    type="time"
                    name="end_time"
                    reference={reference}
                    size={3}
                  />
                  <Select
                    label="Disponibilidade"
                    name="availability"
                    data={availability}
                    reference={reference}
                    descricao="description"
                    chave="status"
                    size={3}
                  />
                  <Textarea
                    label="Regras de utilização"
                    name="usage_rules"
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

export default LeizureSpaceForm;
