import { RouteObject } from "react-router-dom";

export interface ICustomRouteObj {
  route: RouteObject;
  isRenderLayout?: boolean;
  icon?: any;
  menuName?: string;
}
