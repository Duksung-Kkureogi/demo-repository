import { useAuth } from "../../../services/AuthContext";

export function LoggedInView() {
  const { user, logout, showDalBalance } = useAuth();

  return (
    <>
      <div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
        <table border={1}>
          <thead></thead>
          <tbody>
            <tr>
              <td>이메일</td>
              <td>이름</td>
              <td>지갑 주소</td>
              <td>보유 DAL 확인</td>
            </tr>
            <tr>
              <td>{user?.email}</td>
              <td>{user?.name}</td>
              <td>{user?.walletAddress}</td>
              <td>
                <button onClick={showDalBalance} className="card">
                  Get Dal Balance
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
        <div id="console" style={{ whiteSpace: "pre-line" }}>
          <p style={{ whiteSpace: "pre-line" }}></p>
        </div>
      </div>
    </>
  );
}
