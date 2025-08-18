import { Route, Routes } from "react-router";

import { routesMap } from "@/config/site";

const AppRoutes = () => {
  return (
    <Routes>
      {routesMap.map((route) => (
        <Route
          key={route.pathName}
          element={<route.component />}
          path={route.pathName}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
