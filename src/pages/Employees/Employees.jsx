import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import {
  FaMobileAlt,
  FaRegEnvelope,
  FaUserEdit,
  FaUserPlus,
  FaUserTimes,
} from "react-icons/fa";
import Page from "../../components/Page";
import "../../styles/employee.css";
import EmployeeService from "../../services/EmployeeService";
import { formatPhoneNumber } from "../../helpers/functions";
import { Link } from "react-router-dom";
const Employees = () => {
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    EmployeeService.getAll().then((results) => {
      setEmployees(results.data.data);
    });
  }, []);

  function handleClick(id) {
    if (window.confirm("Deseja realmente excluir o registro?")) {
      EmployeeService.delete(id)
        .then(() => {
          EmployeeService.getAll().then((results) => {
            setEmployees(results.data.data);
          });
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }
  return (
    <>
      <Page
        title="Funcionários"
        custom_content={
          <Link
            to="/funcionario/novo"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
          >
            <FaUserPlus size={20} className="mr-2" />
            Adicionar Funcionário
          </Link>
        }
      >
        {employees.length === 0 ? (
          <Alert variant="secondary">
            Não existem funcionários registrados até o momento.
          </Alert>
        ) : (
          <>
            <Row>
              {employees.map((user) => (
                <Col md={4} key={user.employee.id} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Subtitle className="mb-0 text-muted user-name">
                        {user.employee.username}
                      </Card.Subtitle>
                      <hr />
                      <div className="box-contact d-flex align-items-center justify-content-between">
                        <div className="phone d-flex align-items-center">
                          <small className="text-success">
                            <FaMobileAlt />{" "}
                            {formatPhoneNumber(user.employee.phone)}
                          </small>
                        </div>
                        <div className="mail">
                          <small className="text-primary">
                            <FaRegEnvelope /> {user.employee.email}
                          </small>
                        </div>
                        <ButtonGroup>
                          <Button variant="outline-secondary">
                            <FaUserEdit size={20} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleClick(user.id)}
                          >
                            <FaUserTimes size={20} />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Page>
    </>
  );
};

export default Employees;
