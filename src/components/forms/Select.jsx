import React from "react";
import { Form, Col } from "react-bootstrap";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const id = props.id ? props.id : props.name;

  const chave = props.chave ? props.chave : "id";
  const descricao = props.descricao ? props.descricao : "nome";

  const { errors, register, validator } = props.reference;
  const required = () =>
    validator[props.name]?.required ? (
      <span className="text-danger">*</span>
    ) : (
      ""
    );

  return (
    <>
      <Form.Group as={Col} controlId={id} md={props.size}>
        <Form.Label>
          {props.label}: {required()}
        </Form.Label>
        <Form.Control
          as="select"
          ref={register(validator[props.name])}
          {...props}
          isInvalid={errors[props.name]}
        >
          <option value="">Selecione</option>
          {props.data.map((item) => (
            <option key={item.id} value={item[chave]}>
              {item[descricao]}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors[props.name]?.message}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};
