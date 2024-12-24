import ProtectedRoute from "@components/auth/ProtectedRoute";
import RootLayout from "@layouts/RootLayout";
import Dashboard from "@pages";
import Financials from "@pages/Financials";
import Login from "@pages/Login";
import PasswordRecoveryPage from "@pages/PasswordRecovery";
import PasswordResetPage from "@pages/PasswordReset";
import Properties from "@pages/Properties/Properties";
import PropertyDetails from "@pages/Properties/PropertyDetails";
import Reporting from "@pages/Reporting";
import Settings from "@pages/Settings";
import Support from "@pages/Support";
import TenantDetails from "@pages/Tenants/TenantDetails";
import Tenants from "@pages/Tenants/Tenants";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="property/:id"
          element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="tenants"
          element={
            <ProtectedRoute>
              <Tenants />
            </ProtectedRoute>
          }
        />
         <Route
          path="tenant-details/:id"
          element={
            <ProtectedRoute>
              <TenantDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="financials"
          element={
            <ProtectedRoute>
              <Financials />
            </ProtectedRoute>
          }
        />
        <Route
          path="reporting"
          element={
            <ProtectedRoute>
              <Reporting />
            </ProtectedRoute>
          }
        />
        <Route
          path="support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/sign-up" element={<Signup />} /> */}
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
    </>
  )
);

export default router;
