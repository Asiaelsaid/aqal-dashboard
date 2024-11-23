import PasswordRecovery from "@components/auth/pages/PasswordRecovery";
import AuthLayout from "@layouts/AuthLayout";

const PasswordRecoveryPage = () => {
  return <AuthLayout children={<PasswordRecovery />} />;
};

export default PasswordRecoveryPage;
