import axios from "axios";
import {apiKey} from "./apiKey"


export default axios.create({
    baseURL: "https://api.rawg.io/api/",
    params: {
        key: apiKey
    }
    
})