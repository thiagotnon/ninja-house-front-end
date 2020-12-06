import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaBuilding,
  FaEnvelope,
  FaHome,
  FaRegCalendarCheck,
  FaShippingFast,
  FaUser,
  FaUserCheck,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";

import "../styles/sidebar.css";
const Sidebar = (props) => {
  return (
    <>
      <Nav className="flex-column d-md-block pt-3">
        <LinkContainer to="/">
          <Nav.Item className="nav-link">
            <FaHome className="mr-1" />
            Início
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/unidades">
          <Nav.Item className="nav-link">
            <FaBuilding className="mr-1" />
            Unidades
          </Nav.Item>
        </LinkContainer>

        <LinkContainer to="/mensagens">
          <Nav.Item className="nav-link">
            <FaEnvelope className="mr-1" />
            Mensagens
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/encomendas">
          <Nav.Item className="nav-link">
            <FaShippingFast className="mr-1" />
            Encomendas
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/espacos-de-lazer">
          <Nav.Item className="nav-link">
            <FaRegCalendarCheck className="mr-1" />
            Espaços de lazer
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/moradores">
          <Nav.Item className="nav-link">
            <FaUserFriends className="mr-1" />
            Moradores
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/hospedes">
          <Nav.Item className="nav-link">
            <FaUserCheck className="mr-1" />
            Hóspedes
          </Nav.Item>
        </LinkContainer>

        <LinkContainer to="/funcionarios">
          <Nav.Item className="nav-link">
            <FaUsers className="mr-1" />
            Funcionários
          </Nav.Item>
        </LinkContainer>
        <LinkContainer to="/usuarios">
          <Nav.Item className="nav-link">
            <FaUser className="mr-1" />
            Usuários
          </Nav.Item>
        </LinkContainer>
      </Nav>
    </>
  );
};

export default Sidebar;
