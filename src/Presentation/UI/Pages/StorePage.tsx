import { IProvider } from "@web3auth/base";
import { Layout } from "../Components/Layout";
import { UiConsole } from "../Components/UIConsole";
import { useAuth } from "../../../services/AuthContext";
import RPC from "../../../../ethersRPC";
import { NFTDisplay } from "../Components/NFTDisplay";
import { useState } from "react";
import { Loading } from "../Components/Loading";

function StorePage() {
  const { web3auth } = useAuth();
  const [metadataUrl, setMetadataUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const getRandomItem = async (setMetadataFunc: Function) => {
    if (!web3auth?.provider) {
      console.log("provider not initialized yet");
    } else {
      const rpc = new RPC(web3auth.provider as IProvider);
      setLoading(true);
      try {
        const itemMetadataUrl = await rpc.getRandomItem();
        setMetadataFunc(itemMetadataUrl);
        // UiConsole(itemMetadataUrl);
      } catch (error) {
        UiConsole("구매 실패");
      } finally {
        setLoading(false);
      }
      // const itemMetadataUrl =
      //   "http://duzzle-development-env.eba-n6vfrcj2.ap-northeast-2.elasticbeanstalk.com/metadata/4/9";
    }
  };

  return (
    <Layout>
      <h1>상점</h1>
      {/* <div className="card">count is {count}</div> */}
      <button
        style={{
          color: "white",
          background: "pink",
          cursor: "pointer",
          width: "400px",
          height: "200px",
          fontSize: "40px",
        }}
        onClick={() => getRandomItem(setMetadataUrl)}
      >
        랜덤 아이템 구매
      </button>
      <div>
        {loading ? <Loading /> : null}
        <div>
          {" "}
          <NFTDisplay metadataUrl={metadataUrl} />
        </div>
      </div>

      {/* <button style="background:red; cursor:pointer">click me</button> */}
    </Layout>
  );
}

export default StorePage;
