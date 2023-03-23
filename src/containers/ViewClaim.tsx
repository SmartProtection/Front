import { BigNumber, ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import ClaimDetailsList from "../components/ClaimDetailsList";
import { useEffect, useState } from "react";
import { getProvider } from "../helpers/Connection";
import { getClaimApplicationContract } from "../helpers/ContractManager";
import { getTxErrorReason } from "../helpers/Parser";

export interface ClaimApplication {
  policyHolder: string;
  proof: string;
  amount: BigNumber;
  verified: Boolean;
  paid: Boolean;
}

const ViewClaim = () => {
  const [hasApplication, setHasApplication] = useState<boolean>(false);

  const [claimApplication, setClaimApplication] = useState<ClaimApplication>({
    policyHolder: "",
    proof: "",
    amount: BigNumber.from(0),
    verified: false,
    paid: false,
  });

  const getClaim = async () => {
    try {
      const claimApplicationContract = await getClaimApplicationContract();
      const accounts = await getProvider().listAccounts();
      const claimApplication: ClaimApplication =
        await claimApplicationContract.getClaim(accounts[0]);
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
      const accounts = await getProvider().listAccounts();
      const hasApplication: boolean =
        await claimApplicationContract.hasClaimApplication(
          ethers.utils.getAddress(accounts[0])
        );
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
      <ClaimDetailsList
        hasApplication={hasApplication}
        claimApplication={claimApplication}
      />
      <ToastContainer />
    </Container>
  );
};

export default ViewClaim;
