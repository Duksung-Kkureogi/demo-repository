import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)", // 배경 어둡게 처리
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "80%",
          height: "80%",
          backgroundColor: "#fff", // 모달 내부 흰색
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "5px 10px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 1001, // 닫기 버튼이 최상단에 오도록 설정
          }}
        >
          Close
        </button>

        {/* 모달 내용 */}
        <div style={{ width: "100%", height: "100%" }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
