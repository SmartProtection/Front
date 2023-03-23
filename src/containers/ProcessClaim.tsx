import { BigNumber } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import ClaimDetailsListProcess from "../components/ClaimDetailsListProcess";
import { useEffect, useState } from "react";
import { getClaimApplicationContract } from "../helpers/ContractManager";
import { getTxErrorReason } from "../helpers/Parser";
import { useParams } from "react-router-dom";

export interface ClaimApplication {
  policyHolder: string;
  amount: BigNumber;
  verified: Boolean;
  paid: Boolean;
}

const ProcessClaim = () => {
  const [hasApplication, setHasApplication] = useState<boolean>(false);

  const [claimApplication, setClaimApplication] = useState<ClaimApplication>({
    policyHolder: "",
    amount: BigNumber.from(0),
    verified: false,
    paid: false,
  });

  const { policyHolderAddress } = useParams();

  const getClaim = async () => {
    try {
      const claimApplicationContract = await getClaimApplicationContract();
      const claimApplication: ClaimApplication =
        await claimApplicationContract.getClaim(policyHolderAddress);
      console.log(claimApplication);
      setClaimApplication(claimApplication);
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Cannot receive details. ${errorReason}`);
    }
  };

  const hasClaimApplication = async () => {
    try {
      const claimApplicationContract = await getClaimApplicationContract();
      const hasApplication: boolean =
        await claimApplicationContract.hasClaimApplication(policyHolderAddress);
      console.log(hasApplication);
      setHasApplication(hasApplication);
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Cannot check claim availability. ${errorReason}`);
    }
  };

  useEffect(() => {
    hasClaimApplication();
  }, []);

  useEffect(() => {
    if (hasApplication) {
      getClaim();
    }
  }, [hasApplication]);

  return (
    <Container>
      <ClaimDetailsListProcess
        hasApplication={hasApplication}
        claimApplication={claimApplication}
      />
      <ToastContainer />
    </Container>
  );
};

export default ProcessClaim;
