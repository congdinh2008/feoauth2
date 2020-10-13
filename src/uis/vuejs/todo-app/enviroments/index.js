import prod from "./enviroment";
import dev from "./enviroment.dev";

const env = process.env.NODE_ENV == "development" ? dev : prod;
export default env;
