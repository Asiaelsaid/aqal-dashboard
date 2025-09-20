import ProtectedRoute from "@components/auth/ProtectedRoute";

import RootLayout from "@layouts/RootLayout";
import Dashboard from "@pages";
import Communication from "@pages/Communication";
import Financials from "@pages/Financials";
import Finances from "@pages/Finances";
import FinancialsManagers from "@pages/FinancialsManagers";
import Login from "@pages/Login";
import Maintenance from "@pages/Maintenance";
import PasswordRecoveryPage from "@pages/PasswordRecovery";
import PasswordResetPage from "@pages/PasswordReset";
import Properties from "@pages/Properties/Properties";
import PropertyDetails from "@pages/Properties/PropertyDetails";
import Reporting from "@pages/Reporting";
import Reports from "@pages/Reports";
import ReportsLegacy from "@pages/ReportsLegacy";
import Requests from "@pages/Requests";
import Settings from "@pages/Settings";
import Support from "@pages/Support";
import TenantDetails from "@pages/Tenants/TenantDetails";
import Tenants from "@pages/Tenants/Tenants";
import UserManagement from "@pages/UserManagement";
import Landing from "@pages/Landing";
import Receipts from "@pages/Receipts";
import Invoices from "@pages/Invoices";
import InvoiceCollections from "@pages/InvoiceCollections";
import Arrears from "@pages/Arrears";
import Billing from "@pages/Billing";
// Property Owner specific imports
import OwnerReceipts from "@pages/OwnerReceipts";
import OwnerInvoices from "@pages/OwnerInvoices";
import OwnerCollections from "@pages/OwnerCollections";
import OwnerFinances from "@pages/OwnerFinances";
import OwnerCCTV from "@pages/OwnerCCTV";
import OwnerCommunication from "@pages/OwnerCommunication";
import OwnerReports from "@pages/OwnerReports";
import OwnerNotifications from "@pages/OwnerNotifications";
import ManagerPayments from "@pages/ManagerPayments";
import OwnerPayments from "@pages/OwnerPayments";
import CCTV from "@pages/CCTV";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* 🔓 Public Landing Page at `/` */}
      <Route path="/" element={<Landing />} />

      {/* 🔐 Protected App starts from `/dashboard` */}
      <Route path="/dashboard" element={<RootLayout />}>
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
          path="tenants/tenant-details/:id"
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
          path="finances"
          element={
            <ProtectedRoute allowedRoles={["managers", "owners"]}>
              <Finances />
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
          path="Reports"
          element={
            <ProtectedRoute allowedRoles={["managers", "owners"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="reports-legacy"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <ReportsLegacy />
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
        <Route
          path="receipts"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <Receipts />
            </ProtectedRoute>
          }
        />
        <Route
          path="invoices"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <Invoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="billing"
          element={
            <ProtectedRoute allowedRoles={["managers", "owners"]}>
              <Billing />
            </ProtectedRoute>
          }
        />
        <Route
          path="arrears"
          element={
            <ProtectedRoute allowedRoles={["managers", "owners"]}>
              <Arrears />
            </ProtectedRoute>
          }
        />
        <Route
          path="invoice-collections"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <InvoiceCollections />
            </ProtectedRoute>
          }
        />
        
        {/* Property Owner specific routes - also accessible by managers */}
        <Route
          path="owner-receipts"
          element={
            <ProtectedRoute allowedRoles={["owners", "managers"]}>
              <OwnerReceipts />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-invoices"
          element={
            <ProtectedRoute allowedRoles={["owners", "managers"]}>
              <OwnerInvoices />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-collections"
          element={
            <ProtectedRoute allowedRoles={["owners", "managers"]}>
              <OwnerCollections />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-finances"
          element={
            <ProtectedRoute allowedRoles={["owners", "managers"]}>
              <OwnerFinances />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-cctv"
          element={
            <ProtectedRoute allowedRoles={["owners", "managers"]}>
              <OwnerCCTV />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-communication"
          element={
            <ProtectedRoute allowedRoles={["owners", "managers"]}>
              <OwnerCommunication />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-reports"
          element={
            <ProtectedRoute allowedRoles={["owners", "managers"]}>
              <OwnerReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-notifications"
          element={
            <ProtectedRoute allowedRoles={["owners", "managers"]}>
              <OwnerNotifications />
            </ProtectedRoute>
          }
        />
        
        {/* Payment routes */}
        <Route
          path="manager-payments"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <ManagerPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="owner-payments"
          element={
            <ProtectedRoute allowedRoles={["owners"]}>
              <OwnerPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="CCTV"
          element={
            <ProtectedRoute allowedRoles={["managers"]}>
              <CCTV />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 🔐 Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      <Route path="/password-reset" element={<PasswordResetPage />} />
    </>
  )
);


export default router;
