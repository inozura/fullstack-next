import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  // middleware auth
  const auth = await authorization(req, res);

  const Jobs = await db("jobs");

  res.status(200);
  res.json({
    message: "Jobs data",
    data: Jobs,
  });
}
