import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "209db2c0765d4e6cb6144d4d91c865c7"
    }

})