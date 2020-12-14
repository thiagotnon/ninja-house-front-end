import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import Input from "../../components/forms/Input";
import validator from "../../validator/OrderValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import OrderTypeService from "../../services/OrderTypeService";
import swal from "sweetalert";

const OrderForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  function onSubmit(data) {
    OrderTypeService.create(data)
      .then((results) => {
        swal({
          icon: "success",
          text: "Registrado com sucesso",
        });
        props.history.push("/encomendas");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <>
      <Page title="Tipo de encomenda">
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={7}>
                <Form.Row>
                  <Input
                    label="Nome do tipo de encomenda"
                    name="name"
                    reference={reference}
                    size={4}
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
