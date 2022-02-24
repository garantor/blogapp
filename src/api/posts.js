
import axios from "axios";

//this is the base url to be used by axios, by just changing this url we are able to change the base url
export default axios.create({
    baseURL:"http://localhost:3500"
});


