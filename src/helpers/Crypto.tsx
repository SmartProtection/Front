import { encrypt } from "@metamask/eth-sig-util";
import { bufferToHex } from "ethereumjs-util";
import { toast } from "react-toastify";
import { getTxErrorReason } from "./Parser";

export const getEncryptionPublicKey = (): string => {
  const publicKey: string = process.env.REACT_APP_ENCRYPTION_PUBLIC_KEY || "";
  return publicKey;
};

export const encryptMessage = (message: string): string => {
  const publicKey: string = getEncryptionPublicKey();

  const encryptedMessage = bufferToHex(
    Buffer.from(
      JSON.stringify(
        encrypt({
          publicKey: publicKey,
          data: message,
          version: "x25519-xsalsa20-poly1305",
        })
      ),
      "utf8"
    )
  );

  return encryptedMessage;
};

export const decryptMessage = async (
  encryptedMessage: string,
  account: string
): Promise<string> => {
  try {
    const insurerAddress = account;
    const decryptedMessage = await window.ethereum.request({
      method: "eth_decrypt",
      params: [encryptedMessage, insurerAddress],
    });
    console.log("The decrypted message is:", decryptedMessage);
    return decryptedMessage;
  } catch (error: any) {
    const errorReason = getTxErrorReason(error.message);
    console.log(`Error: ${error.message}`);
    toast.error(`Cannot receive current account. ${errorReason}`);
    return "";
  }
};
