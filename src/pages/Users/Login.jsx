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
import { Link, withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaRegIdCard } from "react-icons/fa";

import { login } from "../../services/auth";
import UserLoginService from "../../services/UserLoginService";
import validator from "../../validator/UserValidator";
import loginImg from "../../assets/img/login.svg";
import Input from "../../components/forms/Input";
import swal from "sweetalert";

import "../../styles/users.css";
const UserLogin = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  function onSubmit(data) {
    UserLoginService.login(data)
      .then((results) => {
        if (results.data.error) {
          swal({
            icon: "error",
            text: results.data.error,
          });
        } else {
          swal({
            icon: "success",
            text: "Login efetuado  com sucesso!",
          });
          login(results.data.token);
          localStorage.setItem("username", results.data.username);
          props.history.push("/");
        }
      })
      .catch((error) => {
        console.log(error.response);
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
              <Col className="col-md-6 offset-md-3">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Card className="border-0 shadow-sm p-4">
                    {/* <Image src={logoImg} alt="Ninja House" width={120} /> */}
                    <Card.Body>
                      <Form.Row>
                        <h3 className="text-primary font-weight-bold mb-4">
                          Login
                        </h3>
                        <Input
                          label="E-mail"
                          name="email"
                          type="email"
                          reference={reference}
                          size={12}
                        />
                        <Input
                          label="Senha"
                          name="password"
                          type="password"
                          reference={reference}
                          size={12}
                        />

                        <Button variant="primary" type="submit">
                          Entrar
                        </Button>
                      </Form.Row>
                    </Card.Body>
                  </Card>
                  <div className="text-center mt-4">
                    <Link
                      to="/cadastrar"
                      className="btn btn-white text-primary"
                    >
                      <FaRegIdCard suze={20} /> Novo cadastro
                    </Link>
                  </div>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="bg-white">
            <Image src={loginImg} alt="Ninja House" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(UserLogin);
