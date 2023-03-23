import { Container, Row, Col, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getClaimApplicationContract } from "../helpers/ContractManager";
import { getTxErrorReason } from "../helpers/Parser";
import { ViewClaimDetails } from "./ClaimDetailsList";

const rejectClaim = async (policyHolder: string) => {
  try {
    const claimApplicationContract = await getClaimApplicationContract();
    const txResult = await claimApplicationContract.rejectClaim(policyHolder);
    console.log("Tx response:", txResult.toString());
    toast.success("Claim application was rejected");
  } catch (error: any) {
    const errorReason = getTxErrorReason(error.message);
    console.log(`Error: ${error.message}`);
    toast.error(`Cannot reject application. ${errorReason}`);
  }
};

const verifyClaim = async (policyHolder: string) => {
  try {
    const claimApplicationContract = await getClaimApplicationContract();
    const txResult = await claimApplicationContract.verifyClaim(policyHolder);
    console.log("Tx response:", txResult.toString());
    toast.success("Claim application was verified");
  } catch (error: any) {
    const errorReason = getTxErrorReason(error.message);
    console.log(`Error: ${error.message}`);
    toast.error(`Cannot verify application. ${errorReason}`);
  }
};

const payClaim = async (policyHolder: string) => {
  try {
    const claimApplicationContract = await getClaimApplicationContract();
    const txResult = await claimApplicationContract.payClaim(policyHolder);
    console.log("Tx response:", txResult.toString());
    toast.success("Claim application was payed");
  } catch (error: any) {
    const errorReason = getTxErrorReason(error.message);
    console.log(`Error: ${error.message}`);
    toast.error(`Cannot pay claim. ${errorReason}`);
  }
};

const ClaimDetailsListProcess = (props: any) => {
  const { hasApplication, claimApplication } = props;

  if (hasApplication) {
    return (
      <Container>
        <Row>
          <ViewClaimDetails claimApplication={claimApplication} />
        </Row>
        <Row className="justify-content-center">
          <Col md={2}>
            <Button
              variant="danger"
              onClick={() => rejectClaim(claimApplication.policyHolder)}
              disabled={claimApplication.verified}
            >
              Reject claim
            </Button>
          </Col>
          <Col md={2}>
            <Button
              onClick={() => verifyClaim(claimApplication.policyHolder)}
              disabled={claimApplication.verified}
            >
              Verify claim
            </Button>
          </Col>
          <Col md={2}>
            <Button
              variant="success"
              onClick={() => payClaim(claimApplication.policyHolder)}
              disabled={!claimApplication.verified}
            >
              Pay claim
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <h1>Selected account doesn't have any claims</h1>
      <Row>
        <Nav.Link as={Link} to="/claim/view-all">
          Find existed claims
        </Nav.Link>
      </Row>
    </Container>
  );
};

export default ClaimDetailsListProcess;
