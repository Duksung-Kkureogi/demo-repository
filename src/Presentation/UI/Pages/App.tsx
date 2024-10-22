import React, { useState } from "react";
import ThreeDScene from "../Components/ThreeDScene";
import Modal from "../Components/Modal";

function ThreeDModelTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const url = "public/library.gltf";
  return (
    <div>
      {/* 모달을 여는 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1000, // 버튼이 3D 씬 위에 있도록 z-index 설정
        }}
      >
        Open 3D Modal
      </button>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ThreeDScene
          width="100%"
          height="100%"
          url={url}
          nftInfo={{
            owner: "0x1234567890abcdef1234567890abcdef12345678",
            creationDate: "2021-10-20",
            uniqueId: "3",
          }}
        />
      </Modal>

      {/* 페이지 전체에서 3D 모델을 보여주는 영역 */}
      <div style={{ width: "100vw", height: "100vh" }}>
        <ThreeDScene
          // width="100%"
          // height="100%"
          width="800px"
          height="600px"
          url={url}
          nftInfo={{
            owner: "0x1234567890abcdef1234567890abcdef12345678",
            creationDate: "2021-10-20",
            uniqueId: "3",
          }}
        />
      </div>
    </div>
  );
}

export default ThreeDModelTestPage;
