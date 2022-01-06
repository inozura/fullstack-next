import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // middleware auth
  const auth = await authorization(req, res);

  const { title, content } = req.body;

  try {
    const create = await db("jobs").insert({
      title,
      content,
    });

    const createdData = await db("jobs").where("id", create).first();

    res.status(200);
    res.json({
      message: "Jobs created successfully",
      data: createdData,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "Jobs created successfully",
      data: error,
    });
  }
}
