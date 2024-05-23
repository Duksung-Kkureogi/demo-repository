import { useEffect } from "react";
import { useAuth } from "../../../services/AuthContext";
import { Layout } from "../Components/Layout";
import { UnLoggedInView } from "../Components/UnLoggedInView";

function LoginPage() {
  const { web3auth, web3AuthInit, duzzleLoggedIn } = useAuth();

  useEffect(() => {
    web3AuthInit();
  }, []);

  const login = async (): Promise<void> => {
    if (!web3auth) {
      console.log("web3auth not initialized ye");
    } else {
      await web3auth.connect();
    }
  };

  return (
    <Layout>
      <h1>Login Page</h1>
      <div>
        {!duzzleLoggedIn ? <UnLoggedInView loginFunction={login} /> : null}
      </div>
    </Layout>
  );
}

export default LoginPage;
