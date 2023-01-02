import { adminRoutes } from "./admin";
import { deviceRoutes } from "./device";

export const appRoutes = [
  {
    PATH: '/api/admin',
    FILE: adminRoutes
  },
  {
    PATH: '/api/vendor',
    FILE: deviceRoutes
  },
]