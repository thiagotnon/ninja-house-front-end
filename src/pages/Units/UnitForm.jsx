import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Page from "../../components/Page";
import "../../styles/users.css";
import Input from "../../components/forms/Input";
import validator from "../../validator/UnitValidator";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import UnitsService from "../../services/UnitsService";

const UnitForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };
  const [dados, setDados] = React.useState({});

  React.useEffect(() => {
    const id = props.match.params.id;

    if (id) {
      UnitsService.get(id).then((results) => {
        setDados(results.data);
      });
    }
  }, [props]);
  function onSubmit(data) {
    const resultado = dados.id
      ? UnitsService.update(dados.id, data)
      : UnitsService.create(data);

    resultado
      .then((results) => {
        alert("Registrado com sucesso");
        props.history.push("/unidades");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  return (
    <>
      <Page title="Nova unidade">
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={3}>
                <Form.Row>
                  <Input
                    label="Unidade"
                    name="unit_number"
                    reference={reference}
                    size={12}
                    valor={dados.unit_number}
                  />
                  <Input
                    label="Bloco"
                    name="block"
                    reference={reference}
                    size={12}
                    valor={dados.block}
                  />
                  <Input
                    label="Andar"
                    name="floor"
                    reference={reference}
                    size={12}
                    valor={dados.floor}
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

export default UnitForm;
