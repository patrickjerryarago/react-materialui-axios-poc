import axios from "axios";

export default axios.create({
  baseURL: "https://user-project-czar.herokuapp.com/api/user",
  headers: {
    "Content-type": "application/json"
  }
});