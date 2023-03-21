import { Container, Row, Col } from "react-bootstrap";

const PolicyDetailsList = (props: any) => {
  const { policyDetails } = props;

  const formatDate = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleString();

  return (
    <Container>
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

export default PolicyDetailsList;
