import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.post(
      `
        ${process.env.NEXT_PUBLIC_FIREBASE_APP_DB_URL}/faq.json
        `,
      req.body,
      {
        params: {
          auth: req.query.auth,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
