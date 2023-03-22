import { BigNumber } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import PolicyDetailsList from "../components/PolicyDetailsList";
import { useEffect, useState } from "react";
import { getProvider } from "../helpers/Connection";
import { getPolicyContract } from "../helpers/ContractManager";
import { getTxErrorReason } from "../helpers/Parser";

export interface PolicyDetails {
  policyNumber: BigNumber;
  startDate: BigNumber;
  endDate: BigNumber;
  premiumAmount: BigNumber;
  policyLimit: BigNumber;
  deductible: BigNumber;
  policyTerm: BigNumber;
  paymentPeriod: BigNumber;
}

export interface PolicyPayments {
  policyNumber: BigNumber;
  nextDeadline: BigNumber;
  paidPeriods: BigNumber;
}

const ViewPolicy = () => {
  const [hasPolicy, setHasPolicy] = useState<boolean>(false);

  const [policyDetails, setPolicyDetails] = useState<PolicyDetails>({
    policyNumber: BigNumber.from(0),
    startDate: BigNumber.from(0),
    endDate: BigNumber.from(0),
    premiumAmount: BigNumber.from(0),
    policyLimit: BigNumber.from(0),
    deductible: BigNumber.from(0),
    policyTerm: BigNumber.from(0),
    paymentPeriod: BigNumber.from(0),
  });

  const [policyPayments, setPolicyPayments] = useState<PolicyPayments>({
    policyNumber: BigNumber.from(0),
    nextDeadline: BigNumber.from(0),
    paidPeriods: BigNumber.from(0),
  });

  const getPolicyDetails = async () => {
    try {
      const policyContract = await getPolicyContract();
      const accounts = await getProvider().listAccounts();
      const policyDetails: PolicyDetails =
        await policyContract.getPolicyDetails(accounts[0]);
      console.log(policyDetails);
      setPolicyDetails(policyDetails);
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Cannot receive details. ${errorReason}`);
    }
  };

  const getPolicyPayments = async () => {
    try {
      const policyContract = await getPolicyContract();
      const accounts = await getProvider().listAccounts();
      const policyPayments: PolicyPayments =
        await policyContract.getPolicyPayments(accounts[0]);
      console.log(policyPayments);
      setPolicyPayments(policyPayments);
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Cannot receive details. ${errorReason}`);
    }
  };

  const isPolicyHolder = async () => {
    try {
      const policyContract = await getPolicyContract();
      const accounts = await getProvider().listAccounts();
      const hasPolicy: boolean = await policyContract.isPolicyHolder(
        accounts[0]
      );
      console.log(hasPolicy);
      setHasPolicy(hasPolicy);
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Cannot check policy availability. ${errorReason}`);
    }
  };

  useEffect(() => {
    isPolicyHolder();
    console.log("check policy holder");
  }, []);

  useEffect(() => {
    getPolicyDetails();
    getPolicyPayments();
    console.log(hasPolicy);
    console.log("check policy details");
  }, [hasPolicy]);

  return (
    <Container>
      <PolicyDetailsList
        isPolicyHolder={hasPolicy}
        policyDetails={policyDetails}
        policyPayments={policyPayments}
      />
      <ToastContainer />
    </Container>
  );
};

export default ViewPolicy;
