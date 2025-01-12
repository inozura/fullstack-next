import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  // const auth = await authorization(req, res);

  try {
    const posts = await db("posts");

    res.status(200);
    res.json({
      message: "Posts data",
      data: posts,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "Server error",
      data: error,
    });
  }
}
