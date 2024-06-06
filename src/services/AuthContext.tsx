import { IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Http } from "./Http";
import RPC from "../../ethersRPC";
import { LoginRequest } from "../Data/DTOs/UserDTO";
import { UiConsole } from "../Presentation/UI/Components/UIConsole";
import { Web3AuthParameters } from "../constant/blockchain";

interface DuzzleUser {
  accessToken: string;
  id: number;
  email: string;
  name: string;
  level: number;
  walletAddress: string;
  createdAt: Date;
}

interface AuthContextType {
  web3auth: Web3Auth | null;
  duzzleLoggedIn: boolean;
  web3LoggedIn: boolean;
  setDuzzleLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setWeb3LoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setWeb3auth: React.Dispatch<React.SetStateAction<Web3Auth | null>>;
  web3AuthInit: () => void;
  showDalBalance: () => void;
  showItemBalance: () => void;
  getPrivateKey: () => void;

  duzzleLogin: (params: LoginRequest) => void;
  user: DuzzleUser | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [duzzleLoggedIn, setDuzzleLoggedIn] = useState(false);
  const [web3LoggedIn, setWeb3LoggedIn] = useState(false);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [user, setUser] = useState<DuzzleUser | null>(null);

  const { clientId, chainConfig, openLoginAdapterOptions, modalConfig } =
    Web3AuthParameters;
  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3AuthOptions: Web3AuthOptions = {
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider: privateKeyProvider,
    sessionTime: 86400, // 1 day
  };

  const web3AuthInit = async () => {
    try {
      const web3auth = new Web3Auth(web3AuthOptions);

      const openloginAdapter = new OpenloginAdapter(openLoginAdapterOptions);
      web3auth.configureAdapter(openloginAdapter);
      setWeb3auth(web3auth);

      await web3auth.initModal({
        modalConfig,
      });
      if (web3auth.connected) {
        setWeb3LoggedIn(true);
        const rpc = new RPC(web3auth!.provider as IProvider);
        const [openLoginUserInfo, web3AuthInfo, walletAddress] =
          await Promise.all([
            web3auth?.getUserInfo(),
            web3auth?.authenticateUser(),
            rpc.getAccounts(),
          ]);

        await duzzleLogin({
          idToken: web3AuthInfo.idToken,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          loginType: openLoginUserInfo.typeOfLogin?.toUpperCase()!,
          walletAddress,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const duzzleLogin = async (params: LoginRequest) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = (
        await Http.post(
          "/v1/auth",
          {
            loginType: params.loginType,
            walletAddress: params.walletAddress,
          },
          {
            headers: {
              Authorization: params.idToken,
            },
          }
        )
      ).data;
      const user: DuzzleUser = {
        ...response.data,
        ...response.data.user,
      };
      setDuzzleLoggedIn(true);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await web3auth!.logout();
    setDuzzleLoggedIn(false);
    setWeb3LoggedIn(false);
  };

  const showDalBalance = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
    } else {
      const rpc = new RPC(web3auth.provider as IProvider);
      const balance = await rpc.getDalBalance();
      UiConsole(balance);
    }
  };

  const showItemBalance = async () => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
    } else {
      const rpc = new RPC(web3auth.provider as IProvider);
      const balance = await rpc.getNfts();
      UiConsole(balance);
    }
  };

  const getPrivateKey = async () => {
    if (!web3auth?.provider) {
      UiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(web3auth.provider as IProvider);
    const privateKey = await rpc.getPrivateKey();
    UiConsole(privateKey);
  };

  return (
    <AuthContext.Provider
      value={{
        duzzleLoggedIn,
        setDuzzleLoggedIn,
        web3LoggedIn,
        setWeb3LoggedIn,
        duzzleLogin,
        logout,
        web3auth,
        setWeb3auth,
        web3AuthInit,
        user,
        showDalBalance,
        showItemBalance,
        getPrivateKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
