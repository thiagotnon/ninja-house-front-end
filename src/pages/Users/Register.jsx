import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import "../../styles/users.css";
import { Link, withRouter } from "react-router-dom";
import UserLoginService from "../../services/UserLoginService";
import Input from "../../components/forms/Input";
import validator from "../../validator/UserValidator";
import registerImg from "../../assets/img/register.svg";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { FaArrowLeft } from "react-icons/fa";

const UserLogin = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  function onSubmit(data) {
    UserLoginService.create(data)
      .then((results) => {
        if (results.data.error) {
          swal({
            icon: "error",
            text: results.data.error,
          });
        } else {
          swal({
            icon: "success",
            text: "Usuário registrado com sucesso!",
          });
          props.history.push("/login");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <>
      <Container className="h-100  bg-light" fluid>
        <Row>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Row>
              <Col className="col-md-8 offset-md-3">
                <Form onSubmit={handleSubmit(onSubmit)} className="w-75">
                  <Card className="border-0 shadow-sm p-4">
                    <Card.Body>
                      <Form.Row>
                        <h3 className="text-primary font-weight-bold mb-4">
                          Novo usuário
                        </h3>
                        <Input
                          label="Nome completo"
                          name="username"
                          reference={reference}
                          size={12}
                        />
                        <Input
                          label="E-mail"
                          name="email"
                          type="email"
                          reference={reference}
                          size={6}
                        />
                        <Input
                          label="Telefone"
                          name="phone"
                          reference={reference}
                          size={6}
                          mask={["(99) 9999-9999", "(99) 99999-9999"]}
                        />
                        <Input
                          label="RG"
                          name="rg"
                          reference={reference}
                          size={4}
                        />
                        <Input
                          label="CPF"
                          name="cpf"
                          reference={reference}
                          size={8}
                          mask="999.999.999-99"
                        />

                        <Input
                          label="Senha"
                          name="password"
                          type="password"
                          reference={reference}
                          size={12}
                        />

                        <Button variant="primary" type="submit">
                          Cadastrar
                        </Button>
                      </Form.Row>
                    </Card.Body>
                  </Card>
                  <div className="text-center mt-4">
                    <Link to="/login" className="btn btn-white text-primary">
                      <FaArrowLeft />
                      Voltar
                    </Link>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="bg-white">
            <Image src={registerImg} alt="Ninja House" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(UserLogin);
