import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { encryptMessage, getEncryptionPublicKey } from "../helpers/Crypto";

interface CreatePolicyFormProps {
  onSubmitClaim: (claimAmount: number, encryptedProof: string) => void;
  hasPolicy: boolean;
}

const CreateClaimForm: React.FC<CreatePolicyFormProps> = ({
  onSubmitClaim,
  hasPolicy,
}) => {
  const [claimAmount, setClaimAmount] = useState<number>(0);
  const [proof, setProof] = useState<string>("");
  const [encryptedProof, setEncryptedProof] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitClaim(claimAmount, encryptedProof);
  };

  useEffect(() => {
    if (proof.length !== 0) {
      const encryptedMessage = encryptMessage(proof);
      setEncryptedProof(encryptedMessage);
    }
  }, [proof]);

  if (hasPolicy) {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} controlId="formClaimAmount">
          <Form.Label column sm={3}>
            Claim amount
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              value={claimAmount}
              onChange={(e) => setClaimAmount(Number(e.target.value))}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formProof">
          <Form.Label column sm={3}>
            Proof
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              value={proof}
              onChange={(e) => setProof(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formEncryptedProof">
          <Form.Label column sm={3}>
            Encrypted Proof
          </Form.Label>
          <Col sm={9}>
            <Form.Control as="textarea" value={encryptedProof} disabled />
          </Col>
        </Form.Group>
        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Submit claim
          </Button>
        </div>
      </Form>
    );
  }
  return (
    <Container>
      <h1>You don't have any policy</h1>
      <Row>
        <Nav.Link as={Link} to="/policy/new">
          Create New Policy
        </Nav.Link>
      </Row>
    </Container>
  );
};

export default CreateClaimForm;
