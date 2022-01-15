import axios from "axios";
class Database {
  upload = async (category, contents, idToken) => {
    const res = await axios.post(`/api/${category}`, contents, {
      params: {
        auth: idToken,
      },
    });
  };

  delete = async (category, pid, idToken) => {
    const res = await axios.delete(`/api/${category}/${pid}`, {
      params: {
        auth: idToken,
      },
    });
  };

  edit = async (category, pid, contents, idToken) => {
    const res = await axios.patch(`/api/${category}/${pid}`, contents, {
      params: {
        auth: idToken,
      },
    });
  };
}

export default Database;
