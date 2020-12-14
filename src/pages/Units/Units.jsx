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
import { FaBuilding, FaRegEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import swal from "sweetalert";

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
    swal({
      title: "Você realmente deseja remover essa unidade?",
      text: "Não será possível recupera-la após a remoção.",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        UnitsService.delete(id)
          .then(() => {
            UnitsService.getAll().then((results) => {
              setUnits(results.data.data);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
        swal("Poof! A unidade foi excluída com sucesso!", {
          icon: "success",
        });
      }
    });

    props.history.push("/unidades");
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
                <FaBuilding size={20} className="mr-2" />
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
                    </Card>
                  </Link>
                  <ButtonGroup className="btn-block">
                    <Link
                      className="btn btn-outline-secondary"
                      to={`/unidade/${unit.id}/editar`}
                    >
                      <FaRegEdit size={20} /> Editar
                    </Link>

                    <Button
                      variant="outline-danger"
                      onClick={() => handleClick(unit.id)}
                    >
                      <FaTrashAlt size={20} /> Remover
                    </Button>
                  </ButtonGroup>
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
