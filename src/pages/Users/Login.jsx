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
import { login } from "../../services/auth";
import logoImg from "../../assets/img/logo.svg";
import splashImg from "../../assets/img/splash.svg";
import UsersService from "../../services/UsersService";
import { useForm } from "react-hook-form";

const UserLogin = (props) => {
  const [user, setUser] = React.useState({});
  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  function onSubmit(data) {
    const { email } = data;
    const result = user.find((u) => u.email === email);
    const finalName = result.username.split(" ");

    window.localStorage.setItem("username", finalName[0]);

    UserLoginService.login(data)
      .then((results) => {
        login(results.data.token);
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  React.useEffect(() => {
    UsersService.getAll().then((results) => {
      setUser(results.data.data);
    });
  }, []);

  return (
    <>
      <Container className="h-100  bg-light" fluid>
        <Row>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            <Form onSubmit={handleSubmit(onSubmit)} className="w-50">
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
                <Link to="/cadastrar" className="btn btn-white text-primary">
                  Novo cadastro
                </Link>
              </div>
            </Form>
          </Col>
          <Col md={6} className="bg-white">
            <Image src={splashImg} alt="Ninja House" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(UserLogin);
