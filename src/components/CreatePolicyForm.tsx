import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

interface CreatePolicyFormProps {
  onCreatePolicy: (age: number, sex: boolean, baseTermsNumber: number) => void;
}

const CreatePolicyForm: React.FC<CreatePolicyFormProps> = ({
  onCreatePolicy,
}) => {
  const [age, setAge] = useState<number>(18);
  const [sex, setSex] = useState<boolean>(true);
  const [baseTermsNumber, setBaseTermsNumber] = useState<number>(1);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreatePolicy(age, sex, baseTermsNumber);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="formAge">
        <Form.Label column sm={3}>
          Age
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formSex">
        <Form.Label column sm={3}>
          Sex
        </Form.Label>
        <Col sm={9}>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={sex ? "Male" : "Female"}
            checked={sex}
            onChange={() => setSex(!sex)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBaseTermsNumber">
        <Form.Label column sm={3}>
          Base Terms Number
        </Form.Label>
        <Col sm={9}>
          <Form.Control
            type="number"
            value={baseTermsNumber}
            onChange={(e) => setBaseTermsNumber(Number(e.target.value))}
          />
        </Col>
      </Form.Group>

      <div className="text-center mt-4">
        <Button variant="primary" type="submit">
          Create Policy
        </Button>
      </div>
    </Form>
  );
};

export default CreatePolicyForm;
