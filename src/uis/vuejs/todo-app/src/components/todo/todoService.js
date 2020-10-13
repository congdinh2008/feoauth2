import axios from "axios";

import env from "../../../enviroments";
import addAuthInterceptors from "../../auth/authInterceptors";

const instance = axios.create({
  baseURL: env.ResourceServer.Endpoint + "todo/",
});
addAuthInterceptors(instance);
export default instance;
