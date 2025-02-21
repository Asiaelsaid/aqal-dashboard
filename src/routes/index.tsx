import ProtectedRoute from "@components/auth/ProtectedRoute";
import RootLayout from "@layouts/RootLayout";
import Dashboard from "@pages";
import Communication from "@pages/Communication";
import Financials from "@pages/Financials";
import FinancialsManagers from "@pages/FinancialsManagers";
import Login from "@pages/Login";
import Maintenance from "@pages/Maintenance";
import PasswordRecoveryPage from "@pages/PasswordRecovery";
import PasswordResetPage from "@pages/PasswordReset";
import Properties from "@pages/Properties/Properties";
import PropertyDetails from "@pages/Properties/PropertyDetails";
import Reporting from "@pages/Reporting";
import Reports from "@pages/Reports";
import Requests from "@pages/Requests";
import Settings from "@pages/Settings";
import Support from "@pages/Support";
import TenantDetails from "@pages/Tenants/TenantDetails";
import Tenants from "@pages/Tenants/Tenants";
import UserManagement from "@pages/UserManagement";
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
            <ProtectedRoute allowedRoles={["managers", "owners"]}>
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
            <ProtectedRoute allowedRoles={["admin", "owners"]}>
              <Financials />
            </ProtectedRoute>
          }
        />
        <Route
          path="reporting"
          element={
            <ProtectedRoute allowedRoles={["owners"]}>
              <Reporting />
            </ProtectedRoute>
          }
        />
        <Route
          path="requests"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <Requests />
            </ProtectedRoute>
          }
        />
        <Route
          path="maintenance"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <Maintenance />
            </ProtectedRoute>
          }
        />
        <Route
          path="financials-managers"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <FinancialsManagers />
            </ProtectedRoute>
          }
        />
        <Route
          path="user-management"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="communication"
          element={
            <ProtectedRoute allowedRoles={["admin", "managers"]}>
              <Communication />
            </ProtectedRoute>
          }
        />
        <Route
          path="support"
          element={
            <ProtectedRoute allowedRoles={["owners"]}>
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
