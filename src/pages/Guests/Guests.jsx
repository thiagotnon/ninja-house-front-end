import React from "react";
import { Alert, Button, ButtonGroup, Card, Col, Row } from "react-bootstrap";
import GuestService from "../../services/GuestService";
import "../../styles/units.css";
import { Link } from "react-router-dom";
import Page from "../../components/Page";
import { FaRegEdit, FaUserPlus, FaUserTimes } from "react-icons/fa";
import { formatCpf, padLeadingZeros } from "../../helpers/functions";
import swal from "sweetalert";
import UnitsService from "../../services/UnitsService";

const Guests = (props) => {
  const [guests, setGuests] = React.useState([]);
  const [unit, setUnit] = React.useState([]);

  React.useEffect(() => {
    GuestService.getAll().then((results) => {
      setGuests(results.data.data);
    });
  }, []);

  React.useEffect(() => {
    UnitsService.get(guests.unit_number).then((results) => {
      setUnit(results.data);
    });
  }, [guests]);
  console.log(guests);
  function handleClick(id) {
    swal({
      title: "Você realmente deseja remover o hóspede?",
      text: "Não será possível recupera-la após a remoção.",
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        GuestService.delete(id)
          .then(() => {
            GuestService.getAll().then((results) => {
              setGuests(results.data.data);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
          });
        swal("Poof! O hóspede foi removido com sucesso!", {
          icon: "success",
        });
      }
    });

    props.history.push("/hospedes");
  }
  console.log(guests);
  return (
    <>
      <Page
        title="Hospedes"
        custom_content={
          <Link
            to="/hospede/novo"
            className="btn btn-outline-secondary d-flex align-items-center justify-content-between"
          >
            <FaUserPlus size={20} className="mr-2" />
            Adicionar Hospede
          </Link>
        }
      >
        {guests.length === 0 ? (
          <>
            <Alert variant="secondary">
              Não existem hospedes registrados até o momento.
            </Alert>
          </>
        ) : (
          <Row>
            {guests.map((guest) => (
              <Col md={4} key={guest.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="font-weight-bold">{guest.name}</h5>
                      <p>
                        <small>Apto.</small>
                        <br />{" "}
                        <strong>
                          {padLeadingZeros(guest.apartments.unit_number, 3)}
                        </strong>
                      </p>
                      <p>
                        <small>Bloco</small>
                        <br /> <strong>{guest.apartments.block}</strong>
                      </p>
                      <p>
                        <small>Andar</small>
                        <br /> <strong>{guest.apartments.floor}º</strong>
                      </p>
                    </div>
                    <hr />
                    <div className="box-contact d-flex align-items-center justify-content-between">
                      <div className="phone d-flex align-items-center">
                        <p>
                          <strong>RG: </strong> {guest.rg}
                        </p>
                      </div>
                      <div className="mail">
                        <p>
                          {" "}
                          <strong>CPF: </strong> {formatCpf(guest.cpf)}
                        </p>
                      </div>
                      <ButtonGroup>
                        <Link
                          className="btn btn-outline-secondary"
                          to={`/hospede/${guest.id}/editar`}
                        >
                          <FaRegEdit size={20} /> Editar
                        </Link>

                        <Button
                          variant="outline-danger"
                          onClick={() => handleClick(guest.id)}
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
        )}
      </Page>
    </>
  );
};

export default Guests;
