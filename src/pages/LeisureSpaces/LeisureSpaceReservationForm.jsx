import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Page from "../../components/Page";
import "../../styles/users.css";
import Input from "../../components/forms/Input";
import validator from "../../validator/LeisureValidator";
import { useForm } from "react-hook-form";
import { FaCalendarCheck, FaUserMinus, FaUserPlus } from "react-icons/fa";
import LeisureService from "../../services/LeisureService";
import UnitsService from "../../services/UnitsService";
import ReservationService from "../../services/ReservationService";
import ReservationGuestService from "../../services/ReservationGuestService";

const LeizureSpaceReservationForm = (props) => {
  const [units, setUnits] = React.useState([]);
  const [leisureSpace, setLeisureSpace] = React.useState({});
  const [guestList, setGuestList] = React.useState([
    { name: "", rg: "", cpf: "" },
  ]);

  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };
  React.useEffect(() => {
    const id = props.match.params.id;
    LeisureService.get(id).then((results) => {
      setLeisureSpace(results.data);
    });
    UnitsService.getAll().then((results) => {
      setUnits(results.data.data);
    });
  }, [props]);

  function onSubmit(data) {
    ReservationService.create(data)
      .then((results) => {
        console.log(results.data.id);
        addGuests(
          guestList.map((item) => {
            console.log({ ...item, reservation_id: results.data.id });
            return { ...item, reservation_id: results.data.id };
          })
        );
      })
      .catch((errors) => {
        console.log(errors);
      });
  }
  const addGuests = (guests) => {
    guests.forEach((item) =>
      ReservationGuestService.create(item)
        .then((results) => {
          console.log(results);
        })
        .catch((errors) => {
          console.log(errors);
        })
    );

    console.log(guests);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...guestList];
    list[index][name] = value;
    setGuestList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...guestList];
    list.splice(index, 1);
    setGuestList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setGuestList([...guestList, { name: "", rg: "", cpf: "" }]);
  };

  return (
    <>
      <Page title={`Reserva de ${leisureSpace.name}`}>
        <Container fluid>
          <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Row>
              <Col md={3} className="px-0">
                <Input
                  label="Data"
                  name="date"
                  type="date"
                  reference={reference}
                  size={12}
                />

                <Form.Group as={Col} md={12} controlId="apartment_id">
                  <Form.Label>
                    Unidades <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    ref={register(validator.unit)}
                    isInvalid={errors.unit}
                    name="apartment_id"
                  >
                    <option>Selecione a Unidade</option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        Bloco {unit.block} - Apto {unit.unit_number}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.apartment_id?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Input
                  name="leisure_space_id"
                  value={leisureSpace.id}
                  reference={reference}
                  hidden
                />
              </Col>
              <Col md={9}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Lista de convidados</Card.Title>
                    <hr />

                    {guestList.map((guest, i) => {
                      return (
                        <Form.Row key={i}>
                          <Input
                            name="name"
                            placeholder="Nome"
                            value={guest.name}
                            reference={reference}
                            onChange={(e) => handleInputChange(e, i)}
                            size={5}
                          />
                          <Input
                            name="rg"
                            placeholder="RG"
                            value={guest.rg}
                            reference={reference}
                            onChange={(e) => handleInputChange(e, i)}
                            size={3}
                          />
                          <Input
                            name="cpf"
                            placeholder="CPF"
                            mask="999.999.999-99"
                            value={guest.cpf}
                            reference={reference}
                            onChange={(e) => handleInputChange(e, i)}
                            size={3}
                          />

                          <ButtonGroup>
                            {guestList.length !== 1 && (
                              <Button
                                variant="outline-danger"
                                onClick={() => handleRemoveClick(i)}
                              >
                                <FaUserMinus /> Remover
                              </Button>
                            )}
                            {guestList.length - 1 === i && (
                              <Button
                                variant="outline-primary"
                                onClick={handleAddClick}
                              >
                                <FaUserPlus /> Adicionar
                              </Button>
                            )}
                          </ButtonGroup>
                        </Form.Row>
                      );
                    })}
                  </Card.Body>
                </Card>
                <Button variant="success" type="submit">
                  <FaCalendarCheck /> Reservar {leisureSpace.name}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Page>
    </>
  );
};

export default LeizureSpaceReservationForm;
