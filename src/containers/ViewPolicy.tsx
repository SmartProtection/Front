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

const ViewPolicy = () => {
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

  useEffect(() => {
    getPolicyDetails();
  }, []);

  return (
    <Container>
      <PolicyDetailsList policyDetails={policyDetails} />
      <ToastContainer />
    </Container>
  );
};

export default ViewPolicy;
