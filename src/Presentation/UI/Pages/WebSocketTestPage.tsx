import { WebSocketProvider } from "../../../services/WebSocketContext";
import RealTimeQuiz from "../Components/RealTimeQuiz";

function RealTimeQuizPage() {
  return (
    <WebSocketProvider token={"haha"}>
      <RealTimeQuiz />
    </WebSocketProvider>
  );
}

export default RealTimeQuizPage;
