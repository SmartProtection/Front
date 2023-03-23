import { BigNumber } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import ClaimList from "../components/ClaimList";
import { useEffect, useState } from "react";
import { getClaimApplicationContract } from "../helpers/ContractManager";
import { getTxErrorReason } from "../helpers/Parser";

export interface ClaimApplication {
  policyHolder: string;
  amount: BigNumber;
  verified: Boolean;
  paid: Boolean;
}

const ViewClaims = () => {
  const [claimApplications, setClaimApplications] = useState<
    ClaimApplication[]
  >([]);

  const getClaims = async () => {
    try {
      const claimApplicationContract = await getClaimApplicationContract();
      const claimApplications: ClaimApplication[] =
        await claimApplicationContract.getClaims();
      console.log(claimApplications);
      setClaimApplications(claimApplications);
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Cannot receive claim applications. ${errorReason}`);
    }
  };

  useEffect(() => {
    getClaims();
  }, []);

  return (
    <Container>
      <ClaimList claimApplications={claimApplications} />
      <ToastContainer />
    </Container>
  );
};

export default ViewClaims;
