import axios from "axios";
import apiKey from "../../../apikey"


export default axios.create({
    baseURL: "https://api.rawg.io/api/",
    params: {
        key: apiKey
    }
    
})