import { Route, Routes } from "react-router";

import { routesMap } from "@/config/site";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {routesMap.map((route) => (
        <Route
          key={route.pathName}
          element={
            <ProtectedRoute isProtected={route.isProtected}>
              {<route.component />}
            </ProtectedRoute>
          }
          path={route.pathName}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
