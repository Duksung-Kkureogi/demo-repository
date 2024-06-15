import { useEffect } from "react";
import { useAuth } from "../../../services/AuthContext";
import { Navigate } from "react-router-dom";

export interface AuthGuardLayoutProps {
  children: React.ReactNode;
}
const AuthGuardLayout: React.FC<AuthGuardLayoutProps> = ({
  children,
}): React.ReactElement => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      if (confirm("로그인이 필요한 서비스입니다."))
        document.location = "/login";
    }
  }, []);

  return user ? <>{children} </> : <Navigate to="/login" />;
};

export default AuthGuardLayout;
