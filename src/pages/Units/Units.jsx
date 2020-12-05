import React from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Col,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import UnitsService from "../../services/UnitsService";
import "../../styles/units.css";
import { Link } from "react-router-dom";
import { padLeadingZeros } from "../../helpers/functions";
import Page from "../../components/Page";
import { FaSearch, FaUserEdit, FaUserPlus, FaUserTimes } from "react-icons/fa";

const Units = (props) => {
  const [units, setUnits] = React.useState([]);

  React.useEffect(() => {
    UnitsService.getAll().then((results) => {
      setUnits(results.data.data);
    });
  }, []);
  const search = (event) => {
    const search = event.target.value;
    if (search.length > 0) {
      UnitsService.get(`?unit_number=${search}`).then((results) => {
        setUnits(results.data.data);
      });
    } else {
      UnitsService.getAll().then((results) => {
        setUnits(results.data.data);
      });
    }
  };
  function handleClick(id) {
    if (window.confirm("Deseja realmente excluir o registro?")) {
      UnitsService.delete(id)
        .then(() => {
          UnitsService.getAll().then((results) => {
            setUnits(results.data.data);
            props.history.push("/unidades");
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
        title="Unidades"
        custom_content={
          <>
            <div className="d-flex align-items-center justify-content-end">
              <InputGroup className="w-50 mr-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type="text"
                  placeholder="Pesquisar unidade"
                  onChange={search}
                />
              </InputGroup>

              <Link
                to="/unidade/nova"
                className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
              >
                <FaUserPlus size={20} className="mr-2" />
                Nova unidade
              </Link>
            </div>
          </>
        }
      >
        {units.length === 0 ? (
          <>
            <Alert variant="secondary">Sem registro atualmente.</Alert>
          </>
        ) : (
          <Row className="units">
            <>
              {units.map((unit) => (
                <Col md={3} className="mb-3" key={unit.id}>
                  <Link to={`unidade/${unit.id}`}>
                    <Card className="bborder-0">
                      <Card.Body className="d-flex -align-items-center justify-content-between">
                        <span>
                          <small>Nº unidade</small>
                          <h5 className="display-4 mb-0 font-weight-bold">
                            {padLeadingZeros(unit.unit_number, 3)}
                          </h5>
                        </span>
                        <span>
                          <small>Bloco</small>
                          <h5 className="display-4 mb-0 font-weight-bold">
                            {unit.block}
                          </h5>
                        </span>
                        <span>
                          <small>Andar</small>
                          <h5 className="display-4 mb-0 font-weight-bold">
                            {unit.floor}º
                          </h5>
                        </span>
                      </Card.Body>
                      <ButtonGroup>
                        <Link
                          className="btn btn-outline-secondary"
                          to={`/unidade/${unit.id}/editar`}
                        >
                          <FaUserEdit size={20} />
                        </Link>

                        <Button
                          variant="outline-danger"
                          onClick={() => handleClick(unit.id)}
                        >
                          <FaUserTimes size={20} />
                        </Button>
                      </ButtonGroup>
                    </Card>
                  </Link>
                </Col>
              ))}
            </>
          </Row>
        )}
      </Page>
    </>
  );
};

export default Units;
