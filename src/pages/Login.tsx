import LogInComponent from "@components/auth/Login";
import AuthLayout from "@layouts/AuthLayout";

interface IProps {}

const Login: React.FC<IProps> = () => {
    return <AuthLayout children={<LogInComponent/>}/>;
};

export default Login;