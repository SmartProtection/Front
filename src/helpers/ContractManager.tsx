import { ethers } from "ethers";
import ContractRegistryArtifacts from "../contracts/ContractRegistry.json";
import PolicyArtifacts from "../contracts/Policy.json";
import ClaimApplicationArtifacts from "../contracts/ClaimApplication.json";

import { getSigner } from "./Connection";

const REGISTRY_KEY_POLICY = "policy";
const REGISTRY_KEY_CLAIM_APPLICATION = "claimApplication";

const getContractRegistryAddress = async () => {
  const address = process.env.REACT_APP_CONTRACT_REGISTRY_ADDRESS as string;
  return address;
};

export const getContractRegistry = async (): Promise<ethers.Contract> => {
  const contractRegistryAddress = await getContractRegistryAddress();
  const contractRegistry = getContract(
    contractRegistryAddress,
    ContractRegistryArtifacts.abi
  );
  return contractRegistry;
};

export const getPolicyContract = async (): Promise<ethers.Contract> => {
  const policyContractAddress = await getPolicyContractAddress();
  const policyContract = getContract(
    policyContractAddress,
    PolicyArtifacts.abi
  );
  return policyContract;
};

export const getClaimApplicationContract =
  async (): Promise<ethers.Contract> => {
    const claimApplicationContractAddress =
      await getClaimApplicationContractAddress();
    const claimApplicationContract = getContract(
      claimApplicationContractAddress,
      ClaimApplicationArtifacts.abi
    );
    return claimApplicationContract;
  };

const getContractAddress = async (registryKey: string) => {
  const contractRegistry = await getContractRegistry();
  const policyContractAddress = await contractRegistry.getContract(registryKey);
  return policyContractAddress;
};

const getPolicyContractAddress = async () => {
  return await getContractAddress(REGISTRY_KEY_POLICY);
};

const getClaimApplicationContractAddress = async () => {
  return await getContractAddress(REGISTRY_KEY_CLAIM_APPLICATION);
};

const getContract = (
  contractAddress: string,
  abi: ethers.ContractInterface
) => {
  const signer = getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
};
