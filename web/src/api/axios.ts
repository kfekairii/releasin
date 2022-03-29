import axios from "axios";
import { BASE_URL } from "./endpoint";

export default axios.create({ baseURL: BASE_URL });
