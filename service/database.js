import axios from "axios";

class Database {
  upload = async (category, contents) => {
    const res = await axios.post(`/api/${category}`, contents);
  };
}

export default Database;
