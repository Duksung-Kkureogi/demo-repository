/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import "./Acid.css";
import { useWebSocket } from "../../../services/WebSocketContext";
import { useNavigate } from "react-router-dom";
import { AcidRainQuestData } from "../Pages/QuestStartPage";

interface WordProps {
  word: string;
  x: number;
  y: number;
}

const Word: React.FC<WordProps> = ({ word, x, y }) => {
  return (
    <div className="word" style={{ left: x, top: y }}>
      {word}
    </div>
  );
};

interface WordInstance {
  word: string;
  x: number;
  y: number;
  interval: NodeJS.Timeout;
}

export interface AcidRainProps {
  logId: number;
  data: AcidRainQuestData;
}

const Acid: React.FC<AcidRainProps> = ({ logId, data }) => {
  const nav = useNavigate();
  const { dropIntervalMs, dropDistance, gameoverLimit, passingScore } = data;

  // 글자 복사 방지
  document.onselectstart = function () {
    return false;
  };

  const [waitWords, setWaitWords] = useState<string[]>([]);
  const [activeWordObjs, setActiveWordObjs] = useState<WordInstance[]>([]);
  const [score, setScore] = useState(0);
  const [failed, setFailed] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const inputRef = useRef<any>();
  const gamePanelRef = useRef<any>();
  const { socket } = useWebSocket();

  const handleHit = (hitWord: string) => {
    console.log(`${hitWord} 맞췄음!! 점수 +1`);
    // 맞춘단어는 active word 에서 없애기
    const index = activeWordObjs.findIndex(
      (element) => element.word === hitWord
    );
    // console.log(activeWordObjs.map((e) => e.word));
    if (index !== -1) {
      clearInterval(activeWordObjs[index].interval);
      setActiveWordObjs((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleWrong = () => {
    console.log("틀렸다!! -1점 감점");
  };

  useEffect(() => {
    const handleNewWord = (newWord: string) => {
      console.timeLog("game", "new word");
      setWaitWords((prev) => {
        return [...prev, newWord];
      });
    };

    const handleScore = (score: number) => {
      setScore(score);
    };

    const handleGameover = (score: number) => {
      console.timeLog("game", "게임오버!!! ");
      setGameover(true);
      setScore(score);
      setActiveWordObjs([]);
      // nav("/questfail");
    };

    const handleMissedWord = (data: { word: string; count: number }) => {
      const { word, count } = data;
      setFailed(count);
      console.timeLog(
        "game",
        `0.5 감점!! ${word} 놓쳤다고 판단, 총 놓친 단어 수 = ${count}`
      );
    };

    const handleResult = (data: { result: boolean; score: number }) => {
      const { result, score } = data;
      setScore(score);
      console.log(result ? "성공!! 성공페이지로 이동" : "실패 페이지로 이동");
      console.timeLog("game", `server: result:${result}, score: ${score}`);
      setGameover(true);
      setActiveWordObjs([]);

      if (result) {
        // nav("/questsuccess");
      } else {
        // nav("/questfail");
      }
    };

    socket.on("word", handleNewWord);
    socket.on("score", handleScore);
    socket.on("hit", handleHit);
    socket.on("wrong", handleWrong);
    socket.on("gameover", handleGameover);
    socket.on("miss", handleMissedWord);
    socket.on("result", handleResult);

    // 컴포넌트 언마운트 시 소켓 이벤트 리스너 정리
    return () => {
      socket.off("word", handleNewWord);
      socket.off("score", handleScore);
      socket.off("hit", handleHit);
      socket.off("wrong", handleWrong);
      socket.off("gameover", handleGameover);
      socket.off("miss", handleMissedWord);
      socket.off("result", handleResult);
      // socket.offAny();
    };
  }, []);

  useEffect(() => {
    if (!gameover && !showHelp && socket) {
      inputRef.current.focus();
      document.addEventListener("click", handleClick);
      dropWord();
      const repaintInterval = setInterval(() => {
        repaint();
      }, dropIntervalMs);

      return () => {
        // clearInterval(dropInterval);
        clearInterval(repaintInterval);
      };
    }
  }, [gameover, showHelp, waitWords]);

  const dropWord = () => {
    if (waitWords.length !== 0) {
      const word = waitWords.shift()!;
      const wordInstance = {
        word,
        x: Math.random() * gamePanelRef.current.offsetWidth,
        y: 0,
        interval: setInterval(() => {
          wordInstance.y += dropDistance;
        }, dropIntervalMs),
      };
      setActiveWordObjs((prev) => [...prev, wordInstance]);
    }
  };

  const repaint = () => {
    setActiveWordObjs(
      (prev) =>
        prev
          .map((wordObj) => {
            if (wordObj.y >= gamePanelRef.current.offsetHeight - 10) {
              // setFailed((prev) => prev + 0.5);
              clearInterval(wordObj.interval);

              return null;
            }
            return wordObj;
          })
          .filter(Boolean) as WordInstance[]
    );
  };

  const hitWord = (word: string) => {
    // console.log("입력된 단어:", word);
    if (socket) {
      socket.emit("quest:acid-rain:answer", { answer: word });
      console.timeLog("game", "answer");
      console.log("입력 단어 서버에 전송!! : ", { answer: word });
      socket.on("hit", handleHit);

      // const index = activeWordObjs.findIndex(
      //   (element) => element.word === word
      // );
      // if (index !== -1) {
      //   clearInterval(activeWordObjs[index].interval);
      //   setActiveWordObjs((prev) => prev.filter((_, i) => i !== index));
      //   // setScore((prev) => prev + 1);
      // } else {
      //   // setScore((prev) => (prev > 0 ? prev - 1 : 0));
      // }
    }
  };

  // const isGameOver = () => failed >= gameoverLimit;
  // const isGameClear = () =>
  //   activeWordObjs.length === 0 && waitWords.length === 0;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    inputRef.current.focus();
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      hitWord(inputRef.current.value.trim());

      inputRef.current.value = "";
    }
  };

  const startGame = () => {
    // setWaitWords([...wordString]);
    setActiveWordObjs([]);
    setScore(0);
    setFailed(0);
    setGameover(false);
    setShowHelp(false);
    inputRef.current.focus();

    if (socket) {
      socket.connect();
      console.time("game");
      socket.emit("quest:acid-rain:start", {
        logId,
        gamePanelOffsetHeight: gamePanelRef.current.offsetHeight,
      });
      console.log("emit START: ", {
        logId,
        gamePanelOffsetHeight: gamePanelRef.current.offsetHeight,
      });
      socket.on("exception", (data) => {
        console.error("Error from server:", data);
      });
    }
  };

  const showHelpScreen = () => {
    setShowHelp(true);
  };

  const handleClick = () => {
    if (!gameover && !showHelp) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container-fluid">
      <div ref={gamePanelRef} id="game-panel" className="container"></div>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        id="control-panel-frame"
      >
        <div
          id="control-panel"
          className="col-md-5 align-content-center container"
        >
          <div>
            <label className="my-score">점수 : </label>
            <label className="my-score" id="score-1">
              {score}
            </label>
          </div>
          <div>
            <label className="my-score">실패 : </label>
            <label className="my-score" id="failed">
              {failed}
            </label>
          </div>
          <input type="text" ref={inputRef} onKeyDown={handleKeyDown} />
        </div>
      </div>
      <div id="board" className="d-flex align-items-center flex-column">
        {showHelp && (
          <div id="help-div">
            <label className="col-form-label" id="help-title">
              산성비 게임💧
            </label>
            <div>
              1. 위에서 떨어지는 단어가 <b>바닥에 닿기 전에</b> 해당 단어를{" "}
              <b>입력</b>하여 점수를 획득하세요.
              <br />
              2. 없는 단어 입력 시 <b>점수가 차감</b>됩니다. <br />
              3. <b>{gameoverLimit}개</b>가 바닥에 떨어지면 <b>게임은 종료</b>
              됩니다.
              <br />
              4. 단어가 모두 나와서 처리되면 <b>게임은 종료</b>됩니다. <br />
              5. 게임이 종료되면 획득한 점수가 공개됩니다.
              <br />
              6. 성공 점수: {passingScore} 점 이상
              <br />
            </div>
            <button
              className="buttonstart"
              role="button"
              id="start"
              onClick={startGame}
            >
              게임 시작
            </button>
          </div>
        )}
        {gameover && !showHelp && (
          <div className="score">
            <div id="end-score">점수 : {score}</div>
            <button
              className="restart"
              id="restart"
              onClick={() => nav("/퀘스트시작페이지")}
            >
              랜덤 퀘스트 재도전
            </button>
            <button className="explain" onClick={showHelpScreen}>
              게임 설명
            </button>
          </div>
        )}
      </div>
      {activeWordObjs.map((wordObj, index) => (
        <Word key={index} word={wordObj.word} x={wordObj.x} y={wordObj.y} />
      ))}
    </div>
  );
};

export default Acid;
