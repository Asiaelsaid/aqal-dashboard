import PasswordReset from "@components/auth/pages/PasswordReset";
import AuthLayout from "@layouts/AuthLayout";

const PasswordResetPage = () => {
  return <AuthLayout children={<PasswordReset />} />;
};

export default PasswordResetPage;
