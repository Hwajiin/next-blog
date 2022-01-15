import axios from "axios";

export default async function handler(req, res) {
  let response;
  try {
    switch (req.method) {
      case "DELETE":
        response = await axios.delete(
          `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/faq/${req.query.pid}.json`,
          {
            params: {
              auth: req.query.auth,
            },
          }
        );
        return response;

      case "PATCH":
        response = await axios.patch(
          `${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/faq/${req.query.pid}.json`,
          req.body,
          {
            params: {
              auth: req.query.auth,
            },
          }
        );
        return response;

      default:
        return;
    }
  } catch (error) {
    console.log(error);
  }
}
