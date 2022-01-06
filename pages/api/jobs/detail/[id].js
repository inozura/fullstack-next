import db from "../../../../libs/db";
import authorization from "../../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  const auth = await authorization(req, res);

  try {
    const job = await db("jobs").where({ id }).first();

    if (!job) return res.status(404).end();

    res.status(200);
    res.json({
      message: "Jobs data",
      data: job,
    });
  } catch (error) {
    res.status(500);
    res.json({
      message: "Server error",
      data: error,
    });
  }
}
