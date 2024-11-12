import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "../components/Root"
import Dashboard from "../pages/Dashboard";
import Properties from "../pages/Properties";
import Tenants from "../pages/Tenants";
import Financials from "../pages/Financials";
import Reporting from "../pages/Reporting";
import Support from "../pages/Support";
import Settings from "../pages/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="properties" element={<Properties />} />
      <Route path="tenants" element={<Tenants />} />
      <Route path="financials" element={<Financials />} />
      <Route path="reporting" element={<Reporting />} />
      <Route path="support" element={<Support />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  )
);
export default router;
