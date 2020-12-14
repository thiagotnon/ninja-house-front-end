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
import swal from "sweetalert";
const Employees = (props) => {
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    EmployeeService.getAll().then((results) => {
      setEmployees(results.data.data);
    });
  }, []);

  function handleClick(id) {
    swal({
      title: "Você realmente deseja remover esse(a) funcionário(a)?",
      text: "Não será possível recupera-lo(a) após a remoção.",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        EmployeeService.delete(id)
          .then(() => {
            EmployeeService.getAll().then((results) => {
              setEmployees(results.data.data);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
        swal("Poof! A funcionário(a) foi excluído(a) com sucesso!", {
          icon: "success",
        });
      }
    });

    props.history.push("/funcionarios");
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
                          <Link
                            to={`funcionario/${user.id}/editar`}
                            className="btn btn-outline-secondary"
                          >
                            <FaUserEdit size={20} />
                          </Link>
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
