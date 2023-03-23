import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import CreateClaimForm from "../components/CreateClaimForm";
import {
  getClaimApplicationContract,
  getPolicyContract,
} from "../helpers/ContractManager";
import { getTxErrorReason } from "../helpers/Parser";
import { getProvider } from "../helpers/Connection";
import { PolicyDetails } from "./ViewPolicy";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";

const NewClaim: React.FC = () => {
  const [hasPolicy, setHasPolicy] = useState<boolean>(false);

  const [policyDeductible, setPolicyDeductible] = useState<BigNumber>(
    BigNumber.from(0)
  );

  const submitClaim = async (claimAmount: number, encryptedProof: string) => {
    try {
      const claimApplicationContract = await getClaimApplicationContract();
      const result = await claimApplicationContract.submitClaim(
        claimAmount,
        encryptedProof,
        {
          value: policyDeductible,
        }
      );
      console.log("Tx response:", result.toString());
      toast.success("Claim application created");
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Claim application wasn't created. ${errorReason}`);
    }
  };

  const getPolicyDeductible = async () => {
    try {
      const policyContract = await getPolicyContract();
      const accounts = await getProvider().listAccounts();
      const policyDetails: PolicyDetails =
        await policyContract.getPolicyDetails(accounts[0]);
      const policyDeductible = policyDetails.deductible;
      console.log(policyDetails);
      setPolicyDeductible(policyDeductible);
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Cannot receive deductible. ${errorReason}`);
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
  }, []);

  useEffect(() => {
    if (hasPolicy) {
      getPolicyDeductible();
    }
  }, [hasPolicy]);

  return (
    <Container>
      <CreateClaimForm hasPolicy={hasPolicy} onSubmitClaim={submitClaim} />
      <ToastContainer />
    </Container>
  );
};

export default NewClaim;
