import { Link } from "react-router-dom";
import { useAuth } from "../../../services/AuthContext";
import { LoggedInView } from "./LoggedInView";

export function Layout({ children }: { children: React.ReactNode }) {
  const { duzzleLoggedIn } = useAuth();

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/store">상점으로 이동</Link>
          </li>
          <li>
            <Link to="/">메인페이지로 이동</Link>
          </li>
          <li>
            <Link to="/login">로그인 페이지로 이동</Link>
          </li>
        </ul>
      </nav>
      <div>{duzzleLoggedIn ? <LoggedInView /> : '비회원입니다'}</div>
      {/* <div className="grid">{duzzleLoggedIn ? duzzleLoggedInView : duzzleUnloggedInView}</div> */}
      {/* <div className="grid">{web3LoggedIn ? web3LoggedInView : web3UnloggedInView}</div> */}
      {children}
    </>
  );
}
