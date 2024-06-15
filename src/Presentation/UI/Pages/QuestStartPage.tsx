import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/AuthContext";
import { ApiResponseType, http } from "../../../services/Http";

// interface QuestStartProps {
//   answer: string;
//   setAnswer: (answer: string) => void;
//   onKeyPress: (event: React.KeyboardEvent) => void;
// }

export enum QuestType {
  SpeedQuiz = "SPEED_QUIZ",
  AcidRain = "ACID_RAIN",
}

export type StartQuestResponse = {
  logId: number;
  quest: string;
  timeLimit: number;
  type: QuestType;
};

export type AcidRainQuestData = {
  dropIntervalMs: number;
  dropDistance: number; //  dropIntervalMs 밀리초마다 dropDistance 거리만큼 낙하 (dropDistance = 기존 speed)
  newWordIntervalMs: number; // 새 단어가 추가 되는 간격  (기존 delay)
  gameoverLimit: number; // 바닥에 떨어진 단어 최대 허용 개수
  passingScore: number; // 성공 컷 점수 (이상)
};

const QuestStartPage = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  const startQuest = async () => {
    if (!user) {
      alert("로그인 필요");
      nav("/login");
    }
    const response = (
      await http.post<ApiResponseType<StartQuestResponse>>(
        "/v1/quest/start",
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
    )?.data;
    if (!response.result) {
      console.error(response);
    }

    if (response.data.type === QuestType.AcidRain) {
      const quest: AcidRainQuestData = JSON.parse(response.data.quest);
      console.log(quest);
      const queryParms = Object.entries(quest)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      nav(
        `/websocket-test/acidrain/${response.data.logId}?`.concat(queryParms)
      );
    }
  };
  return <button onClick={startQuest}>랜덤 퀘스트 시작하기</button>;
};

export default QuestStartPage;
