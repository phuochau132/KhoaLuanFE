import { PredictPage } from "../pages";
import { IRoute } from "../interface";

const publicRoute: Array<IRoute> = [
  {
    path: "/",
    element: PredictPage,
  },
];
const privateRoute: object = [];

export { publicRoute, privateRoute };
