// import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Main Page</h1>
      <div className="card">
        <button onClick={() => navigate("/store")}>상점</button>
        <button onClick={() => navigate("/login")}>로그인하기</button>
      </div>
    </>
  );
}

export default MainPage;
