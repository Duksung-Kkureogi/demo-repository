import React, { useState, useEffect, useCallback } from "react";
import AnswerInput from "./AnswerInput";
import { useWebSocket } from "../../../services/WebSocketContext";
import { usePreventRefresh } from "../../../services/usePreventRefresh";

interface QuizData {
  question: string;
}

const RealTimeQuiz: React.FC = () => {
  usePreventRefresh(); // 새로고침 방지
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [result, setResult] = useState<boolean | null>(null);
  const { socket } = useWebSocket();

  useEffect(() => {
    if (socket) {
      socket.on("quiz", (data: QuizData) => {
        setQuiz(data);
        setResult(null); // Reset result when a new quiz starts
      });

      socket.on("result", (data: { correct: boolean }) => {
        setResult(data.correct);
      });

      return () => {
        socket.off("quiz");
        socket.off("result");
      };
    }
    // 페이지 이동 또는 언마운트 시에 소켓 연결 정리
    return () => {
      // 소켓 연결은 싱글톤 패턴을 사용하므로 별도의 정리 작업 필요 없음
    };
  }, [socket]);

  const startQuiz = useCallback(() => {
    if (socket) {
      socket.connect();
      socket.emit("start");
    }
  }, [socket]);

  const handleAnswerSubmit = useCallback(() => {
    if (socket && answer) {
      socket.emit("answer", { answer });
      setAnswer("");
    }
  }, [socket, answer]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleAnswerSubmit();
      }
    },
    [handleAnswerSubmit]
  );

  return (
    <div>
      <button onClick={startQuiz}>Start Quiz</button>
      {quiz ? (
        <div>
          <h2>{quiz.question}</h2>
          <AnswerInput
            answer={answer}
            setAnswer={setAnswer}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleAnswerSubmit}>Submit Answer</button>
          {result !== null && (
            <p>{result ? "Correct!" : "Wrong answer. Try again!"}</p>
          )}
        </div>
      ) : (
        <p>Waiting for quiz...</p>
      )}
    </div>
  );
};

export default RealTimeQuiz;
