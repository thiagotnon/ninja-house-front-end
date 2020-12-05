import React from "react";
import { Col, Container, Jumbotron } from "react-bootstrap";

import "../styles/jumbotron.css";

const Units = (props) => {
  return (
    <>
      <Jumbotron>
        <Container className="d-flex align-items-center justify-content-between">
          <Col md={6}>
            <h1>{props.title}</h1>
          </Col>
          <Col md={6} className="position-relative">
            {props.children}
          </Col>
        </Container>
      </Jumbotron>
    </>
  );
};

export default Units;
