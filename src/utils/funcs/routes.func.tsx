import { Route } from "react-router-dom";
import * as R from "ramda";
import { routesConfig } from "../../configs/routes";
import { ICustomRouteObj } from "../../interfaces/route.interface";
import Layout from "../../components/Layout";

export const listRoute = (routeType: "publicRoute" | "privateRoute") => {
  return routesConfig[`${routeType}`].map(
    (item: ICustomRouteObj, index: number) => {
      return (
        <Route
          key={index}
          path={item.route.path}
          element={
            routeType === "publicRoute" ? (
              item.route.element
            ) : !R.isNil(item.isRenderLayout) &&
              item.isRenderLayout === false ? (
              item.route.element
            ) : (
              <Layout>{item.route.element}</Layout>
            )
          }
        />
      );
    }
  );
};
