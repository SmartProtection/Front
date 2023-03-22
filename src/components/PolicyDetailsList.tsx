import { Container, Row, Col, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PolicyDetails } from "../containers/ViewPolicy";
import { getPolicyContract } from "../helpers/ContractManager";
import { getTxErrorReason } from "../helpers/Parser";

const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleString();

const ViewPolicyDetails = (props: any) => {
  const { policyDetails } = props;

  return (
    <Container>
      <Row>
        <Col>Policy details</Col>
      </Row>
      <Row>
        <Col>Policy Number:</Col>
        <Col>{policyDetails.policyNumber.toString()}</Col>
      </Row>
      <Row>
        <Col>Start Date:</Col>
        <Col>{formatDate(policyDetails.startDate.toString())}</Col>
      </Row>
      <Row>
        <Col>End Date:</Col>
        <Col>{formatDate(policyDetails.endDate.toString())}</Col>
      </Row>
      <Row>
        <Col>Premium Amount:</Col>
        <Col>{policyDetails.premiumAmount.toString()}</Col>
      </Row>
      <Row>
        <Col>Policy Limit:</Col>
        <Col>{policyDetails.policyLimit.toString()}</Col>
      </Row>
      <Row>
        <Col>Deductible:</Col>
        <Col>{policyDetails.deductible.toString()}</Col>
      </Row>
      <Row>
        <Col>Policy Term:</Col>
        <Col>{policyDetails.policyTerm.toString()}</Col>
      </Row>
      <Row>
        <Col>Payment Period:</Col>
        <Col>{policyDetails.paymentPeriod.toString()}</Col>
      </Row>
    </Container>
  );
};

const ViewPolicyPayments = (props: any) => {
  const { policyPayments } = props;

  const isDeadlineOkay =
    new Date(policyPayments.nextDeadline * 1000) >= new Date();
  console.log(isDeadlineOkay);

  return (
    <Container>
      <Row>
        <Col>Policy payment details</Col>
      </Row>
      <Row>
        <Col>Next Payment deadline:</Col>
        <Col style={{ color: isDeadlineOkay ? "green" : "red" }}>
          {formatDate(policyPayments.nextDeadline.toString())}
        </Col>
      </Row>
      <Row>
        <Col>Paid periods:</Col>
        <Col>{policyPayments.paidPeriods.toString()}</Col>
      </Row>
    </Container>
  );
};

const payPremium = async (policyDetails: PolicyDetails) => {
  try {
    const policyContract = await getPolicyContract();
    const policyPremium = policyDetails.premiumAmount;
    const txResult = await policyContract.makePayment({
      value: policyPremium,
    });
    console.log("Tx response:", txResult.toString());
    toast.success("Policy premium is paid");
  } catch (error: any) {
    const errorReason = getTxErrorReason(error.message);
    console.log(`Error: ${error.message}`);
    toast.error(`Cannot check policy availability. ${errorReason}`);
  }
};

const PolicyDetailsList = (props: any) => {
  const { isPolicyHolder, policyDetails, policyPayments } = props;

  const navigate = useNavigate();
  const redirectToNewClaim = () => {
    let path = "/claim/new";
    navigate(path);
  };

  if (isPolicyHolder) {
    return (
      <Container>
        <Row className="my-3">
          <ViewPolicyDetails policyDetails={policyDetails} />
        </Row>
        <Row className="my-3">
          <ViewPolicyPayments policyPayments={policyPayments} />
        </Row>
        <Row className="my-3 justify-content-center">
          <Col md={3} className="d-flex justify-content-end">
            <Button onClick={() => payPremium(policyDetails)}>
              Pay premium
            </Button>
          </Col>
          <Col md={3} className="d-flex justify-content-start">
            <Button variant="secondary" onClick={redirectToNewClaim}>
              Create Claim Application
            </Button>
          </Col>
        </Row>
      </Container>
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

export default PolicyDetailsList;
