import { Routes, Route } from "react-router-dom";
import Redirect from "@/router/redirect";
import { DefaultLayout } from '@/layout'
import SDKManagement from '@/pages/sdk-management'
import NotFound from "@/pages/404";

export default function Router () {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Redirect to="/sdk-management"/>} />
        <Route path="/sdk-management" element={<SDKManagement />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}