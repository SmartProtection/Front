import { ToastContainer, toast, Id } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import CreatePolicyForm from "../components/CreatePolicyForm";
import { getPolicyContract } from "../helpers/ContractManager";
import { getTxErrorReason } from "../helpers/Parser";

const NewPolicy: React.FC = () => {
  const createPolicy = async (
    age: number,
    sex: boolean,
    baseTermsNumber: number
  ) => {
    try {
      const policyContract = await getPolicyContract();
      const result = await policyContract.createPolicy(
        age,
        sex,
        baseTermsNumber
      );
      console.log("Tx response:", result.toString());
      toast.success("Policy created");
    } catch (error: any) {
      const errorReason = getTxErrorReason(error.message);
      console.log(`Error: ${error.message}`);
      toast.error(`Policy wasn't created. ${errorReason}`);
    }
  };

  return (
    <Container>
      <CreatePolicyForm onCreatePolicy={createPolicy} />
      <ToastContainer />
    </Container>
  );
};

export default NewPolicy;
