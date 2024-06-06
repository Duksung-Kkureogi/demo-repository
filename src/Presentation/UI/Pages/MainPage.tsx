import { Layout } from "../Components/Layout";
import puzzleImg from "../../../../public/mainImg.png"; // with import

function MainPage() {
  return (
    <Layout>
      <h1>Main Page</h1>
      <div>
        <img src={puzzleImg} id="puzzleImg" useMap="#image-map" />
        <map name="image-map">
          <area
            target=""
            onClick={() => console.log("bpleft")}
            alt="bpleft"
            title="bpleft"
            coords="223,201,269,254"
            shape="rect"
          />
          <area
            target=""
            onClick={() => console.log("bpright")}
            alt="bpright"
            title="bpright"
            coords="60,199,101,259"
            shape="rect"
          />
          <area
            target=""
            onClick={() => console.log("heart")}
            alt="heartrate"
            title="heartrate"
            coords="169,124,219,183"
            shape="rect"
          />
        </map>{" "}
      </div>
    </Layout>
  );
}

export default MainPage;
