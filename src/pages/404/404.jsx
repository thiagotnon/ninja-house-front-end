import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Erro404Img from "../../assets/img/404.svg";
import Page from "../../components/Page";

const Erro404 = () => {
  return (
    <Page title="Página não encontrada">
      <Container>
        <Row>
          <Col lg={8} className="offset-md-2 col-md-12">
            <Image src={Erro404Img} alt="Erro 404" fluid />
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default Erro404;
