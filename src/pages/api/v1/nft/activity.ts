// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ActivityModal from "@/modal/ActivityModal"

type Data = {
  list: [string];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {

  const latestActivity = await ActivityModal.findAll({limit: 50})

  res.status(200).json({"list": latestActivity});
}
