import ProtectedRoute from "@components/auth/ProtectedRoute";
import RootLayout from "@layouts/RootLayout";
import Dashboard from "@pages";
import Financials from "@pages/Financials";
import Login from "@pages/Login";
import PasswordRecoveryPage from "@pages/PasswordRecovery";
import PasswordResetPage from "@pages/PasswordReset";
import Properties from "@pages/Properties";
import Reporting from "@pages/Reporting";
import Settings from "@pages/Settings";
import Signup from "@pages/Signup";
import Support from "@pages/Support";
import Tenants from "@pages/Tenants";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const isLoggedIn: boolean = true;
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={isLoggedIn} redirectPath="login">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="properties" element={<Properties />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="financials" element={<Financials />} />
        <Route path="reporting" element={<Reporting />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
    </>
  )
);

export default router;
