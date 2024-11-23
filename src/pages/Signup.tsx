import SignUp from "@components/auth/pages/SignUp";
import AuthLayout from "@layouts/AuthLayout";


const Signup  = () => {
    return <AuthLayout children={<SignUp/>}/>
};

export default Signup;