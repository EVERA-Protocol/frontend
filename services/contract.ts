import { launchpadAbi, tokenAbi } from "./abi";
import { RWALaunchpadContract, RWATokenContract } from "./contractAddress";

export const wagmiContractLaunchpadConfig = {
  address: RWALaunchpadContract,
  abi: launchpadAbi,
} as const;

export const wagmiContractTokenConfig = {
  address: RWATokenContract,
  abi: tokenAbi,
} as const;
