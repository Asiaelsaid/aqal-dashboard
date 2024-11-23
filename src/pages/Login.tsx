import LogInComponent from "@components/auth/pages/LogIn";
import AuthLayout from "@layouts/AuthLayout";

const Login = () => {
    return <AuthLayout children={<LogInComponent/>}/>;
};

export default Login;