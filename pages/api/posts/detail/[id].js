import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  // const auth = await authorization(req, res);

  try {
    const post = await db("posts").where({ id }).first();

    if (!post) return res.status(404).end();

    res.status(200);
    res.json({
      message: "Posts data",
      data: post,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "Server error",
      data: error,
    });
  }
}
