import { useEffect } from "react";

export const usePreventRefresh = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const preventClose = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  // 브라우저에 렌더링 시 한 번만 실행하는 코드
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  });
};
