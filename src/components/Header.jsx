import React from "react";
import { Button, Image, Nav, Navbar } from "react-bootstrap";
import { FaRegIdCard, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { Link, withRouter } from "react-router-dom";
import swal from "sweetalert";
import logoImg from "../assets/img/logo.svg";
import { isAuthenticated, logout } from "../services/auth";

import "../styles/header.css";

const Header = (props) => {
  const logoutAction = () => {
    swal({
      title: "Deseja mesmo sair?",
      text:
        "Será necessário efetuar o login novamente para visualizar as informações do sistema.",
      icon: "warning",
      buttons: ["Não", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        logout();
        props.history.push("/login");
      }
    });
  };
  const LoggedNav = () =>
    isAuthenticated() ? (
      <>
        <Navbar bg="light" expand="lg" className="shadow-sm" sticky="top">
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image src={logoImg} alt="NinjaHouse" width={120} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Button variant="link" disabled className="text-dark">
                Olá, =
              </Button>
              <Button variant="outline-primary" onClick={logoutAction}>
                <FaSignOutAlt /> Sair
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    ) : (
      <>
        <Navbar bg="light" expand="lg" className="shadow-sm" sticky="top">
          <LinkContainer to="/login">
            <Navbar.Brand>
              <Image src={logoImg} alt="NinjaHouse" width={120} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link className="nav-link" to="/login">
                <FaSignInAlt /> Entrar
              </Link>
              <Link className="nav-link" to="/cadastrar">
                <FaRegIdCard /> Cadastrar
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );

  return <>{LoggedNav()}</>;
};

export default withRouter(Header);
