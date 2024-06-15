import {
  CHAIN_NAMESPACES,
  CustomChainConfig,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { ModalConfig } from "@web3auth/modal";
import { OpenloginAdapterOptions } from "@web3auth/openlogin-adapter";

export const Web3AuthParameters: {
  clientId: string;
  chainConfig: CustomChainConfig;
  web3AuthNetwork: string;
  openLoginAdapterOptions: OpenloginAdapterOptions;
  modalConfig: Record<string, ModalConfig>;
} = {
  clientId: process.env.WEB3AUTH_CLIENT_ID!,

  chainConfig: {
    chainId: "0x13882",
    rpcTarget:
      "https://polygon-amoy.infura.io/v3/17dd8c3b0ce44057a4c425271bdd7b53",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    displayName: "Polygon Amoy Testnet",
    blockExplorerUrl: "https://amoy.polygonscan.com/",
    ticker: "MATIC",
    tickerName: "MATIC",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  },
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  openLoginAdapterOptions: {
    loginSettings: {
      mfaLevel: "optional",
    },
    adapterSettings: {
      uxMode: "redirect", // "redirect" | "popup"
      mfaSettings: {
        deviceShareFactor: {
          enable: true,
          priority: 1,
          mandatory: true,
        },
        backUpShareFactor: {
          enable: true,
          priority: 2,
          mandatory: true,
        },
        socialBackupFactor: {
          enable: true,
          priority: 3,
          mandatory: false,
        },
        passwordFactor: {
          enable: true,
          priority: 4,
          mandatory: false,
        },
      },
    },
  },
  modalConfig: {
    [WALLET_ADAPTERS.OPENLOGIN]: {
      label: "openlogin",
      loginMethods: {
        // Disable facebook and reddit
        facebook: {
          name: "facebook",
          showOnModal: false,
        },
        reddit: {
          name: "reddit",
          showOnModal: false,
        },
        // Disable email_passwordless and sms_passwordless
        email_passwordless: {
          name: "email_passwordless",
          showOnModal: false,
        },
        sms_passwordless: {
          name: "sms_passwordless",
          showOnModal: false,
        },
      },
    },
  },
};
