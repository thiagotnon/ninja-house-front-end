import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";

import "../styles/page.css";

const Page = (props) => {
  return (
    <>
      <Container fluid className="pb-5 h-100">
        <Row className="h-100">
          <Col
            md={2}
            className="bg-light sidebar border-right flex-column d-flex justify-content-between"
          >
            <Sidebar />
          </Col>
          <Col md={10} className="scroll h-100">
            <div className="box-header mt-3">
              <div className="content-box-header d-flex align-items-center justify-content-between">
                <h3 className="mb-0">{props.title}</h3>
                {props.custom_content && <>{props.custom_content}</>}
              </div>
              <hr />
              {props.children}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
