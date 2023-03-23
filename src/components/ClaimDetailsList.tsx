import { Container, Row, Col, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ClaimApplication } from "../containers/ViewClaim";

export const ViewClaimDetails = (props: any) => {
  const { claimApplication } = props;

  return (
    <Container>
      <Row>
        <Col>Claim details</Col>
      </Row>
      <Row>
        <Col>Policy holder:</Col>
        <Col>{claimApplication.policyHolder.toString()}</Col>
      </Row>
      <Row>
        <Col>Claim proof:</Col>
        <Col>{claimApplication.proof.toString().substr(0, 25)}...</Col>
      </Row>
      <Row>
        <Col>Claim amount:</Col>
        <Col>{claimApplication.amount.toString()}</Col>
      </Row>
      <Row>
        <Col>Is verified:</Col>
        <Col>{claimApplication.verified.toString()}</Col>
      </Row>
      <Row>
        <Col>Is paid:</Col>
        <Col>{claimApplication.paid.toString()}</Col>
      </Row>
    </Container>
  );
};

const ClaimDetailsList = (props: any) => {
  const { hasApplication, claimApplication } = props;

  if (hasApplication) {
    return (
      <Container>
        <ViewClaimDetails claimApplication={claimApplication} />
      </Container>
    );
  }
  return (
    <Container>
      <h1>You don't have any claims</h1>
      <Row>
        <Nav.Link as={Link} to="/claim/new">
          Create New Claim
        </Nav.Link>
      </Row>
    </Container>
  );
};

export default ClaimDetailsList;
