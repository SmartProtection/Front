import { Container, Row, Col, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ClaimApplication } from "../containers/ViewClaim";

const ColoredLine = ({ color }: any) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);

const ViewClaims = (props: any) => {
  const { claimApplications } = props;

  const navigate = useNavigate();
  const redirectToClaimProcess = (address: string) => {
    let path = `/claim/process/${address}`;
    navigate(path);
  };

  const components = claimApplications.map(
    (claimApplication: ClaimApplication) => (
      <Container>
        <Row>
          <Col>Claim details</Col>
        </Row>
        <Row>
          <Col>Policy holder:</Col>
          <Col>{claimApplication.policyHolder.toString()}</Col>
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
        <Row md={3} className="justify-content-center">
          <Button
            onClick={() => {
              redirectToClaimProcess(claimApplication.policyHolder);
            }}
          >
            Process claim
          </Button>
        </Row>
        <ColoredLine color="black" />
      </Container>
    )
  );
  return <Container>{components}</Container>;
};

const ClaimList = (props: any) => {
  const { claimApplications } = props;

  if (claimApplications.length !== 0) {
    return (
      <Container>
        <ViewClaims claimApplications={claimApplications} />
      </Container>
    );
  }
  return (
    <Container>
      <h1>System doesn't have any claims</h1>
      <Row>
        <Nav.Link as={Link} to="/claim/new">
          Create New Claim
        </Nav.Link>
      </Row>
    </Container>
  );
};

export default ClaimList;
