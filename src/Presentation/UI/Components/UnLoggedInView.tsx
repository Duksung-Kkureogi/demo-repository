interface UnLoggedInViewProps {
  loginFunction: () => Promise<void>;
}

export const UnLoggedInView: React.FC<UnLoggedInViewProps> = ({
  loginFunction,
}) => {
  return (
    <button onClick={loginFunction} className="card">
      Login
    </button>
  );
};
